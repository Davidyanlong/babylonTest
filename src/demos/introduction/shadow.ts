import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const shawdowDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    const  scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", -3 * Math.PI / 4, Math.PI / 3, 50, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    
    // 创建直射灯
    const  light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
    // 阴影投影的时候作为阴影相机的位置
    light.position = new BABYLON.Vector3(0, 15, -30);

    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width:100, height:100, subdivisions: 1, updatable:false}, scene);
    // 接受阴影
    ground.receiveShadows = true;

    // 阴影生成器， 阴影贴图大小为1024 * 1024 投影灯光 light 
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
      
    // 导入任务 DUDE
    BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/Dude/Dude.babylon", scene).then((result) =>{
        var dude = result.meshes[0];
        // 缩小
        dude.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
            
        // 添加到投影Meshes 
        shadowGenerator.addShadowCaster(dude, true);
            
        // 播放骨骼动画
        scene.beginAnimation(result.skeletons[0], 0, 100, true);
    });

    return scene;
}