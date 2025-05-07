import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const textureDiffuseEmissiveAmbientScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个材质
    var scene = new BABYLON.Scene(engine);

    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
    
    // 创建一个半球光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// 漫反射颜色 红色
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    // 高光的颜色 绿色
	light.specular = new BABYLON.Color3(0, 1, 0);
    // 地面光颜色 绿色
	light.groundColor = new BABYLON.Color3(0, 1, 0);


	// 创建标准材质
	var grass0 = new BABYLON.StandardMaterial("grass0", scene);
    // 添加绿色草材质
	grass0.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
	
    // 创建标准材质
	var grass1 = new BABYLON.StandardMaterial("grass1", scene);
    // 添加自发光颜色
	grass1.emissiveTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
	
    // 创建标准材质
	var grass2 = new BABYLON.StandardMaterial("grass2", scene);
    // 设置环境光贴图
	grass2.ambientTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene);
    // 基础色为红色
	grass2.diffuseColor = new BABYLON.Color3(1, 0, 0);
	
	// 创建球，使用漫反射颜色材质
	var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
	sphere0.position.x = -1.5;
	sphere0.material = grass0;	
	
	// 创建球， 使用自发光颜色材质 
	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
	sphere1.material = grass1;
	
	// 创建球，使用环境光和漫反射颜色
	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {}, scene);
	sphere2.material = grass2;
	sphere2.position.x = 1.5;	
        
    return scene;
}