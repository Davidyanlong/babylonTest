import { BABYLON } from "../../base/commonIncludes";
import { localAxes, showAxis } from "../../utils/axis";


// 变换相关的
export const transformMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    const scene = new BABYLON.Scene(engine);


    // 变换位置
    // mesh.position = new Vector3(2, 3, 4);//(2, 3, 4)
    // mesh.position.addInPlace(new Vector3(2, 3, 4)); //(-1 + 2, 2 + 3, 1 + 4) = (1, 5, 5)
    // mesh.translate(new BABYLON.Vector3(2, 3, 4), 1, BABYLON.Space.WORLD); //(-1 + 2, 2 + 3, 1 + 4) = (1, 5, 5)


    // mesh.position.x = 2; //(2, 2, 1)
    // mesh.position.y = 3; //(2, 3, 1)
    // mesh.position.z = 4; //(2, 3, 4)

    // mesh.position.x += 2; //(-1 + 2, 2, 1) = (1, 2, 1)
    // mesh.position.y += 3; //(1, 2 + 3, 1) = (1, 5, 1)
    // mesh.position.z += 4; //(1, 5, 1 + 4) = (1, 5, 5)

    // mesh.translate(new BABYLON.Vector3(2, 3, 4), 1, BABYLON.Space.LOCAL);
    // mesh.setPositionWithLocalVector(new BABYLON.Vector3(2, 3, 4));
    // mesh.locallyTranslate(new BABYLON.Vector3(2, 3. 4));


    // 旋转
    // 欧拉角
    // mesh.rotation = new BABYLON.Vector3(alpha, beta, gamma); //alpha, beta, gamma in radians
    
    // mesh.rotation.x  =  alpha; //rotation around x axis
    // mesh.rotation.y  =  beta;  //rotation around y axis
    // mesh.rotation.z  =  gamma; //rotation around z axis


    // mesh.rotate(BABYLON.Axis.Y, yaw, BABYLON.Space.LOCAL);
    // mesh.rotate(BABYLON.Axis.X, pitch, BABYLON.Space.LOCAL);
    // mesh.rotate(BABYLON.Axis.Z, roll, BABYLON.Space.LOCAL);

    // 旋转队列
    // mesh.addRotation(Math.PI / 2, 0, 0);
    // mesh.addRotation(0, 0, Math.PI / 3);
    // mesh.addRotation(0, Math.PI / 8, 0);
    
    // mesh.rotation.addRotation(Math.PI / 2, 0, 0).addRotation(0, 0, Math.PI / 3).addRotation(0, Math.PI / 8);

    scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI/2, Math.PI/4, 3, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // lights
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    // demo4(scene);
    // demo5(scene);
    // demo6(scene);
    // demo7(scene);
    // demo8(scene);
    // demo9(scene);
    // demo10(scene);
    // demo11(scene);
    demo12(scene);







    return scene;

}

// 地球旋转
const demo1 = (scene:BABYLON.Scene) => {
    // 创建一个球
    var earth = BABYLON.MeshBuilder.CreateSphere("earth", {}, scene);

    // 场景标准材质
    var earthMaterial = new BABYLON.StandardMaterial("ground", scene);
    // 场景地球材质
    const diffuseTexture = earthMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/earth.jpg", scene);
    // 反正UV
    diffuseTexture.vScale = -1;
    diffuseTexture.uScale = -1;

    // 应用材质
    earth.material = earthMaterial;

    // 定义向量
    var earthAxis = new BABYLON.Vector3(
        Math.sin(23 * Math.PI/180), 
        Math.cos(23 * Math.PI/180), 
        0);

    // 创建一根轴线
    var axisLine = BABYLON.MeshBuilder.CreateLines("axis", {
        points:
        [
            earthAxis.scale(-5), 
            earthAxis.scale(5)
        ]}, scene);
  
    var angle = 0.01;
    // 旋转 旋转轴
    scene.registerBeforeRender(function() {
        // 旋转函数， 世界空间
        earth.rotate(earthAxis, angle, BABYLON.Space.WORLD);
    })
}

