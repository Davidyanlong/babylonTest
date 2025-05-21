import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const anyFilesImportScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(engine, scene, canvas);
     // demo5(scene, canvas);
    //   demo6(scene, canvas);
    //   demo7(scene, canvas);
    //   demo8(scene, canvas);
    //   demo9(scene, canvas);
      demo10(engine, scene, canvas);



/**
 * ​​对比总结​​
 * 方法	是否替换场景	是否加载环境（灯光/相机）	是否需要手动添加资源	典型用途
 * LoadAssetContainerAsync	否	否	是	动态资源管理、资源共享
 * AppendSceneAsync	否	是	否	场景扩展、分块加载
 * LoadSceneAsync	是	是	否	场景切换、完整场景加载
 * ImportAnimationsAsync	否	否	是	动态动画加载、热更新
 * ImportMeshAsync	否	否	是	单独加载模型、UI元素
 * 
 * 
 * 
 * ​​最佳实践建议​​
 * ​​资源复用​​：优先用 LoadAssetContainerAsync 加载可复用资源。
 * ​​场景切换​​：用 LoadSceneAsync 替换整个场景以释放内存。
 * ​​动画加载​​：动态动画用 ImportAnimationsAsync，避免重复加载模型。
 * ​​性能敏感​​：小模型/UI 用 ImportMeshAsync，减少加载开销。
 * 通过合理选择加载方法，可以有效平衡加载速度、内存占用和开发效率。
 */




    return scene;

};

// LoadAssetContainerAsync
const demo1 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 导入不同的模型
        const models = [
            "https://playground.babylonjs.com/scenes/skull.babylon",
            "https://www.babylonjs.com/Scenes/Mansion/Mansion.babylon",
            "https://raw.githubusercontent.com/eddicke/kkk/master/robot.obj",
        ] as const;

        // Load all models in parallel and display the first one
        const assetContainers = await Promise.all(
            /**
             * Load a scene into an asset container
             * @param source a string that defines the name of the scene file, or starts with "data:" following by the stringified version of the scene, or a File object, or an ArrayBufferView
             * @param scene is the instance of Scene to append to
             * @param options an object that configures aspects of how the scene is loaded
             * @returns The loaded asset container  返回类型 AssetContainer
             */
            models.map(async (model) => BABYLON.LoadAssetContainerAsync(model, scene))
        );

        let currentIndex = 0;
        let currentContainer: BABYLON.Nullable<BABYLON.AssetContainer>;
        let addedLight: BABYLON.Nullable<BABYLON.Light>;
        let addedCamera: BABYLON.Nullable<BABYLON.Camera>;

        const selectAssetContainer = (index: number) => {
            if (currentContainer) {
                currentContainer.removeAllFromScene();
                currentContainer = null;
            }

            if (addedLight) {
                scene.removeLight(addedLight);
                addedLight = null;
            }

            if (addedCamera) {
                scene.removeCamera(addedCamera);
                addedCamera = null;
            }

            // 通过index 获取当前的模型
            currentContainer = assetContainers[index];
            // 将模型添加到场景中
            currentContainer.addAllToScene();

            // 设置灯光
            if (scene.lights.length === 0) {
                scene.createDefaultLight();
                addedLight = scene.lights[0];
            }

            // 设置相机
            if (scene.cameras.length === 0) {
                scene.createDefaultCamera(true, true, true);
                addedCamera = scene.cameras[0];
            } else {
                // 设置当前活跃相机
                scene.activeCamera = scene.cameras[0];
            }
        }

        // 默认获取索引 0 模型
        selectAssetContainer(currentIndex);

        // Switch to next scene when z is pressed
        // 按Z切换不同的模型
        canvas.onkeydown = (e) => {
            if (e.key != "z") {
                return;
            }
            
            currentIndex = (currentIndex + 1) % assetContainers.length;
            selectAssetContainer(currentIndex);
        }
}
// AppendSceneAsync
const demo2 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
        // Create a default skybox with an environment.
        // 创建设置默认天空和环境光
        const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
        const currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
        // 加载glb模型， 包含load 界面、
        /**
         * Append a scene
         * @param source a string that defines the name of the scene file, or starts with "data:" following by the stringified version of the scene, or a File object, or an ArrayBufferView
         * @param scene is the instance of BABYLON.Scene to append to
         * @param options an object that configures aspects of how the scene is loaded
        *       A string that defines the root url for the scene and resources or the concatenation of rootURL and filename (e.g. http://example.com/test.glb)
        *       {
        *            rootUrl?: string;
        *            onProgress?: (event: ISceneLoaderProgressEvent) => void;
        *            pluginExtension?: string;
        *            name?: string;
        *            pluginOptions?: {
        *               [Plugin in keyof SceneLoaderPluginOptions]?: {
                            [Option in keyof DefaultPluginOptions<SceneLoaderPluginOptions[Plugin]>]: DefaultPluginOptions<SceneLoaderPluginOptions[Plugin]>[Option];
                        };
        *            }
        *       }
         * 
         * @returns A promise that resolves when the scene is appended  返回值 Promise<void>
         */
        await BABYLON.AppendSceneAsync("https://playground.babylonjs.com/scenes/BoomBox.glb", scene);

        // 加载完成后，根据加载的模型大小，创建相机，自适应， 创建灯光
        scene.createDefaultCameraOrLight(true, true, true);
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = Math.PI / 2;

}

