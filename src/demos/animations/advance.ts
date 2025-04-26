import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const advanceAnmiationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // demo1(scene);

    // demo2(engine, scene);

    demo3(scene);

    return scene;
};

// anim.waitAsync 方法演示
const demo1 = (scene:BABYLON.Scene)=>{


    var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);

    var materialBox = new BABYLON.StandardMaterial("mat", scene);
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);

    box1.material = materialBox;

    // 创建一个每秒30帧的缩放x动画
    var animationBox = new BABYLON.Animation("tutoAnimation", "scaling.x", 
        30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   
    // 动画关键帧
    var keys = [];
    // 初始值 
    keys.push({
        frame: 0,
        value: 1
    });

    // 20帧的时候缩放到 0.2
    keys.push({
        frame: 20,
        value: 0.2
    });

    // 30帧是 还原为 1
    keys.push({
        frame: 100,
        value: 1
    });

    animationBox.setKeys(keys);

    // 添加到box1
    box1.animations.push(animationBox);

    setTimeout(async () => {
        var anim = scene.beginAnimation(box1, 0, 100, false);

        console.log("before");
        // 动画结束后返回 promise
        await anim.waitAsync();
        console.log("after");
    });
}

// 根据输入的时间查询动画数据
const demo2 = ( engine:BABYLON.Engine ,scene:BABYLON.Scene)=>{
   
    /**
     * BABYLON.Animation.prototype.floatInterpolateFunction = function (startValue, endValue, gradient) {
          return startValue + (endValue - startValue) * gradient;
       };
     * 
     * 
     * floatInterpolateFunction
     * quaternionInterpolateFunction
     * quaternionInterpolateFunctionWithTangents
     * vector3InterpolateFunction
     * vector3InterpolateFunctionWithTangents
     * vector2InterpolateFunction
     * vector2InterpolateFunctionWithTangents
     * sizeInterpolateFunction
     * color3InterpolateFunction
     * matrixInterpolateFunction
     */
   

       var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);

       var materialBox = new BABYLON.StandardMaterial("mat", scene);
       materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);
   
       box1.material = materialBox;
   
       // 创建一个每秒30帧的缩放x动画
       var animationBox = new BABYLON.Animation("tutoAnimation", "scaling.x", 
           30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
           BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
      
       // 动画关键帧
       var keys = [];
       // 初始值 
       keys.push({
           frame: 0,
           value: 1
       });
   
       // 20帧的时候缩放到 0.2
       keys.push({
           frame: 20,
           value: 0.2
       });
   
       // 30帧是 还原为 1
       keys.push({
           frame: 100,
           value: 1
       });
   
       animationBox.setKeys(keys);
   
       // 添加到box1
       box1.animations.push(animationBox);
   
   
    //Finally, launch animations on box1, from key 0 to key 100 with loop activated
   scene.beginAnimation(box1, 0, 100, true);

   let t = 0    
   scene.onBeforeRenderObservable.add(()=>{
       t += engine.getDeltaTime() *0.001;

       let d = Math.sin(t)*30;
        // 返回每一帧动画的数据
       console.log(animationBox.evaluate(d));    
   })
}

// enableBlending 从当前状态启动下一段动画
const demo3 = (scene:BABYLON.Scene)=>{
    
    // 创建一个box
    var box1 = BABYLON.MeshBuilder.CreateBox("Box1", {size:10.0}, scene);
    // 初始位置
    box1.position.x = -20;

    // 创建标准材质
    var materialBox = new BABYLON.StandardMaterial("texture1", scene);
    // 材质颜色为绿色
    materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green

    // 应用到box
    box1.material = materialBox;

    // 创建box1 的动画， 移动动画
    //----------------------------------------

    var animationBox = new BABYLON.Animation("tutoAnimation", "position.z", 
        30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);


    // 动画关键帧
    var keys = [];
    // 初始化位置
    keys.push({
        frame: 0,
        value: 0
    });

    // 30帧 z=20
    keys.push({
        frame: 30,
        value: 20
    });

    // 60帧 z=0
    keys.push({
        frame: 60,
        value: 0
    });

    // 设置动画关键帧
    animationBox.setKeys(keys);

    // 绑定动画
    box1.animations.push(animationBox);

    // 开启box1 动画
    scene.beginAnimation(box1, 0, 100, true);
	
	// 创建动画2 Blending animation
    var animation2Box = new BABYLON.Animation("tutoAnimation", "position.z", 
        30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
	    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	
    // 启动 blending，启动动画从当前状态进行差值
	animation2Box.enableBlending = true;
    // blend 速度 为0.01
	animation2Box.blendingSpeed = 0.01;
    
    // 关键帧， 同上
    var keys = [];
    keys.push({
        frame: 0,
        value: 0
    });

    keys.push({
        frame: 30,
        value: 20
    });

    keys.push({
        frame: 60,
        value: 0
    });

    animation2Box.setKeys(keys);
	

    var runtimeAnimation;
    // 场景点击事件
    scene.onPointerDown = function (evt, pickResult) {
        // 如果点击到了对象
        if(pickResult.pickedMesh){
            // 停止当前动画
            scene.stopAnimation(box1);
            // 播放动画2
            runtimeAnimation = scene.beginDirectAnimation(box1, [animation2Box], 0, 100, true);

        }

	};

}