// 局部空间， 世界空间 旋转
const demo2 = (scene:BABYLON.Scene) => {
     
    // 定义面颜色
    var faceColors = [];
    faceColors[0] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
    faceColors[1] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
    faceColors[2] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
    faceColors[3] =  BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    faceColors[4] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    faceColors[5] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    var options = {
        faceColors: faceColors
    };

    var boxW = BABYLON.MeshBuilder.CreateBox("BoxW", options, scene);
    boxW.rotation.y = Math.PI / 4;
    boxW.position = new BABYLON.Vector3(2, 3, 4);

    var boxL = boxW.createInstance("boxL");
    /***************************************************************/

    /*************************World Axis for Rotation**********************/
    var axis = new BABYLON.Vector3(2, 6, 4);
    // 绘制旋转轴
    var drawAxis = BABYLON.MeshBuilder.CreateLines("vector", {
        points: [
            boxW.position.add(axis.scale(-2)),
            boxW.position.add(axis.scale(2))
        ]
    }, scene);
    /***************************************************************/

    /**************Animation of Rotation**********/
    var angle = 0.02;
    scene.registerAfterRender(function () {
        // 世界空间旋转， 
        boxW.rotate(axis, angle, BABYLON.Space.WORLD);
        // 局部空间旋转
        boxL.rotate(axis, angle, BABYLON.Space.LOCAL);

    });
    showAxis(8, scene)

}

// 四元素旋转
const demo3 = (scene:BABYLON.Scene) => {
    //轴
    const axes = [BABYLON.Axis.X, BABYLON.Axis.Y, BABYLON.Axis.Z];
    // 变换空间
	const spaces = [BABYLON.Space.WORLD, BABYLON.Space.LOCAL];

	//Randomise axes
	let rndA = Math.floor(Math.random() * 3);
	const A1 = axes[rndA];
	axes.splice(rndA, 1);
	rndA = Math.floor(Math.random() * 2);
	const A2 = axes[rndA];
	const A3 = axes[0];
	
	//Randomise spaces
	const rndSpace = Math.floor(Math.random() * 2);

    const faceColors = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
	faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
	faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
	faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
	faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
	faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());
	
	// 获取随机角度
	const alpha = Math.random() * 2* Math.PI;
	const beta = Math.random() * 2* Math.PI;
	const gamma =  Math.random() * 2* Math.PI;

	const box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors, updatable:true}, scene);
	
    //Apply Euler angles to box and form a rotation quaternion for the box
    box.rotate(A1, alpha, rndSpace);
	box.rotate(A2, beta, rndSpace);
	box.rotate(A3, gamma, rndSpace);
	
	//Obtain Euler angles from rotation quaternion
    // 从四元素中获取欧拉角
    const euler = box.rotationQuaternion!.toEulerAngles()
	
	//Create a second box and set a rotation from the converted angles
    const box1 = BABYLON.MeshBuilder.CreateBox("Box1", 
        {width:1.5, depth:1.5, height: 0.5, faceColors:faceColors, updatable:true}, 
        scene);
	// 设置旋转
    box1.rotation= new BABYLON.Vector3(euler.x, euler.y, euler.z);
	
}

