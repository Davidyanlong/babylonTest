import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const actionEventsScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    demo2(scene, canvas);


    return scene;

};


const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
      // 创建一个灯光
    var light = new BABYLON.PointLight("Point", new BABYLON.Vector3(5, 10, 5), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 8, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Create a sprite manager to optimize GPU ressources
    // Parameters : name, imgUrl, capacity, cellSize, scene
    // 创建精灵管理对象
    var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", 
        "https://playground.babylonjs.com/textures/palm.png", 2000, 800, scene);

    //We create 2000 trees at random positions
    for (var i = 0; i < 2000; i++) {
        let tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * 100 - 50;
        tree.position.z = Math.random() * 100 - 50;

        //Some "dead" trees
        if (Math.round(Math.random() * 5) == 0) {
            tree.angle = Math.PI * 90 / 180;
            tree.position.y = -0.3;
        }
    }

    //Create a manager for the player's sprite animation
    var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager", 
        "https://playground.babylonjs.com/textures/player.png", 2, 64, scene);
	spriteManagerPlayer.isPickable = true;
	
    // First animated player
    // 创建一个动画角色
    var player = new BABYLON.Sprite("player", spriteManagerPlayer);
    player.playAnimation(0, 40, true, 100);
    player.position.y = -0.3;
    player.size = 0.3;
	player.isPickable = true;
	
	
	
	// click action for player
    // 创建角色的活动管理器
	player.actionManager = new BABYLON.ActionManager(scene);
    // 注册一个行为
	player.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            // 拾取触发
            BABYLON.ActionManager.OnPickUpTrigger, 
             // 触发执行函数   
            function () {
		        alert('player clicked');
	        }
        ));
	
	// compared click for sphere
    // 创建一个球
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:0.2}, scene);
	sphere.position.x = 2;
    // 创建角色的活动管理器
	sphere.actionManager = new BABYLON.ActionManager(scene);
	// 同上
    sphere.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, 
            function () {
		        alert('sphere clicked');
	        }
    ));



    // Second standing player
    // 创建角色二
    var player2 = new BABYLON.Sprite("player2", spriteManagerPlayer);
    player2.stopAnimation(); // Not animated
    player2.cellIndex = 2; // Going to frame number 2
    player2.position.y = -0.3;
    player2.position.x = 1;
    player2.size = 0.3;
    player2.invertU = true; //Change orientation
}




/**
 * 网格触发器（适用于 BABYLON.ActionManager）
 * 
 * 触发器名称	触发条件	参数说明	示例用途
 * BABYLON.ActionManager.NothingTrigger	            从不触发	-	用于链式动作的终止条件（.then()）
 * BABYLON.ActionManager.OnPickTrigger	            用户点击/触摸网格	-	常规点击交互
 * BABYLON.ActionManager.OnDoublePickTrigger	    用户双击/双击触摸网格	-	双击事件
 * BABYLON.ActionManager.OnPickDownTrigger	        鼠标按下或触摸开始	-	按下时的动作
 * BABYLON.ActionManager.OnPickUpTrigger	        鼠标释放或触摸结束	-	松开时的动作
 * BABYLON.ActionManager.OnPickOutTrigger	        点击网格后移出网格范围	-	移出时的动作
 * BABYLON.ActionManager.OnLeftPickTrigger	        左键点击网格	-	区分鼠标按键
 * BABYLON.ActionManager.OnRightPickTrigger	        右键点击网格	-	区分鼠标按键
 * BABYLON.ActionManager.OnCenterPickTrigger	    中键点击网格	-	区分鼠标按键
 * BABYLON.ActionManager.OnLongPressTrigger	        长按网格（时间由 BABYLON.Scene.LongPressDelay 定义）	-	长按交互
 * BABYLON.ActionManager.OnPointerOverTrigger	    鼠标悬停在网格上	   -	悬停效果（仅触发一次）
 * BABYLON.ActionManager.OnPointerOutTrigger	    鼠标离开网格	       -	悬停结束（仅触发一次）
 * BABYLON.ActionManager.OnIntersectionEnterTrigger	网格与指定网格相交时    parameter: { mesh: targetMesh, usePreciseIntersection: boolean }	碰撞检测
 * BABYLON.ActionManager.OnIntersectionExitTrigger	网格与指定网格分离时	parameter: { mesh: targetMesh, usePreciseIntersection: boolean }	碰撞结束
 */
/**
 * 场景触发器（适用于 BABYLON.Scene）
 * 触发器名称	触发条件	参数说明	示例用途
 * BABYLON.ActionManager.OnEveryFrameTrigger	每帧触发	-	持续动画或逻辑更新
 * BABYLON.ActionManager.OnKeyDownTrigger	    键盘按键按下	parameter: "keyName" 或回调函数	键盘控制
 * BABYLON.ActionManager.OnKeyUpTrigger	        键盘按键释放	parameter: "keyName" 或回调函数	键盘控制
 */


