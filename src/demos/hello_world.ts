import { BABYLON } from "../base/commonIncludes";

// 场景基本的构建方法
export const helloWorldScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // 设置相机看向的点位
    camera.setTarget(BABYLON.Vector3.Zero());

    // 为相机绑定canvas，进行相关事件获取 
    camera.attachControl(canvas, true);

    // 创建一个半球光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 设置光的强度
    light.intensity = 0.7;

    // 创建一个平面， 并加入到场景中
    const  ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 创建一个box 
    // const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);


    return scene;


};

