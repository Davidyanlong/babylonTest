import { BABYLON, earcut, GUI } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 模型合并
export const mergeMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
   var scene = new BABYLON.Scene(engine);    

    // demo1(scene, canvas);
    demo2(scene, canvas);

    return scene;
   
}
// 合并mesh
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
        // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 创建地面
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // 定义一个材质
    var mat1 = new BABYLON.StandardMaterial('mat1', scene);
    mat1.diffuseColor = new BABYLON.Color3(1, 0, 0);
    
    // 定义材质2
    var mat2 = new BABYLON.StandardMaterial('mat2', scene);
    mat2.diffuseColor = new BABYLON.Color3(0, 1, 0);

    // 定义一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 16}, scene);
    // 应用材质1
    sphere.material = mat1;
    sphere.position.y = 1;

    // 创建要给box
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
    cube.position = new BABYLON.Vector3(1, 1.5, 0);
    // 应用材质2
    cube.material = mat2;

    // 合并Mesh
     /**
     * Merge the array of meshes into a single mesh for performance reasons.
     * @param meshes array of meshes with the vertices to merge. Entries cannot be empty meshes.
     * @param disposeSource when true (default), dispose of the vertices from the source meshes.
     * @param allow32BitsIndices when the sum of the vertices > 64k, this must be set to true.
     * @param meshSubclass (optional) can be set to a Mesh where the merged vertices will be inserted.
     * @param subdivideWithSubMeshes when true (false default), subdivide mesh into subMeshes.
     * @param multiMultiMaterials when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes.
     * @returns a new mesh
     */
    var mesh = BABYLON.Mesh.MergeMeshes([sphere, cube], true, true, undefined, false, true);

    // 默认使用第一个mesh的材质
    //  var mesh = BABYLON.Mesh.MergeMeshes([sphere, cube]);
}


// CSG2 合并
const demo2 = async (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 使用右手坐标系, 默认使用左手坐标系
    scene.useRightHandedSystem = true;

    // showAxis(3, scene);

    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.alpha = 1.5;
    camera.beta = 1.6;
    camera.radius = 18;

    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  
    await BABYLON.InitializeCSG2Async();
    
    const fontData = await (await fetch("https://assets.babylonjs.com/fonts/Droid Sans_Regular.json")).json();


      enum MODE {
        subtract = 0,
        intersect = 1,
        add =2
    }

    var doSomething = (what:MODE, y:number) => {
        // 创建一个球
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2.5, segments: 32}, scene);
        var sphereMat = new BABYLON.StandardMaterial("sphere");
        sphere.material = sphereMat;
        sphereMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com//textures/grass.png");

        // 创建一个box
        var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);
        var boxMat = new BABYLON.StandardMaterial("box");
        box.material = boxMat;    
        boxMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com//textures/crate.png");    
        

        // 转换为CSG对象
        const sphereCSG = BABYLON.CSG2.FromMesh(sphere);
        const boxCSG = BABYLON.CSG2.FromMesh(box);

        let mesh;
        let string = "";
        switch (what) {
            case MODE.subtract:
                // 执行差集
                mesh = boxCSG.subtract(sphereCSG).toMesh("test subtract");
                string = "subtract";
                break;
            case MODE.intersect:
                // 执行交集
                mesh = boxCSG.intersect(sphereCSG).toMesh("test intersect");
                string = "intersect";
                break;
            case MODE.add:
                // 执行并集
                mesh = boxCSG.add(sphereCSG).toMesh("test add");
                string = "add";
                break;
        }

        sphere.position.y = y;
        box.position.y = y;
        box.position.x = -4;
        sphere.position.x = 0.2;
        mesh.position.x = 4;
        mesh.position.y = y;

        // 创建文字对象
        const text = BABYLON.MeshBuilder.CreateText("myText", string, fontData, {
                size: 0.3,
                resolution: 16,
                depth: 0.2,
            },scene, earcut) as BABYLON.Mesh;

        text.position.y = y;
        text.position.x = -2;

        const textEqual = BABYLON.MeshBuilder.CreateText("=", "=", fontData, {
                size: 0.5,
                resolution: 16,
                depth: 0.2,
            },scene, earcut) as BABYLON.Mesh;

        textEqual.position.y = y;
        textEqual.position.x = 2;
    }

  

    doSomething(MODE.subtract, -4);
    doSomething(MODE.intersect, 0);
    doSomething(MODE.add, 4);
}