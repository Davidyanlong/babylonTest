import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const loadingUIScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 启动loading UI
    engine.displayLoadingUI();
    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    BABYLON.ImportMeshAsync(
        "https://models.babylonjs.com/CornellBox/cornellBox.glb",
        scene).then(
        ()=> {
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();
            (scene.activeCamera as BABYLON.ArcRotateCamera).alpha = Math.PI / 2;
            engine.hideLoadingUI();
        });

    return scene;
};


BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    // @ts-ignore
    if (this._isLoading) {
        // Do not add a loading screen if it is already loading
        return;
    }
    // @ts-ignore
    this._isLoading = true;
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "customLoadingScreenDiv";
    loadingDiv.innerHTML = "scene is currently loading";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #BB464Bcc;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
     // @ts-ignore
    this._loadingDivToRenderingCanvasMap.set(loadingDiv, [document.getElementById('renderCanvas'), null]);
     // @ts-ignore
    this._resizeLoadingUI();
     // @ts-ignore
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
     // @ts-ignore
    document.getElementById('customLoadingScreenDiv').remove();
     // @ts-ignore
    this._loadingDivToRenderingCanvasMap.clear();
     // @ts-ignore
    this._isLoading = false;
    console.log("scene is now loaded");
}