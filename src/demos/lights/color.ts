import { BABYLON } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 场景基本的构建方法
// 灯光的颜色属性
export const lightColorPropertiesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


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
    demo10(scene, canvas);

    return scene;
};

// 创建一个点光源， 设置灯光的漫反射颜色， 高光的颜色
const  demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    //  创建一个点光源

    /**
     * Creates a PointLight object from the passed name and position (Vector3) and adds it in the scene.
     * A PointLight emits the light in every direction.
     * It can cast shadows.
     * If the scene camera is already defined and you want to set your PointLight at the camera position, just set it :
     * ```javascript
     * var pointLight = new PointLight("pl", camera.position, scene);
     * ```
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The light friendly name
     * @param position The position of the point light in the scene
     * @param scene The scene the lights belongs to
     */

	var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 漫反射颜色
	light.diffuse = new BABYLON.Color3(1, 0, 0);
    // 高光颜色
	light.specular = new BABYLON.Color3(0, 1, 0);

    // 创建一个白色的球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
	sphere.position.z = 1;	
}

// 创建一个直射灯
const  demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
    //  创建一个直射灯
    /**
     * Creates a DirectionalLight object in the scene, oriented towards the passed direction (Vector3).
     * The directional light is emitted from everywhere in the given direction.
     * It can cast shadows.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param direction The direction of the light
     * @param scene The scene the light belongs to
     */
	var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    // 漫反射颜色
	light.diffuse = new BABYLON.Color3(1, 0, 0);
    // 高光颜色
	light.specular = new BABYLON.Color3(0, 1, 0);

    // 创建一个白色的球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);
	sphere.position.z = 1;	
    // showAxis(1, scene)
}

// 创建聚光灯
const  demo3 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	// 创建聚光灯
    /**
     * Creates a SpotLight object in the scene. A spot light is a simply light oriented cone.
     * It can cast shadows.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The light friendly name
     * @param position The position of the spot light in the scene
     * @param direction The direction of the light in the scene
     * @param angle The cone angle of the light in Radians
     * @param exponent The light decay speed with the distance from the emission spot
     * @param scene The scene the lights belongs to
     */
	var light = new BABYLON.SpotLight("spotLight", 
        new BABYLON.Vector3(-1, 1, -1), 
        new BABYLON.Vector3(0, -1, 0), 
        Math.PI / 2, 
        10, 
        scene);

	light.diffuse = new BABYLON.Color3(1, 0, 0);
	light.specular = new BABYLON.Color3(0, 1, 0);
	
	// 创建聚光灯
	var light1 = new BABYLON.SpotLight("spotLight1", 
        new BABYLON.Vector3(1, 1, 1), 
        new BABYLON.Vector3(0, -1, 0), 
        Math.PI / 2, 
        50, 
        scene);
	light1.diffuse = new BABYLON.Color3(0, 1, 0);
	light1.specular = new BABYLON.Color3(0, 1, 0);

    // 创建地面接收灯光
	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);			

}

// 创建半球光
const  demo4 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	// 创建半球光
      /**
     * Creates a HemisphericLight object in the scene according to the passed direction (Vector3).
     * The HemisphericLight simulates the ambient environment light, so the passed direction is the light reflection direction, not the incoming direction.
     * The HemisphericLight can't cast shadows.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param direction The direction of the light reflection
     * @param scene The scene the light belongs to
     */
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, -1, 0), scene);
	// 天空颜色
    light.diffuse = new BABYLON.Color3(1, 0, 0);
	light.specular = new BABYLON.Color3(0, 1, 0);
    // 地面颜色
	light.groundColor = new BABYLON.Color3(0, 1, 0);
	
    // 创建一个球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);			
    
    showAxis(1, scene)

}

