import { Nullable } from "@babylonjs/core";
import { BABYLON, GUI  } from "../../base/commonIncludes";


var activeMesh:Nullable<BABYLON.Mesh> = null;
var targetLocation:Nullable<BABYLON.Mesh> = null;
var animationsActive = true;
var waitForPanning = false;

// 场景基本的构建方法
export const arcRotateCameraDemo3 = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建场景
    var scene = new BABYLON.Scene(engine);

    //  创建 ArcRotateCamera
    var camera = new BABYLON.ArcRotateCamera("camera",
		 Math.PI/3,
		  Math.PI/3, 
		  10, 
		  BABYLON.Vector3.Zero(), 
		  scene);

    // 设置相机lookAt
    camera.setTarget(BABYLON.Vector3.Zero());

    // 绑定Canvas事件
    camera.attachControl(canvas, true);

    // 创建半球光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 半球光的强度
    light.intensity = 0.7;
	// 半球光的高光为黑色
    light.specular = new BABYLON.Color3(0, 0, 0);

    // 创建场景中的Mesh
    createMeshes(scene);

    // 创建一个焦点球
    targetLocation = BABYLON.MeshBuilder.CreateSphere("targetLoc", {diameter: 0.75, segments: 32}, scene);
    // 相机的目标位置，设置为球的位置
	targetLocation.position = camera.target;
	// 创建球的材质
    let targetMat = new BABYLON.StandardMaterial("targetMat", scene);
	// 红色
    targetMat.diffuseColor = BABYLON.Color3.Red();
	// 透明度 0.75
    targetMat.alpha = 0.75;
	// 设置材质
    targetLocation.material = targetMat;

    // GUI
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

	// 添加文字块， 用于显示当前 焦点球的名称
    let targetText = new GUI.TextBlock();
    targetText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    targetText.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    targetText.textHorizontalAlignment = GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    targetText.text = "Target: none";
    targetText.color = "red";
    targetText.fontSize = 24;
    targetText.width = "200px";
    targetText.height = "30px";
    if (canvas.width < 500) {
        targetText.isVisible = false;
    }
    advancedTexture.addControl(targetText);

	// 定义一个Panel
    let buttonPanel = new GUI.StackPanel();
    buttonPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(buttonPanel);  

    // 创建一个动画按钮
    let animButton = GUI.Button.CreateSimpleButton("anim", "Toggle Animations");
    animButton.width = "300px";
    animButton.height = "30px";
    animButton.color = "white";
    animButton.background = "grey";
    animButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
	// 按钮点击事件
    animButton.onPointerClickObservable.add(() => {
		// 动画状态
        if (animationsActive) {
			// 按钮的文字颜色为红色
            animButton.textBlock!.color = "red";
        }
        else {
            animButton.textBlock!.color = "white";
        }
		// 切换按钮
        animationsActive = !animationsActive 
    });
    buttonPanel.addControl(animButton);

    // 创建一个重设按钮
    let resetButton = GUI.Button.CreateSimpleButton("reset", "Reset Camera");
    resetButton.width = "300px";
    resetButton.height = "30px";
    resetButton.color = "white";
    resetButton.background = "grey";
    resetButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
	// 按钮点击事件
    resetButton.onPointerClickObservable.add(() => {
		// 相机的lookAt [0,0,0]
        camera.target = BABYLON.Vector3.Zero();
		// 相机初始化参数
        camera.alpha = Math.PI/3;
        camera.beta = Math.PI/3;
        camera.radius = 10;
		// 如果动画激活的 并且 activeMesh 是存在的
        if (animationsActive && activeMesh) { fadeInTarget(scene); }
		// 调整相机  lookAt 屏幕中心的偏移量
        camera.targetScreenOffset.x = 0;
        camera.targetScreenOffset.y = 0;
		if(!activeMesh) return;
        activeMesh.renderOutline = false;
        activeMesh = null;
		if(!targetLocation) return;
        targetLocation.material!.alpha = 0.75;
        targetLocation.position = camera.target;
        
        targetText.text = "Target: none";
    });
    buttonPanel.addControl(resetButton);

    // This section exists solely because we need to account for panning inertial.
    scene.beforeRender = () => {
        if (waitForPanning && camera.inertialPanningX === 0 && camera.inertialPanningY === 0 && activeMesh) {
            let mesh = activeMesh;
            activeMesh = null;
            setCameraOffset(camera, mesh);
            waitForPanning = false;
        }
    };

    // Double-tap: If you double-tap on mesh, highlight and set that mesh as the target
    // Else, reset target to center of view with a radius of 10

	// 场景的双击事件
    scene.onPointerObservable.add((eventData) => {
        let mesh = eventData!.pickInfo!.pickedMesh as BABYLON.Mesh;
        if (mesh) {
			// 如果动画是激活的，开始动画
            if (animationsActive) { moveToMesh(mesh, scene); }
			// 变更相机相关参数
            setCameraOffset(camera, mesh);
			// 显示目标球的名称
            targetText.text = `Target: ${mesh.name}`;
        }
        else {
			// 没有双击 Mesh 对象
            if (animationsActive && activeMesh) { fadeInTarget(scene); }
            resetCameraTarget(camera);
            targetText.text = "Target: none";
        }
    }, BABYLON.PointerEventTypes.POINTERDOUBLETAP);

    // To prevent loss of using mesh as target, we track the active mesh that we were using and just re-set it
    // as the targetted mesh after the pan is complete
    scene.onPointerObservable.add((eventData) => {
        if (activeMesh) {
            // If we're still moving, wait for movement to finish and then reset
            if (camera.inertialPanningX !== 0 || camera.inertialPanningY !== 0) {
                waitForPanning = true;
            }
            // If someone release right-click on the mouse
            else if ((eventData.event.button === 2 && eventData.event.type === "mouse") ||
                // or let's go of their touches
                (eventData.event.buttons === 0 && eventData.event.type === "touch") ||
                // or let's go of a pointer button while Ctrl is pressed
                eventData.event.ctrlKey) {
                    // Reset the mesh offset so we don't lose the target
                    let mesh = activeMesh;
                    activeMesh = null;
                    setCameraOffset(camera, mesh);
                }
        }
    }, BABYLON.PointerEventTypes.POINTERUP);

    scene.onKeyboardObservable.add((eventData) => {
        // If we're still moving, wait for movement to finish and then reset
        if (camera.inertialPanningX !== 0 || camera.inertialPanningY !== 0) {
                waitForPanning = true;
        }
        // Since we can combine Ctrl with a drag to pan, we also need to account for Ctrl being released first
        else if (activeMesh && (eventData.event.keyCode === 17 || eventData.event.key === "Control")) {
            let mesh = activeMesh;
            activeMesh = null;
            setCameraOffset(camera, mesh);
        }
    }, BABYLON.KeyboardEventTypes.KEYUP);

    return scene;
    
};

