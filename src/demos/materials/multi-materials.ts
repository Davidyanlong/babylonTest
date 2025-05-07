import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const multiMaterialScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    // 创建点光源
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 100, 2), scene);
    // 绑定相机事件
    camera.attachControl(canvas, true);

    // 定义材质 0 
    var material0 = new BABYLON.StandardMaterial("mat0", scene);
    // 漫反射颜色为红色
    material0.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // 设置bumpmap
    material0.bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/normalMap.jpg", scene);
    
    // 定义材质1
    var material1 = new BABYLON.StandardMaterial("mat1", scene);
    // 漫反射颜色为蓝色
    material1.diffuseColor = new BABYLON.Color3(0, 0, 1);
    
    // 定义材质2
    var material2 = new BABYLON.StandardMaterial("mat2", scene);
    // 自发光颜色会粉色
    material2.emissiveColor = new BABYLON.Color3(0.4, 0, 0.4);

    // 定义个多材质对象
    var multimat = new BABYLON.MultiMaterial("multi", scene);
    // 添加子材质
    multimat.subMaterials.push(material0);
    multimat.subMaterials.push(material1);
    multimat.subMaterials.push(material2);

    // 创建要给球
    var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere0", {segments:16, diameter:3}, scene);
    // 设置材质为多材质
    sphere.material = multimat;

    // 定义定义的 subMesh 子网格
    sphere.subMeshes = [];
    // 得到球的顶点总数
    var verticesCount = sphere.getTotalVertices();
    
    /**
    * materialIndex: number, 
    * verticesStart: number, 
    * verticesCount: number, 
    *  indexStart: number, 
    * indexCount: number, 
    * mesh: AbstractMesh, 
    * renderingMesh?: Mesh, 
    * createBoundingBox?: boolean, 
    * addToMesh?: boolean
     */
    new BABYLON.SubMesh(0, 0, verticesCount, 0, 900, sphere);
    new BABYLON.SubMesh(1, 0, verticesCount, 900, 900, sphere);
    new BABYLON.SubMesh(2, 0, verticesCount, 1800, 2088, sphere);

    camera.setPosition(new BABYLON.Vector3(-3, 3, 0));
    
    // Animations
    scene.registerBeforeRender(function () {
        sphere.rotation.y += 0.01;
    });

    return scene;
}