// 对齐旋转
const demo4 = (scene:BABYLON.Scene) => {

    scene.clearColor = new BABYLON.Color4(.5, .5, .5, 1);


    // Create array of points to describe the curve
    var points:BABYLON.Vector3[] = [];
    for (var i = 0; i < 500; i++) {
        points.push(new BABYLON.Vector3(
            i - 250, 
            50 * Math.sin(i / 20), 
            i / 10 * Math.cos(i / 20)
        ));
    }

    // 定义3D路径
    var path3d = new BABYLON.Path3D(points);
    var curve = path3d.getCurve(); // create the curve
    // 计算 TBN 切空间
    var tangents = path3d.getTangents();  //array of tangents to the curve
    var normals = path3d.getNormals(); //array of normals to the curve
    var binormals = path3d.getBinormals(); //array of binormals to curve


    // 绘制线
    var lines = [];
    lines[0] = BABYLON.MeshBuilder.CreateLines('line', { points: points }, scene);
    lines[0].position.y = 400;
    // 创建 6 条曲线
    for (var l = 1; l < 6; l++) {
        lines[l] = lines[0].clone("line" + l);
        lines[l].position.y = 400 - l * 150;
    }

    //Create and draw a planes in xy plane to trace the curves
    const planes:BABYLON.Mesh[] = [];
    planes[0] = BABYLON.MeshBuilder.CreatePlane("plane0", { 
        size: 40, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE 
    }, scene);
    // 创建 6 个平面
    for (var i = 1; i < 6; i++) {
        planes[i] = planes[0].clone("plane" + i);
    }

    // 初始面法线
    var norm = new BABYLON.Vector3(0, 0, 1); //normal to plane
    // 定义每一个位置的法线
    var pos_of_norm = new BABYLON.Vector3(0, 0, 0);  // position of normal (for display)

    //Draw the normal lines in red
    var normalLines = [];
    // normalLines[0] = BABYLON.Mesh.CreateLines("normLine0", [pos_of_norm.subtract(norm).scale(2), pos_of_norm.add(norm).scale(2)], scene);

    normalLines[0] = BABYLON.MeshBuilder.CreateLines("normLine0", {
        points:[pos_of_norm.subtract(norm).scale(5), pos_of_norm.add(norm).scale(5)]}, scene);
    normalLines[0].color = BABYLON.Color3.Red();
   // 设置平面的子对象
    normalLines[0].parent = planes[0];

    for (var n = 1; n < 6; n++) {
        normalLines[n] = normalLines[0].clone("normalLine" + n);
        normalLines[n].parent = planes[n];
    }

    //Set plane as parent of normal line so they move and turn as one
    // 基于切空间计算旋转
    function orientation(i:number, p:number) {
        switch (i) {
            case 0:
                return BABYLON.Vector3.RotationFromAxis(tangents[p], normals[p], binormals[p]);
                break;
            case 1:
                return BABYLON.Vector3.RotationFromAxis(tangents[p], binormals[p], normals[p]);
                break;
            case 2:
                return BABYLON.Vector3.RotationFromAxis(normals[p], tangents[p], binormals[p]);
                break;
            case 3:
                return BABYLON.Vector3.RotationFromAxis(normals[p], binormals[p], tangents[p]);
                break;
            case 4:
                return BABYLON.Vector3.RotationFromAxis(binormals[p], tangents[p], normals[p]);
                break;
            case 5:
                return BABYLON.Vector3.RotationFromAxis(binormals[p], normals[p], tangents[p]);
                break;
        }
    }

    var p = 0;

    scene.registerBeforeRender(function () {
        for (var i = 0; i < 6; i++) {
            planes[i].rotation = orientation(i, p) as BABYLON.Vector3;
            planes[i].position = points[p].add(new BABYLON.Vector3(0, 400 - i * 150, 0));
        }
        p++;
        p %= curve.length;
    });

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 0;
    camera.beta = 0;
    camera.setPosition(new BABYLON.Vector3(0,0,-1200));


}

// 欧拉角到四元素
const demo5 = (scene:BABYLON.Scene) => {
    var faceColors = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
	faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red())
	faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
	faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
	faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
	faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());
	
	//randomise angles
	var yaw = Math.random() * 2* Math.PI;
	var pitch = Math.random() * 2* Math.PI;
	var roll =  Math.random() * 2* Math.PI;

	var box = BABYLON.MeshBuilder.CreateBox("Box", {faceColors, updatable:true}, scene);
    // 欧拉角方式的旋转
	box.rotate(BABYLON.Axis.Y, yaw, BABYLON.Space.LOCAL);
	box.rotate(BABYLON.Axis.X, pitch, BABYLON.Space.LOCAL);
	box.rotate(BABYLON.Axis.Z, roll, BABYLON.Space.LOCAL);
	
    // 欧拉角转换为四元素
	var yprQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(yaw, pitch, roll);
	
	var box1 = BABYLON.MeshBuilder.CreateBox("Box1", {width:1.5, depth:1.5, height: 0.5, faceColors:faceColors}, scene, true);
 	// 通过四元素旋转
    box1.rotationQuaternion = yprQuaternion;
}

