import { BABYLON } from "../base/commonIncludes";

// 场景基本的构建方法
export const heightMapDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 200, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(4, 1, 0));

    // 增加村庄的地面，增加一个 ground 层
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;
    // 村庄的地面
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:24, height:24});
    ground.material = groundMat;

    // 地形材质
    const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/valleygrass.png");
 
    
    // 根据 heightmap 创建地形  CreateGroundFromHeightMap
    const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap(
         "largeGround", 
        "https://assets.babylonjs.com/environments/villageheightmap.png", 
        { width:150, height:150, subdivisions: 20, minHeight:0, maxHeight: 10});
    
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;


    return scene;
};