import { BABYLON, CustomMaterial, GUI, PBRCustomMaterial } from "../../base/commonIncludes";


// 场景基本的构建方法
// 阴影案例
export const shadowLightScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);
    // demo5(scene, canvas);
    // demo6(scene, canvas);
    // demo7(scene, canvas);
    // demo8(scene, canvas);
    // demo9(scene, canvas);
    // demo10(scene, canvas);
    // demo11(scene, canvas);
    // demo12(scene, canvas);
    // demo13(scene, canvas);
    demo14(scene, canvas);

    return scene;
};

const demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
    
    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

	// 创建直射灯
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = 0.5;

    // 创建灯光示例球
	var lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:10, diameter:2}, scene);
	lightSphere.position = light.position;
	const light1Mat = lightSphere.material = new BABYLON.StandardMaterial("light", scene);
    // 设置自发光颜色
	light1Mat.emissiveColor = new BABYLON.Color3(1, 1, 0);

	// 创建聚光灯2
	var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20),
												new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
	light2.intensity = 0.5;

    // 创建灯光示例球
	var lightSphere2 =  BABYLON.MeshBuilder.CreateSphere("sphere", {segments:10, diameter:2}, scene);
	lightSphere2.position = light2.position;
	const lightmat2 = lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
	lightmat2.emissiveColor = new BABYLON.Color3(1, 1, 0);

	// 创建地面
	// var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "https://playground.babylonjs.com/textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
	var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
		"https://playground.babylonjs.com/textures/heightMap.png", 
		{ 
			width:100, 
			height:100, 
			subdivisions:100, 
			minHeight:0, 
			maxHeight:10,
			updatable:false
		}, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	const diffuseTexture = groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	diffuseTexture.uScale = 6;
	diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	// Torus
	var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter:4, thickness:2, tessellation:30,updatable:false}, scene);

	// Box
    var box = BABYLON.MeshBuilder.CreateBox("box", {size:3});
    // 组合图形 父子级
    box.parent = torus;	

	// 创建阴影生成器
     /**
     * Creates a ShadowGenerator object.
     * A ShadowGenerator is the required tool to use the shadows.
     * Each light casting shadows needs to use its own ShadowGenerator.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/shadows
     * @param mapSize The size of the texture what stores the shadows. Example : 1024.
     * @param light The light object generating the shadows.
     * @param usefullFloatFirst By default the generator will try to use half float textures but if you need precision (for self shadowing for instance), you can use this option to enforce full float texture.
     * @param camera Camera associated with this shadow generator (default: null). If null, takes the scene active camera at the time we need to access it
     * @param useRedTextureType Forces the generator to use a Red instead of a RGBA type for the shadow map texture format (default: false)
     * @param forceGLSL defines a boolean indicating if the shader must be compiled in GLSL even if we are using WebGPU
     */
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
   
    // 添加投影对象
    /**
     * Helper function to add a mesh and its descendants to the list of shadow casters.
     * @param mesh Mesh to add
     * @param includeDescendants boolean indicating if the descendants should be added. Default to true
     * @returns the Shadow Generator itself
     */
	shadowGenerator.addShadowCaster(torus);
    // 阴影过滤是用ESM 质数阴影贴图 
	// 通过指数函数优化阴影的渐变过渡，减少锯齿（aliasing）和阴影失真，尤其在光源较大或场景复杂时效果显著。
	shadowGenerator.useExponentialShadowMap = true;

    // 添加投影对象
	var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
    // 添加投影对象
	shadowGenerator2.addShadowCaster(torus);
    // Poisson Sampling. Sets the current filter to Poisson Sampling.
	// 分层泊松采样
	shadowGenerator2.usePoissonSampling = true;

    // 设置地面接收阴影
	ground.receiveShadows = true;

	// Animations
	var alpha = 0;
	scene.registerBeforeRender(function () {
		torus.rotation.x += 0.01;
		torus.rotation.z += 0.02;

		torus.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 10, Math.sin(alpha) * 30);
		alpha += 0.01;

	});

}

// 加入阴影边缘模糊
const demo2 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
    
    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

	// 创建直射灯
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);

	// 创建球
	var lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:10, diameter:2}, scene);
	// 灯的位置
	lightSphere.position = light.position;
	const lightMat = lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	lightMat.emissiveColor = new BABYLON.Color3(1, 1, 0);

	// Ground
	var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
		"https://playground.babylonjs.com/textures/heightMap.png", 
		{ 
			width:100, 
			height:100, 
			subdivisions:100, 
			minHeight:0, 
			maxHeight:10,
			updatable:false
		}, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	const diffuseTexture = groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	diffuseTexture.uScale = 6;
	diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	// Torus
	var torus = BABYLON.MeshBuilder.CreateTorus("torus", {diameter:4, thickness:2, tessellation:30,updatable:false}, scene);
    torus.position = new BABYLON.Vector3(30, 30,0);

	// 创建阴影
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.getShadowMap()!.renderList!.push(torus);
	// Blur exponential shadow map
	// 在 ESM 的指数衰减基础上，应用高斯模糊（Gaussian Blur）减少阴影边缘的锯齿（Aliasing），同时保留 ESM 的大光源柔和渐变特性。
	shadowGenerator.useBlurExponentialShadowMap = true;
	// 模糊参数
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 32;

	ground.receiveShadows = true;

}

// CESM 自投阴影
const demo3 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(80, 80, 120));
    camera.attachControl(canvas, true);

	// 创建直射光
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, 1), scene);
	light.position = new BABYLON.Vector3(20, 40, -20);

	// 创建阴影
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    BABYLON.ImportMeshAsync("https://playground.babylonjs.com//scenes/skull.babylon", scene).then((result)=>{
        var skull = result.meshes[0];
        camera.target = skull.position;

        shadowGenerator.getShadowMap()!.renderList!.push(skull);
		// Close exponential shadow map CESM
        shadowGenerator.useBlurCloseExponentialShadowMap = true;
		// 双面渲染
        shadowGenerator.forceBackFacesOnly = true;
		// 模糊
        shadowGenerator.blurKernel = 32;
        shadowGenerator.useKernelBlur = true;

        light.shadowMinZ = 10;
        light.shadowMaxZ = 70;

        skull.receiveShadows = true;
    });

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var panel = new GUI.StackPanel();
    panel.width = "120px";
    panel.isVertical = true;
    panel.paddingRight = "20px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel);

    var addCheckbox = function(text:string, func:(...args:any[])=>void, initialValue:boolean, left:number = 0) {
        var checkbox = new GUI.Checkbox();
        checkbox.width = "20px";
        checkbox.height = "20px";
        checkbox.isChecked = initialValue;
        checkbox.color = "green";
        checkbox.onIsCheckedChangedObservable.add(function(value) {
            func(value);
        });

        var header = GUI.Control.AddHeader(checkbox, text, "180px", { isHorizontal: true, controlFirst: true});
        header.height = "30px";
        header.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        if (left) {
            header.left = left;
        }

        panel.addControl(header);  
    }    

    addCheckbox("shadows", function(value) {
		// 是否开启阴影
        scene.shadowsEnabled = !scene.shadowsEnabled;
    }, scene.shadowsEnabled );    
           
}