// 坐标空间变换
const demo6 = (scene:BABYLON.Scene) => {

    var faceColors = [];
    faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
    faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
    faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
    faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    var options = {
        faceColors: faceColors
    };

    // 创建一个box
    var box = BABYLON.MeshBuilder.CreateBox("Box", options, scene);
    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.25, updatable:true }, scene);
    // 绕 y 轴旋转
    box.rotation.y = Math.PI / 4;
    // 位置变换
    box.position = new BABYLON.Vector3(1, 2, 3);
    // 获取box 是世界矩阵
    var matrix = box.computeWorldMatrix(true);  // force calculation of world matrix
    // 定义局部位置
    var local_pos = new BABYLON.Vector3(0, 0.6, 0); //top middle of box relative to box
    // 将局部位置转换到box 的世界空间的位置
    var global_pos = BABYLON.Vector3.TransformCoordinates(local_pos, matrix); //calculate world position
    // 设置球的位置
    sphere.position = global_pos; //position sphere relative to world

    showAxis(4, scene)

}
// 旋转
const demo7 = (scene:BABYLON.Scene) => {

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 100;

    var faceColors = [];
    faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
    faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
    faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
    faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    var disc = BABYLON.MeshBuilder.CreateCylinder("disc", { diameter:20, height:0.25 }, scene);
    const mat = disc.material = new BABYLON.StandardMaterial("grass", scene);
    mat.diffuseTexture = new BABYLON.Texture(
        "https://playground.babylonjs.com/textures/grass.png", scene);
    
    var box = [];
    for(var i=0; i<50; i++) {
        box[i] = BABYLON.MeshBuilder.CreateBox("Box"+i, { faceColors: faceColors }, scene);
        var scale = 1 + Math.random()*2;
        var radius = Math.random()*9;
        var theta = Math.random() * 2 * Math.PI;
        var phi = Math.random() * 2 * Math.PI; 
        box[i].scaling.y = scale;
        box[i].rotation.y = phi;
        box[i].position = new BABYLON.Vector3(radius * Math.cos(theta), scale/2, radius * Math.sin(theta));
    }
    // 合并Mesh
    var boxes = BABYLON.Mesh.MergeMeshes(box) as BABYLON.Mesh;
    var boxes_position = boxes.position.clone();
    
    var phi = 0;
    scene.registerAfterRender(function () {
        // 获取世界矩阵
        let matrix = disc.getWorldMatrix();
        // 绕 Y Z 旋转
        disc.rotate(BABYLON.Axis.Y, Math.PI / 150, BABYLON.Space.LOCAL);
        disc.rotate(BABYLON.Axis.Z, Math.PI / 200, BABYLON.Space.LOCAL);
        // 位置变换
        disc.position = new BABYLON.Vector3(15 * Math.cos(phi), 16 * Math.sin(phi), 5)
        // 设置box 与圆盘一直
        boxes.rotationQuaternion = disc.rotationQuaternion;
        // box 位置变换
        boxes.position = BABYLON.Vector3.TransformCoordinates(boxes_position, matrix);
        phi +=0.01;

    })
}

// transformNode 
const demo8 = (scene:BABYLON.Scene) => {
    //create box 
    var faceColors = [];
    faceColors[0]=  BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
    faceColors[1]=  BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
    faceColors[2]=  BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
    faceColors[3]=  BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    faceColors[4]=  BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

	var options = {
        faceColors: faceColors,
        updateable:true
    };

	var box = BABYLON.MeshBuilder.CreateBox("Box", options, scene);

    //create a Center of Transformation
    // 创建一个变换对象
    var CoT= new BABYLON.TransformNode("root"); 
    box.setParent(CoT as unknown as BABYLON.Node);  //apply to Box
    CoT.rotation.y = Math.PI/4;

    var angle = 0;
    scene.registerBeforeRender(function(){
        CoT.rotation.y = angle;
        angle +=0.01;
    });
    showAxis(3, scene);
}

