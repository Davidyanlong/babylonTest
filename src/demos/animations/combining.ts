import { BABYLON} from "../../base/commonIncludes";

// 场景基本的构建方法
export const combinAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);

    camera.attachControl(canvas, true);
	
	var light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), scene);
    var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);   
    light1.intensity =0.75;
    light2.intensity =0.5;


    // demo1(scene);
    // demo2(scene);
    demo3(scene);

	return scene;

}


const demo1 = (scene:BABYLON.Scene)=>{
    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.x = 2;

    // 每秒 10帧
    var frameRate = 10;

    // 位置动画
    var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keyFramesP = []; 

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({
        frame: frameRate,
        value: -2
    });

    keyFramesP.push({
        frame: 2 * frameRate,
        value: 2
    });


    xSlide.setKeys(keyFramesP);

    // 旋转动画
    var yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesR = []; 

    keyFramesR.push({
        frame: 0,
        value: 0
    });

    keyFramesR.push({
        // frame: frameRate,
        // value: Math.PI
        frame: 1.5 * frameRate, // 增加帧数， 变速
        value: 4 * Math.PI   // 增加速率
    });

    keyFramesR.push({
        frame: 2 * frameRate,
        // value: 2 * Math.PI
        
        value: 8 * Math.PI  // 增加速率
    });


    yRot.setKeys(keyFramesR);


    /**
     * beginDirectAnimation
     * 
     * target - BabylonJS Object, theBabylon.js object to be animated
     * animations - array, of all the animations to apply to the target
     * start frame - number, the frame at which to start the animation
     * end frame - number, the frame at which to end the animation
     * loop - boolean : optional, true when loop mode of the animation is to be activated, false to run animation just once
     * speed - number : optional, default 1 matches animation frame rate, higher numbers speed up the animation, lower numbers slow it down
     * on animation end - function : optional, function called when animation ends, requires loop to be false
     */


    // 同时设置 xSlide, yRot 两个动画
    scene.beginDirectAnimation(box, [xSlide, yRot], 0, 2 * frameRate, true);
}

const demo2 = (scene:BABYLON.Scene)=>{

    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.x = 2;

    var frameRate = 10;

    //Position Animation
    var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keyFramesP = []; 

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({
        frame: frameRate,
        value: -2
    });

    keyFramesP.push({
        frame: 2 * frameRate,
        value: 2
    });


    xSlide.setKeys(keyFramesP);

    //Rotation Animation
    var yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesR = []; 

    keyFramesR.push({
        frame: 0,
        value: 0
    });

    keyFramesR.push({
        frame: 2.5 * frameRate,
        value: 2 * Math.PI
    });

    keyFramesR.push({
        frame: 5 * frameRate,
        value: 4 * Math.PI
    });


    yRot.setKeys(keyFramesR);


    var nextAnimation = function() {
        // true 为循环播放
        scene.beginDirectAnimation(box, [xSlide], 0, 2 * frameRate, true);

    }

    // 先播放旋转动画，动画播放完后调用nextAnimation
    scene.beginDirectAnimation(box, [yRot], 0, 2 * frameRate, false, 1, nextAnimation);

	return scene;

}

const demo3 = (scene:BABYLON.Scene)=>{
    var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    box.position.x = 2;

    var frameRate = 10;

    //Position Animation
    var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keyFramesP = []; 

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({
        frame: frameRate,
        value: -2
    });

    keyFramesP.push({
        frame: 2 * frameRate,
        value: 2
    });


    xSlide.setKeys(keyFramesP);

    //Rotation Animation
    var yRot = new BABYLON.Animation("yRot", "rotation.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keyFramesR = []; 

    keyFramesR.push({
        frame: 0,
        value: 0
    });

    keyFramesR.push({
        frame: 2.5 * frameRate,
        value: 2 * Math.PI
    });

    keyFramesR.push({
        frame: 5 * frameRate,
        value: 4 * Math.PI
    });


    yRot.setKeys(keyFramesR);

    var nextAnimation = function() {
        // 后续的动画继续旋转
        scene.beginDirectAnimation(box, [yRot, xSlide], 0, 2 * frameRate, true);
    }
    // 先进行旋转
    scene.beginDirectAnimation(box, [yRot],  0, 2 * frameRate, false, 1, nextAnimation);

}