// PCF 阴影
const demo4 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {

	// 创建阴影
	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/4, Math.PI/4, 50, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, true);

    // 创建地面
    var ground01 = BABYLON.MeshBuilder.CreateGround("Spotlight Hard Shadows", 
		{
			width:24, 
		 	height:60, 
		 	subdivisions:1,
		 	updatable:false
		}, scene);
    
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    ground01.material = groundMaterial;
	// 地面接受阴影
    ground01.receiveShadows = true;
	
	// 创建一个box 
    var box00 = BABYLON.MeshBuilder.CreateBox("*box00", {size:5,updatable:false}, scene);
    box00.position = new BABYLON.Vector3(0, 5, 0);
	// 创建材质
    var boxMaterial = new BABYLON.StandardMaterial("mat", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    boxMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
    box00.material = boxMaterial;

    // 创建聚光灯
    var light00 = new BABYLON.SpotLight("*spot00", new BABYLON.Vector3(0, 20, -10), new BABYLON.Vector3(0, -1, 0.3), 1.2, 24, scene);
	
	// 创建阴影投放
    var shadowGenerator00 = new BABYLON.ShadowGenerator(1024, light00);
	// 添加投影列表
    shadowGenerator00.getShadowMap()!.renderList!.push(box00);
	// 启用PCF 
    shadowGenerator00.usePercentageCloserFiltering = true;
}

// PCSS 阴影
const demo5 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/4, Math.PI/4, 50, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, true);

	// 创建地面
	var ground01 = BABYLON.MeshBuilder.CreateGround("Spotlight Hard Shadows", 
		{
			width:24, 
				height:60, 
				subdivisions:1,
				updatable:false
		}, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);

	ground01.material = groundMaterial;
	// 地面接受阴影
    ground01.receiveShadows = true;

	// 创建一个box 
	var box00 = BABYLON.MeshBuilder.CreateBox("*box00", {size:5,updatable:false}, scene);
	box00.position = new BABYLON.Vector3(0, 5, 0);
    box00.scaling = new BABYLON.Vector3(0.1, 1, 0.1);

	// 创建盒子材质
	var boxMaterial = new BABYLON.StandardMaterial("mat", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    boxMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
    box00.material = boxMaterial;

	// 创建聚光灯
	var light00 = new BABYLON.SpotLight("*spot00", new BABYLON.Vector3(0, 20, 20), new BABYLON.Vector3(0, -1, -1), 1.2, 24, scene);
	light00.shadowMinZ = 15;
    light00.shadowMaxZ = 40; 

	
	// 创建阴影
	var shadowGenerator00 = new BABYLON.ShadowGenerator(512, light00);
    shadowGenerator00.getShadowMap()!.renderList!.push(box00);
	// Contact hardening shadow
    shadowGenerator00.useContactHardeningShadow = true;
	// change how fast the shadow softens (between 0 and 1).
    shadowGenerator00.contactHardeningLightSizeUVRatio = 0.0075;
      

}

// PCSS  移动距离
const demo6 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	
	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 1;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

	// 创建灯光
	//var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(1, -1, 1), scene);
	var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-40, 40, -40), new BABYLON.Vector3(1, -1, 1), Math.PI / 5, 30, scene);
	light.position = new BABYLON.Vector3(-40, 40, -40);

	// 创建阴影
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	//shadowGenerator.bias = 0.0001;
	// 阴影的近裁剪面 与远裁剪面
	light.shadowMaxZ = 130;
	light.shadowMinZ = 10;
	shadowGenerator.useContactHardeningShadow = true;
	shadowGenerator.setDarkness(0.5);

	// 创建球，表示灯光的位置
	var lightSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: 2 });
	lightSphere.position = light.position;
	lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	(lightSphere.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 0);

	// 创建地面
	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200, subdivisions: 100});
	
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);	
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.material = groundMaterial;
	
	// 创建立方体柱子
	var b = BABYLON.MeshBuilder.CreateBox("box", {});
	b.scaling.y = 20;
	b.position.y = 10;
	b.position.x = -10;
	b.position.z = -10;

	var b1 = BABYLON.MeshBuilder.CreateBox("box", {});
	b1.scaling.y = 10;
	b1.position.y = 5;
	b1.position.x = -0;
	b1.position.z = -10;

	var b2 = BABYLON.MeshBuilder.CreateBox("box", {});
	b2.scaling.y = 10;
	b2.position.y = 5;
	b2.position.x = -10;
	b2.position.z = -0;

	// 添加阴影渲染队列中
	shadowGenerator.addShadowCaster(b);
	shadowGenerator.addShadowCaster(b1);
	shadowGenerator.addShadowCaster(b2);
	// 地面接受阴影
	ground.receiveShadows = true;

	// Animations
	var alpha = 0;
	var add = true;
	scene.registerBeforeRender(function () {
		if (!add) {
			return;
		}
		// 设置动画
		b.position.y = (Math.cos(alpha) * 0.5 + 0.5) * 20;
		alpha += 0.05;

	});

	document.onkeydown = (event)=>{

		if (event.key === " ") {
			add = !add;
		}
	}
}

