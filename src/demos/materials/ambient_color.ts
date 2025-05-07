import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const ambientColorScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个材质
    var scene = new BABYLON.Scene(engine);

    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 4, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
	
    // 设置环境光 白色
	scene.ambientColor = new BABYLON.Color3(1, 1, 1);
	
	// 半球光
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	// 漫反射颜色红色
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    // 高光颜色绿色
	light.specular = new BABYLON.Color3(0, 1, 0);
    // 地面颜色 绿色
	light.groundColor = new BABYLON.Color3(0, 1, 0);
	
    // 红色标准材质
	var redMat = new BABYLON.StandardMaterial("redMat", scene);
    // 环境光颜色为红色
	redMat.ambientColor = new BABYLON.Color3(1, 0, 0);
	
    // 绿色材质
	var greenMat = new BABYLON.StandardMaterial("redMat", scene);
    // 环境光颜色为绿色
	greenMat.ambientColor = new BABYLON.Color3(0, 1, 0);
	
	// 没有环境光的球
	var sphere0 = BABYLON.MeshBuilder.CreateSphere("sphere0", {}, scene);
    // 设置球的颜色
	sphere0.position.x = -1.5;	
	
	// 使用红色环境光
	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
    // 使用红色环境光的材质
	sphere1.material = redMat;
	
	// 绿色球
	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {}, scene);
    // 使用绿色环境光材质
	sphere2.material = greenMat;
	sphere2.position.x = 1.5;				
	    
    return scene;
}