import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const opacityTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

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
    // 设置漫反射颜色
    mat0.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // 设置opacityTexture
    mat0.opacityTexture = new BABYLON.Texture("https://i.imgur.com/xhXIyKG.png", scene);
    
    // 创建一个标准材质
    var mat1 = new BABYLON.StandardMaterial("mat1", scene);
    // 设置漫反射颜色
    mat1.diffuseColor = new BABYLON.Color3(1, 0, 1);
    
 

   	// 创建一个有透明材质的平面
	var plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
	plane.material = mat0;	
    
  	// 创建一个球
	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
	sphere1.material = mat1;
	sphere1.position.z = 1.5;		
        
    return scene;
}