// 创建 区域光
const  demo5 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    
    scene.clearColor =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", 4.1398, 0.9330, 27, new BABYLON.Vector3(-3, 1, 0), scene);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建区域光
    createLight(
       new BABYLON.Vector3(2, 3, -1), 
       new BABYLON.Vector3(5.976007358828584, 1.5969762655748114), 
       BABYLON.Color3.White(), 
       "light1",
       scene);

    createLight(new BABYLON.Vector3(-3, 3, 10), new BABYLON.Vector3(5.681046715241543, 0, 0), BABYLON.Color3.Red(), "light2",scene);
    createLight(new BABYLON.Vector3(-10, 3, -1), new BABYLON.Vector3(5.681046715241543, -1.5969762655748114, 0), BABYLON.Color3.Green(), "light3",scene);

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    // 创建比较材质
    const standardMaterial = new BABYLON.PBRMaterial("StandardMaterial", scene);
    // 设置粗糙度
    standardMaterial.roughness = 0.1;
    // 设置金属度
    standardMaterial.metallic = 0.1;
    // 设置材质漫反射颜色
    standardMaterial.albedoColor = BABYLON.Color3.White();
    // 应用材质
    sphere.material = standardMaterial;

    // 设置球的位置
    sphere.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 120, height: 120}, scene);
    // 应用相同的材质
    ground.material = standardMaterial;

    // 创建一个球
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 3, segments: 32}, scene);
    // 创建PBR 材质
    const standardMaterial2 = new BABYLON.PBRMaterial("StandardMaterial2", scene);
    // 粗糙度
    standardMaterial2.roughness = 1.0;
    // 设置金属度
    standardMaterial2.metallic = 0;
    // 设置材质的漫反射颜色
    standardMaterial2.albedoColor = BABYLON.Color3.Red();
    // 设置球的位置
    sphere2.position.y = 3;
    sphere2.position.x = -3;
    // 应用材质
    sphere2.material = standardMaterial2;

    scene.whenReadyAsync();
}

// 创建区域光
const  createLight = (
    position:BABYLON.Vector3, 
    rotation:BABYLON.Vector3, 
    color:BABYLON.Color3, 
    name:string, 
    scene:BABYLON.Scene)=>{
     
    // 创建一个局部坐标轴
    const localAxes = new BABYLON.AxesViewer(scene, 1);
    // 创建一个box
    const box = BABYLON.MeshBuilder.CreateBox("box" + name, {width: 6, height: 6, depth: 0.01});
    // 创建一个材质
    const lightMaterial = new BABYLON.StandardMaterial('');
    // 材质不感光
    lightMaterial.disableLighting = true;
    // 材质自发光颜色
    lightMaterial.emissiveColor = color;
    // 应用材质
    box.material =  lightMaterial;

    // 设置局部坐标
    localAxes.xAxis.parent = box;
    localAxes.yAxis.parent = box;
    localAxes.zAxis.parent = box;	
	
    // 设置灯光模型的位置与旋转
    box.position = position
    box.rotation = rotation;

    // 创建区域光
     /**
     * Creates a rectangular area light object.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param position The position of the area light.
     * @param width The width of the area light.
     * @param height The height of the area light.
     * @param scene The scene the light belongs to
     */
    var light = new BABYLON.RectAreaLight("light" + name, 
        new BABYLON.Vector3(0, 0, 0), 
        6, 
        6, 
        scene);

    // 作为box 的子对象
    light.parent = box;
    // 灯光的高光与漫反射颜色
    light.specular = color;
    light.diffuse = color;

    // 光线的强度
    light.intensity = 0.7;
}


