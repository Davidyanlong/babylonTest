import { BABYLON, GUI } from "../../base/commonIncludes";

// 模型合并
export const morthMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    var scene = new BABYLON.Scene(engine);
    
    // demo1(scene, canvas);
    demo2(scene, canvas);


    return scene;
}

const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {


    var scrambleUp = function(data:BABYLON.FloatArray) {
    for (let index = 0; index < data.length; index ++) {
        data[index] += 0.4 * Math.random();
    }
}

var scrambleDown = function(data:BABYLON.FloatArray) {
    for (let index = 0; index < data.length; index ++) {
        data[index] -= 0.4 * Math.random();
    }
}

    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1", 1.14, 1.13, 10, BABYLON.Vector3.Zero(), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 创建球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2, updatable:true}, scene);

    // 创建材质
    var materialSphere = new BABYLON.StandardMaterial("mat", scene);
    materialSphere.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/misc.jpg", scene);    

    sphere.material = materialSphere;

    // 不启用
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {segments:16, diameter:2}, scene);
    sphere2.setEnabled(false);
    
    // 设置更新函数
    sphere2.updateMeshPositions(scrambleUp);

    // 创建 MorphTargetManager
    var manager = new BABYLON.MorphTargetManager();
    sphere.morphTargetManager = manager;

    // 添加顶点动画对象
     /**
     * Creates a MorphTarget from mesh data
     * @param mesh defines the source mesh
     * @param name defines the name to use for the new target
     * @param influence defines the influence to attach to the target
     * @returns a new MorphTarget
     */
    var target0 = BABYLON.MorphTarget.FromMesh(sphere2, "sphere2", 0.25);
    manager.addTarget(target0);

    let angle = 0;
    scene.registerBeforeRender(function() {
        target0.influence = Math.sin(angle)*Math.sin(angle);
        angle += 0.01;
    })

}


const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, 3 * Math.PI / 8, 100, BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
    scene.clearColor = new BABYLON.Color4(0,0,0,1);

    scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
   
    var pbr = new BABYLON.PBRMaterial("pbr", scene);

    pbr.metallic = 0.0;
    pbr.roughness = 0.75;   
    // 这是漫反射颜色 
    pbr.albedoColor = BABYLON.Color3.FromHexString("#295A84").toLinearSpace();
    pbr.sheen.isEnabled = true
    // 设置sheen 
    pbr.sheen.color = BABYLON.Color3.FromHexString("#34C2CA").toLinearSpace();
    pbr.sheen.intensity = 0.35;

    pbr.backFaceCulling = false;

    // Create a flat ground and apply some sin to make it wave
    let createGround = (name:string, freq:number=0, smooth:number=0) => {
        const ground = BABYLON.MeshBuilder.CreateGround(name, {width: 100, height: 100, subdivisions: 200, updatable: true});

        if (freq) {
            // Let's wave it
            ground.updateMeshPositions((vertexData) => {
                for (var index = 0; index < ground.getTotalVertices(); index++) {
                    const x = vertexData[index * 3];
                    vertexData[index * 3 + 1] = Math.sin((x * 0.05) * freq) * smooth;
                }
            });
        }

        return ground;
    }

    let addNewTarget = (name:string, freq:number, add:number, manager:BABYLON.MorphTargetManager) => {
        const ribbon = createGround(name, freq, add);
        ribbon.setEnabled(false);
        var target = BABYLON.MorphTarget.FromMesh(ribbon);
        manager.addTarget(target);

        return target;
    }

    // Create main mesh
    const mainRibbon = createGround("Main");
    mainRibbon.material = pbr;

    var manager = new BABYLON.MorphTargetManager(scene);
    mainRibbon.morphTargetManager = manager;

    // Create various targets
    let targets = [];
    let seeds:number[] = [];
    for (var index = 0; index < 20; index++) {
        let target = addNewTarget("target" + index, Math.random() * 10 - 20, Math.random(), manager);

        const seed = Math.random();
        seeds.push(seed);

        targets.push(target);
    }

    // Let's animate it
    scene.onBeforeRenderObservable.add(() => {

        for (var index = 0; index < targets.length; index++) {
            const target = targets[index];
            const seed = seeds[index] + 0.01;
            target.influence = Math.cos(seed);
            seeds[index] = seed;
        }
    });


    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect1 = new GUI.Rectangle();
    rect1.height = "80px";
    rect1.top = "100px";
    rect1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    rect1.color = "Orange";
    rect1.thickness = 1;
    rect1.adaptWidthToChildren = true;
    advancedTexture.addControl(rect1);

    var label = new GUI.TextBlock();    
    label.text = " Using 20 morph targets \n to animate 80000 faces in realtime ";

    if (!manager.isUsingTextureForTargets) {
        label.text = " This demo requires a webgl2 capable device :( ";
    }

    label.textWrapping = false;
    label.resizeToFit = true;
    rect1.addControl(label);

}