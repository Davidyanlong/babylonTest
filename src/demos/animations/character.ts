import { BABYLON, dat} from "../../base/commonIncludes";

// 场景基本的构建方法
export const characterAnimationDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
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

    // 导入 hero 动画人物
    BABYLON.ImportMeshAsync("https://assets.babylonjs.com/meshes/HVGirl.glb", scene).then(function (result) {
        var hero = result.meshes[0];

        // 缩小模型   this = this * 0.1     
        hero.scaling.scaleInPlace(0.1);

        // 锁定相机的视角到人物
        camera1.target = hero.position;

          // 得到动画组
          let sambaAnim = scene.getAnimationGroupByName("Samba") as BABYLON.AnimationGroup;

        aniGUI.add({animation:"Samba"},'animation',['Idle','Samba', 'Walking', 'WalkingBack'])
        .onChange((v)=>{
                console.log(v);
                sambaAnim.stop();
                  // 得到动画组
                sambaAnim = scene.getAnimationGroupByName(v) as BABYLON.AnimationGroup;
                sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);

        })

      // 播放动画
        sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);

        

    });

    return scene;
};