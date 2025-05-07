import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const multiMaterialMergeMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // 设置相机的朝向
    camera.setTarget(BABYLON.Vector3.Zero());
    // 绑定事件
    camera.attachControl(canvas, true);

    // 定义半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // 设置强度
    light.intensity = 0.7;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);
    
    // demo1(scene);
    demo2(scene);

    return scene;
}

const  demo1 = (scene:BABYLON.Scene)=>{
    // 创建材质
    var mat1 = new BABYLON.StandardMaterial('mat1', scene);
    // 漫反射为红色
    mat1.diffuseColor = new BABYLON.Color3(1, 0, 0);
    
    // 创建材质2
    var mat2 = new BABYLON.StandardMaterial('mat2', scene);
    // 漫反射为绿色
    mat2.diffuseColor = new BABYLON.Color3(0, 1, 0);


    // 创建一个球设置为漫反射红色
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 16}, scene);
    sphere.material = mat1;
    sphere.position.y = 1;

    // 创建一个cube， 设置为绿色材质
    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
    cube.position = new BABYLON.Vector3(1, 1.5, 0);
    cube.material = mat2;

    //parameters - arrayOfMeshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes, multiMultiMaterial
   /**
    * @param meshes — array of meshes with the vertices to merge. Entries cannot be empty meshes.
    * @param disposeSource — when true (default), dispose of the vertices from the source meshes.
    * @param allow32BitsIndices — when the sum of the vertices > 64k, this must be set to true.
    * @param meshSubclass — (optional) can be set to a Mesh where the merged vertices will be inserted.
    * @param subdivideWithSubMeshes — when true (false default), subdivide mesh into subMeshes.
    * @param multiMultiMaterials — when true (false default), subdivide mesh into subMeshes with multiple materials, ignores subdivideWithSubMeshes.
 */

   // multiMultiMaterials 使用多材质
    var mesh = BABYLON.Mesh.MergeMeshes([sphere, cube], true, true, undefined, false, true);
    
}


const  demo2 = (scene:BABYLON.Scene)=>{
    // Materials
    var mat1 = new BABYLON.StandardMaterial('mat1', scene);
    mat1.diffuseColor = new BABYLON.Color3(1, 0, 0);
    var mat2 = new BABYLON.StandardMaterial('mat2', scene);
    mat2.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var multimat = new BABYLON.MultiMaterial('multi', scene);
    multimat.subMaterials.push(mat1);
    multimat.subMaterials.push(mat2);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter: 2, segments: 16}, scene);
    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    var cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 1, height: 3 }, scene);
    cube.position = new BABYLON.Vector3(1, 1.5, 0);

    //parameters - arrayOfMeshes, disposeSource, allow32BitsIndices, meshSubclass, subdivideWithSubMeshes
    var mesh = BABYLON.Mesh.MergeMeshes([sphere, cube], true, true, undefined, true) as BABYLON.Mesh;
    // 设置多材质
    mesh.material = multimat;
    // 设置第二个子mesh 的材质索引
    mesh.subMeshes[1].materialIndex = 1;
    
}