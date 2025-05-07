import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const transparentTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 3 * Math.PI / 8, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
    
    
    // 创建半球光
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // 光的颜色 红色
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    // 光的高光 绿色
    light.specular = new BABYLON.Color3(0, 1, 0);
    // 地面颜色 绿色
    light.groundColor = new BABYLON.Color3(0, 1, 0);
    
    // 创建红色材质
    var redMat = new BABYLON.StandardMaterial("redMat", scene);
    // 材质颜色红色
    redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    
    // 创建绿色材质
    var greenMat = new BABYLON.StandardMaterial("greenMat", scene);
    // 设置材质颜色 绿色
    greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
    // 不透明度 0.5
    greenMat.alpha = 0.5;	
    
    // 创建一个红色球 
    var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {}, scene);
    // 设置红色材质材质
    sphere1.material = redMat;
    sphere1.position.z = 1.5;
    
    // 创建一个透明的绿色材质球
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {}, scene);
    sphere2.material = greenMat;				
        
    return scene;
}