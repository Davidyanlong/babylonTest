import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const skyboxScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
	var scene = new BABYLON.Scene(engine);
    
 
	
    // 创建一个盒子
    var box = BABYLON.MeshBuilder.CreateBox("box", {});
    
    // 创建默认的相机与灯光
    scene.createDefaultCameraOrLight(true, true, true);
    
    
    // 创建环境
    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    // demo4(scene);
    demo5(scene);

    

	return scene;
};

// 创建默认天空环境
const demo1 = (scene:BABYLON.Scene)=>{
   
    // 设置场景的清除色为 黄色
    scene.clearColor =BABYLON.Color4.FromColor3(new BABYLON.Color3(1, 1, 0));
    
    // 创建环境
    scene.createDefaultEnvironment();
    
    // 设置相机半径
    const activeCamera = scene.activeCamera as BABYLON.ArcRotateCamera
    activeCamera.radius = 100;
    
}

// 设置天空背景
const demo2 = (scene:BABYLON.Scene)=>{
    // 设置参数
    var options = {
        skyboxTexture: new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene), 
        groundColor: BABYLON.Color3.White()
    };

    var helper = scene.createDefaultEnvironment(options);
}

// 设置天空主色调
const demo3 = (scene:BABYLON.Scene)=>{
    var helper = scene.createDefaultEnvironment() as BABYLON.EnvironmentHelper;
    helper.setMainColor(BABYLON.Color3.Teal());
}

// 通过updateOptions 更新配置
const demo4 = (scene:BABYLON.Scene)=>{
    var helper = scene.createDefaultEnvironment() as BABYLON.EnvironmentHelper;
    var options = {
        skyboxTexture: new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene)
    }
    helper.updateOptions(options);
}

// 创建默认天空
const demo5 = (scene:BABYLON.Scene)=>{
    var texture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/SpecularHDR.dds", scene);
    scene.createDefaultSkybox(texture, true, 100);
}