// transformNode 
const demo9 = (scene:BABYLON.Scene) => {
    //create sphere to indicate position of Center of Transformation
    var sphere = BABYLON.MeshBuilder.CreateSphere("Sphere", {diameter:0.1,updatable:true}, scene);
    const mat = sphere.material = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3(1, 0, 1);

    // create axes for frame of reference of Center of Transformation
    // var CoTAxis = localAxes(2, 0);

    //create box 
    var faceColors = [];
    faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
    faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
    faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
    faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
    faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

	var options = {
        faceColors: faceColors,
        updatable:true
    };

	var box = BABYLON.MeshBuilder.CreateBox("Box", options, scene);

    //create a Center of Transformation
    var CoT = new BABYLON.TransformNode("root"); 
    let trans = localAxes(5);
    trans.setParent(CoT as unknown as BABYLON.Node);


    box.setParent(CoT as unknown as BABYLON.Node);  //apply to Box
    box.position.z = 2;
    
    sphere.setParent (CoT as unknown as BABYLON.Node);  //apply to Box
    CoT.rotation.y = Math.PI/4;

   
    //Animation
    var angle = 0;
    scene.registerBeforeRender(function(){
        CoT.rotation.y = angle;
        box.rotation.z = angle;
        angle +=0.01;
    });

  
}

// 添加父子关系
const demo10 = (scene:BABYLON.Scene) => {

    // 添加父子关系
    // meshC.parent = meshP; // 1
    // meshC.setParent(meshP); // 2
    // meshP.addChild(meshC); // 3

    // 移除父子关系
    // meshC.parent = null; // 1
    // meshC.setParent(null); // 2
    // meshP.removeChild(meshC); // 3

    var faceColors = [];
    faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Purple());

    var faceColors1 = [];
    faceColors1[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red());

    var faceColors2 = [];
    faceColors2[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());

    var faceColors3 = [];
    faceColors3[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());

    // 创建一个大box
    var box = BABYLON.MeshBuilder.CreateBox("Box", { faceColors: faceColors }, scene);
    // 创建三个小box
    var small1 = BABYLON.MeshBuilder.CreateBox("Small1", 
        { width: 0.25, depth: 0.5, height: 0.75, faceColors: faceColors1 }, scene);
    var small2 = BABYLON.MeshBuilder.CreateBox("Small2", 
        { width: 0.5, depth: 0.25, height: 1.25, faceColors: faceColors2 }, scene);
    var small3 = BABYLON.MeshBuilder.CreateBox("Small3", 
        { width: 0.75, depth: 0.125, height: 2, faceColors: faceColors3 }, scene);
    
    
    // 设置父子关系
    small1.setParent(box as unknown as BABYLON.Node);
    small2.setParent(box as unknown as BABYLON.Node);
    box.addChild(small3 as unknown as BABYLON.TransformNode);

    // Setting Transformations
    small1.position.y = 1;
    small2.position.y = 1;
    small3.position.y = 1;

    small1.rotation.x= Math.PI /2;
    small2.rotation.x = Math.PI /2;
    small3.rotation.x = Math.PI /2;

    box.position.x = 1;
    box.rotation.y = Math.PI / 4;
    showAxis(5, scene)

}
// Pivots 基准点
const demo11 = (scene:BABYLON.Scene) => {
     
    // 创建一个标记基准点的球
     /*********************Create Marker for Pivot***************/
     const spherePivot = BABYLON.MeshBuilder.CreateSphere("sphereP", {diameter:.5}, scene);
     const pivotMat = spherePivot.material = new BABYLON.StandardMaterial("pivot", scene);
     pivotMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
     /*********************End  Marker for Box Pivot***************/
 
     // 创建一个坐标原点的球
     /*********************Create Marker for Box Local Origin***************/
     const sphereLocalOrigin = BABYLON.MeshBuilder.CreateSphere("sphereLO", {diameter:.5}, scene);
     const originMat= sphereLocalOrigin.material = new BABYLON.StandardMaterial("origin", scene);
     originMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
     /*********************End  Marker for Box Local Origin***************/
 
     /*********************Create Box to Transform About Pivot***************/
     const faceColors = [];
     faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
     faceColors[1] = BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
     faceColors[2] = BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
     faceColors[3] = BABYLON.Color4.FromColor3(BABYLON.Color3.White());
     faceColors[4] = BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
     faceColors[5] = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());
  
     const box = BABYLON.MeshBuilder.CreateBox("Box", 
        {faceColors:faceColors, size:2, updatable:true}, scene);
    
      //  设置基准点球的父级为box
     spherePivot.setParent(box as unknown as BABYLON.Node);
     // 设置球的局部位置
     spherePivot.position = new BABYLON.Vector3(-1, -1, -1);
    
     // 设置原点球的父级也为 box
     sphereLocalOrigin.setParent(box as unknown as BABYLON.Node);
     

     //通过矩阵设置基准点
    //  mesh.setPivotMatrix(BABYLON.Matrix.Translation(Vector3));


     // 设置box的基准点为 [-1,-1,-1];
     box.setPivotPoint(new BABYLON.Vector3(-1, -1, -1));

     // 这只box的材质， 并显示网格
     box.material = new BABYLON.StandardMaterial("", scene);
     box.material.wireframe = true;
     /*******************End Box Creation*****************************************/

     
     box.position = new BABYLON.Vector3(1, 2, 3);
     box.rotation = new BABYLON.Vector3(-Math.PI / 4, -Math.PI / 6, -Math.PI / 3);
 
     
     /*******Animation******************************/
     let angle = 0;
     // 绕Y轴旋转
     scene.registerBeforeRender(function(){
         box.rotation.y = angle;
         angle += 0.01;
 
     })
     /*******End Animation******************************/
     /***********Create and Draw Axes**************************************/
     showAxis(6, scene)
 
}

