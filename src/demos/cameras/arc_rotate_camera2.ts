import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const arcRotateCameraDemo2 = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

	/********** ARC ROTATE CAMERA EXAMPLE **************************/

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera(
        "arcCamera",                    // name
        0,                              // alpha
        Math.PI/3,                      // beta
        10,                             // radius
        BABYLON.Vector3.Zero(),         // lookAt 
        scene
        );

    // 设置相机的位置
    camera.setPosition(new BABYLON.Vector3(0, 5, -10));

    // 相机附加canvas 事件
    camera.attachControl(canvas, true);

    /**
     * Ctrl + left mouse button. 
     * You can use right mouse button instead by setting useCtrlForPanning to false in the attachControl call
     * 
     * camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);
     */

	/**************************************************************/

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
	
	//Materials
	var redMat = new BABYLON.StandardMaterial("red", scene);
	redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	redMat.emissiveColor = new BABYLON.Color3(1, 0, 0);
	redMat.specularColor = new BABYLON.Color3(1, 0, 0);
	
	var greenMat = new BABYLON.StandardMaterial("green", scene);
	greenMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	greenMat.emissiveColor = new BABYLON.Color3(0, 1, 0);
	greenMat.specularColor = new BABYLON.Color3(0, 1, 0);
	
	var blueMat = new BABYLON.StandardMaterial("blue", scene);
	blueMat.diffuseColor = new BABYLON.Color3(0, 0, 1);
	blueMat.emissiveColor = new BABYLON.Color3(0, 0, 1);
	blueMat.specularColor = new BABYLON.Color3(0, 0, 1);
	
	// Shapes
	var plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {size: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
	plane1.position.x = -3;
	plane1.position.z = 0;
	plane1.material = redMat;
	
	var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", {size: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
	plane2.position.x = 3;
	plane2.position.z = -1.5;
	plane2.material = greenMat;
	
	var plane3 = BABYLON.MeshBuilder.CreatePlane("plane3", {size: 3, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
	plane3.position.x = 3;
	plane3.position.z = 1.5;
	plane3.material = blueMat;
	
	var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 10, height: 10, subdivisions: 2}, scene);
	
    return scene;
    
};

