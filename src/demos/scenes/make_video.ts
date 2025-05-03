import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const makeVideoScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个创建
    var scene = new BABYLON.Scene(engine);
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    // 绑定事件
    camera.attachControl(canvas, true);

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 创建一个PBR 材质
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
    // 设置给球
    sphere.material = pbr;
    // 设置材质的基础色
    pbr.baseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
    // 设置金属度
    pbr.metallic = 1.0;
    // 粗糙度
    pbr.roughness = 0.4;
    
    // 设置环境贴图
    pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);

    // demo1(engine)
    // demo2(engine);
    demo3(engine);

    return scene;
};

// 录制视频基础功能
const demo1 = (engine:BABYLON.Engine)=>{
    // 是否支持WebRTC 函数的浏览器
    if (BABYLON.VideoRecorder.IsSupported(engine)) {
        // 视频录制
        var recorder = new BABYLON.VideoRecorder(engine);
        // 默认录制 7 秒
        recorder.startRecording();
    }
}

// 设置文件名和时间
const demo2 = (engine:BABYLON.Engine)=>{
    // 是否支持WebRTC 函数的浏览器
    if (BABYLON.VideoRecorder.IsSupported(engine)) {
        // 视频录制
        var recorder = new BABYLON.VideoRecorder(engine);
        // 默认录制 7 秒,
        recorder.startRecording("test.webm", 2);
    }
}


// 500ms 停止录制
const demo3 = (engine:BABYLON.Engine)=>{
    // 是否支持WebRTC 函数的浏览器
    if (BABYLON.VideoRecorder.IsSupported(engine)) {
        var recorder = new BABYLON.VideoRecorder(engine);
         recorder.startRecording();
         // 调用停止录制函数
         setTimeout(() => {
            recorder.stopRecording()
    },   500);
    }
}

// 录制完成后的回调
const demo4 = (engine:BABYLON.Engine)=>{
    // 是否支持WebRTC 函数的浏览器
    if (BABYLON.VideoRecorder.IsSupported(engine)) {
        var recorder = new BABYLON.VideoRecorder(engine);
        recorder.startRecording(null, 1).then((videoBlob) => {
            alert("done");
            // Do Something with the videoBlob.
        });
    }
}