// Transparent objects / shadows
const demo7 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	 
	// 创建相机
	 var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
	 // This targets the camera to scene origin
	 camera.setTarget(BABYLON.Vector3.Zero());
	 // This attaches the camera to the canvas
	 camera.attachControl(canvas, true);
 

	 // 创建灯光
	 var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
	 //var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
	 //var light = new BABYLON.SpotLight("light", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(-1, -1, -1), Math.PI/4, 50, scene);
	 light.intensity = 0.7;
	 light.position = new BABYLON.Vector3(5, 5, 5);
 
	 // 创建灯光二
	 var light0 = new BABYLON.HemisphericLight("light0", new BABYLON.Vector3(0, 1, 0), scene);
	 light0.intensity = 0.25;
 
	 // 创建球
	 var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
	 sphere.position.x = -1;
	 sphere.position.y = 1.3;
 
	 // 创建box
	 var cube = BABYLON.MeshBuilder.CreateBox("box", {size: 1.5}, scene);
	 cube.position.x = 2.0;
	 cube.position.y = 1.5;
	 cube.position.z = 0;
 
	 // 创建材质
	 var mat = new BABYLON.StandardMaterial("mat", scene);
 
	 // 设置材质贴图
	 mat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/cloud.png", scene);
	 // 开启alpha 通道 blend
	 mat.diffuseTexture.hasAlpha = true;
	 // 启用 alpha test blend
	 mat.transparencyMode = BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
	 // alpha 来自漫反射贴图
	 mat.useAlphaFromDiffuseTexture = true;
	 // 设置漫反射
	 mat.diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.6);
 
	 sphere.material = mat;
	 
	 // 克隆材质
	 cube.material = mat.clone('');
	 // 双面渲染
	 cube.material.backFaceCulling = false;
	 (cube.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.9);
 
	 // 创建地面
	 var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 8, height: 8}, scene);
	 // 地面接受阴影
	 ground.receiveShadows = true;
 
	 // 创建阴影生成器
	 var sg = new BABYLON.ShadowGenerator(1024, light);
 
	 // 开启 Blur ESM
	 sg.useBlurExponentialShadowMap = true;
	 //sg.usePercentageCloserFiltering = true;
	 // 设置模糊核
	 sg.blurBoxOffset = 4;
	 //sg.usePoissonSampling = true;
 
	 // 添加投影对象
	 sg.addShadowCaster(sphere);
	 sg.addShadowCaster(cube);
 
	 // 不起用透明软阴影
	 sg.enableSoftTransparentShadow = false;
	 // 启用透明阴影
	 sg.transparencyShadow = true;
 
	 let t = 0;
	 scene.onBeforeRenderObservable.add(() => {
		 sphere.rotation.x = Math.cos(t);
		 sphere.rotation.y = 2 * Math.sin(t);
		 sphere.rotation.z = Math.sin(2 * t);
 
		 cube.rotation.z = Math.cos(t);
		 cube.rotation.x = 2 * Math.sin(t);
		 cube.rotation.y = Math.sin(2 * t);
 
		 t += 0.01;
	 });
}

// Transparent objects / shadows
const demo8 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	 
	// 创建相机
	 var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
	 // This targets the camera to scene origin
	 camera.setTarget(BABYLON.Vector3.Zero());
	 // This attaches the camera to the canvas
	 camera.attachControl(canvas, true);
 

	 // 创建灯光
	 var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
	 //var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
	 //var light = new BABYLON.SpotLight("light", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(-1, -1, -1), Math.PI/4, 50, scene);
	 light.intensity = 0.7;
	 light.position = new BABYLON.Vector3(5, 5, 5);
 
	 // 创建灯光二
	 var light0 = new BABYLON.HemisphericLight("light0", new BABYLON.Vector3(0, 1, 0), scene);
	 light0.intensity = 0.25;
 
	 // 创建球
	 var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
	 sphere.position.x = -1;
	 sphere.position.y = 1.3;
 
	 // 创建box
	 var cube = BABYLON.MeshBuilder.CreateBox("box", {size: 1.5}, scene);
	 cube.position.x = 2.0;
	 cube.position.y = 1.5;
	 cube.position.z = 0;
 
	 // 创建材质
	 var mat = new BABYLON.StandardMaterial("mat", scene);
 
	 // 设置材质贴图
	 mat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/cloud.png", scene);
	 // 开启alpha 通道 blend
	 mat.diffuseTexture.hasAlpha = true;
	 // 启用 alpha test blend
	 mat.transparencyMode = BABYLON.Material.MATERIAL_ALPHATESTANDBLEND;
	 // alpha 来自漫反射贴图
	 mat.useAlphaFromDiffuseTexture = true;
	 // 设置漫反射
	 mat.diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.6);
 
	 sphere.material = mat;
	 
	 // 克隆材质
	 cube.material = mat.clone('');
	 // 双面渲染
	 cube.material.backFaceCulling = false;
	 (cube.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(0.9, 0.7, 0.9);
 
	 // 创建地面
	 var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 8, height: 8}, scene);
	 // 地面接受阴影
	 ground.receiveShadows = true;
 
	 // 创建阴影生成器
	 var sg = new BABYLON.ShadowGenerator(1024, light);
 
	 // 开启 Blur ESM
	 sg.useBlurExponentialShadowMap = true;
	 //sg.usePercentageCloserFiltering = true;
	 // 设置模糊核
	 sg.blurBoxOffset = 4;
	 //sg.usePoissonSampling = true;
 
	 // 添加投影对象
	 sg.addShadowCaster(sphere);
	 sg.addShadowCaster(cube);
 
	 // 不起用透明软阴影
	 sg.enableSoftTransparentShadow = true;
	 // 启用透明阴影
	 sg.transparencyShadow = true;
 
	 let t = 0;
	 scene.onBeforeRenderObservable.add(() => {
		 sphere.rotation.x = Math.cos(t);
		 sphere.rotation.y = 2 * Math.sin(t);
		 sphere.rotation.z = Math.sin(2 * t);
 
		 cube.rotation.z = Math.cos(t);
		 cube.rotation.x = 2 * Math.sin(t);
		 cube.rotation.y = Math.sin(2 * t);
 
		 t += 0.01;
	 });
}

