import { BABYLON } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 场景基本的构建方法
export const viewportDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 设置场景的清除色
	scene.clearColor = BABYLON.Color4.FromColor3(new BABYLON.Color3( .5, .5, .5));

	// 轨道相机1
	var camera1 = new BABYLON.ArcRotateCamera("camera1",  
        3 * Math.PI / 8, 
        3 * Math.PI / 8, 
        15, 
        new BABYLON.Vector3(0, 2, 0), 
        scene);
    
	camera1.attachControl(canvas, true);

    // 轨道相机2
    var camera2 = new BABYLON.ArcRotateCamera("camera2",  
        5 * Math.PI / 8, 
        5 * Math.PI / 8, 
        30, 
        new BABYLON.Vector3(0, 2, 0), 
        scene);

	camera2.attachControl(canvas, true);

    // 设置上半屏为相机1 的视口
    camera1.viewport = new BABYLON.Viewport(0, 0.5, 1, 1);
    // 设置下半屏为相机2 的视口
    camera2.viewport = new BABYLON.Viewport(0, 0, 1, 0.5);
    
    // 添加激活相机
    scene.activeCameras =  scene.activeCameras || [];
    scene.activeCameras.push(camera1);
    scene.activeCameras.push(camera2);
  
	// 添加半球光1
	var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);
	light1.intensity = 0.7;

    // 添加半球光2
	var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-1, -0.5, 0), scene);
	light2.intensity = 0.8;
  

	/*********************Create Box***************/
    
	var faceColors = [];
	faceColors[0] = BABYLON.Color3.Blue();
	faceColors[1] = BABYLON.Color3.White()
	faceColors[2] = BABYLON.Color3.Red();
	faceColors[3] = BABYLON.Color3.Black();
	faceColors[4] = BABYLON.Color3.Green();
	faceColors[5] = BABYLON.Color3.Yellow();
    faceColors = faceColors.map(v=>BABYLON.Color4.FromColor3(v))
 
	var box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors, size:2}, scene);
    box.material = new BABYLON.StandardMaterial("", scene);

    
    /*******************End Box Creation*****************************************/
  
	showAxis(6, scene);
 
	/***************************************************************/
	return scene;
    
};

