import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const animationSildeDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
	
	const light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1));
    const light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0));   
    light1.intensity =0.75;
    light2.intensity =0.5;

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;

    /**
     * const myAnim = new BABYLON.Animation(
     * name, 
     * property, 
     * frames_per_second, 
     * property_type, 
     * loop_mode);
     */
    
    // animationTest1(scene, box);
    // animationTest2(scene, box);

    // directAnimation(scene, box);
    animationStop(scene, box);

	return scene;
};

const animationTest1 = (scene:BABYLON.Scene, box:BABYLON.Mesh)=>{
    const frameRate = 10;

    /**
    * BABYLON.Animation.ANIMATIONTYPE_FLOAT (for single float values)
    * BABYLON.Animation.ANIMATIONTYPE_VECTOR3 (for 3D vectors, e.g., position, scaling)
    * BABYLON.Animation.ANIMATIONTYPE_QUATERNION (for quaternion-based rotations)
    * BABYLON.Animation.ANIMATIONTYPE_COLOR3 (for RGB colors)
    * BABYLON.Animation.ANIMATIONTYPE_MATRIX (for matrix transformations)
     */

    // 定义一个动画
    // position.x 的动画
    const xSlide = new BABYLON.Animation("xSlide", 
         // 动画对象的属性
         "position.x",
         // 每秒运动多少帧
         frameRate, 
         // 差值为浮点数
         BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
         // 动画循环播放
         BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 
    
    // 关键帧动画
    // 第 0 帧 的值是2
    keyFrames.push({
        frame: 0,
        value: 2
    });

    // 最后一帧 x 位置从2 到 -2
    keyFrames.push({
        frame: frameRate,
        value: -2
    });

    // 在下一个帧长，返回 2
    keyFrames.push({
        frame: 2 * frameRate,
        value: 2
    });
    // 设置动画序列
    xSlide.setKeys(keyFrames);

    // 动画设置给box
    box.animations.push(xSlide);

    // 播放动画
    scene.beginAnimation(box, 0, 2 * frameRate, true);
}

const animationTest2 = (scene:BABYLON.Scene, box:BABYLON.Mesh)=>{
   
    // 开始帧
    const startFrame = 0;
    // 结束帧
    const endFrame = 10;

    // 总帧数
    const frameRate = 10;

    // 定义动画
    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // 定义关键帧
    const keyFrames = []; 

    keyFrames.push({
        frame: startFrame,
        value: 2
    });

    keyFrames.push({
        frame: endFrame,
        value: -2
    });


    xSlide.setKeys(keyFrames);

    box.animations.push(xSlide);

    // 开始动画
    //forward animation 不循环
    scene.beginAnimation(box, startFrame, endFrame, false);

    // 动画倒播
    //backwards animation 不循环
    scene.beginAnimation(box, endFrame, startFrame, false);
}

const directAnimation = (scene:BABYLON.Scene, box:BABYLON.Mesh)=>{

    // 动画帧总数
    const frameRate = 10;

    // 定义一个动画
    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // 设置关键帧帧
    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: 2
    });

    keyFrames.push({
        frame: frameRate,
        value: -2
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: 2
    });

    xSlide.setKeys(keyFrames);

    // box 不绑定动画数据，并可以进行动画
    scene.beginDirectAnimation(box, [xSlide], 0, 2 * frameRate, true);

    console.log(box.animations)

}

const animationStop = (scene:BABYLON.Scene, box:BABYLON.Mesh)=>{
    
    const frameRate = 10;

    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: 2
    });

    keyFrames.push({
        frame: frameRate,
        value: -2
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: 2
    });

    xSlide.setKeys(keyFrames);

    box.animations.push(xSlide);

    const myAnim = scene.beginAnimation(box, 0, 2 * frameRate, true);
    // 五秒后停止动画
    setTimeout(() => {
        // stop 的动画将会被移除
        myAnim.stop(); 
    }, 5000);

    /**
     * pause()
     * restart()
     * stop()
     * reset()
     */
}