// 聚光灯相交
const  demo6 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	// 红色聚光灯
	var light = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-Math.cos(Math.PI/6), 1 , -Math.sin(Math.PI/6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// 绿色聚光灯
	var light1 = new BABYLON.SpotLight("spotLight1", new BABYLON.Vector3(0, 1, 1 - Math.sin(Math.PI / 6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	light1.diffuse = new BABYLON.Color3(0, 1, 0);
	
	// 蓝色聚光灯
	var light2 = new BABYLON.SpotLight("spotLight2", new BABYLON.Vector3(Math.cos(Math.PI/6), 1, -Math.sin(Math.PI/6)), new BABYLON.Vector3(0, -1, 0), Math.PI / 2, 1.5, scene);
	light2.diffuse = new BABYLON.Color3(0, 0, 1);

    // 创建一个地面
	var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 4, height: 4}, scene);			
	    
}

// 点光源交互
const  demo7 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
    camera.attachControl(canvas, true);

    // 创建一组灯光
    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
    var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);
    var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(10, 0, 0), scene);
    var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);
	var light4 = new BABYLON.PointLight("Omni3", new BABYLON.Vector3(10, 0, 0), scene);
	var light5 = new BABYLON.PointLight("Omni4", new BABYLON.Vector3(10, 0, 0), scene);

    //创建标准材质
    var material = new BABYLON.StandardMaterial("kosh", scene);
    var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", {segments:16, diameter:3}, scene);

    // 创建一组球
    var lightSphere0 = BABYLON.MeshBuilder.CreateSphere("Sphere0", {segments:16, diameter:3}, scene);
    var lightSphere1 = BABYLON.MeshBuilder.CreateSphere("Sphere1", {segments:16, diameter:3}, scene);
    var lightSphere2 = BABYLON.MeshBuilder.CreateSphere("Sphere2", {segments:16, diameter:3}, scene);
	var lightSphere4 = BABYLON.MeshBuilder.CreateSphere("Sphere4", {segments:16, diameter:3}, scene);
	var lightSphere5 = BABYLON.MeshBuilder.CreateSphere("Sphere5", {segments:16, diameter:3}, scene);

    const redMat=  lightSphere0.material = new BABYLON.StandardMaterial("red", scene);
    redMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    redMat.specularColor = new BABYLON.Color3(0, 0, 0);
    redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);

    const greenMat = lightSphere1.material = new BABYLON.StandardMaterial("green", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    greenMat.specularColor = new BABYLON.Color3(0, 0, 0);
    greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0);

    const blueMat = lightSphere2.material = new BABYLON.StandardMaterial("blue", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    blueMat.specularColor = new BABYLON.Color3(0, 0, 0);
    blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
	
	const yellowMat2 = lightSphere4.material = new BABYLON.StandardMaterial("yellow", scene);
    yellowMat2.diffuseColor = new BABYLON.Color3(0, 0, 0);
    yellowMat2.specularColor = new BABYLON.Color3(0, 0, 0);
    yellowMat2.emissiveColor = new BABYLON.Color3(1, 1, 0);
	
	const pinkMat = lightSphere5.material = new BABYLON.StandardMaterial("blue", scene);
    pinkMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    pinkMat.specularColor = new BABYLON.Color3(0, 0, 0);
    pinkMat.emissiveColor = new BABYLON.Color3(0, 1, 1);

    // 漫反射
    material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    sphere.material = material;
    // 定义最大的灯光数能够运用到材质上
	material.maxSimultaneousLights = 16;

    // 设置灯光的颜色
    light0.diffuse = new BABYLON.Color3(1, 0, 0);
    light0.specular = new BABYLON.Color3(1, 0, 0);

    light1.diffuse = new BABYLON.Color3(0, 1, 0);
    light1.specular = new BABYLON.Color3(0, 1, 0);

    light2.diffuse = new BABYLON.Color3(0, 0, 1);
    light2.specular = new BABYLON.Color3(0, 0, 1);

    light3.diffuse = new BABYLON.Color3(1, 1, 1);
    light3.specular = new BABYLON.Color3(1, 1, 1);
	
	light4.diffuse = new BABYLON.Color3(1, 1, 0);
    light4.specular = new BABYLON.Color3(1, 1, 0);
	
	light5.diffuse = new BABYLON.Color3(0, 1, 1);
    light5.specular = new BABYLON.Color3(0, 1, 1);

    // Animations
    var alpha = 0;
    scene.beforeRender = function () {
        light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 10 * Math.cos(alpha));
        light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -10 * Math.cos(alpha));
        light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 0, 10 * Math.sin(alpha));
		light4.position = new BABYLON.Vector3(10 * Math.cos(alpha), 10 * Math.sin(alpha), 0);
		light5.position = new BABYLON.Vector3(10 * Math.sin(alpha), -10 * Math.cos(alpha), 0);

        lightSphere0.position = light0.position;
        lightSphere1.position = light1.position;
        lightSphere2.position = light2.position;
		lightSphere4.position = light4.position;
		lightSphere5.position = light5.position;

        alpha += 0.01;
    };
}

