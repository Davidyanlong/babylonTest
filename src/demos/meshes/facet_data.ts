import { BABYLON } from "../../base/commonIncludes";

// 模型合并
export const facetDataScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    var scene = new BABYLON.Scene(engine);
    
    // demo1(scene, canvas);
    // demo2(scene, canvas);
    demo3(scene, canvas);


    return scene;
}

// 获取facet 数据
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0.35, 0.35, 0.42, 1);

    //  创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(0.0, 3.0, -8.0));

    // 创建灯光
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.2;
    var pl = new BABYLON.PointLight('pl', camera.position, scene);
    pl.intensity = 0.9;

    // 创建ICO球
    var mesh = BABYLON.MeshBuilder.CreateIcoSphere("m", {radius: 2.0}, scene);
    // 更新计算 faceData
    mesh.updateFacetData();
    // 获取所有的顶点数据
    var positions = mesh.getFacetLocalPositions();
    // 获取所有的法线数据
    var normals = mesh.getFacetLocalNormals();

    var lines = [];
    for (var i = 0; i < positions.length; i++) {
        var line = [ positions[i], positions[i].add(normals[i]) ];
        lines.push(line);
    }
    //
    var lineSystem = BABYLON.MeshBuilder.CreateLineSystem("ls", {lines: lines}, scene);
    lineSystem.color = BABYLON.Color3.Green();
}

// 运用 facet 数据
const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
     
    // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0.35, 0.35, 0.42, 1);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(0.0, 3.0, -8.0));

    // 创建灯光
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.2;
    var pl = new BABYLON.PointLight('pl', camera.position, scene);
    pl.intensity = 0.9;

    // 创建ICO球
    var mesh = BABYLON.MeshBuilder.CreateIcoSphere("m", {radius: 2.0}, scene);
    mesh.updateFacetData();

    // 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("b", {}, scene);

    var tmpVector = BABYLON.Vector3.Zero();
    var worldPos = BABYLON.Vector3.Zero();
    var worldNor = BABYLON.Vector3.Zero();
    var boxPos = BABYLON.Vector3.Zero();
    var facetIndex = 51;
    var distance = 2.0;

    // 设置box
    box.position = boxPos;

    scene.registerBeforeRender(function() {
        // 获取第几个数据
        mesh.getFacetPositionToRef(facetIndex, worldPos);
        mesh.getFacetNormalToRef(facetIndex, worldNor);
        worldNor.scaleToRef(distance, tmpVector);
        // 修改box的位置
        tmpVector.addToRef(worldPos, boxPos);
        mesh.rotation.y += 0.01;
        mesh.rotation.z -= 0.005;
    });

}
// 深度排序
const demo3 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
     // 设置清屏色
    scene.clearColor = new BABYLON.Color4(0.2, 0.4, 0.8, 1);

    // 绑定相机
    var camera = new BABYLON.ArcRotateCamera("cam", 0, 0, 0, BABYLON.Vector3.Zero(), scene);    
    camera.attachControl(canvas, true);
    camera.setPosition(new BABYLON.Vector3(0, 0, -20));

    // 创建灯光
    var light = new BABYLON.PointLight("pl", camera.position, scene);
    light.intensity = 1.0;

    // 创建材质
    var mat = new BABYLON.StandardMaterial("m", scene);
    mat.diffuseColor = BABYLON.Color3.Yellow();
    mat.alpha = 0.9;
    // mat.backFaceCulling = false;
    // mat.wireframe = true;

    var mesh = BABYLON.MeshBuilder.CreateTorusKnot("mesh", {updatable: true}, scene);
    mesh.material = mat;
    // 启用深度排序
    mesh.mustDepthSortFacets = true;
    mesh.position.x = -4.0;

    var mesh2 = BABYLON.MeshBuilder.CreateTorusKnot("mesh", {}, scene);
    mesh2.material = mat;
    mesh2.position.x = 4.0;

   
    scene.registerBeforeRender(function() {
        mesh.rotation.y += 0.01;
        mesh.updateFacetData();

        mesh2.rotation.y += 0.01;
    });
}