// 阴影对比
const demo9 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {

	// 创建相机
	var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(20, 30, -100), scene);
    camera.attachControl(canvas, true);

    // Ground
    var ground01 = BABYLON.MeshBuilder.CreateGround("Spotlight Hard Shadows", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground02 = BABYLON.MeshBuilder.CreateGround("Spotlight Poisson Sampling", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground03 = BABYLON.MeshBuilder.CreateGround("Spotlight ESM", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground04 = BABYLON.MeshBuilder.CreateGround("Spotlight Blur ESM", {width:24, height:60, subdivisions:1, updatable:false}, scene,);

    var ground11 = BABYLON.MeshBuilder.CreateGround("Directional Hard Shadows", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground12 = BABYLON.MeshBuilder.CreateGround("Directional Poisson Sampling", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground13 = BABYLON.MeshBuilder.CreateGround("Directional ESM", {width:24, height:60, subdivisions:1, updatable:false}, scene,);
    var ground14 = BABYLON.MeshBuilder.CreateGround("Directional Blur ESM", {width:24, height:60, subdivisions:1, updatable:false}, scene,);

	// 创建材质
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    ground01.material = groundMaterial;
    ground01.receiveShadows = true;
    ground01.position.x = -30;
    ground02.material = groundMaterial;
    ground02.receiveShadows = true;
    ground02.position.x = 0;
    ground03.material = groundMaterial;
    ground03.receiveShadows = true;
    ground03.position.x = 30;
    ground04.material = groundMaterial;
    ground04.receiveShadows = true;
    ground04.position.x = 60;

    ground11.material = groundMaterial;
    ground11.receiveShadows = true;
    ground11.position.z = 100;
    ground11.position.x = -30;
    ground12.material = groundMaterial;
    ground12.receiveShadows = true;
    ground12.position.z = 100;
    ground13.material = groundMaterial;
    ground13.receiveShadows = true;
    ground13.position.z = 100;
    ground13.position.x = 30;
    ground14.material = groundMaterial;
    ground14.receiveShadows = true;
    ground14.position.z = 100;
    ground14.position.x = 60;


	// --------- SPOTS -------------
	// 创建聚光灯
	var light00 = new BABYLON.SpotLight("*spot00", new BABYLON.Vector3(-30, 20, -10), new BABYLON.Vector3(0, -1, 0.3), 1.2, 24, scene);
	var light01 = new BABYLON.SpotLight("*spot01", new BABYLON.Vector3(0, 20, -10), new BABYLON.Vector3(0, -1, 0.3), 1.2, 24, scene);
	var light02 = new BABYLON.SpotLight("*spot02", new BABYLON.Vector3(30, 20, -10), new BABYLON.Vector3(0, -1, 0.3), 1.2, 24, scene);
	var light03 = new BABYLON.SpotLight("*spot03", new BABYLON.Vector3(60, 20, -10), new BABYLON.Vector3(0, -1, 0.3), 1.2, 24, scene);

	// Boxes
    var box00 = BABYLON.MeshBuilder.CreateBox("*box00", {size:5, updatable:false}, scene);
    box00.position = new BABYLON.Vector3(-30, 5, 0);
    var box01 = BABYLON.MeshBuilder.CreateBox("*box01", {size:5, updatable:false}, scene);
	box01.position = new BABYLON.Vector3(0, 5, 0);
	var box02 = BABYLON.MeshBuilder.CreateBox("*box02", {size:5, updatable:false}, scene);
	box02.position = new BABYLON.Vector3(30, 5, 0);
	var box03 = BABYLON.MeshBuilder.CreateBox("*box03", {size:5, updatable:false}, scene);
	box03.position = new BABYLON.Vector3(60, 5, 0);

	// 创建材质
    var boxMaterial = new BABYLON.StandardMaterial("mat", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    boxMaterial.specularColor = new BABYLON.Color3(0.5, 0, 0);
    box00.material = boxMaterial;
    box01.material = boxMaterial;
    box02.material = boxMaterial;
    box03.material = boxMaterial;

	//  设置灯光阴影的 mesh 
    light00.includedOnlyMeshes.push(box00);
    light00.includedOnlyMeshes.push(ground01);

    light01.includedOnlyMeshes.push(box01);
    light01.includedOnlyMeshes.push(ground02);

    light02.includedOnlyMeshes.push(box02);
    light02.includedOnlyMeshes.push(ground03);

    light03.includedOnlyMeshes.push(box03);
    light03.includedOnlyMeshes.push(ground04);

    // 创建阴影生成器
    var shadowGenerator00 = new BABYLON.ShadowGenerator(512, light00);
    shadowGenerator00.getShadowMap()!.renderList!.push(box00);

    var shadowGenerator01 = new BABYLON.ShadowGenerator(512, light01);
	shadowGenerator01.getShadowMap()!.renderList!.push(box01);
    shadowGenerator01.usePoissonSampling = true;

    var shadowGenerator02 = new BABYLON.ShadowGenerator(512, light02);
	shadowGenerator02.getShadowMap()!.renderList!.push(box02);
    shadowGenerator02.useExponentialShadowMap = true;

    var shadowGenerator03 = new BABYLON.ShadowGenerator(512, light03);
	shadowGenerator03.getShadowMap()!.renderList!.push(box03);
    shadowGenerator03.useBlurExponentialShadowMap = true;
    shadowGenerator03.blurBoxOffset = 2.0;

	// --------- DIRECTIONALS -------------
	// 创建灯光
    var light04 = new BABYLON.DirectionalLight("*dir00", new BABYLON.Vector3(0, -0.6, 0.3), scene);
    var light05 = new BABYLON.DirectionalLight("*dir01", new BABYLON.Vector3(0, -0.6, 0.3), scene);
    var light06 = new BABYLON.DirectionalLight("*dir02", new BABYLON.Vector3(0, -0.6, 0.3), scene);
    var light07 = new BABYLON.DirectionalLight("*dir03", new BABYLON.Vector3(0, -0.6, 0.3), scene);
    light04.position = new BABYLON.Vector3(-30, 50, 60);
    light05.position = new BABYLON.Vector3(0, 50, 60);
    light06.position = new BABYLON.Vector3(30, 50, 60);
    light07.position = new BABYLON.Vector3(60, 50, 60);

	// Boxes
    var box04 = BABYLON.MeshBuilder.CreateBox("*box04", {size:5, updatable:false}, scene);
    box04.position = new BABYLON.Vector3(-30, 5, 100);
    var box05 = BABYLON.MeshBuilder.CreateBox("*box05", {size:5, updatable:false}, scene);
    box05.position = new BABYLON.Vector3(0, 5, 100);
    var box06 = BABYLON.MeshBuilder.CreateBox("*box06", {size:5, updatable:false}, scene);
    box06.position = new BABYLON.Vector3(30, 5, 100);
    var box07 = BABYLON.MeshBuilder.CreateBox("*box07", {size:5, updatable:false}, scene);
    box07.position = new BABYLON.Vector3(60, 5, 100);

    box04.material = boxMaterial;
    box05.material = boxMaterial;
    box06.material = boxMaterial;
    box07.material = boxMaterial;

	// Inclusions
    light04.includedOnlyMeshes.push(box04);
    light04.includedOnlyMeshes.push(ground11);

    light05.includedOnlyMeshes.push(box05);
    light05.includedOnlyMeshes.push(ground12);

    light06.includedOnlyMeshes.push(box06);
    light06.includedOnlyMeshes.push(ground13);

    light07.includedOnlyMeshes.push(box07);
    light07.includedOnlyMeshes.push(ground14);

	// Shadows
    var shadowGenerator04 = new BABYLON.ShadowGenerator(512, light04);
    shadowGenerator04.getShadowMap()!.renderList!.push(box04);

    var shadowGenerator05 = new BABYLON.ShadowGenerator(512, light05);
    shadowGenerator05.getShadowMap()!.renderList!.push(box05);
    shadowGenerator05.usePoissonSampling = true;

    var shadowGenerator06 = new BABYLON.ShadowGenerator(512, light06);
    shadowGenerator06.getShadowMap()!.renderList!.push(box06);
    shadowGenerator06.useExponentialShadowMap = true;

    var shadowGenerator07 = new BABYLON.ShadowGenerator(512, light07);
    shadowGenerator07.getShadowMap()!.renderList!.push(box07);
    shadowGenerator07.useBlurExponentialShadowMap = true;
       
    // Animations
    scene.registerBeforeRender(function () {
    	box00.rotation.x += 0.01;
    	box00.rotation.z += 0.02;

    	box01.rotation.x += 0.01;
    	box01.rotation.z += 0.02;

    	box02.rotation.x += 0.01;
    	box02.rotation.z += 0.02;

    	box03.rotation.x += 0.01;
    	box03.rotation.z += 0.02;

    	box04.rotation.x += 0.01;
    	box04.rotation.z += 0.02;

    	box05.rotation.x += 0.01;
    	box05.rotation.z += 0.02;

    	box06.rotation.x += 0.01;
    	box06.rotation.z += 0.02;

    	box07.rotation.x += 0.01;
    	box07.rotation.z += 0.02;
    });

    // Adding labels
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");


    var addLabel = function(lights:BABYLON.Mesh[]) {
        for (var i = 0; i < lights.length; i++) {
            var light = lights[i];

            var rect1 = new GUI.Rectangle();
            rect1.width = "120px";
            rect1.height = "40px";
            rect1.color = "white";
            rect1.fontSize = 12;
            rect1.thickness = 2;
            rect1.background = "Black";
            rect1.linkOffsetY = -50;
            advancedTexture.addControl(rect1);
            rect1.linkWithMesh(light);   

            var label = new GUI.TextBlock();
            label.text = light.name;
            label.textWrapping = true;
            rect1.addControl(label);
        }
    }

    addLabel([ground01, ground02, ground03, ground04, ground11, ground12, ground13, ground14]);
    
}

// 点光源阴影
const demo10 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	
	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 30, BABYLON.Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 40;
    camera.minZ = 0;
    camera.attachControl(canvas);

	// 创建点光源
    var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 0, 0), scene);
    light.intensity = 0.7;

	// 表示点光源的额位置
    var lightImpostor = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:1}, scene);
    // 创建材质
	var lightImpostorMat = new BABYLON.StandardMaterial("mat", scene);
    lightImpostor.material = lightImpostorMat;
    lightImpostorMat.emissiveColor = BABYLON.Color3.Yellow();
	// 自发光是否与漫反射光同步 同步是双向的
    lightImpostorMat.linkEmissiveWithDiffuse = true;

    lightImpostor.parent = light;

    // var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.2, 128, 64, 4, 1, scene);
	var knot = BABYLON.MeshBuilder.CreateTorusKnot("knot", {
		radius:2, 
		tube:0.2, 
		radialSegments:128, 
		tubularSegments:64, 
		p:4, 
		q:1
	}, scene);

    // var torus = BABYLON.Mesh.CreateTorus("torus", 8, 1, 32, scene, false);
	var torus = BABYLON.MeshBuilder.CreateTorus("torus", 
		{
			diameter:8, 
			thickness:1, 
			tessellation:32, 
			updatable:false
		}, scene);

    var torusMat = new BABYLON.StandardMaterial("mat", scene);
    torus.material = torusMat;
    torusMat.diffuseColor = BABYLON.Color3.Red();

    var knotMat = new BABYLON.StandardMaterial("mat", scene);
    knot.material = knotMat;
    knotMat.diffuseColor = BABYLON.Color3.White();

    // 创建球
    var container = BABYLON.MeshBuilder.CreateSphere("sphere2", {
		segments:16, 
		diameter:50,
		updatable:false,
		sideOrientation:BABYLON.Mesh.BACKSIDE
	}, scene);
    var containerMat = new BABYLON.StandardMaterial("mat", scene);
    container.material = containerMat;

    const tex = containerMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com//textures/amiga.jpg", scene);
	tex.uScale = 10.0;
	tex.vScale = 10.0;

    // 创建阴影
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.getShadowMap()!.renderList!.push(knot, torus);
    // 明亮度
	shadowGenerator.setDarkness(0.5);
	// 采用泊松采样
    shadowGenerator.usePoissonSampling = true;
    shadowGenerator.bias = 0;

    container.receiveShadows = true;
    torus.receiveShadows = true;

    scene.registerBeforeRender(function () {
        knot.rotation.y += 0.01;
        knot.rotation.x += 0.01;

        torus.rotation.y += 0.05;
        torus.rotation.z += 0.03;
    });
}

