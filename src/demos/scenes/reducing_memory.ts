import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const reducingMemoryScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // 启用indexeddb
    engine.enableOfflineSupport = false;
    // 通过上下文丢失，去掉GPU资源的占用
    engine.doNotHandleContextLost = true;

    async function loadAsset() {
        // 加载一个模型
        var container = await BABYLON.LoadAssetContainerAsync("https://www.babylonjs.com/Assets/DamagedHelmet/glTF/DamagedHelmet.gltf", scene);
        // 添加到场景
        container.addAllToScene();
   
        // 设置默认的相机与灯光
        scene.createDefaultCameraOrLight(true, true, true);

        // 清理CPU端的顶点数据
        scene.clearCachedVertexData();
        // 清理相关的buffer
        scene.cleanCachedTextureBuffer();

        // scene.executeWhenReady(function () {
        //     engine.runRenderLoop(function () {
        //         scene.render();
        //     });
        // });
    }

    loadAsset();

    return scene;
};

