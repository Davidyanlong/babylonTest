import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const normalMapScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 异步导入列表
    var promises = [];

    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", BABYLON.Tools.ToRadians(-270), BABYLON.Tools.ToRadians(90), 10, new BABYLON.Vector3(0,0,0), scene);

    // 设置事件
    camera.attachControl(canvas, true);

    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1);

    // 创建DX 格式的材质节点
    // DirectX format normal texture in node material
    var directXMat = new BABYLON.NodeMaterial("directXMat", scene, { emitComments: false });
   
    // 创建DX 格式的材质 使用反转UV的v值
    // DirectX format normal texture in node material with inverted V in UVs
    var directX_invMat = new BABYLON.NodeMaterial("directX_invMat", scene, { emitComments: false });

    // 创建直射灯
    var dirLight1 = new BABYLON.DirectionalLight("dirLight1", new BABYLON.Vector3(0, 0, 0), scene);
    // 设置灯光的方向
    dirLight1.direction = new BABYLON.Vector3(0.5, -0.75, -0.4);
    // 设置灯光的强度
    dirLight1.intensity = 1.0;

    // Load assets 
    promises.push(BABYLON.SceneLoader.AppendAsync("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/forum/normalFormat/normalFormatTest.glb"));
    promises.push(BABYLON.SceneLoader.AppendAsync("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/forum/normalFormat/normalFormatTest.babylon"));
    promises.push(directXMat.loadAsync("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/forum/normalFormat/directXnodeMat.json"));
    promises.push(directX_invMat.loadAsync("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/forum/normalFormat/directXNode_InvertY_Mat.json"));

    // Callback when assets are loaded
    Promise.all(promises).then(function() {

        // Meshes
        var directXMesh = scene.getMeshByName("directX");
        var babylonDXMesh = scene.getMeshByName("directX1_babylon");

        //Build and assign node materials
        directX_invMat.build(true);
        directXMat.build(true);

        directXMesh!.material = directXMat;
        babylonDXMesh!.material = directX_invMat;

        //display loading screen while loading assets
        // engine.displayLoadingUI();  
        // scene.executeWhenReady(function() {
        //     engine.hideLoadingUI();
        // });
    });

    scene.debugLayer.show();

    return scene;
}