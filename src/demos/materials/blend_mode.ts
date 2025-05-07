import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const blendModeScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 设置场景环境光
	scene.ambientColor = new BABYLON.Color3(0.05, 0.2,0.05 );

    // 创建一个点光源
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);

    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 110, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);

    // 创建一个面
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {size:250}, scene);
    // 设置位置
    plane.position.y = -8;
    plane.rotation.x = Math.PI / 2;

    // 创建地面的标准材质
    var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
    // 设置绿色贴图
    materialPlane.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.jpg", scene);
    
    // 设置重复贴图 5 * 5
    (materialPlane.diffuseTexture as BABYLON.Texture).uScale = 5.0;//Repeat 5 times on the Vertical Axes
    (materialPlane.diffuseTexture as BABYLON.Texture).vScale = 5.0;//Repeat 5 times on the Horizontal Axes
   
    // 背面裁剪关闭， 双面渲染
    materialPlane.backFaceCulling = false;//Allways show the front and the back of an element

    plane.material = materialPlane;

	// 创建一个可混合的材质
	var material_base = new BABYLON.StandardMaterial("mat", scene);

    // 设置贴图
    material_base.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/misc.jpg", scene);
    // 设置半透明
    material_base.alpha = 0.9999;		// artificially set the material as alpha blended
	// 设置环境光
    material_base.ambientColor = BABYLON.Color3.White();
	
    // blend 模式
	var alphamodes = [
		BABYLON.Engine.ALPHA_COMBINE,
		BABYLON.Engine.ALPHA_ADD,
		BABYLON.Engine.ALPHA_SUBTRACT,
		BABYLON.Engine.ALPHA_MULTIPLY,
		BABYLON.Engine.ALPHA_MAXIMIZED
	];
	
	// cubes
	var count = 5;
	var mesh;
	var mat;
	var angle;
    // 创建5个圆柱体
	for (var i = 0; i < count; i++) {
		//angle = Math.PI * 2 * i / count;
		//mesh = BABYLON.Mesh.CreateBox("cube" + i, 12, scene);
        mesh = BABYLON.MeshBuilder.CreateCylinder('cube' + i, {
            height:12,
            diameter:8,
            tessellation:12,
            subdivisions:1
        }, scene)
		mesh.position.x = -17 * (i +0.5 - count/2);
		//mesh.rotation.y = Math.PI * 2 - angle;
		mesh.rotation.y = 8;
        // 使用不同的材质
		mat = material_base.clone("cube"+i);
        // 设置不同的模式
		mat.alphaMode = alphamodes[i];
        // 设置材质
		mesh.material = mat;
	}
	



    //Creation of 5 cubes
    


    return scene;
}