// 直射灯阴影 动画
const demo11 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	
	// 创建相机
	scene.ambientColor = BABYLON.Color3.FromHexString("#333333");
    var camera = new BABYLON.ArcRotateCamera("camera", 1, 1, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

	// 创建直射光灯光
    var light = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(1,-1,0), scene);
    light.intensity = 1;
    light.position = new BABYLON.Vector3(-2,2,0);
    //light.setDirectionToTarget(new BABYLON.Vector3.Zero);
	// 创建小球来可视化灯光
    var lightSphere = BABYLON.MeshBuilder.CreateSphere("lightSphere", {segments: 16, diameter: 0.5}, scene);
    lightSphere.position = light.position;
    var lightSphereMtl = new BABYLON.StandardMaterial("lightSphereMtl", scene);
    lightSphereMtl.emissiveColor = BABYLON.Color3.Yellow();
    lightSphereMtl.disableLighting = true;
    lightSphere.material = lightSphereMtl;


	// 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 32, diameter: 1}, scene);
    var sphereMtl = new BABYLON.StandardMaterial("sphereMtl", scene);
    sphereMtl.diffuseColor = BABYLON.Color3.White();
    sphereMtl.ambientColor = BABYLON.Color3.White();
    sphere.material = sphereMtl;
    sphere.position.y = 1;

	// 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6, subdivisions: 2}, scene);
    ground.material = sphereMtl;
    ground.receiveShadows = true;

	// 创建阴影
    var shadowGenerator = new BABYLON.ShadowGenerator(128, light);
	// 启用blur esm 
    shadowGenerator.useBlurExponentialShadowMap = true;
	// 添加投影对象
    shadowGenerator.addShadowCaster(sphere);
    //shadowGenerator.bias /= 2;

    var time = 0;
    var reverse = false;
	// 动画
    scene.registerBeforeRender(function() {
        time += 0.1;
        if(light.position.x > 2){
            reverse = true;            
        };
        if(light.position.x < -2){
            reverse = false;            
        };
        if(reverse){
          light.position.x -= 0.01;
        }else{
          light.position.x += 0.01;
        }
    });

}