/**
 * 动作类型（Actions）
 * 
 * 基础操作
 * 动作类型	作用	参数说明	示例
 * BABYLON.SetValueAction	        直接设置属性值	target, propertyPath, value	修改材质颜色：mesh.actionManager.registerAction(new SetValueAction(..., "material.diffuseColor", BABYLON.Color3.Red()))
 * BABYLON.IncrementValueAction	    数值属性递增	target, propertyPath, incrementValue	递增计数器：...IncrementValueAction(..., "rotation.y", 0.1)
 * BABYLON.InterpolateValueAction	属性插值动画	target, propertyPath, targetValue, duration, stopOtherAnimations	平滑移动：...InterpolateValueAction(..., "position.x", 5, 1000)
 * 
 * 高级操作
 * 动作类型	作用	参数说明	示例
 * BABYLON.PlayAnimationAction	    播放动画	target, fromFrame, toFrame, loop, speedRatio	播放模型动画：...PlayAnimationAction(..., 0, 100, true)
 * BABYLON.StopAnimationAction	    停止动画	target	停止当前动画：...StopAnimationAction(mesh)
 * BABYLON.DoNothingAction	        无操作	-	用于占位或条件判断
 * BABYLON.CombineAction	        并行执行多个动作	children: Action[]	同时旋转和缩放：new CombineAction(..., [rotateAction, scaleAction])
 * BABYLON.SequenceAction	        顺序执行多个动作	children: Action[]	依次执行动作A → B → C
 * 
 * 特殊操作
 * 动作类型	作用	参数说明	示例
 * BABYLON.ExecuteCodeAction	    执行自定义代码	func: () => { \/\* 代码 \*\/ }	输出日志：...ExecuteCodeAction(..., () => console.log("Clicked"))
 * BABYLON.SetParentAction	        设置父级关系	parent	更改父物体：...SetParentAction(..., parentMesh)
 * BABYLON.PlaySoundAction	        播放音效	sound	播放音频：...PlaySoundAction(soundInstance)
 * BABYLON.StopSoundAction	        停止音效	sound	停止音频：...StopSoundAction(soundInstance)
 * BABYLON.SwitchBooleanAction	    切换布尔值	target, propertyPath	切换可见性：...SwitchBooleanAction(..., "isVisible")
 *  
 * 条件系统
 * 条件类型	作用	参数说明	示例
 * BABYLON.ValueCondition	        属性值判断	target, propertyPath, value, operator	当 position.x > 5 时触发
 * BABYLON.PredicateCondition	    自定义函数判断	predicate: () => boolean	当自定义函数返回 true 时触发
 * BABYLON.StateCondition	        状态匹配	target, stateValue	当物体状态为 "active" 时触发
 */

