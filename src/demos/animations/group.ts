import { BABYLON,GUI, dat } from "../../base/commonIncludes";

// 场景基本的构建方法
export const groupAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    var scene = new BABYLON.Scene(engine);

    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

     // 测试案例 
    // groupDemo(scene);

    demo4(scene);

  

    return scene;

}

const groupDemo = (scene: BABYLON.Scene)=>{
      var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
      // 创建两个 box
      var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);
      box1.position.x = -20;
      var box2 = BABYLON.Mesh.CreateBox("Box2", 10.0, scene);
  
      // 创建材质
      var materialBox = new BABYLON.StandardMaterial("texture1", scene);
      materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green
      var materialBox2 = new BABYLON.StandardMaterial("texture2", scene);
  
      // 应用材质
      box1.material = materialBox;
      box2.material = materialBox2;
  
      // box的位置
      box2.position.x = 20;
  
  
      // 创建一个缩放动画， 每秒30帧
      var animation1 = new BABYLON.Animation("tutoAnimation", "scaling.x", 
          30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
  
      // Animation keys
      var keys = [];
      // 初始值
      keys.push({
          frame: 0,
          value: 1
      });
  
      // 第 20 帧， 缩放0.2 
      keys.push({
          frame: 20,
          value: 0.2
      });
  
      // 第100 帧， 缩放恢复 1
      keys.push({
          frame: 100,
          value: 1
      });
  
      //Adding keys to the animation object
      animation1.setKeys(keys);
  
      // 创建一个旋转动画
      var animation2 = new BABYLON.Animation("tutoAnimation", "rotation.y", 
          30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
          BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );
  
      // Animation keys
      keys = [];
      // 动画初始值
      keys.push({
          frame: 0,
          value: 0
      });
  
      // 第 40 帧 转 PI
      keys.push({
          frame: 40,
          value: Math.PI
      });
  
      // 第 80 帧 还原 0
      keys.push({
          frame: 80,
          value: 0
      });
  
      //Adding keys to the animation object
      animation2.setKeys(keys);
      
      // 测试案例 
      demo1(animation1, animation2, box1, box2);
      // demo2(animation1, animation2, box1, box2);
      // demo3(animation1, animation2, box1, box2);
}

const demo1 = (
    animation1:BABYLON.Animation,
    animation2:BABYLON.Animation,
    box1:BABYLON.Mesh,
    box2:BABYLON.Mesh  
    )=>{
 // 创建一个动画组
 var animationGroup = new BABYLON.AnimationGroup("my group");
 // 添加两个动画到动画组，动画一 动画二 都绑定到 box1
 animationGroup.addTargetedAnimation(animation1, box1);
 animationGroup.addTargetedAnimation(animation2, box1);

 // 确保所有的动画使用一个时间线
 animationGroup.normalize(0, 100);


    // 动画开始播的时候调用
    animationGroup.onAnimationGroupPlayObservable.add(function(){
        (box2.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.White();
    })
    // 动画暂停的时候调用
    animationGroup.onAnimationGroupPauseObservable.add(function(){
        (box2.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.Yellow();
    })
    // 动画每次循环时调用
    animationGroup.onAnimationGroupLoopObservable.add(function () {
        console.log("Group looped!");
    });

   
   // 动画停止的时候调用
  animationGroup.onAnimationEndObservable.add(function(){
    (box2.material as BABYLON.StandardMaterial).diffuseColor = BABYLON.Color3.Red();
  })

 // 创建一个UI界面
 var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
 var panel = new GUI.StackPanel();
 panel.isVertical = false;
 panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
 advancedTexture.addControl(panel);

 // 按钮
 var addButton = function (text:string, callback:(args?:any[])=>void) {
     // 创建一个按钮
     var button = GUI.Button.CreateSimpleButton("button", text);
     button.width = "140px";
     button.height = "40px";
     button.color = "white";
     button.background = "green";
     button.paddingLeft = "10px";
     button.paddingRight = "10px";
     // 按钮点击调用函数
     button.onPointerUpObservable.add(function () {
         callback();
     });
     panel.addControl(button);
 }

 // 点击三个按钮
 addButton("Play", function () {
     // 开始播放， 并且循环
     animationGroup.play(true);
 });

 addButton("Pause", function () {
     // 暂停播放
     animationGroup.pause();
 });

 addButton("Stop", function () {
     // 初始化
     animationGroup.reset();
     // 停止组动画
     animationGroup.stop();
 });
}


const demo2 = (
    animation1:BABYLON.Animation,
    animation2:BABYLON.Animation,
    box1:BABYLON.Mesh,
    box2:BABYLON.Mesh  
    )=>{
        // 创建动画组
        var animationGroup = new BABYLON.AnimationGroup("my group");
        // 动画一 box1
        animationGroup.addTargetedAnimation(animation1, box1);
        // 动画二 box2
        animationGroup.addTargetedAnimation(animation2, box2);

         // 确保所有的动画使用一个时间线
        animationGroup.normalize(0, 100);

        // UI
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var panel = new GUI.StackPanel();
        panel.isVertical = false;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);

        var addButton = function (text:string, callback:(args?:any[])=>void) {
            var button = GUI.Button.CreateSimpleButton("button", text);
            button.width = "140px";
            button.height = "40px";
            button.color = "white";
            button.background = "green";
            button.paddingLeft = "10px";
            button.paddingRight = "10px";
            button.onPointerUpObservable.add(function () {
                callback();
            });
            panel.addControl(button);
        }

        addButton("Play", function () {
            animationGroup.play(true);
        });

        addButton("Pause", function () {
            animationGroup.pause();
        });

        addButton("Stop", function () {
            animationGroup.reset();
            animationGroup.stop();
        });

}

const demo3 = (
    animation1:BABYLON.Animation,
    animation2:BABYLON.Animation,
    box1:BABYLON.Mesh,
    box2:BABYLON.Mesh  
    )=>{
        // 创建动画组
        var animationGroup = new BABYLON.AnimationGroup("my group");
        animationGroup.addTargetedAnimation(animation1, box1);
        animationGroup.addTargetedAnimation(animation2, box1);
        animationGroup.addTargetedAnimation(animation2, box2);

         // 确保所有的动画使用一个时间线
        animationGroup.normalize(0, 100);

        // 动画速率
        animationGroup.speedRatio = 5;

        // UI
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var panel = new GUI.StackPanel();
        panel.isVertical = false;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);

        var addButton = function (text:string, callback:(args?:any[])=>void) {
            var button = GUI.Button.CreateSimpleButton("button", text);
            button.width = "140px";
            button.height = "40px";
            button.color = "white";
            button.background = "green";
            button.paddingLeft = "10px";
            button.paddingRight = "10px";
            button.onPointerUpObservable.add(function () {
                callback();
            });
            panel.addControl(button);
        }

        addButton("Play", function () {
            animationGroup.play(true);
        });

        addButton("Pause", function () {
            animationGroup.pause();
        });

        addButton("Stop", function () {
            animationGroup.reset();
            animationGroup.stop();
        });

}