// LoadSceneAsync
const demo3 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // const scene = await BABYLON.LoadSceneAsync("path/to/model", engine);
    
}

// ImportAnimationsAsync
const demo4 = async (engine:BABYLON.Engine, scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{

        // 启用离线存储
        engine.enableOfflineSupport = false;

        // This is really important to tell Babylon.js to use decomposeLerp and matrix interpolation
        // 使用矩阵插值替代关键帧
        BABYLON.Animation.AllowMatricesInterpolation = true;

        // 创建相机
        const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 1, 0), scene);
        camera.radius = 9;
        camera.attachControl(canvas, true);

        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 10;
        camera.wheelDeltaPercentage = 0.01;

        // 创建灯光
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.6;
        light.specular = BABYLON.Color3.Black();

        const light2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
        light2.position = new BABYLON.Vector3(0, 5, 5);

        // 创建阴影生成器
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light2);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;

        // 显示loading UI
        engine.displayLoadingUI();

        // 导入模型
        const assetContainer = await BABYLON.LoadAssetContainerAsync("https://playground.babylonjs.com/scenes/Elf/Elf.gltf", scene);
        // 加载到场景中
        assetContainer.addAllToScene();

        // UI
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const UiPanel = new GUI.StackPanel();
        UiPanel.width = "220px";
        UiPanel.fontSize = "14px";
        UiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        UiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        advancedTexture.addControl(UiPanel);

        let nbBUttons = 1;
        // 添加 UI 按钮
        const addButton = function (text:string, parent:GUI.StackPanel, onPointerDownObservable:()=>void) {
            const button = GUI.Button.CreateSimpleButton("but" + (nbBUttons++), text);
            button.paddingTop = "10px";
            button.width = "100px";
            button.height = "50px";
            button.color = "white";
            button.background = "green";
            button.onPointerDownObservable.add(onPointerDownObservable);
            parent.addControl(button);
        }
        // 清理动画
        addButton("Clean Animations", UiPanel, () => {
            // 停止动画
            scene.stopAllAnimations();
            scene.animationGroups.slice().forEach((animationGroup) => {
                // 销毁动画
                animationGroup.dispose();
            });
        });
        // 导入跑步动画
        addButton("Import Run", UiPanel, async () => {

            /**
             * Import animations from a file into a scene
             * @param source a string that defines the name of the scene file, or starts with "data:" following by the stringified version of the scene, or a File object, or an ArrayBufferView
             * @param scene is the instance of BABYLON.Scene to append to
             * @param options an object that configures aspects of how the scene is loaded
             * {
             *    overwriteAnimations?: boolean;
             *    animationGroupLoadingMode?: SceneLoaderAnimationGroupLoadingMode;
             *    targetConverter?: Nullable<(target: unknown) => unknown>;  
             * }
             * @returns A promise that resolves when the animations are imported 返回Promise<void>
             */
            await BABYLON.ImportAnimationsAsync("https://playground.babylonjs.com/scenes/Elf/Elf_run.gltf", scene);
            if (scene.animationGroups.length > 0) {
                // 播放最后一个动画
                scene.animationGroups[scene.animationGroups.length - 1].play(true);
            }
        });
        //..
        addButton("Import Die", UiPanel, async () => {
            await BABYLON.ImportAnimationsAsync("https://playground.babylonjs.com/scenes/Elf/Elf_die.gltf", scene);
            if (scene.animationGroups.length > 0) {
                 // 播放最后一个动画
                scene.animationGroups[scene.animationGroups.length - 1].play(true);
            }
        });

        // 因此导入UI
        engine.hideLoadingUI();
}

