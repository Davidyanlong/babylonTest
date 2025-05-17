import { BABYLON } from "../../base/commonIncludes";

// 模型合并
export const lodMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    var scene = new BABYLON.Scene(engine);
    
    // demo1(scene, canvas);
    // demo2(scene, canvas);
    demo3(scene, canvas);


    return scene;
}

// 基于距离的LOD
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	
    // 创建灯光
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 1, 1);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);

    // 创建LOD模型组
    var knot00 = BABYLON.MeshBuilder.CreateTorusKnot("knot0", 
        {radius:0.5, tube:0.2, radialSegments:128, tubularSegments:64, p:2, q:3}, scene);


	var knot01 = BABYLON.MeshBuilder.CreateTorusKnot("knot1",  {radius:0.5, tube:0.2, radialSegments:48, tubularSegments:16, p:2, q:3}, scene);
	var knot02 = BABYLON.MeshBuilder.CreateTorusKnot("knot2",  {radius:0.5, tube:0.2, radialSegments:24, tubularSegments:12, p:2, q:3}, scene);
	var knot03 = BABYLON.MeshBuilder.CreateTorusKnot("knot3",  {radius:0.5, tube:0.2, radialSegments:18, tubularSegments:8, p:2, q:3}, scene);
	
    // 定义材质 
	var material1 = new BABYLON.StandardMaterial("colo1", scene);	
	material1.diffuseColor = new BABYLON.Color3(0.49, 0.25, 0);		
	var material2 = material1.clone("colo2");
	material2.diffuseColor = new BABYLON.Color3(1.0, 0.5, 0.7);	
	var material3 = material1.clone("colo3");
	material3.diffuseColor = new BABYLON.Color3(0.8, 1.0, 0.7);	
	var material4 = material1.clone("colo4");
	material4.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	
     // 应用不同颜色的材质
	knot00.material = material1;
	knot01.material = material2;
	knot02.material = material3;
	knot03.material = material4;	
	
    // 设置LOD
	knot00.addLODLevel(15, knot01);
	knot00.addLODLevel(30, knot02);
	knot00.addLODLevel(45, knot03);
	knot00.addLODLevel(60, null);   
}

// 基于屏幕占比的LOD
const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
       // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	
    // 创建灯光
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 1, 1);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);

    // 创建LOD模型组
    var knot00 = BABYLON.MeshBuilder.CreateTorusKnot("knot0", 
        {radius:0.5, tube:0.2, radialSegments:128, tubularSegments:64, p:2, q:3}, scene);

    knot00.useLODScreenCoverage = true;
	var knot01 = BABYLON.MeshBuilder.CreateTorusKnot("knot1",  {radius:0.5, tube:0.2, radialSegments:48, tubularSegments:16, p:2, q:3}, scene);
	var knot02 = BABYLON.MeshBuilder.CreateTorusKnot("knot2",  {radius:0.5, tube:0.2, radialSegments:24, tubularSegments:12, p:2, q:3}, scene);
	var knot03 = BABYLON.MeshBuilder.CreateTorusKnot("knot3",  {radius:0.5, tube:0.2, radialSegments:18, tubularSegments:8, p:2, q:3}, scene);
	
    // 定义材质 
	var material1 = new BABYLON.StandardMaterial("colo1", scene);	
	material1.diffuseColor = new BABYLON.Color3(0.49, 0.25, 0);		
	var material2 = material1.clone("colo2");
	material2.diffuseColor = new BABYLON.Color3(1.0, 0.5, 0.7);	
	var material3 = material1.clone("colo3");
	material3.diffuseColor = new BABYLON.Color3(0.8, 1.0, 0.7);	
	var material4 = material1.clone("colo4");
	material4.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	
     // 应用不同颜色的材质
	knot00.material = material1;
	knot01.material = material2;
	knot02.material = material3;
	knot03.material = material4;	
	
    // 设置LOD
    knot00.addLODLevel(0.7, knot01);
    knot00.addLODLevel(0.1, knot02);
    knot00.addLODLevel(0.01, knot03);
	knot00.addLODLevel(0.0001, null); 
}


const demo3 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	
    // 创建灯光
	var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(1, 1, 1);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);

	var count = 3;
	var scale = 4;


    var knot00 = BABYLON.MeshBuilder.CreateTorusKnot("knot0", 
        {radius:0.5, tube:0.2, radialSegments:128, tubularSegments:64, p:2, q:3}, scene);

	var knot01 = BABYLON.MeshBuilder.CreateTorusKnot("knot1",  {radius:0.5, tube:0.2, radialSegments:48, tubularSegments:16, p:2, q:3}, scene);
	var knot02 = BABYLON.MeshBuilder.CreateTorusKnot("knot2",  {radius:0.5, tube:0.2, radialSegments:24, tubularSegments:12, p:2, q:3}, scene);
	var knot03 = BABYLON.MeshBuilder.CreateTorusKnot("knot3",  {radius:0.5, tube:0.2, radialSegments:18, tubularSegments:8, p:2, q:3}, scene);
	
	
	var material1 = new BABYLON.StandardMaterial("colo1", scene);	
	material1.diffuseColor = new BABYLON.Color3(0.49, 0.25, 0);		
	var material2 = material1.clone("colo2");
	material2.diffuseColor = new BABYLON.Color3(1.0, 0.5, 0.7);	
	var material3 = material1.clone("colo3");
	material3.diffuseColor = new BABYLON.Color3(0.8, 1.0, 0.7);	
	var material4 = material1.clone("colo4");
	material4.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
	
	knot00.material = material1;
	knot01.material = material2;
	knot02.material = material3;
	knot03.material = material4;	
	
	knot00.setEnabled(false);
	
	knot00.addLODLevel(15, knot01);
	knot00.addLODLevel(30, knot02);
	knot00.addLODLevel(45, knot03);
	knot00.addLODLevel(55, null);
	
	for (var x = -count; x <= count; x++) {
	    for (var y = -count; y <= count; y++) {
	        for (var z = 5; z < 10; z++) {
	            var knot = knot00.createInstance("knotI");
	            knot.position = new BABYLON.Vector3(x * scale, y * scale, z * scale);
	        }
	    }
	}
}