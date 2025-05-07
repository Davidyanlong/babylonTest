import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const wireFrameScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 3 * Math.PI / 8, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);
    
    
    // 创建半球光
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // 设置光的强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 1, segments: 12}, scene);

    // 创建标准材质
    var materialSphere1 = new BABYLON.StandardMaterial("materialSphere1", scene);
    // 材质显示网格
    materialSphere1.wireframe = true;
    // 设置自发光颜色为 红色
    materialSphere1.emissiveColor = new BABYLON.Color3(1.0, 0.0, 0.0);
    // 材质不感光
    materialSphere1.disableLighting = true


    // 设置球的材质
    sphere.material = materialSphere1;

        
    return scene;
}