// 排查某些对象
const  demo8 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 8, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	// 创建半球光
	var light0 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// 红色灯光
    light0.diffuse = new BABYLON.Color3(1, 0, 0);
	light0.specular = new BABYLON.Color3(0, 1, 0);
	light0.groundColor = new BABYLON.Color3(0, 1, 0);
	
    // 创建半球光二
	var light1 = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// 白色灯光
    light1.diffuse = new BABYLON.Color3(1, 1, 1);
	light1.specular = new BABYLON.Color3(1, 1, 1);
	light1.groundColor = new BABYLON.Color3(0, 0, 0);
	
    // 创建球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.5}, scene);	
	
	var spheres = [];
	for(var i = 0; i < 25; i++) {
		spheres[i] = sphere.clone("sphere" +i);
		spheres[i].position.x = -2 + i%5;
		spheres[i].position.y = 2 - Math.floor(i/5);
	}	
	
    // 灯光一 排查7, 18
	light0.excludedMeshes.push(spheres[7], spheres[18]);	
    // 灯光二 包括 7， 18
	light1.includedOnlyMeshes.push(spheres[7], spheres[18])
}

// 投影纹理
const  demo9 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
	
    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	// 相机控制
    camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

    // 创建半球光
	var light = new BABYLON.HemisphericLight("dir01", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.1;

	// 创建聚光灯
	var spotLight = new BABYLON.SpotLight("spot02", 
        new BABYLON.Vector3(30, 40, 30),
		new BABYLON.Vector3(-1, -2, -1),
         1.1, 
         16, scene
        );
	spotLight.projectionTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/co.png", scene);
	// 方向
    spotLight.setDirectionToTarget(BABYLON.Vector3.Zero());
	spotLight.intensity = 1.5;

	// Ground
	// var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
        "ground", 
        "https://playground.babylonjs.com/textures/heightMap.png", 
        {
            width:100, 
            height:100, 
            subdivisions:100, 
            minHeight:0, 
            maxHeight:10,
            updatable:false
        }, scene);

    // 创建标准材质
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	const diffuseTexture = groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
	diffuseTexture.uScale = 6;
	diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

	// Animations
	var alpha = 0;
	scene.registerBeforeRender(function () {
		spotLight.position = new BABYLON.Vector3(Math.cos(alpha) * 60, 40, Math.sin(alpha) * 60);
		spotLight.setDirectionToTarget(BABYLON.Vector3.Zero());
		alpha += 0.01;
	});
}

// IES 灯光数据
const  demo10 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) => {
    
    // 创建聚光灯
    var light = new BABYLON.SpotLight("light", new BABYLON.Vector3(0, 3,-0.34), new BABYLON.Vector3(0, -1, 0), Math.PI / 4, 0.7, scene);
    // 聚光灯强度
    light.intensity = 100
    // 漫反射灯光颜色
    light.diffuse = new BABYLON.Color3(0.181, 0.485, 0);
    
    //IES 数据创建贴图 
    light.iesProfileTexture = new BABYLON.Texture("https://assets.babylonjs.com/meshes/EXT_lights_ies/LightProfile.ies");

    // light.iesProfileTexture.onLoadObservable.add(() => {
    //     resolve(scene);
    // })

    BABYLON.AppendSceneAsync("https://assets.babylonjs.com/meshes/EXT_lights_ies/Example-wo.gltf", scene).then(()=>{
        scene.createDefaultCamera(true, true, true);
    })
    

}