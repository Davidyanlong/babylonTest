import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const autoRotationBehaviorDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene);

	camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;


    /**
     * autoRotation行为（BABYLON.AutoRotationBehavior）旨在在没有用户交互的情况下创建ArcRotateCamera的平滑旋转。
     * 
     * 可以使用以下属性配置此行为：
     * idleRotationSpeed：摄影机围绕网格旋转的速度
     * idleRotationWaitTime：用户交互后相机开始旋转前等待的时间（以毫秒为单位）
     * idleRotationSpinupTime：旋转到完全怠速转速所需的时间（毫秒）
     * zoomStopsAnimation：指示用户缩放是否应停止动画的标志
     */



    // 启用自动旋转的行为
    camera.useAutoRotationBehavior = true;

    // 可选配置参数
    // camera.autoRotationBehavior!.idleRotationSpeed = 3; // 旋转速度（默认0.2）
    // camera.autoRotationBehavior!.idleRotationSpinupTime = 2000; // 启动延迟（ms）
    // camera.autoRotationBehavior!.idleRotationWaitTime = 2000; // 静止后开始旋转的等待时间
    // camera.autoRotationBehavior!.zoomStopsAnimation = true; // 缩放时暂停旋转

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);

	return scene;
};

