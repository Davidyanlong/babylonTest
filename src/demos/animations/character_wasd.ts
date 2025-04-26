import { BABYLON, dat} from "../../base/commonIncludes";

// 场景基本的构建方法
export const WASD_characterAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    // Low Poly Character with Blender Tutorial of Grant Abbitt: https://www.youtube.com/user/mediagabbitt
    // Character animations by Mixamo: https://www.mixamo.com/

    // 关闭 离线缓存
    engine.enableOfflineSupport = false;

    // Scene and Camera
    var scene = new BABYLON.Scene(engine);

    var camera1 = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, -5, 0), scene);
    // 场景相机
    scene.activeCamera = camera1;
    scene.activeCamera.attachControl(canvas, true);
    // 相机的最小半径
    camera1.lowerRadiusLimit = 2;
    // 相机的最大半径
    camera1.upperRadiusLimit = 10;

    // 鼠标滚轮的增加减少系数
    camera1.wheelDeltaPercentage = 0.01;

    // 灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.6;
    light.specular = BABYLON.Color3.Black();

    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    light2.position = new BABYLON.Vector3(0, 5, 5);

    // 天空
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // 地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { height: 50, width: 50, subdivisions: 4 }, scene);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/wood.jpg", scene);
    (groundMaterial.diffuseTexture as BABYLON.Texture).uScale = 30;
    (groundMaterial.diffuseTexture as BABYLON.Texture).vScale = 30;
    groundMaterial.specularColor = new BABYLON.Color3(.1, .1, .1);
    ground.material = groundMaterial;

    const gui = new dat.GUI();
    const aniGUI= gui.addFolder('动画');
    aniGUI.open();

   // 注册键盘事件
   var inputMap:Record<string, boolean> = {};
   // 新建事件管理
   scene.actionManager = new BABYLON.ActionManager(scene);
   // 注册键盘按下的事件
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
       inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      
   }));

   // 注册键盘弹起的事件
   scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
    // 这里的   evt.sourceEvent.type 是keyup 将动画按键设置为 false
    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
   }));


   // 导入人物
   BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/HVGirl.glb", scene).then(
    
     (result:BABYLON.ISceneLoaderAsyncResult)=>{
       var hero = result.meshes[0];

       //Scale the model down        
       hero.scaling.scaleInPlace(0.1);

       //Lock camera on the character 
       camera1.target = hero.position;

       // 任务操作相关变量 
       var heroSpeed = 0.03;
       var heroSpeedBackwards = 0.01;
       var heroRotationSpeed = 0.1;

       // 动画状态
       var animating = true;

       // 任务的左右动画
       const walkAnim = scene.getAnimationGroupByName("Walking") as BABYLON.AnimationGroup; 
       const walkBackAnim = scene.getAnimationGroupByName("WalkingBack") as BABYLON.AnimationGroup;
       const idleAnim = scene.getAnimationGroupByName("Idle") as BABYLON.AnimationGroup;
       const sambaAnim = scene.getAnimationGroupByName("Samba") as BABYLON.AnimationGroup;

       
       // 渲染前逐帧调用
       scene.onBeforeRenderObservable.add(() => {
        var keydown = false;
        // 相前运动
        if (inputMap["w"]) {
            console.log('wwww')
            // 向前移动，并计算碰撞 
            hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
            keydown = true;
        }
        if (inputMap["s"]) {
            // 向后移动 
            hero.moveWithCollisions(hero.forward.scaleInPlace(-heroSpeedBackwards));
            keydown = true;
        }
        if (inputMap["a"]) {
            // 绕 Y 轴 向左转
            hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
            keydown = true;
        }
        if (inputMap["d"]) {
            // 绕 Y z轴 相右转
            hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
            keydown = true;
        }
        if (inputMap["b"]) {
            // 跳舞
            keydown = true;
        }

        // 如果设定的健被按下
        if (keydown) {
            // 判断动画状态
            if (!animating) {
                // 开启
                animating = true;
                if (inputMap["s"]) {
                    // 开始播放向后的动画
                    //Walk backwards
                    walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
                }
                else if
                    (inputMap["b"]) {
                    // 开始跳舞， Samba!
                    sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
                }
                else {
                    // 开始行走
                    //Walk
                    walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                }
            }
        }
        else {

            // 如果动画是开启中
            if (animating) {
                //Default animation is idle when no key is down    
                // 播放初始状动画 
                idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

                // 停止其他的动画
                sambaAnim.stop();
                walkAnim.stop();
                walkBackAnim.stop();

                // 动画状态关闭
                animating = false;
            }
        }
    });

    });


    return scene;
};