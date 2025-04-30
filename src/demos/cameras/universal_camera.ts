import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const universalCameraDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个通用相机
    var  camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), scene);

    // 启用鼠标滚轮输入
    camera.inputs.addMouseWheel();
    
    // 可以使用滚轮来操作相机的高低
    // camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;
    
    // 调整相机Y滚轮的方向
    // camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;

    // 相机 lookAt 的位置
    camera.setTarget(BABYLON.Vector3.Zero());

    // 绑定canvas 得到输入
    camera.attachControl(canvas, true);

    // 使用半球光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 半球光的强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // 设置球的位置
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
    
};