// ImportMeshAsync
const demo5 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // await BABYLON.ImportMeshAsync("path/to/model", scene);
}
//String encoded model sources
const demo6 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
     const gltf = `{
    "asset": {
        "generator": "COLLADA2GLTF",
        "version": "2.0"
    },
    "scene": 0,
    "scenes": [
        {
            "nodes": [
                0
            ]
        }
    ],
    "nodes": [
        {
            "children": [
                1
            ],
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                -1.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0
            ]
        },
        {
            "mesh": 0
        }
    ],
    "meshes": [
        {
            "primitives": [
                {
                    "attributes": {
                        "NORMAL": 1,
                        "POSITION": 2
                    },
                    "indices": 0,
                    "mode": 4,
                    "material": 0
                }
            ],
            "name": "Mesh"
        }
    ],
    "accessors": [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5123,
            "count": 36,
            "max": [
                23
            ],
            "min": [
                0
            ],
            "type": "SCALAR"
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5126,
            "count": 24,
            "max": [
                1.0,
                1.0,
                1.0
            ],
            "min": [
                -1.0,
                -1.0,
                -1.0
            ],
            "type": "VEC3"
        },
        {
            "bufferView": 1,
            "byteOffset": 288,
            "componentType": 5126,
            "count": 24,
            "max": [
                0.5,
                0.5,
                0.5
            ],
            "min": [
                -0.5,
                -0.5,
                -0.5
            ],
            "type": "VEC3"
        }
    ],
    "materials": [
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [
                    0.800000011920929,
                    0.0,
                    0.0,
                    1.0
                ],
                "metallicFactor": 0.0
            },
            "name": "Red"
        }
    ],
    "bufferViews": [
        {
            "buffer": 0,
            "byteOffset": 576,
            "byteLength": 72,
            "target": 34963
        },
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": 576,
            "byteStride": 12,
            "target": 34962
        }
    ],
    "buffers": [
        {
            "byteLength": 648,
            "uri": "data:application/octet-stream;base64,AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAAAAAAAAgL8AAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAvwAAAL8AAAA/AAAAPwAAAL8AAAA/AAAAvwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAL8AAAA/AAAAvwAAAL8AAAA/AAAAPwAAAL8AAAC/AAAAvwAAAL8AAAC/AAAAPwAAAD8AAAA/AAAAPwAAAL8AAAA/AAAAPwAAAD8AAAC/AAAAPwAAAL8AAAC/AAAAvwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAvwAAAD8AAAC/AAAAPwAAAD8AAAC/AAAAvwAAAL8AAAA/AAAAvwAAAD8AAAA/AAAAvwAAAL8AAAC/AAAAvwAAAD8AAAC/AAAAvwAAAL8AAAC/AAAAvwAAAD8AAAC/AAAAPwAAAL8AAAC/AAAAPwAAAD8AAAC/AAABAAIAAwACAAEABAAFAAYABwAGAAUACAAJAAoACwAKAAkADAANAA4ADwAOAA0AEAARABIAEwASABEAFAAVABYAFwAWABUA"
        }
    ]
}`;
        // 导入字符串编码的模型
        await BABYLON.AppendSceneAsync(`data:${gltf}`, scene);
        scene.createDefaultCameraOrLight(true, true, true);

}