/**
 * 在场景中创建可点击的球
 */
function createMeshes(scene:BABYLON.Scene) {
    let dim = 3;
    let sphereNum = 0;
	// 空的 mesh node
    let sphereNode = new BABYLON.Mesh("spheres", scene);

	//  创建 6行 6列 
    for (let i = -dim; i < dim; i++) {
        for (let j = -dim; j < dim; j++) {
            for (let k = -dim; k < dim; k++) {
                let name = `sphere${sphereNum++}`;
				// 创建球
                let sphere = BABYLON.MeshBuilder.CreateSphere(name, {diameter: 2, segments: 32}, scene);
                let variance = Math.floor(Math.random()*5)
                // 球的位置
				sphere.position = new BABYLON.Vector3(i*12 + variance,j*12 + variance,k*12 + variance);
                // 轮廓线宽度
				sphere.outlineWidth = 0.1;
				// 添加为子 mesh
                sphereNode.addChild(sphere);
            }
        }
    }
};


/**
 * 设置目标点材质透明度的变化动画
 */
function fadeInTarget(scene:BABYLON.Scene) {
    const fadeFrames = [];
	// 每秒的帧率
    const frameRate = 10;
	// 创建一个动画， 改变 alpha 属性的动画
    const fadeTarget = new BABYLON.Animation("fadeInTarget", "alpha", 
		frameRate, 
		BABYLON.Animation.ANIMATIONTYPE_FLOAT
	);

	// 关键帧 0 帧
    fadeFrames.push({
        frame: 0,
        value: 0
    });

	// 进行0.25秒的时候 alpha = 0.75
    fadeFrames.push({
        frame: frameRate/4,
        value: 0.75
    });

	// 设置关键帧
    fadeTarget.setKeys(fadeFrames);
    targetLocation!.material!.animations = [];
	// 绑定材质动画
    targetLocation!.material!.animations.push(fadeTarget);
    scene.beginAnimation(targetLocation!.material, 0, frameRate, false);
};


/**
 * 更新相机的目标点，调整屏幕空间显示
 */
