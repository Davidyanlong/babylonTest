import { BABYLON, GUI } from "../../base/commonIncludes";


// 碰撞时间相关案例
export const boundingboxComputeShaderScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    // 创建场景
    var scene = new BABYLON.Scene(engine);
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);


    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    const url = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/alien.glb";
    BABYLON.ImportMeshAsync(url,  scene).then(()=>{

          for (var mesh of scene.meshes) {
        mesh.showBoundingBox = true;
    }

    // 显示包围盒
    var BBHelper = new BABYLON.BoundingInfoHelper(engine);

    scene.onBeforeRenderObservable.add(async () => {
        var now = new Date();
        // 计算包围盒
        await BBHelper.computeAsync(scene.meshes);
        //console.log(new Date() - now);
    });
    })

  

    return scene;
}