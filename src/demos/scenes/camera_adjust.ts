import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const cameraAdjustScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
	// 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("box", {});
    // 克隆一个box 
    var box2 = box.clone('box2');
    // 设置位置
    box2.position.x = 20;
    box2.position.y = 20;

    // 相机会自动计算场景的包围盒，保证能看到所有的物体
    scene.createDefaultCameraOrLight(true, true, true);
    // 创建环境
    scene.createDefaultEnvironment();

    return scene;
};

