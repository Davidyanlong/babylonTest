import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const tilingScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 3 * Math.PI / 8, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
      
    // 创建半球光
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // 灯光颜色
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    
    // 创建一个标准材质
    var mat0 = new BABYLON.StandardMaterial("mat0", scene);
    // 设置材质漫反射贴图
	mat0.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/JbvoYlB.png", scene);

    // 创建第二材质
	var mat1 = new BABYLON.StandardMaterial("mat0", scene);
    // 设置漫反射贴图
	const texture:BABYLON.Texture = mat1.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/JbvoYlB.png", scene);
	// 横向重复2次
    texture.uScale = 2;
    // 纵向重复4次
	texture.vScale = 4;
	
    // 创建第三个材质
	var mat2 = new BABYLON.StandardMaterial("mat0", scene);
    // 设置漫反射贴图
	const texture2 = mat2.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/JbvoYlB.png", scene);
	// 横向偏移 0.25
    texture2.uOffset = 0.25;
    // 纵向偏移 0.5
	texture2.vOffset = 0.5;
	
	// 正常使用贴图材质的平面
	var plane0 = BABYLON.MeshBuilder.CreatePlane("plane0", {}, scene);
	plane0.material = mat0;
	plane0.position.x = -1.5;
	
	// 使用重复贴图的材质
	var plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {}, scene);
	plane1.material = mat1;
	
	// 使用偏移的贴图
	var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", {}, scene);
	plane2.material = mat2;
	plane2.position.x = 1.5;	
        
    return scene;
}