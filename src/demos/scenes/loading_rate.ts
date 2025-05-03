import { BABYLON, Assets } from "../../base/commonIncludes";



var shadowGenerator = null;
var promiseArray = [];

// 场景基本的构建方法
export const loadingRateMultipleAssetsScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 显示导入屏幕
    BABYLON.SceneLoader.ShowLoadingScreen = false;

    var scene = new BABYLON.Scene(engine);

    engine.displayLoadingUI();

    createCamera(scene);
    createLight(scene);
    createGround(scene);
    createActor(scene);
    createMesh(scene);
    createScenery(scene);

    Promise.all(promiseArray).then(() => {
        setTimeout(() => {
            engine.hideLoadingUI();
        }, 1000);
    });

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    return scene;
};

const progressMap:Record<string,number> = {};
const onProgress = (name:string, progress:number) => {
    progressMap[name] = +progress;
    // calc precentage
    const sum = Object.keys(progressMap).reduce((prev, curr) => {
        return prev + progressMap[curr];
    }, 0);
    console.log(`loading ${name}: ${progress}%`);
    document.getElementById("customLoadingScreenDiv")!.innerHTML = "Loading : " + Math.round(sum / Object.keys(progressMap).length) + "%";
}


const createCamera =  (scene:BABYLON.Scene)=> {
    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 13, new BABYLON.Vector3(0, 1, 0), scene);
    // 绑定事件
    camera.attachControl(true);
    // 设置最小半径 最大半径
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 1000;
    // 滚轮系数
    camera.wheelDeltaPercentage = 0.01;
}

const createLight = function (scene:BABYLON.Scene) {
    // 半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // 光的强度
    light.intensity = 0.6;
    // 关闭高光
    light.specular = BABYLON.Color3.Black();

    // 创建一个直射光
    var light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    // 光的位置
    light2.position = new BABYLON.Vector3(0, 5, 5);

    // 创造阴影
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;
}


const createGround = function (scene:BABYLON.Scene) {
    // Ground
    promiseArray.push(
        BABYLON.MeshBuilder.CreateGroundFromHeightMap(
            "ground", 
            "https://playground.babylonjs.com/textures/heightMap.png", 
            {
                width:1000, 
                height:1000, 
                subdivisions:500, 
                minHeight:0, 
                maxHeight:30,
                updatable:false,
                onReady:function (ground) {
                    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
                    groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
                    (groundMaterial.diffuseTexture as BABYLON.Texture).uScale = 6;
                    (groundMaterial.diffuseTexture as BABYLON.Texture).vScale = 6;
                    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
                    ground.position.y = -2.05;
                    ground.material = groundMaterial;
        
                    document.getElementById("customLoadingScreenDiv")!.innerHTML = "Loading : 5%";
                }
              }, scene) 
    );
}


const createActor =  (scene:BABYLON.Scene)=> {
    promiseArray.push(
        BABYLON.SceneLoader.ImportMeshAsync("", "https://playground.babylonjs.com//scenes/", "dummy3.babylon", scene, function (evt) {

            // onProgress
            var loadedPercent = 0;
            if (evt.lengthComputable) {
                loadedPercent = +(evt.loaded * 100 / evt.total).toFixed();
            } else {
                var dlCount = evt.loaded / (1024 * 1024);
                loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
            }
            onProgress("dummy3", loadedPercent);

        }).then((result) => {
            var mesh = result.meshes[0];
            shadowGenerator!.addShadowCaster(scene.meshes[0], true);
            for (var index = 0; index < result.meshes.length; index++) {
                result.meshes[index].receiveShadows = false;
            }
        })
    );
}



const createMesh =  (scene:BABYLON.Scene)=> {
    promiseArray.push(
        BABYLON.SceneLoader.ImportMeshAsync("", Assets.meshes.pirateFort.rootUrl, Assets.meshes.pirateFort.filename, scene,
            function (evt) {

                // onProgress
                var loadedPercent = 0;
                if (evt.lengthComputable) {
                    loadedPercent = +(evt.loaded * 100 / evt.total).toFixed();
                } else {
                    var dlCount = evt.loaded / (1024 * 1024);
                    loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
                }
                onProgress("piratefort", loadedPercent);

            }).then((result) => {
                var mesh = result.meshes[0];
            })
    );
}



const createScenery =  (scene:BABYLON.Scene)=> {

    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.useDefaultLoadingScreen = false;
    assetsManager.autoHideLoadingUI = false;

    var meshTask = assetsManager.addMeshTask("skull task", "", "https://playground.babylonjs.com/scenes/", "skull.babylon");
    meshTask.onSuccess = function (task) {
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
    }

    assetsManager.onProgress = function (remainingCount, totalCount, _lastFinishedTask) {
        const loadedCount = totalCount - remainingCount;
        const percentLoaded = Math.round(loadedCount / totalCount * 100);
        onProgress("skull", percentLoaded);

    };

    promiseArray.push(assetsManager.loadAsync());
}