// 自带阴影
const demo12 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {
	
	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 1;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(-20, 11, -20));


    // 设置灯光
	var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-40, 40, -40), new BABYLON.Vector3(1, -1, 1), Math.PI / 5, 30, scene);
	light.position = new BABYLON.Vector3(-40, 40, -40);

	// 创建阴影
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	// 设置 偏移
	shadowGenerator.bias = 0.001;
	// 设置法线偏移
	shadowGenerator.normalBias = 0.02;
	// 设置阴影的近裁剪面 与远裁剪面
	light.shadowMaxZ = 100;
	light.shadowMinZ = 10;
	// 使用PCSS
	shadowGenerator.useContactHardeningShadow = true;
	// 设置
	shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
	// 设置阴影明亮度
	shadowGenerator.setDarkness(0.5);

	// 创建地面
	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200, subdivisions:100, updatable:false}, scene);
	
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);	
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.material = groundMaterial;
	
	// 创建渲染对象
	var b = BABYLON.MeshBuilder.CreateBox("box", {updatable:false}, scene);
	b.scaling.y = 20;
	b.position.y = 10;
	b.position.x = -10;
	b.position.z = -10;
	b.setEnabled(false);
	
	var b1 = BABYLON.MeshBuilder.CreateBox("box1",  {updatable:false}, scene);
	b1.scaling.y = 10;
	b1.position.y = 5;
	b1.position.x = -0;
	b1.position.z = -10;

	var b2 = BABYLON.MeshBuilder.CreateBox("box2",  {updatable:false}, scene);
	b2.scaling.y = 10;
	b2.position.y = 5;
	b2.position.x = -10;
	b2.position.z = -0;

	var s = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 3}, scene);
	s.position.y = 5;
	s.position.x = -7;
	s.position.z = -1;

	var tk = BABYLON.MeshBuilder.CreateTorusKnot("knot", {radius: 2.7, tube: 0.5, radialSegments: 128, tubularSegments: 64, p: 2, q: 3}, scene);
    tk.position.y = 5;
	tk.position.x = -1.5;
	tk.position.z = -5;

	// 添加到阴影渲染队列中
	shadowGenerator.addShadowCaster(b);
	shadowGenerator.addShadowCaster(b1);
	shadowGenerator.addShadowCaster(b2);
	shadowGenerator.addShadowCaster(s);
	shadowGenerator.addShadowCaster(tk);

	// 设置自己接受阴影
	b.receiveShadows = true;
	b1.receiveShadows = true;
	b2.receiveShadows = true;
	s.receiveShadows = true;
	tk.receiveShadows = true;
	ground.receiveShadows = true;

	// Animations
	var alpha = 0;
	var add = true;
	scene.registerBeforeRender(function () {
		if (!add) {
			return;
		}

		tk.rotation.y = alpha;
		
		tk.rotation.x = (alpha * 0.5);
		alpha += 0.005;

	});

	document.onkeydown = (event)=>{

		if (event.key === " ") {
			add = !add;
		}
	}
}

// 自定义阴影shader
const demo13 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {


		var shadowVS =
		`

	#include<__decl__sceneVertex>
	#include<__decl__meshVertex>

		// Attribute
	attribute vec3 position;

	uniform vec3 biasAndScaleSM;
	uniform vec2 depthValuesSM;
	uniform mat4 customWorld;

	varying float vDepthMetric;

	void main(void)
	{
		vec4 worldPos = world * customWorld * vec4(position, 1.0);

		gl_Position = viewProjection * worldPos;

		vDepthMetric = ((gl_Position.z + depthValuesSM.x) / (depthValuesSM.y)) + biasAndScaleSM.x;
	}
	`;

	var shadowFS =
		`
	#ifndef SM_FLOAT
	vec4 pack(float depth)
	{
		const vec4 bit_shift = vec4(255.0 * 255.0 * 255.0, 255.0 * 255.0, 255.0, 1.0);
		const vec4 bit_mask = vec4(0.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);

		vec4 res = fract(depth * bit_shift);
		res -= res.xxyz * bit_mask;

		return res;
	}
	#endif

	varying float vDepthMetric;

	uniform vec3 biasAndScaleSM;
	uniform vec2 depthValuesSM;

	void main(void)
	{
		float depth = vDepthMetric;

	#ifdef SM_ESM
		depth = clamp(exp(-min(87., biasAndScaleSM.z * depth)), 0., 1.);
	#endif

	#ifdef SM_FLOAT
		gl_FragColor = vec4(depth, 1.0, 1.0, 1.0);
	#else
		gl_FragColor = pack(depth);
	#endif
	}    
	`;

	BABYLON.Effect.ShadersStore["customShadowMapVertexShader"] = shadowVS;
	BABYLON.Effect.ShadersStore["customShadowMapFragmentShader"] = shadowFS;


	// 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, true);

	// 创建box
    var size = 5;
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { width: size, height: size, depth: size }, scene);

    // 创建灯光
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(20, 40, 20);

	// 创建阴影生成器
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	// 设置自定义阴影shader
    shadowGenerator.customShaderOptions = {
        shaderName: "customShadowMap",
        uniforms: ["customWorld"]
    }
	// 设置阴影投射物
    shadowGenerator.addShadowCaster(cube);
	// 启用ESM
    shadowGenerator.useExponentialShadowMap = true;

    var angle = 0;
	// 旋转动画
    shadowGenerator.onBeforeShadowMapRenderObservable.add(effect => {
        effect.setMatrix("customWorld", BABYLON.Matrix.RotationY(angle));
        angle += 0.01;
    });


	// Ground
	var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", 
		"https://playground.babylonjs.com/textures/heightMap.png", 
		{ 
			width:100, 
			height:100, 
			subdivisions:100, 
			minHeight:0, 
			maxHeight:10,
			updatable:false
		}, scene);

	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	const diffuseTexture = groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	diffuseTexture.uScale = 6;
	diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -10;
	ground.material = groundMaterial;
    ground.receiveShadows = true;
}

