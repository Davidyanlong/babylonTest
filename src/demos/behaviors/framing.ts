import { BABYLON } from "../../base/commonIncludes";

// 可以自动调整相机位置和视角以确保目标物体在视图中完美显示
export const framingBehaviorDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

	var scene = new BABYLON.Scene(engine);

	var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, -Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);

	camera.attachControl(canvas, true);

    // 启用自动取景行为
    camera.useFramingBehavior = true;


    /**
     * framingTime	number	1500	相机移动过渡时间(毫秒)
     * radiusScale	number	1.0	相机距离缩放系数
     * elevationReturnTime	number	1500	相机高度恢复时间
     * elevationReturnTime	number	1500	相机高度恢复时间
     * positionScale	number	0.5	位置调整强度
     * defaultElevation	number	0.3	默认仰角(弧度)
     * zoomOnBoundingInfo	boolean	true	是否基于包围盒缩放
     */

    // camera.framingBehavior!.defaultElevation = -3.14;
    camera.framingBehavior!.mode = BABYLON.FramingBehavior.IgnoreBoundsSizeMode;

 

	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	var box = BABYLON.MeshBuilder.CreateBox("box", { size:3.0 }, scene);

    camera.setTarget(box);

	return scene;
};

