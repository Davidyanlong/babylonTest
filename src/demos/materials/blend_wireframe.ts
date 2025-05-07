import { BABYLON } from "../../base/commonIncludes";



const server = "https://patrickryanms.github.io/BabylonJStextures/Demos/wireframeBlend/";   
 
// create camera and lights for scene
const lights:Record<string, any>= {};
const env:Record<string, any> = {};
const camera:Record<string, any> = {};

const assets:Record<string, any> = {};
const meshes:Record<string, any> = {};


const materials:Record<string, any> = {};
const textures:Record<string, any> = {};
const anim:Record<string, any> = {};


// 场景基本的构建方法
export const blendWireFrameScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    
     // This creates a basic Babylon Scene object (non-mesh)


         // scene logic
    initScene(scene);
    loadAssets(scene);
        
    return scene;
}


async function initScene(scene:BABYLON.Scene) {
    // color of scene when no skybox present
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.FromInts(30, 30, 35));

    // 创建一个轨道相机
    camera.main = new BABYLON.ArcRotateCamera("camera", 1.0, 1.03, 9, new BABYLON.Vector3(0.0, 0.0, 0.0), scene);
    // 最小值Z 
    camera.main.minZ = 0.1;
    // 滚轮参数
    camera.main.wheelDeltaPercentage = 0.1;
    // 绑定事件
    camera.main.attachControl(true);

    // 创建要给IBL 环境光
    env.lighting = BABYLON.CubeTexture.CreateFromPrefilteredData(server + "assets/env/studio.env", scene);
    // 设置名称
    env.lighting.name = "studioIBL";
    // 关闭gamma 转换
    env.lighting.gammaSpace = false;
    // 绕Y轴旋转 1.9
    env.lighting.rotationY = 1.9;
    // 设置场景的环境光贴图
    scene.environmentTexture = env.lighting;
    // 设置环境光强度
    scene.environmentIntensity = 1.0;

    // 定义直射光，为阴影
    lights.dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0.34, -0.6, -0.7), scene);
    // 设置直射光的位置
    lights.dirLight.position = new BABYLON.Vector3(0, 3, 5);
    // 设置光的强度
    lights.dirLight.intensity = 3.5;
}   

async function loadAssets(scene:BABYLON.Scene) {
    
    assets.manager= new BABYLON.AssetsManager(scene)
    
    // 创建一个球
    assets.spheres = assets.manager.addMeshTask("load spheres", "", server + "assets/gltf/sphereGrid.glb");

    // shader tasks
    assets.pbrDistanceText = assets.manager.addTextFileTask("pbrDistance", server + "assets/shaders/pbr_distance_shader.json");
    assets.wireframeAlphaText = assets.manager.addTextFileTask("wireframeAlpha", server + "assets/shaders/wireframe_alpha_shader.json");

    // 执行所有的导入任务
    assets.manager.load();

    //  资产导入错误是调用
    assets.manager.onTaskErrorObservable.add(function(task:any) {
        console.log("error on task " + task.name);
        console.log(task.errorObject.message, task.errorObject.exception);
    });

    // 资产加载完成
    assets.manager.onFinish = (tasks:any) => {
        console.log("all tasks finished", tasks);

        // 得到导入的球Mesh
        meshes.spheresMesh = assets.spheres.loadedMeshes[0].getChildMeshes()[0];
        meshes.spheresWireframe = meshes.spheresMesh.clone("spheresWireframe");

        // parse as json
        assets.pbrDistanceJSON = JSON.parse(assets.pbrDistanceText.text);
        assets.wireframeAlphaJSON = JSON.parse(assets.wireframeAlphaText.text);

        createMaterials(scene);
    };
}


async function createMaterials(scene:BABYLON.Scene) {

    BABYLON.NodeMaterial.IgnoreTexturesAtLoadTime = true;
    // 创建PBR材质
    materials.pbrDistance = BABYLON.NodeMaterial.Parse(assets.pbrDistanceJSON, scene);
    // 设置名称
    materials.pbrDistance.name = "pbrDistance";

    // 获取纹理
    // 基础色
    textures.baseColor = meshes.spheresMesh.material.albedoTexture;
    // 法线纹理
    textures.normal = meshes.spheresMesh.material.bumpTexture;
    // 金属度纹理
    textures.orm = meshes.spheresMesh.material.metallicTexture;

    // 设置纹理
    materials.pbrDistance.getBlockByName("baseColorTex").texture = textures.baseColor;
    materials.pbrDistance.getBlockByName("normalTex").texture = textures.normal;
    materials.pbrDistance.getBlockByName("ormTex").texture = textures.orm;

    // 为动画得到半径
    materials.pbrDistance_radius = materials.pbrDistance.getBlockByName("radius");

    // 设置纹理
    meshes.spheresMesh.material = materials.pbrDistance;

    // 材质三角网格
    materials.wireframeAlpha = BABYLON.NodeMaterial.Parse(assets.wireframeAlphaJSON, scene);
    // 名称
    materials.wireframeAlpha.name = "wireframeAlpha";

    // 设置开启三角网格
    materials.wireframeAlpha.wireframe = true;

    // get radius Float node for animation
    materials.wireFrameAlpha_radius = materials.wireframeAlpha.getBlockByName("radius");

    // assign node material to wireframe mesh
    meshes.spheresWireframe.material = materials.wireframeAlpha;

    // create reveal animation
    createReveal();
}

function createReveal() {
    // 关键帧
    anim.keys = [
        { frame: 0, value: 3.0 },
        { frame: 120, value: 0.0 },
        { frame: 240, value: 3.0 }
    ];

    // create animation group to be able to start/stop both animations together
    anim.group = new BABYLON.AnimationGroup("revealGroup");

    // create one animation per mesh using the same parameters to match reveal
    const baseColorAnim = createAnimation("revealAnim", materials.pbrDistance_radius, BABYLON.Animation.ANIMATIONTYPE_FLOAT, "value", anim.keys, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE, BABYLON.EasingFunction.EASINGMODE_EASEINOUT, new BABYLON.QuadraticEase(), anim.group);
    const wireframeAnim = createAnimation("wireframeAnim", materials.wireFrameAlpha_radius, BABYLON.Animation.ANIMATIONTYPE_FLOAT, "value", anim.keys, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE, BABYLON.EasingFunction.EASINGMODE_EASEINOUT, new BABYLON.QuadraticEase(), anim.group);
    
    // start animation group with both animations and set to looping
    anim.group.start(true);
}


function createAnimation(name:string, target:string, animType:number, property:string, keys:Array<BABYLON.IAnimationKey>, loop:number, easeType:any, easeFunction:any, group:any) {
    //optional parameters
    group = group || undefined;
    easeType = easeType || undefined;
    easeFunction = easeFunction || undefined;

    // create animation clip
    let frameRate = 60;
    let newAnim = new BABYLON.Animation(name, property, frameRate, animType, loop);

    // set easing function and mode if defined
    if (easeType !== undefined && easeFunction !== undefined ) {
        const newEaseFunction = easeFunction;
        // set easing function and mode
        newEaseFunction.setEasingMode(easeType);
        newAnim.setEasingFunction(newEaseFunction);
    }

    // apply keys and add to group
    newAnim.setKeys(keys);
    if (group !== undefined) {
        group.addTargetedAnimation(newAnim, target);
    }
    return newAnim;
}