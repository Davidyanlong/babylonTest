import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const onBeforeRenderObservableDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


       // 创建一个场景
       var scene = new BABYLON.Scene(engine);

       // 定义一个自由相机
       var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
   
       //  设置相机目标
       camera.setTarget(BABYLON.Vector3.Zero());
   
       // This attaches the camera to the canvas
       camera.attachControl(canvas, true);
   
       // 设置半球光照
       var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
   
       // 光线强度
       light.intensity = 0.7;
   
       // 创建一个box
       var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
   
       // 设置动画的变量 方向
       var direction = true;
   
       // 渲染前通过改变属性的逐帧动画
       scene.onBeforeRenderObservable.add(() => {
           // 核对方向及位置
           if (box.position.x < 2 && direction) {
               // x 增加 0.05
               box.position.x += 0.05;
           }
           else {
               // 切换方向
               direction = false;
           }
   
           // 核对 方向及位置
           if (box.position.x > -2 && !direction) {
               // x 减少 0.05
               box.position.x -= 0.05;
           }
           else {
               // 切换方向
               direction = true;
           }
       });
   
       return scene;
};

