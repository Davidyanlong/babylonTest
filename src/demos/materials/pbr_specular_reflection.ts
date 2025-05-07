import { BABYLON } from "../../base/commonIncludes";


const server = "https://assets.babylonjs.com/";   
// create camera and lights for scene
const lights:Record<string, any> = {};
const env:Record<string, any> = {};
const camera:Record<string, any> = {};


    // load or create meshes in scene
    const assets:Record<string, any> = { };
    const meshes:Record<string, any> = {};

       // create materials for scene meshes
    // ignore textures embedded in shader when loading
    BABYLON.NodeMaterial.IgnoreTexturesAtLoadTime = true;
    const materials:Record<string, any> = {};

// 场景基本的构建方法
export const pbrSpecularReflectionScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    assets.manager = new BABYLON.AssetsManager(scene)
    // scene logic
    initScene(scene, canvas);
    loadAssets(scene);

    return scene;
}



async function initScene(scene: BABYLON.Scene,   canvas:HTMLCanvasElement) {
    // color of scene when no skybox present
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(20, 20, 25));

    // 创建轨道相机
    camera.main = new BABYLON.ArcRotateCamera("camera", Math.PI/2, Math.PI/2, 15, new BABYLON.Vector3(0.0, 0.0, 0.0), scene);
    camera.main.minZ = 0.1;
    camera.main.wheelDeltaPercentage = 0.1;
    camera.main.attachControl(canvas, true);

    // 添加 IBL 环境光照
    env.lighting = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/Studio_Softbox_2Umbrellas_cube_specular.env", scene);
    env.lighting.name = "studioIBL";
    env.lighting.gammaSpace = false;
    // 绕 Y 轴旋转
    env.lighting.rotationY = 1.9;
    // 设置环境光贴图
    scene.environmentTexture = env.lighting;
    // 环境光系数
    scene.environmentIntensity = 1.0;

    // 设置直射光
    lights.dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0.45, -0.34, -0.83), scene);
    lights.dirLight.position = new BABYLON.Vector3(0, 3, 5);
    lights.dirLight.shadowMinZ = 3.5;
    lights.dirLight.shadowMaxZ = 12;
}   


async function loadAssets(scene:BABYLON.Scene) {
    // mesh tasks
    assets.shaderBallGroup = assets.manager.addMeshTask("load shaderBall group", "", server + "meshes/Demos/pbr_mr_specular","shaderBall_rotation.glb");

    // texture tasks
    assets.reflectanceTexture = assets.manager.addTextureTask("load reflectance texture", server + "meshes/Demos/pbr_mr_specular/reflectanceColorTex.png", false, false, BABYLON.Texture.NEAREST_NEAREST);
    assets.metallicReflectanceTexture = assets.manager.addTextureTask("load reflectance texture", server + "meshes/Demos/pbr_mr_specular/metallicReflectanceTex.png", false, false, BABYLON.Texture.NEAREST_NEAREST);

    // call all loading tasks
    assets.manager.load();

    // task error handling
    assets.manager.onTaskErrorObservable.add(function(task:any) {
        console.log("error on task " + task.name);
        console.log(task.errorObject.message, task.errorObject.exception);
    });

    // when all tasks are complete
    assets.manager.onFinish = (tasks:any) => {
        console.log("all tasks finished", tasks);

        // get shaderball mesh and root
        meshes.shaderBallMiddleRoot = assets.shaderBallGroup.loadedMeshes[0];
        meshes.shaderBallMiddleRoot.name = "shaderBallMiddleRoot";
        meshes.shaderBallMiddleMesh = meshes.shaderBallMiddleRoot.getChildMeshes()[0];
        meshes.shaderBallMiddleMesh.material.dispose();

        meshes.shaderBallUpperRoot = meshes.shaderBallMiddleRoot.clone("shaderBallUpperRoot");
        meshes.shaderBallUpperMesh = meshes.shaderBallUpperRoot.getChildMeshes()[0];
        meshes.shaderBallUpperRoot.position.y = 3;

        meshes.shaderBallLowerRoot = meshes.shaderBallMiddleRoot.clone("shaderBallLowerRoot");
        meshes.shaderBallLowerMesh = meshes.shaderBallLowerRoot.getChildMeshes()[0];
        meshes.shaderBallLowerRoot.position.y = -3;

        createMaterials(scene);
    };
}