const demo4 = (scene:BABYLON.Scene)=>{

    // 调整相机参数
    let camera = scene.activeCamera as BABYLON.ArcRotateCamera
    if(camera){
        camera.radius = 10;
        camera.alpha =Math.PI / 2;
        camera.beta = Math.PI / 2.5;
    }
  


    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

       // Default intensity is 1. Let's dim the light a small amount
     light.intensity = 0.7;
     
      // 创建一个地面
     var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

     // 创建三个球
     var sphereA = BABYLON.MeshBuilder.CreateSphere("sphereA", {diameter: 2, segments: 32}, scene);
     var sphereB = BABYLON.MeshBuilder.CreateSphere("sphereB", {diameter: 2, segments: 32}, scene);
     var sphereC = BABYLON.MeshBuilder.CreateSphere("sphereC", {diameter: 2, segments: 32}, scene);

     // 将球移动到地面以上
     sphereA.position.y = 1;
     sphereB.position.y = 1;
     sphereC.position.y = 1;

     // 球的位置
     sphereA.position.x = 2;
     sphereB.position.x = 0;
     sphereC.position.x = -2;

     // 通过蒙版来控制球在group中的运动
     const maskNames = [
         "A+B included",
         "A+B excluded",
         "A+C included",
         "A+C excluded",
         "B+C included",
         "B+C excluded",
         "All included",
     ];

     const masks = [
         // 定义蒙版， 包含 与 排除
         new BABYLON.AnimationGroupMask([sphereA.name, sphereB.name], BABYLON.AnimationGroupMaskMode.Include),
         new BABYLON.AnimationGroupMask([sphereA.name, sphereB.name], BABYLON.AnimationGroupMaskMode.Exclude),
         new BABYLON.AnimationGroupMask([sphereA.name, sphereC.name], BABYLON.AnimationGroupMaskMode.Include),
         new BABYLON.AnimationGroupMask([sphereA.name, sphereC.name], BABYLON.AnimationGroupMaskMode.Exclude),
         new BABYLON.AnimationGroupMask([sphereB.name, sphereC.name], BABYLON.AnimationGroupMaskMode.Include),
         new BABYLON.AnimationGroupMask([sphereB.name, sphereC.name], BABYLON.AnimationGroupMaskMode.Exclude),
     ];

     // 定义球的运动
     const keys = new Array<BABYLON.IAnimationKey>();
     keys.push({ frame: 0, value: 1 });
     keys.push({ frame: 30, value: 2 });

     const animation = new BABYLON.Animation("yoyo", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_YOYO);
     animation.setKeys(keys);

     // 定义动画group
     const group = new BABYLON.AnimationGroup("group") as BABYLON.AnimationGroup;
     group.addTargetedAnimation(animation, sphereA);
     group.addTargetedAnimation(animation, sphereB);
     group.addTargetedAnimation(animation, sphereC);

    //  group.playOrder

     // 通过蒙版来控制动画 包含 与排除
     group.mask = masks[0];
     group.play(true);

     //  设置GUI 面板
     let canvasZone = document.getElementById("canvasZone")!;
     canvasZone.style.position = "relative";

     const oldGui = document.getElementById("datGui");
     if (oldGui) {
         canvasZone.removeChild(oldGui);
     }

     const gui = new dat.GUI({ autoPlace: false });
     canvasZone.appendChild(gui.domElement);
     gui.domElement.id = "datGui";
     gui.domElement.style.position = "absolute";
     gui.domElement.style.top = "0";
     gui.domElement.style.right = "0";

     const masksGui = gui.addFolder("masks");
     masksGui.add({ mode: "A+B included" }, "mode", maskNames).onChange((value: string) => {
         console.log(`selected value = ${value}`);

         const index = maskNames.indexOf(value);
         if (index !== -1) {
             group.mask = masks[index];
         }
         else {
             group.mask = null;
         }
     });
     masksGui.open();

}
