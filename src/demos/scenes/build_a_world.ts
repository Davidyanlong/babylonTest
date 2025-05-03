import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const buildAScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
	var scene = new BABYLON.Scene(engine);
	
    // 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("box", {});


    /**
     * createDefaultCameraOrLight;
     * createDefaultCamera;
     * createDefaultLight;
     * createDefaultEnvironment;
     * createDefaultSkybox;
     */

    // 创建 默认的灯光 与 相机

    /**
     * replace 参数的作用是是否销毁已有的灯光
     * 灯光的创建函数
     * new HemisphericLight("default light", Vector3.Up(), this);
     * 
     * // 相机的创建函数
     *  replace 参数是销毁已有的activeCamera
     *  createArcRotateCamera 为true 创建 ArcRotateCamera 否则 创建 FreeCamera
     *  attachCameraControls 参数是是否绑定事件
     */
    scene.createDefaultCameraOrLight(true, true, true);

    // 调整相机相关参数
    const helperCamera = scene.activeCamera as BABYLON.ArcRotateCamera; 
    helperCamera.radius = 10;
    helperCamera.alpha = Math.PI / 4;
    helperCamera.beta = Math.PI / 4;

    var helperLight = scene.lights.pop() as BABYLON.HemisphericLight;
    scene.lights.push(helperLight);
    
    helperLight.direction = new BABYLON.Vector3(1, 0, 1);
    helperLight.diffuse = BABYLON.Color3.Red();
    

    // var helperCamera = scene.cameras.pop();
    // scene.cameras.push(helperCamera);
    
    // helperCamera.radius = 10;
    // helperCamera.alpha = Math.PI / 4;
    // helperCamera.beta = Math.PI / 4;

    // 创建环境
    /**
     * 实例化
     * new EnvironmentHelper()
     */
    scene.createDefaultEnvironment();

	return scene;

};