// 自定义阴影shader
let time = 0;
const demo14 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=> {

	const usePointLight = true,
      useDirectionalLight = true,
      showFloatingCube = true,
      showFloatingSphere = true,
      showFloatingSphereNodeMat = true,
      showSphereCube = true,
      usePBR = false,
      incrementTime = true;



	// 创建相机
	  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 7, -14), scene);
	  camera.setTarget(new BABYLON.Vector3(0, 4, 0));
	  camera.minZ = 0.1;
	  camera.maxZ = 40;
	  camera.attachControl(canvas, true);
  

	  // 创建半球光
	  var lightHemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
	  lightHemi.intensity = 0.6;
  
	  var lightDirectional:BABYLON.DirectionalLight|null = null
	 //  创建直射光
	  if (useDirectionalLight) {
		  lightDirectional = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(-10, -10, 3), scene);
  
		  lightDirectional.intensity = usePointLight ? 0.5 : 1.0;
		  lightDirectional.shadowMinZ = 0;
		  lightDirectional.shadowMaxZ = 30;
	  }
  
	  // 创建点光源
	  let lightPoint:BABYLON.PointLight|null = null;
	  if (usePointLight) {
		  lightPoint = new BABYLON.PointLight("point", new BABYLON.Vector3(-1, 1, 0), scene);
		  lightPoint.intensity = useDirectionalLight ? 0.3 : 0.8;
		  var lightPointGizmo = new BABYLON.LightGizmo();
		  lightPointGizmo.light = lightPoint;
	  }
  
	  // 创建盒子
	  var room = BABYLON.MeshBuilder.CreateBox("room", { size: 10, sideOrientation: 1 }, scene);
	  room.position.y = 5;
	  // 接受阴影
	  room.receiveShadows = true;

  
	  // 创建盒子的材质
	  var roomMat = new BABYLON.StandardMaterial("roommat", scene);
	  roomMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
	  roomMat.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grassn.png", scene);
	  room.material = roomMat;
  
	  var sphere:BABYLON.Mesh|null = null, cube:BABYLON.Mesh|null = null;
	  // 创建变形的球
	  if (showSphereCube) {
		  sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
  
		  sphere.material = makeCustomMaterial(scene, "sphere_cube", usePBR);
  
		  sphere.position.x = 2;
		  sphere.position.y = 2.0;
		  sphere.position.z = 1;
  
		  cube = BABYLON.MeshBuilder.CreateBox("cube", {size: 2}, scene);
  
		  cube.position.x = 1;
		  cube.position.y = 1;
		  cube.position.z = -1.5;
  
		  cube.material = sphere.material;
	  }

	
	  let boxFloating:BABYLON.Mesh|null = null;
	  if (showFloatingCube) {
		  boxFloating = BABYLON.MeshBuilder.CreateBox("box_floating", { size: 2 }, scene);
  
		  boxFloating.position.y = 5;
		  boxFloating.position.x = -3;
		  boxFloating.position.z = 3;
		  boxFloating.material = makeShaderMaterialForFloatingBox(scene);
	  }
	 
	  let sphereFloating:BABYLON.Mesh|null = null;
	  if (showFloatingSphere) {
		  sphereFloating = BABYLON.MeshBuilder.CreateSphere("sphere_floating",
			 { diameter: 1, segments: 16 }, scene);
  
		  sphereFloating.position.y = 7;
		  sphereFloating.position.x = 3;
		  sphereFloating.position.z = 3;
		  sphereFloating.material = makeCustomMaterial(scene, "sphere_floating");
		  sphereFloating.material.shadowDepthWrapper = makeStandaloneWrapperForCustomMaterial(scene, sphereFloating.material);
	  }
	  
	  let sphereFloatingNodeMat:BABYLON.Mesh|null = null;
	  if (showFloatingSphereNodeMat) {
		  sphereFloatingNodeMat = BABYLON.MeshBuilder.CreateSphere("sphere_floating_nodemat", { diameter: 2, segments: 32 }, scene);
  
		  sphereFloatingNodeMat.position.y = 3;
		  sphereFloatingNodeMat.position.x = -2;
		  sphereFloatingNodeMat.position.z = -2;
  
		  BABYLON.NodeMaterial.ParseFromSnippetAsync("JN2BSF#29", scene).then((nodeMaterial) => {
			// @ts-ignore  
			var worldPosVarName = nodeMaterial.getBlockByName("worldPos").output.associatedVariableName;
			
			 if(sphereFloatingNodeMat){
				sphereFloatingNodeMat.material = nodeMaterial;
				sphereFloatingNodeMat.material.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(nodeMaterial, scene, {
					remappedVariables: ["worldPos", worldPosVarName, "alpha", "1."]
				});
			 }
			 
		  });
	  }
  
	  // shadow generators
	  if (useDirectionalLight && lightDirectional) {
		  var shadowGenerator = new BABYLON.CascadedShadowGenerator(1024, lightDirectional);
  
		  shadowGenerator.lambda = 0;
		  shadowGenerator.transparencyShadow = true;
		  shadowGenerator.enableSoftTransparentShadow = true;
		  //shadowGenerator.filter = 0;
  
		  if (showSphereCube && sphere && cube) {
			  shadowGenerator.addShadowCaster(sphere);
			  shadowGenerator.addShadowCaster(cube);
		  }
		  if (showFloatingCube && boxFloating) {
			  shadowGenerator.addShadowCaster(boxFloating);
		  }
		  if (showFloatingSphere && sphereFloating) {
			  shadowGenerator.addShadowCaster(sphereFloating);
		  }
		  if (showFloatingSphereNodeMat && sphereFloatingNodeMat) {
			  shadowGenerator.addShadowCaster(sphereFloatingNodeMat);
		  }
	  }
  
	  if (usePointLight && lightPoint) {
		  var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, lightPoint);
  
		  shadowGenerator2.usePoissonSampling = true;
		  shadowGenerator2.transparencyShadow = true;
		  shadowGenerator2.enableSoftTransparentShadow = true;
  
		  if (showSphereCube && sphere && cube) {
			  shadowGenerator2.addShadowCaster(sphere);
			  shadowGenerator2.addShadowCaster(cube);
		  }
		  if (showFloatingCube && boxFloating) {
			  shadowGenerator2.addShadowCaster(boxFloating);
		  }
		  if (showFloatingSphere && sphereFloating) {
			  shadowGenerator2.addShadowCaster(sphereFloating);
		  }
		  if (showFloatingSphereNodeMat && sphereFloatingNodeMat) {
			  shadowGenerator2.addShadowCaster(sphereFloatingNodeMat);
		  }
	  }
  
	  // move the point light
	  scene.onBeforeRenderObservable.add(() => {
		  if (usePointLight && lightPoint) {
			  lightPoint.position.x = 0 + 5.0 * Math.cos(time);
			  lightPoint.position.z = 0 + 6.0 * Math.sin(time);
			  lightPoint.position.y = 3 + 2.0 * Math.cos(time);
		  }
  
		  if (incrementTime) {
			  time += 1 / 60 / 2;
		  }
	  });
  
	  return scene;
}
// 溶解效果， 盒子的效果
function makeCustomMaterial(scene:BABYLON.Scene, suffix:string, usePBR:boolean = false): CustomMaterial {
    
	const mat = usePBR ? new PBRCustomMaterial("matpbrcustom_" + suffix, scene) : new CustomMaterial("matcustom_" + suffix, scene);

    if (usePBR) {
		// 设置金属度
        (mat as PBRCustomMaterial).metallic = 0;
    }
	// 噪声
    mat.AddUniform('noise','sampler2D', null);
	// 溶解
    mat.AddUniform('dissolve','float', 0);

    if (usePBR) {
		(mat as PBRCustomMaterial).albedoTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/sand.jpg", scene);
    } else {
         (mat as CustomMaterial).diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/sand.jpg", scene);
    }
     
    mat.Vertex_Definitions(`varying vec2 vUv;`);
    mat.Vertex_MainEnd(`vUv = uv;`);
    mat.Fragment_Definitions(`varying vec2 vUv;`);
    mat.Fragment_MainBegin(`
        float n = texture2D( noise, vUv ).x - dissolve;
        if (n < 0.0) { discard; }
        #define SHADOWDEPTH_SOFTTRANSPARENTSHADOW
        #define SHADOWDEPTH_FRAGMENT
    `);

    const colorName = usePBR ? "finalColor" : "color" ;

    mat.Fragment_Before_FragColor(`
        if (n < 0.10) { ${colorName}.rgb = vec3(1.0,0.0,0.0); }
        if (n < 0.07) { ${colorName}.rgb = vec3(0.8,0.0,0.0); }
        if (n < 0.05) { ${colorName}.rgb = vec3(0.6,0.0,0.0); }
    `);
    
    mat.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(mat, scene, 
		// 阴影着色器中重映射变量（如将 alpha 强制设为 1.
		{ remappedVariables: ["alpha", "1."] });

    let dis = 0.0;
    let amount = -0.008;

	// 创建噪声纹理
    const tex = new BABYLON.NoiseProceduralTexture("perlin", 1024, scene);

    tex.refreshRate = 0;
    tex.animationSpeedFactor = 1;
    tex.persistence = .7;
    tex.brightness = .5;
    tex.octaves = 14;

    scene.onBeforeRenderObservable.add(() => {
        dis += amount;
        if(dis <= -0.2 || dis >= 1.2){
            amount = -amount;
        }
    });

	// 绑定
    mat.onBindObservable.add((m) => { 
        mat.getEffect().setFloat('dissolve', dis);
        mat.getEffect().setTexture('noise', tex);
    });

    return mat as CustomMaterial;

}

