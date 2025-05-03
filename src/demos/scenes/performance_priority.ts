import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const performancePriorityScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // Scene setup
    let scene = new BABYLON.Scene(engine);
    // 从localStorage 获取性能模式
    let storedMode = localStorage.getItem("perfMode");


    /**
     * enum ScenePerformancePriority {
    *  // Default mode. No change. Performance will be treated as less important than backward compatibility
    *   BackwardCompatible = 0,
    *  // Some performance options will be turned on trying to strike a balance between perf and ease of use
    *   Intermediate = 1,
     * // Performance will be top priority 
     *   Aggressive = 2
    * }
    */

    // 如果存在，设置当前性能模式
    if (storedMode) {
        scene.performancePriority = parseInt(storedMode);
    } else {
        // 设置兼容模式
        scene.performancePriority = BABYLON.ScenePerformancePriority.BackwardCompatible;
    }
    // 默认的值为 0  兼容模式
    let defaultPerfValue = 0;
    // 如果场景的当前性能是 Aggressive
    if (scene.performancePriority === BABYLON.ScenePerformancePriority.Aggressive) {
        // 从localStorage 获取默认的模式
        let defaultPerf = localStorage.getItem("defaultPerf2");

        // 如果存在着转换为数字
        if (defaultPerf) {
            defaultPerfValue = parseInt(defaultPerf);
        }
    }

    // 创建一个轨道相机
    let camera = new BABYLON.ArcRotateCamera("camera1", Math.PI /2, Math.PI /2, 80, new BABYLON.Vector3(0, 0, 0), scene);
    // 绑定事件
    camera.attachControl(canvas, true);

    // 创建2500个球
    let sphereCount = 2500;
    // 创建50个材质
    let materialCount = 50;
    let materials = [];

    for (let index = 0; index < materialCount; index++) {
        // 创建PBR 材质
        let pbr = new BABYLON.PBRMaterial("mat " + index, scene);
        // 随机自发光颜色
        pbr.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        materials.push(pbr);
    }

    // 创建球
    for (let index = 0; index < sphereCount; index++) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
        // 随机球的位置
        sphere.position = new BABYLON.Vector3(20 - Math.random() * 40, 20 - Math.random() * 40, 20 - Math.random() * 40)
        // 获取材质
        sphere.material = materials[index % materialCount];
    }

    // 创建要给随机的层级
    const levelMax = 5;
    let level = 0;
    for (let index = 0; index < sphereCount; index++) {
        if (level !== 0) {
            let sphere = scene.meshes[index];
            sphere.setParent(scene.meshes[index - 1]);
        }
        level++;

        if (level >= levelMax) {
            level = 0;
        }
    }

    // 创建默认的环境
    scene.createDefaultEnvironment();

    // 实例化一个场景说明
    let instrumentation = new BABYLON.SceneInstrumentation(scene);
    // 帧的时间为true
    instrumentation.captureFrameTime = true;

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var text1 = new GUI.TextBlock();
    text1.color = "white";
    text1.shadowColor = "black"
    text1.shadowOffsetX = 2;
    text1.shadowOffsetY = 2;
    text1.fontSize = 24;
    text1.height = "40px";
    text1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    text1.paddingBottomInPixels = 120;
    advancedTexture.addControl(text1);   
    
    var text2 = new GUI.TextBlock();
    text2.color = "white";
    text2.shadowColor = "black"
    text2.shadowOffsetX = 2;
    text2.shadowOffsetY = 2;
    text2.fontSize = 24;
    text2.height = "80px";
    text2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;  
    text2.text = `${sphereCount} animated spheres (no geometry reuse) with ${materialCount} different materials\r\nScene performance mode set to ${scene.performancePriority === BABYLON.ScenePerformancePriority.Aggressive ? "Aggressive" : "Backward compatible"}`  
    advancedTexture.addControl(text2);   

    var button1 = GUI.Button.CreateSimpleButton("but1", scene.performancePriority === BABYLON.ScenePerformancePriority.Aggressive ? "Set scene performance priority to Backward compatible" : "Set scene performance priority to Prioritize performance");
    button1.width = "500px"
    button1.height = "50px";
    button1.color = "white";
    button1.background = "green";
    // 点击按钮事件
    button1.onPointerUpObservable.add(function() {
        // 设置渲染模式
        localStorage.setItem("perfMode", scene.performancePriority === BABYLON.ScenePerformancePriority.Aggressive ? BABYLON.ScenePerformancePriority.BackwardCompatible : BABYLON.ScenePerformancePriority.Aggressive);
        location.reload();
    });
    button1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture.addControl(button1);      

    // 逐帧渲染前事件
    scene.onBeforeRenderObservable.add(() => {
        // 渲染的平均时间
        let perfValue = instrumentation.frameTimeCounter.lastSecAverage.toFixed(2);
        text1.text = perfValue + "ms per frame";

        if (scene.performancePriority === BABYLON.ScenePerformancePriority.Aggressive) {
            if (defaultPerfValue) {
                text1.text += `\r\nPerformance boost: ${parseInt(perfValue * 100 / defaultPerfValue)}%`;
            } else {
                text1.text += "\r\nRun in backward compatible mode to get a comparison value";
            }
        }

        for (let index = 0; index < scene.meshes.length; index++) {
            const sphere = scene.meshes[index];
            // 旋转球
            sphere.rotation.y += 0.01;
        }
    });

    if (scene.performancePriority === BABYLON.ScenePerformancePriority.BackwardCompatible) {
        setInterval(() => {
            // 每秒存储上一帧的平均时间
            localStorage.setItem("defaultPerf2", instrumentation.frameTimeCounter.lastSecAverage.toFixed(2));
        }, 1000)
    }
    

    return scene;
};

