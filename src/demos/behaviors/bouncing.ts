import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const bouncingBehaviorDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene);

	camera.attachControl(canvas, true);

    
    /**
     * 弹跳行为（BABYLON.BouncingBehavior）旨在当ArcRotateCamera达到较低的半径限制或较高的半径限制时产生较小的弹跳效果。
     * 
     * 可以使用以下属性配置此行为：
     * transitionDuration：定义动画的持续时间，单位为毫秒。默认值为450ms。
     * lowerRadiusTransitionRange：定义达到较低半径时由过渡设置动画的距离长度。默认值为2。
     * upperRadiusTransitionRange：定义达到上半径时由过渡设置动画的距离长度。默认值为-2。
     * autoTransitionRange：定义一个值，指示是否自动定义了较低的RadiusTransitionRange和较高的Radius 
     * TransitionRange。过渡范围将设置为世界空间中边界框对角线的5%。
     * 
     */
    
    
    // 相机的最小半径
    camera.lowerRadiusLimit = 6;
    // 相机的最大半径
    camera.upperRadiusLimit = 20;
    

    // 启动碰撞行为
    camera.useBouncingBehavior = true;

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);

	return scene;
};

