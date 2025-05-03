import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const switchingScenes = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

   /*
     * 第一个场景
     */
   var firstScene = new BABYLON.Scene(engine);
   // 场景的清屏色
   firstScene.clearColor = new BABYLON.Color4(0.03, 0.03, 0.55, 1);
   // 第一个相机
   var firstSceneCamera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, new BABYLON.Vector3(0, 0, -0), firstScene);
   // 设置相机的位置
   firstSceneCamera.setPosition(new BABYLON.Vector3(0, 20, -100));
   // 相机绑定事件
   firstSceneCamera.attachControl(canvas, true);
   // 添加点光源
   var firstSceneLight = new BABYLON.PointLight("firstSceneLight", new BABYLON.Vector3(5, 5, -5));
   //  点光源的强度
   firstSceneLight.intensity = 0.75;
   // 高光的颜色
   firstSceneLight.specular = new BABYLON.Color3(0.95, 0.95, 0.81);
    // 创建TorusKnot
   var firstSceneObject = BABYLON.MeshBuilder.CreateTorusKnot("scene0Object", {radius: 3, tube: 1}, firstScene);


   /*
    * 第二个场景
    */
   var secondScene = new BABYLON.Scene(engine);
   secondScene.clearColor = new BABYLON.Color4(0.67, 0.47, 0.16, 1);
   // 创建相机
   var camera2 = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), secondScene);
   camera2.attachControl(canvas, true);

   // 半球光
   var secondSceneLight = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), secondScene);
   // 半球光的强度
   secondSceneLight.intensity = 0.8;


   // 创建一个球
   var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", { segments: 3 }, secondScene);
   sphere1.position.y = 1;
   sphere1.material = new BABYLON.StandardMaterial("mat1", secondScene);
   // 材质显示三角面
   sphere1.material.wireframe = true;

   // 创建第二个球
   var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", { segments: 6 }, secondScene);
   sphere2.convertToFlatShadedMesh();
   sphere2.position.y = -1;
   sphere2.material = new BABYLON.StandardMaterial("mat2", secondScene);
   // 材质显示三角面
   sphere2.material.wireframe = true;


   /*
    * GUI SCENE
    * 创建第三个场景
    */
   var guiScene = new BABYLON.Scene(engine);
   // MARK THE GUI SCENE AUTO CLEAR AS FALSE SO IT DOESN'T ERASE
   // THE CURRENTLY RENDERING SCENE
   // 关闭自动清屏
   guiScene.autoClear = false;
   // 创建自由相机
   var guiCamera = new BABYLON.FreeCamera("guiCamera", new BABYLON.Vector3(0,0,0), guiScene);

   var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, guiScene);


   // 创建一个按钮
   var button = GUI.Button.CreateSimpleButton("but", "Switch active scene");
   button.width = "200px";
   button.height = "40px";
   button.color = "white";
   button.background = "green";
   button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
   advancedTexture.addControl(button);

   // 设置当前场景为第一个场景
   var currentActiveScene = firstScene;
   button.onPointerUpObservable.add(function () {
        // 切换场景
       if (currentActiveScene === firstScene) {
           currentActiveScene = secondScene;
       } else {
           currentActiveScene = firstScene;
       }
   });

   //runRenderLoop inside a setTimeout is neccesary in the Playground
   //to stop the PG's runRenderLoop.
   setTimeout(function () {
       engine.stopRenderLoop();

       engine.runRenderLoop(function () {
           // 渲染当前场景  
           currentActiveScene.render();
           // 渲染GUI按钮场景
           guiScene.render();
       });
   }, 500);

   return firstScene;
};

//
const demo = ()=>{
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("Camera0", 0, 0.8, 5, new BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 20;

    var camera1 = new BABYLON.ArcRotateCamera("Camera1", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    var camera2 = new BABYLON.ArcRotateCamera("Camera2", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    var camera3 = new BABYLON.ArcRotateCamera("Camera3", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(document.getElementById("renderCanvas0"), true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    var box = BABYLON.MeshBuilder.CreateBox("Box", {size: 2}, scene);

    box.position.y = 0.5;

    var mat = new BABYLON.PBRMetallicRoughnessMaterial("mat", scene);

    mat.metallic = 1;
    mat.roughness = 0.5;

    box.material = mat;

    scene.createDefaultEnvironment();
    
    engine.registerView(document.getElementById("renderCanvas0"));
    engine.registerView(document.getElementById("renderCanvas1"), camera1);
    engine.registerView(document.getElementById("renderCanvas2"), camera2);
    engine.registerView(document.getElementById("renderCanvas3"), camera3);

    // Some animations
    var alpha = 0;
    scene.registerBeforeRender(() => {
        camera1.radius = 10 + Math.cos(alpha) * 5;
        camera2.alpha += 0.01;
        camera3.beta = Math.cos(alpha);

        alpha += 0.01;
    })

    return scene;
}