var setCameraOffset = function (camera:BABYLON.ArcRotateCamera, mesh:BABYLON.Mesh) {
    // 如果mesh 存在 并且 mesh 不是 activeMesh
    if (mesh && mesh !== activeMesh) {
        // 如果activeMesh 已经存在
        if (activeMesh) {
			// 关闭轮廓线渲染
            activeMesh.renderOutline = false;
        }

		// 如果动画animationsActive 是关闭的
        if (!animationsActive && targetLocation) {
			// 模板球不可见
            targetLocation.material!.alpha = 0;
        }

        /** 
         * This is an important part.  The getPositionInCameraSpace function will give us the location of the mesh, as if we were to pan
         * the camera to it.  We then take this value and set our offsets to the relative x and y of that position and use the z as our
         * radius.  By copying the alpha and beta angles, we're effectively performing a 3D Pan and then immediately offsetting the 
         * camera back into the original position.
         * */
		// 在相机空间下的 mesh 的位置
        let relPos = mesh.getPositionInCameraSpace(camera);
		// 获取当前相机 alpha beta
        let alpha = camera.alpha;
        let beta = camera.beta;

		// 渲染轮廓线
        mesh.renderOutline = true;
		
		// 相机lookAt 新的目标
        camera.target = mesh.position.clone();
		// 设置屏幕空间的偏移量
        camera.targetScreenOffset.x = relPos.x;
        camera.targetScreenOffset.y = relPos.y;
		// 修改相机相关的参数
        camera.radius = relPos.z;
        camera.alpha = alpha;
        camera.beta = beta;

		// 当前为 activeMesh
        activeMesh = mesh;
    }
};


/**
 * 移动目标红球到点击球的位置，并动画
 */
function moveToMesh(mesh:BABYLON.Mesh, scene:BABYLON.Scene) {
    
	const moveFrames = [];
    const fadeFrames = [];

    const frameRate = 10;

    const origin = targetLocation!.position.clone();
    const destination = mesh.position.clone();
	// 移动动画
    const moveTarget = new BABYLON.Animation("moveTarget", "position", 
		frameRate, 
		BABYLON.Animation.ANIMATIONTYPE_VECTOR3);

	// 透明度动画
    const fadeTarget = new BABYLON.Animation("fadeTarget", "alpha", 
		frameRate, 
		BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    
     // ease 动画模式方式
	const mergeEase = new BABYLON.CircleEase();
	// 设置动画模式
    mergeEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    moveTarget.setEasingFunction(mergeEase);

	// 移动的关键帧 0 帧
    moveFrames.push({
        frame: 0,
        value: origin
    });

	// 目标位置 
    moveFrames.push({
        frame: frameRate,
        value: destination
    });

	// 0 帧 透明度
    fadeFrames.push({
        frame: 0,
        value: 0.75
    });

	// 模板帧 透明度为 0
    fadeFrames.push({
        frame: frameRate,
        value: 0
    });
	// 设置关键帧
    moveTarget.setKeys(moveFrames);
    fadeTarget.setKeys(fadeFrames);
	if(!targetLocation) throw Error('不存在 targetLocation 对象');
    targetLocation.material!.animations = [];
    targetLocation.animations = [];
	// 绑定动画
    targetLocation.animations.push(moveTarget);
    targetLocation.material!.animations.push(fadeTarget);
	// 播放动画
    scene.beginAnimation(targetLocation, 0, frameRate, false);
    scene.beginAnimation(targetLocation.material, 0, frameRate, false);
};


/**
 * Reset the camera's target so that it's back at the center of it's viewpoint
 */
var resetCameraTarget = function (camera:BABYLON.ArcRotateCamera) {
    // 如果存在激活的球
	if (activeMesh) {
        /**
         * Basically, we're going reverse what we did when we set the offsets.  Our goal is just to
         * set our camera to be looking at the center with a default radius of 10.  We first get the
         * difference between our current radius and desired one.  Next, we set our localDirection to
         * be our we'd want to pan the camera in relative space.  We calculate and move our camera's
         * target in absolute space and then remove our offsets.
         */
		
		// 计算相机相对偏移量
        let diff = camera.radius - 10;
		// 获取相机空间下 activeMesh的位置
        let relPos = activeMesh.getPositionInCameraSpace(camera);
		// 计算一个方向
        let localDirection = new BABYLON.Vector3(relPos.x, relPos.y, diff);
		// 得到相机的视图矩阵
        let viewMatrix = camera.getViewMatrix();
		// 得到相机的世界矩阵
        let transformMatrix = camera.getTransformationMatrix();

        let transformedDirection = BABYLON.Vector3.Zero();
        // 视图矩阵的逆运算就是相机的变换矩阵， 撤销了上一步的变换
		// 视图矩阵是相机世界矩阵的逆矩阵。
        viewMatrix.invertToRef(transformMatrix);
        localDirection.multiplyInPlace(new BABYLON.Vector3(1,1,1));
		
		// 计算相机的朝向 
        BABYLON.Vector3.TransformNormalToRef(localDirection, transformMatrix, transformedDirection);
       
		// 减去相对值， 获取最初的计算相机的目标点
		camera.target.subtractInPlace(transformedDirection);

		// 相对屏幕的偏移量
        camera.targetScreenOffset.x = 0;
        camera.targetScreenOffset.y = 0;

		// 取消轮廓线
        activeMesh.renderOutline = false;
        activeMesh = null;
		// 半径设置为 10
        camera.radius = 10;
    }
    targetLocation!.material!.alpha = 0.75;
    targetLocation!.position = camera.target;
};