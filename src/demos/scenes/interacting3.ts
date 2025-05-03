import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const interacting3Scene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

   // 创建一个场景
   var scene = new BABYLON.Scene(engine);

   // 创建一个自由相机
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

   // 相机的朝向
   camera.setTarget(BABYLON.Vector3.Zero());

   // 相机绑定事件
   camera.attachControl(canvas, true);

   // 半球光
   var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

   // 相机的强度
   light.intensity = 0.7;

   // 创建一个球
   var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene);

   // 绑定键盘事件
   scene.onKeyboardObservable.add((kbInfo) => {
       switch (kbInfo.type) {
           // 键盘按下
           case BABYLON.KeyboardEventTypes.KEYDOWN:
               
               switch (kbInfo.event.key) {
                   case "a":
                   case "A":
                       sphere.position.x -= 0.1;
                   break
                   case "d":
                   case "D":
                       sphere.position.x += 0.1;
                   break
                   case "w":
                   case "W":
                       sphere.position.z += 0.1;
                   break
                   case "s":
                   case "S":
                       sphere.position.z -= 0.1;
                   break
               }
           break;
       }
   });

   return scene;
};