async function createMaterials(scene:BABYLON.Scene) {


    /**
     * 关键参数解析​​
     * 1. metallicF0Factor（金属 F0 因子）
     * ​​作用​​：与 metallicReflectanceColor 相乘，控制镜面反射强度。
     * ​​默认值​​：1.0（完全保留颜色通道的反射强度）。
     * 
     * 2. metallicReflectanceColor（金属反射颜色）
     * ​​作用​​：定义 F0 处的镜面反射颜色。当表面法线接近 F90 时，此颜色会渐变为白色。
     * ​​默认值​​：RGB(1,1,1)（白色，表示全反射）。
     * 
     * 3. metallicReflectanceTexture（金属反射纹理）
     * ​​作用​​：RGB 通道存储 metallicReflectanceColor，Alpha 通道存储 metallicF0Factor。
     * ​​使用场景​​：
     * 在引擎内直接创建材质时，可同时控制颜色和强度。
     * 若使用 glTF 的 KHR_materials_specular 扩展纹理，需将其设为 specularTexture。
     * 
     * 4. reflectanceTexture（反射颜色纹理）
     * ​​作用​​：RGB 通道存储镜面反射颜色，需与 metallicReflectanceTexture 或 useOnlyMetallicFromMetallicReflectanceTexture 配合使用。
     * ​​优先级​​：若同时指定了 metallicReflectanceTexture，则此纹理被忽略。
     * 
     * 5. useOnlyMetallicFromMetallicReflectanceTexture（仅从金属反射纹理获取金属度）
     * ​​作用​​：若启用，仅使用 metallicReflectanceTexture 的 Alpha 通道计算金属度。
     * ​​适用场景​​：兼容 glTF KHR_materials_specular 扩展的纹理。
     */



    // metallicReflectanceTexture.rgb * metallicReflectanceColor.rgb scaled by metallicF0Factor * metallicReflectanceTexture.a
    // metallicReflectanceTexture contributes to both reflectance color and F0 scalar
    // left to right metallicReflectanceTexture colors are blue, red, yellow, green with reduced F0 scalar in the same order
    materials.shaderBallUpper = new BABYLON.PBRMaterial("shaderBallUpper", scene);
    // 基础颜色
    materials.shaderBallUpper.albedoColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(50, 50, 50).toLinearSpace());
    // 金属度
    materials.shaderBallUpper.metallic = 0.0;
    // 粗糙度
    materials.shaderBallUpper.roughness = 0.15;
    // F0 系数
    materials.shaderBallUpper.metallicF0Factor = 0.95;
    // 反射颜色
    materials.shaderBallUpper.metallicReflectanceColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(255, 250, 250).toLinearSpace());
    // 金属反射强度
    materials.shaderBallUpper.metallicReflectanceTexture = assets.metallicReflectanceTexture.texture;

    // reflectanceTexture.rgb * metallicReflectanceColor.rgb scaled by metallicF0Factor
    // reflectanceTexture contributes to reflectance color only
    // left to right reflectanceTexture colors are yellow, blue, green, red 
    materials.shaderBallMiddle = new BABYLON.PBRMaterial("shaderBallMiddle", scene);
    // 基础颜色
    materials.shaderBallMiddle.albedoColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(50, 50, 50).toLinearSpace());
    // 金属度
    materials.shaderBallMiddle.metallic = 0.0;
    // 粗糙度
    materials.shaderBallMiddle.roughness = 0.15;
    // F0 系数
    materials.shaderBallMiddle.metallicF0Factor = 0.95;
    // 反射颜色
    materials.shaderBallMiddle.metallicReflectanceColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(255, 250, 250).toLinearSpace());
    // 反射颜色纹理
    materials.shaderBallMiddle.reflectanceTexture = assets.reflectanceTexture.texture;


    // reflectanceTexture.rgb * metallicReflectanceColor.rgb scaled by metallicF0Factor * metallicReflectanceTexture.a
    // reflectanceTexture contributes to reflectance color and metallicReflectanceTexture alpha contributes to F0 scalar
    // left to right reflectanceTexture colors are yellow, blue, green, red and metallicReflectanceTexture alpha reduced 
    // F0 scalar in the same order
    materials.shaderBallLower = new BABYLON.PBRMaterial("shaderBallLower", scene);
    // 基础色
    materials.shaderBallLower.albedoColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(50, 50, 50).toLinearSpace());
    // 金属度
    materials.shaderBallLower.metallic = 0.0;
    // 粗糙度
    materials.shaderBallLower.roughness = 0.15;
    // F0 系数 
    materials.shaderBallLower.metallicF0Factor = 0.95;
    // 反射颜色
    materials.shaderBallLower.metallicReflectanceColor = BABYLON.Color4.FromColor3( BABYLON.Color3.FromInts(255, 250, 250).toLinearSpace());
    // 金属度反射强度
    materials.shaderBallLower.metallicReflectanceTexture = assets.metallicReflectanceTexture.texture;
    // 反射纹理
    materials.shaderBallLower.reflectanceTexture = assets.reflectanceTexture.texture;
    // if both metallicReflectanceTexture and reflectanceTexture are both assigned, metallicReflectanceTexture will be used for both 
    // reflectance color and F0 scalar by default unless useOnlyMetallicFromMetallicReflectanceTexture is set to true in which case 
    // metallicReflectanceTexture.a will will contribute to the F0 scalar and reflectanceTexture will contribute to the reflectance color
    // 金属反射使用 金属反射纹理
    materials.shaderBallLower.useOnlyMetallicFromMetallicReflectanceTexture = true;

    // assign material to mesh
    meshes.shaderBallUpperMesh.material = materials.shaderBallUpper;
    meshes.shaderBallMiddleMesh.material = materials.shaderBallMiddle;
    meshes.shaderBallLowerMesh.material = materials.shaderBallLower;
}