// glb base64 二进制
const demo7 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
        const base64_model_content = "data:;base64,Z2xURgIAAAD4CAAAlAUAAEpTT057ImFjY2Vzc29ycyI6W3sibmFtZSI6IjJmdHg0ZnRfMV9wb3NpdGlvbnMiLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjQsIm1pbiI6Wy0yNCwwLC0xMl0sIm1heCI6WzI0LDIsMTJdLCJ0eXBlIjoiVkVDMyIsImJ1ZmZlclZpZXciOjAsImJ5dGVPZmZzZXQiOjB9LHsibmFtZSI6IjJmdHg0ZnRfMV9ub3JtYWxzIiwiY29tcG9uZW50VHlwZSI6NTEyNiwiY291bnQiOjI0LCJtaW4iOlstMSwtMSwtMV0sIm1heCI6WzEsMSwxXSwidHlwZSI6IlZFQzMiLCJidWZmZXJWaWV3IjowLCJieXRlT2Zmc2V0IjoyODh9LHsibmFtZSI6IjJmdHg0ZnRfMV90ZXhjb29yZHMiLCJjb21wb25lbnRUeXBlIjo1MTI2LCJjb3VudCI6MjQsIm1pbiI6Wy0xLjM0MDcwMDAzMDMyNjg0MzMsLTEuNjgxMzk5OTQxNDQ0Mzk3XSwibWF4IjpbNS4zNjI4MDAxMjEzMDczNzMsMy42ODE0MDAwNjA2NTM2ODY1XSwidHlwZSI6IlZFQzIiLCJidWZmZXJWaWV3IjoxLCJieXRlT2Zmc2V0IjowfSx7Im5hbWUiOiIyZnR4NGZ0XzFfMF9pbmRpY2VzIiwiY29tcG9uZW50VHlwZSI6NTEyMywiY291bnQiOjM2LCJtaW4iOlswXSwibWF4IjpbMjNdLCJ0eXBlIjoiU0NBTEFSIiwiYnVmZmVyVmlldyI6MiwiYnl0ZU9mZnNldCI6MH1dLCJhc3NldCI6eyJnZW5lcmF0b3IiOiJvYmoyZ2x0ZiIsInZlcnNpb24iOiIyLjAifSwiYnVmZmVycyI6W3sibmFtZSI6ImlucHV0IiwiYnl0ZUxlbmd0aCI6ODQwfV0sImJ1ZmZlclZpZXdzIjpbeyJuYW1lIjoiYnVmZmVyVmlld18wIiwiYnVmZmVyIjowLCJieXRlTGVuZ3RoIjo1NzYsImJ5dGVPZmZzZXQiOjAsImJ5dGVTdHJpZGUiOjEyLCJ0YXJnZXQiOjM0OTYyfSx7Im5hbWUiOiJidWZmZXJWaWV3XzEiLCJidWZmZXIiOjAsImJ5dGVMZW5ndGgiOjE5MiwiYnl0ZU9mZnNldCI6NTc2LCJieXRlU3RyaWRlIjo4LCJ0YXJnZXQiOjM0OTYyfSx7Im5hbWUiOiJidWZmZXJWaWV3XzIiLCJidWZmZXIiOjAsImJ5dGVMZW5ndGgiOjcyLCJieXRlT2Zmc2V0Ijo3NjgsInRhcmdldCI6MzQ5NjN9XSwibWF0ZXJpYWxzIjpbeyJuYW1lIjoid2lyZV8xOTExOTExOTEiLCJwYnJNZXRhbGxpY1JvdWdobmVzcyI6eyJiYXNlQ29sb3JGYWN0b3IiOlswLjUsMC41LDAuNSwxXSwibWV0YWxsaWNGYWN0b3IiOjAsInJvdWdobmVzc0ZhY3RvciI6MX0sImVtaXNzaXZlRmFjdG9yIjpbMCwwLDBdLCJhbHBoYU1vZGUiOiJPUEFRVUUiLCJkb3VibGVTaWRlZCI6ZmFsc2V9XSwibWVzaGVzIjpbeyJuYW1lIjoiMmZ0eDRmdF8xIiwicHJpbWl0aXZlcyI6W3siYXR0cmlidXRlcyI6eyJQT1NJVElPTiI6MCwiTk9STUFMIjoxLCJURVhDT09SRF8wIjoyfSwiaW5kaWNlcyI6MywibWF0ZXJpYWwiOjAsIm1vZGUiOjR9XX1dLCJub2RlcyI6W3sibmFtZSI6IjJmdHg0ZnQiLCJtZXNoIjowfV0sInNjZW5lIjowLCJzY2VuZXMiOlt7Im5vZGVzIjpbMF19XX1IAwAAQklOAAAAwMEAAACAAABAQQAAwMEAAABAAABAwQAAwMEAAAAAAABAwQAAwMEAAABAAABAQQAAwMEAAAAAAABAwQAAwEEAAABAAABAwQAAwEEAAAAAAABAwQAAwMEAAABAAABAwQAAwEEAAAAAAABAwQAAwEEAAABAAABAQQAAwEEAAACAAABAQQAAwEEAAABAAABAwQAAwEEAAACAAABAQQAAwMEAAABAAABAQQAAwMEAAACAAABAQQAAwEEAAABAAABAQQAAwEEAAABAAABAQQAAwMEAAABAAABAwQAAwMEAAABAAABAQQAAwEEAAABAAABAwQAAwEEAAACAAABAQQAAwMEAAAAAAABAwQAAwEEAAAAAAABAwQAAwMEAAACAAABAQQAAgL8AAAAAAAAAgAAAgL8AAAAAAAAAgAAAgL8AAAAAAAAAgAAAgL8AAAAAAAAAgAAAAIAAAIC/AAAAgAAAAIAAAIC/AAAAgAAAAIAAAIC/AAAAgAAAAIAAAIC/AAAAgAAAgD8AAACAAAAAgAAAgD8AAACAAAAAgAAAgD8AAACAAAAAgAAAgD8AAACAAAAAgAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPw+cK0AAAIA/AAAAALTIRj8AAAAAAACAPw+cK0C0yEY/D5yrQAAAgD8AAAAAtMhGPwAAAAAAAIA/D5yrQLTIRj8PnCtAAACAPwAAAIC0yEY/AAAAgAAAgD8PnCtAtMhGPw+cq0AAAIA/AAAAALTIRj8AAAAAAACAPw+cq0C0yEY/D5yrPx04178PnKu/D5xrQA+cqz8PnGtAD5yrvx04178Xt9E4HTjXv7KdK0APnGtAsp0rQB04178Xt9E4D5xrQAAAAQACAAEAAAADAAQABQAGAAUABAAHAAgACQAKAAkACAALAAwADQAOAA0ADAAPABAAEQASABEAEAATABQAFQAWABUAFAAXAA==";

        await BABYLON.AppendSceneAsync(base64_model_content, scene);
        scene.createDefaultCameraOrLight(true, true, true);
}

