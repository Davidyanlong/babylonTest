import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const pointerDragBehaviorDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(1, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
   
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { diameter:2, segments:16},scene);
    sphere.rotation.x = Math.PI/2
    sphere.position.y = 1;
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);
   
       // Create pointerDragBehavior in the desired mode
       //var pointerDragBehavior = new BABYLON.PointerDragBehavior({});
       //var pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0,1,0)});
       // 创建一个拖拽行为，拖拽的轴是X方向
       var pointerDragBehavior = new BABYLON.PointerDragBehavior({dragAxis: new BABYLON.Vector3(1,0,0)});
       
       // 用于控制拖拽操作时是否考虑物体的自身方向
       /**
        * 默认值: false
        * 作用:
        * 当设置为 true 时，拖拽方向会基于物体的自身坐标系（局部空间）
        * 当设置为 false 时（默认），拖拽方向基于世界坐标系
        */
       pointerDragBehavior.useObjectOrientationForDragging = false;
   
       // 拖拽相关事件
       // 拖拽开始
       pointerDragBehavior.onDragStartObservable.add((event)=>{
           console.log("dragStart");
           console.log(event);
       })
       // 拖拽中
       pointerDragBehavior.onDragObservable.add((event)=>{
           console.log("drag");
           console.log(event);
       })
       // 拖拽后
       pointerDragBehavior.onDragEndObservable.add((event)=>{
           console.log("dragEnd");
           console.log(event);
       })
   
       // 如果想自己处理拖拽的移动，请设置为false
    //    pointerDragBehavior.moveAttached = false;
   
       sphere.addBehavior(pointerDragBehavior);
   
       return scene;
};