// 绕某个轴旋转
const demo12 = (scene:BABYLON.Scene) => {

    // material
  var mat = new BABYLON.StandardMaterial("mat1", scene);
  mat.alpha = 1.0;
  mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1.0);
  mat.backFaceCulling = false;
  
    /************Start Pilot*********************************/
   var body = BABYLON.MeshBuilder.CreateCylinder("body", { height: 0.75, diameterTop: 0.2, diameterBottom: 0.5, tessellation: 6, subdivisions: 1 }, scene);
   var arm = BABYLON.MeshBuilder.CreateBox("arm", { height: 0.75, width: 0.3, depth: 0.1875 }, scene);
   arm.position.x = 0.125;
   // 创建一个组合的Mesh
   var pilot = BABYLON.Mesh.MergeMeshes([body, arm], true);
    /*************End Pilot****************************************/
  
  /************Set Center of Rotation (CoR) Position, Axis and Pilot Start Position********/
  // 中点
  var CoR_At = new BABYLON.Vector3(1, 3, 2);
  // 方向
  var axis = new BABYLON.Vector3(2, 6, 4);
  // 起始位置
  var pilotStart = new BABYLON.Vector3(2,3,4);
  /****************************************************************/
   
  /****************Draw Axis and Sphere to show Pivot Position*****************/	
  // 创建旋转轴
  var axisLine = BABYLON.MeshBuilder.CreateLines("axisLine", {
    points:[CoR_At.add(axis.scale(-10)),CoR_At.add(axis.scale(10))]},
     scene);

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.25}, scene);
  // 坐标轴的位置
  sphere.position = CoR_At;
  /****************************************************************/ 
  
  /********************Parent at Pivot Position, Position Child*********/
  // 定义变换对象
  var pivot = new BABYLON.TransformNode("root");
  // 设置变换对象的位置
  pivot.position = CoR_At; 
  pilot!.setParent(pivot as unknown as BABYLON.Node);
  sphere.setParent(pivot as unknown as BABYLON.Node);
  pilot!.position = pilotStart;
  /***************************************************************/
 
  
  /**************Animation of Rotation**********/
  var a = 0; // for oscillation 
  var angle = 0.02;
  var axisNormal = axis.normalize(); 
  scene.registerAfterRender(function () { 
    a +=0.005;
    var sign = Math.cos(a)/Math.abs(Math.cos(a));
    // 旋转绕轴
	pivot.rotate(axis, angle, BABYLON.Space.LOCAL);
    pivot.position = pivot.position.add(axisNormal.scale(0.01 * sign)); //move pilot along axis
});

  showAxis(6, scene)
}