// 使用pluginOptions 修改插件参数
const demo8 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
        const assetContainer = await BABYLON.LoadAssetContainerAsync("https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/LevelOfDetail.glb", scene, {
            pluginOptions: {
                gltf: {
                    skipMaterials: false,
                    extensionOptions: {
                        MSFT_lod: {
                            maxLODsToLoad: 1,
                        },
                    }
                },
            },
        });

        assetContainer.addAllToScene();
        scene.createDefaultCameraOrLight(true, true, true);
        const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
        camera.alpha = Math.PI / 2;
}

// load memery
const demo9 = async (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    const assetArrayBuffer = await BABYLON.Tools.LoadFileAsync("https://playground.babylonjs.com/scenes/BoomBox.glb", true);
    const assetBlob = new Blob([assetArrayBuffer]);
    const assetUrl = URL.createObjectURL(assetBlob);

    await BABYLON.AppendSceneAsync(assetUrl, scene, { pluginExtension: ".glb" });
    scene.createDefaultCameraOrLight(true, true, true);

}

const demo10 = async (engine:BABYLON.Engine, scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 添加灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    // 创建资产管理器
    var assetsManager = new BABYLON.AssetsManager(scene);
	var meshTask = assetsManager.addMeshTask("skull task", "", "https://playground.babylonjs.com/scenes/", "skull.babylon");
	
    /**
     * onFinish
     * onProgress
     * onTaskSuccess
     * onTaskError
     */


    // 加载成果
	meshTask.onSuccess = function (task) {
	    task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
	}	

    //  渲染前更新灯光位置
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });
	
    // 模型家长完成
	assetsManager.onFinish = function (tasks:BABYLON.AbstractAssetTask[]) {
        // 循环渲染开启
		engine.runRenderLoop(function () {
			scene.render();
		});
	};
	
    // 导入模型
	assetsManager.load();
}