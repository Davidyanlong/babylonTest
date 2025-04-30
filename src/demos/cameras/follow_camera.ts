import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const followCameraDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

	/********** FOLLOW CAMERA EXAMPLE **************************/

    // 创建一个跟随相机	
    var camera = new BABYLON.FollowCamera("FollowCam", 
        new BABYLON.Vector3(0, 10, -10),   // 相机位置
        scene);
	
	// 跟随相机与问题的距离 或 旋转半径
	camera.radius = 30;
	
	// 跟随相机相对目标的高度
	camera.heightOffset = 10;
	
	// 定义相机的水平转向角偏移
	camera.rotationOffset = 0;
	
	// 相机移动过程中的加速度
	camera.cameraAcceleration = 0.005
	
	// 相机的最大速度
	camera.maxCameraSpeed = 10
	
	//camera.target is set after the target's creation
    
	// This attaches the camera to the canvas
    camera.attachControl(true);
	
	/**************************************************************/

    // 半球光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
	
	// 定义一个标准材质
	var mat = new BABYLON.StandardMaterial("mat1", scene);
  	mat.alpha = 1.0;
  	mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
    var texture = new BABYLON.Texture("https://i.imgur.com/vxH5bCg.jpg", scene);
    mat.diffuseTexture = texture;
	
	// 为不同的面贴不同的纹理
	var hSpriteNb =  3;  // 3 sprites per row
    var vSpriteNb =  2;  // 2 sprite rows	
	
	var faceUV = new Array(6);

  	for (var i = 0; i < 6; i++) {
    	faceUV[i] = new BABYLON.Vector4(i/hSpriteNb, 0, (i+1)/hSpriteNb, 1 / vSpriteNb);
  	}
	  
	// 被跟随的物体
	var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2, faceUV: faceUV }, scene);
	box.position = new BABYLON.Vector3(20, 0, 10);
	box.material = mat;

	// 创建一个粒子系统
    var boxesSPS = new BABYLON.SolidParticleSystem("boxes", scene, {updatable: false});
    
    //function to position of grey boxes
    var set_boxes = function(particle:BABYLON.Mesh, i:number, s:number) {
		// 随机位置
        particle.position = new BABYLON.Vector3(-50 + Math.random()*100, -50 + Math.random()*100, -50 + Math.random()*100); 
    }
    
    //添加400个盒子
    boxesSPS.addShape(box, 400, {positionFunction:set_boxes});  
	
	// 构建盒子
    var boxes = boxesSPS.buildMesh(); // mesh of boxes

    /*****************SET TARGET FOR CAMERA************************/ 
	// 设置相机跟随目标
	camera.lockedTarget = box;
	/**************************************************************/
	
	
	//box movement variables
	var alpha = 0;
	var orbit_radius = 20
	
	
	// 每帧更新
	scene.registerBeforeRender(function () {
     alpha +=0.01;
	 // 盒子位置变换
	 box.position.x = orbit_radius*Math.cos(alpha);
	 box.position.y = orbit_radius*Math.sin(alpha);
	 box.position.z = 10*Math.sin(2*alpha);
	 
	 // alpha 视角变换
	 camera.rotationOffset = (18*alpha)%360;
    });
	
    return scene;

    
};

