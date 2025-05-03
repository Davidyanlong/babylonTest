import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const toPNGScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

   // 创建一个场景
   var scene = new BABYLON.Scene(engine);

   // 创建一个自由相机
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

   // 设置相机朝向
   camera.setTarget(BABYLON.Vector3.Zero());

   // 绑定相机事件
   camera.attachControl(canvas, true);

   // 创建一个半球光
   var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

   // 光强度
   light.intensity = 0.7;

   // 创建一个球
   var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

   // 设置球的位置
   sphere.position.y = 1;

   // 创建一个地面
   var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

//    demo1(engine, scene, camera);
//    demo2(engine, scene, camera, sphere);
   demo3(engine, scene, camera, ground);

   return scene;
}

const demo1 = (engine:BABYLON.Engine,scene:BABYLON.Scene,camera:BABYLON.FreeCamera)=>{
   // 当场景就绪后调佣
   scene.onReadyObservable.add(() => {
        // 创建一个快照
         BABYLON.Tools.CreateScreenshot(engine, camera, {precision: 1.0});
    });
}


const demo2 = (engine:BABYLON.Engine,scene:BABYLON.Scene,camera:BABYLON.FreeCamera, sphere:BABYLON.Mesh)=>{
    // 当场景就绪后调佣
    scene.onReadyObservable.add(() => {
        // 创建一个快照
        BABYLON.Tools.CreateScreenshot(engine, camera, {precision: 1.0}, (data) => {
            const screenshotTexture = new BABYLON.Texture(data);

            const screenshotMaterial = new BABYLON.StandardMaterial("screenshotMaterial");
            //  作为自发光贴图
            screenshotMaterial.diffuseTexture = screenshotTexture;
            // 设置球的材质
            sphere.material = screenshotMaterial;
        });
    });

 }
 const demo3 = (engine:BABYLON.Engine,scene:BABYLON.Scene,camera:BABYLON.FreeCamera, ground:BABYLON.Mesh)=>{
    // 当场景就绪后调佣
    scene.onReadyObservable.addOnce(() => {
        // This screenshots both objects
        // BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, {precision: 1.0});
        
        // This screenshots only the ground
        // 用渲染目标(Render Target)来捕获场景内容，相比普通截图方法提供了更多控制和灵活性
        // 只输出了地面的贴图
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, {precision: 1.0}, undefined, undefined, undefined, false, undefined, false, false, true, undefined, (texture) => {
            texture.renderList = [ground];
            texture.useCameraPostProcesses = false;
        });

        /**
         * 参数	类型	必填	说明
         * engine	Engine	是	Babylon.js 引擎实例
         * camera	Camera	是	用于渲染截图的相机
         * size	Object	是	包含width和height的对象
         * successCallback	Function	是	成功回调函数
         * mimeType	String	否	图像格式，默认为"image/png"
         * samples	Number	否	多重采样数(抗锯齿)，默认为1
         * antialiasing	Boolean	否	是否启用抗锯齿，默认为false
         * fileName	String	否	自动下载时的文件名
         */

    });

 }