// 箱子动画
function makeShaderMaterialForFloatingBox(scene:BABYLON.Scene): BABYLON.ShaderMaterial {
   


	// 自定义Shader
	BABYLON.Effect.ShadersStore["floatingBoxVertexShader"] = `
		precision highp float;

    	attribute vec3 position;
        attribute vec3 normal;
    	attribute vec2 uv;

    	#include<__decl__sceneVertex>
    	#include<__decl__meshVertex>

        uniform float time;

        varying vec2 vUV;

    	void main(void) {
   	        vUV = uv;

            vec4 p = vec4(position, 1.0);

            float m = (p.x + p.z + p.y) / 3.;

            m = m * p.y;

            p.x = p.x + m * sin(2.0 * time);
            p.y = p.y + m * sin(-3.0 * time);
            p.z = p.z + m * cos(5.0 * time);

            p = world * p;

            vec3 normalW = normalize(mat3(world) * normal);

            #define SHADOWDEPTH_NORMALBIAS

    	    gl_Position = projection * view * p;
    	}`;

	// 片段着色器
    BABYLON.Effect.ShadersStore["floatingBoxFragmentShader"] = `
	    precision highp float;

        varying vec2 vUV;
        uniform sampler2D textureSampler;

    	void main(void) {
            gl_FragColor = texture2D(textureSampler, vUV);
    	}`;

	// 创建 Shader 材质
    const shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "floatingBox",
        fragment: "floatingBox",
	    },
        {
			attributes: ["position", "normal", "uv"],
			uniforms: ["world", "view", "projection", "time"],
            samplers: ["textureSampler"],
            uniformBuffers: ["Mesh", "Scene"]
        });

	// 设置纹理 木箱子
    shaderMaterial.setTexture("textureSampler", new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene));

    shaderMaterial.shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(shaderMaterial, scene, 
		{
        	remappedVariables: ["worldPos", "p", "vNormalW", "normalW", "alpha", "1."]
    	});

    shaderMaterial.onBindObservable.add((m) => { 
        shaderMaterial.getEffect().setFloat("time", time);
    });

    return shaderMaterial;
}

// 创建溶解效果
function makeStandaloneWrapperForCustomMaterial (scene:BABYLON.Scene, mainMaterial:CustomMaterial): BABYLON.ShadowDepthWrapper {
    
	// 自定义Shader
	BABYLON.Effect.ShadersStore["shaderdepthVertexShader"] = BABYLON.Effect.ShadersStore["shadowMapVertexShader"]
        .replace(/#include<shadowMapVertexExtraDeclaration>/g, "")
        .replace(/#include<shadowMapVertexNormalBias>/g, "#define SHADOWDEPTH_NORMALBIAS")
        .replace(/#include<shadowMapVertexMetric>/g, "")
        .replace(/#include<shadowMapFragmentExtraDeclaration>/g, "")
        .replace(/#include<shadowMapFragment>/g, "")
        .replace(/void main\(void\)\s*?\{/g, "attribute vec2 uv; varying vec2 vUv; void main(void) { vUv=uv;\r\n");

	// 片段着色器
    BABYLON.Effect.ShadersStore["shaderdepthFragmentShader"] = `
	    precision highp float;

        uniform float dissolve;
        uniform sampler2D noise;

        varying vec2 vUv;

    	void main(void) {
            float alpha = 1.;
            float n = texture2D( noise, vUv ).x - dissolve;
            if (n < 0.0) { discard; }
    	}
    `;

	// 创建 Shader 材质
    const shaderMaterial = new BABYLON.ShaderMaterial("shaderdepth", scene, {
        vertex: "shaderdepth",
        fragment: "shaderdepth",
	    },
        {
			attributes: ["position", "normal", "uv"],
			uniforms: ["world", "viewProjection", "dissolve"],
            samplers: ["noise"],
            uniformBuffers: ["Mesh", "Scene"],
            defines: ["#define NORMAL"]
        });

    const shadowDepthWrapper = new BABYLON.ShadowDepthWrapper(shaderMaterial, scene, {
        standalone: true
    });

    shaderMaterial.onBindObservable.add((m) => { 
		// @ts-ignore
        shaderMaterial.getEffect().setFloat('dissolve', mainMaterial.dissolve);
		// @ts-ignore
        shaderMaterial.getEffect().setTexture('noise', mainMaterial.noise);
    });

    return shadowDepthWrapper;
}