const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建相机
     var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 200, 400));
    camera.attachControl(canvas, true);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    camera.lowerRadiusLimit = 150;

    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    // 创建灯光
    var light1 = new BABYLON.PointLight("omni", new BABYLON.Vector3(0, 50, 0), scene);
    var light2 = new BABYLON.PointLight("omni", new BABYLON.Vector3(0, 50, 0), scene);
    var light3 = new BABYLON.PointLight("omni", new BABYLON.Vector3(0, 50, 0), scene);

    light1.diffuse = BABYLON.Color3.Red();
    light2.diffuse = BABYLON.Color3.Green();
    light3.diffuse = BABYLON.Color3.Blue();

    // Define states
    light1.state = "on";
    light2.state = "on";
    light3.state = "on";

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {
        width:1000, height:1000, subdivisions:1, updatable:true}, scene);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.specularColor = BABYLON.Color3.Black();
    ground.material = groundMaterial;

    // 创建红色的box
    var redBox = BABYLON.MeshBuilder.CreateBox("red", {size:20}, scene);
    var redMat = new BABYLON.StandardMaterial("red", scene);
    // 漫反射与高光都设置为灰色
    redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    redMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // 自发光颜色为红色
    redMat.emissiveColor = BABYLON.Color3.Red();
    redBox.material = redMat;
    redBox.position.x -= 100;

    // 创建绿色的box
    var greenBox = BABYLON.MeshBuilder.CreateBox("green", {size:20}, scene);
    var greenMat = new BABYLON.StandardMaterial("green", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // 自发光颜色为绿色
    greenMat.emissiveColor = BABYLON.Color3.Green();
    greenBox.material = greenMat;
    greenBox.position.z -= 100;

    // 创建蓝色的box
    var blueBox = BABYLON.MeshBuilder.CreateBox("blue", {size:20}, scene);
    var blueMat = new BABYLON.StandardMaterial("blue", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();
    blueBox.material = blueMat;
    blueBox.position.x += 100;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {segments:16, diameter:20}, scene);
    var sphereMat = new BABYLON.StandardMaterial("purple", scene);
    sphereMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    sphereMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    sphereMat.emissiveColor = BABYLON.Color3.Purple();
    sphere.material = sphereMat;
    sphere.position.z += 100;

    // 创建一个甜甜圈
    var donut = BABYLON.MeshBuilder.CreateTorus("donut", {diameter:20, thickness:8, tessellation:16}, scene);

    // On pick interpolations
    var prepareButton = function (mesh:BABYLON.Mesh, color:BABYLON.Color3, light:BABYLON.Light) {
       
        // 定义一个action
        var goToColorAction = new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
             light,
            "diffuse",
             color,
            1000,
            undefined, 
            true);

        // 对象是活动管理器    
        mesh.actionManager = new BABYLON.ActionManager(scene);
   
        mesh.actionManager.registerAction( 
            new BABYLON.InterpolateValueAction(
                // 漫反射光渐变为黑色
                BABYLON.ActionManager.OnPickTrigger, 
                light, 
                "diffuse", 
                BABYLON.Color3.Black(), 
                1000))
            ?.then(
                new BABYLON.CombineAction(
                    BABYLON.ActionManager.NothingTrigger, [ // Then is used to add a child action used alternatively with the root action. 
                   goToColorAction,                                                 // First click: root action. Second click: child action. Third click: going back to root action and so on...   
                    new BABYLON.SetValueAction(
                        BABYLON.ActionManager.NothingTrigger, 
                        mesh.material, 
                        "wireframe", 
                        false
                    )
            ]));

        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                // 鼠标点击触发
                BABYLON.ActionManager.OnPickTrigger, 
                mesh.material, 
                "wireframe", 
                true))
            ?.then(new BABYLON.DoNothingAction());


        mesh.actionManager.registerAction(
            new BABYLON.SetStateAction(
                // 鼠标点击触发 
                BABYLON.ActionManager.OnPickTrigger, 
                light, 
                "off"))
            ?.then(
                new BABYLON.SetStateAction(
                BABYLON.ActionManager.OnPickTrigger, light, "on"
                ));
    }

    // 
    prepareButton(redBox, BABYLON.Color3.Red(), light1);
    prepareButton(greenBox, BABYLON.Color3.Green(), light2);
    prepareButton(blueBox, BABYLON.Color3.Blue(), light3);

    // Conditions
    sphere.actionManager = new BABYLON.ActionManager(scene);
    var condition1 = new BABYLON.StateCondition(sphere.actionManager as BABYLON.ActionManager,
         light1, "off");
    var condition2 = new BABYLON.StateCondition(sphere.actionManager as BABYLON.ActionManager, 
        light1, "on");

    sphere.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnLeftPickTrigger, 
            camera, 
            "alpha", 
            0, 
            500, 
            condition1
        ));
    sphere.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnLeftPickTrigger,
            camera,
            "alpha",
             Math.PI,
            500,
            condition2
            ));

    // Over/Out
    var makeOverOut = function (mesh:BABYLON.Mesh) {
        // 鼠标移出触发
        mesh.actionManager!.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnPointerOutTrigger, 
                mesh.material, 
                // 改变自发光
                "emissiveColor", 
                (mesh.material as BABYLON.StandardMaterial).emissiveColor
        ));
        // 鼠标移入
        mesh.actionManager!.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                mesh.material,
                "emissiveColor",
                BABYLON.Color3.White()
            ));

        // 鼠标移出触发
        mesh.actionManager!.registerAction(
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                 mesh,
                "scaling",
                new BABYLON.Vector3(1, 1, 1),
                150
            ));
         // 鼠标移入
        mesh.actionManager!.registerAction(
             // 动态线性更改值
            new BABYLON.InterpolateValueAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                 mesh,
                 // 改变缩放
                "scaling",
                 new BABYLON.Vector3(1.1, 1.1, 1.1),
                150
            ));
    }

    // 鼠标相关事件
    makeOverOut(redBox);
    makeOverOut(greenBox);
    makeOverOut(blueBox);
    makeOverOut(sphere);

    // scene's actions
    scene.actionManager = new BABYLON.ActionManager(scene);

    var rotate = function (mesh:BABYLON.Mesh) {
        scene.actionManager.registerAction(
            new BABYLON.IncrementValueAction(
                // 每一帧触发
                BABYLON.ActionManager.OnEveryFrameTrigger,
                 mesh,
                "rotation.y",
                0.01
            ));
    }

    // 每帧自动旋转
    rotate(redBox);
    rotate(greenBox);
    rotate(blueBox);

    // Intersections
    donut.actionManager = new BABYLON.ActionManager(scene);

    donut.actionManager.registerAction(
        new BABYLON.SetValueAction(
        { 
            // 发生碰撞事触发
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, 
            // 碰撞对象
            parameter: sphere 
        },
        donut, 
        "scaling", 
        new BABYLON.Vector3(1.2, 1.2, 1.2)
    ));

    donut.actionManager.registerAction(
        new BABYLON.SetValueAction(
        { 
            // 离开碰撞时事件
            trigger: BABYLON.ActionManager.OnIntersectionExitTrigger, 
             // 碰撞对象
            parameter: sphere 
        }, 
        donut, 
        "scaling", 
        new BABYLON.Vector3(1, 1, 1)
    ));

    // Animations
    var alpha = 0;
    scene.registerBeforeRender(function () {
        donut.position.x = 100 * Math.cos(alpha);
        donut.position.y = 5;
        donut.position.z = 100 * Math.sin(alpha);
        alpha += 0.01;
    });

}