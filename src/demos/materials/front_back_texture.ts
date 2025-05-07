import { BABYLON, earcut } from "../../base/commonIncludes";

// 场景基本的构建方法
export const frontAndBackDiffTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    demo4(scene);




    return scene;
}

const demo1 = (scene:BABYLON.Scene)=>{
  // 创建一个轨道相机
  var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 4, BABYLON.Vector3.Zero(), scene);
  // 绑定事件
  camera.attachControl(true);

  // 添加半球光
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  
  // 添加点光源
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

  // Add and manipulate meshes in the scene

  //split image between sides
  var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
  var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width 
  
  // 通过frontUVs， backUVs 设置不同的UV
  var plane = BABYLON.MeshBuilder.CreatePlane("plane", {
          height:1, 
          width: 0.665, 
          sideOrientation: BABYLON.Mesh.DOUBLESIDE, 
          frontUVs: f, 
          backUVs: b
      }, 
      scene);

  // 创建一个标准材质
  var mat = new BABYLON.StandardMaterial("", scene);
  // 设置材质贴图
  mat.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/ntIgFT6.jpg", scene);
  plane.material = mat;
}

const demo2 = (scene:BABYLON.Scene)=>{
  
  // 创建一个轨道相机
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);
  // 绑定事件
  camera.attachControl(true);

  // 创建半球光
  var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(10, 10, 0), scene);
  // 创建半球光，方向不同
  var light2 = new BABYLON.HemisphericLight("hemiLight2", new BABYLON.Vector3(10, -10, 0), scene);
  // 设置强度
  light2.intensity = 0.7;

  
  // 构建XZ 多边形
  var shape = [ 
                  new BABYLON.Vector3(4, 0, -4), 
                  new BABYLON.Vector3(2, 0, 0), 
                  new BABYLON.Vector3(5, 0, 2), 
                  new BABYLON.Vector3(1, 0, 2), 
                  new BABYLON.Vector3(-5, 0, 5), 
                  new BABYLON.Vector3(-3, 0, 1), 
                  new BABYLON.Vector3(-4, 0, -4), 
                  new BABYLON.Vector3(-2, 0, -3), 
                  new BABYLON.Vector3(2, 0, -3)
            ];
            
  // 添加多边形的洞
  var holes = [];
      holes[0] = [ new BABYLON.Vector3(1, 0, -1),
               new BABYLON.Vector3(1.5, 0, 0),
               new BABYLON.Vector3(1.4, 0, 1),
               new BABYLON.Vector3(0.5, 0, 1.5)
             ];
      holes[1] = [ new BABYLON.Vector3(0, 0, -2),
               new BABYLON.Vector3(0.5, 0, -1),
               new BABYLON.Vector3(0.4, 0, 0),
               new BABYLON.Vector3(-1.5, 0, 0.5)
             ];
     

  // 拉伸图形
  var polygon1 = BABYLON.MeshBuilder.CreatePolygon("", {
    shape:shape, 
    holes:holes, 
    sideOrientation: BABYLON.Mesh.DOUBLESIDE 
    }, scene,earcut);
    // 设置位置
     polygon1.position.y = 4;

  // 设置前面与后面的UV
  var f = new BABYLON.Vector4(0,0, 0.5, 1); // front image = half the whole image along the width 
  var b = new BABYLON.Vector4(0.5,0, 1, 1); // back image = second half along the width 

  var polygon2 = BABYLON.MeshBuilder.CreatePolygon("", {
      shape:shape, holes:holes, 
      sideOrientation: BABYLON.Mesh.DOUBLESIDE, 
      // 前面的UV
      frontUVs: f,
      // 背面的UV 
      backUVs: b }, scene, earcut);
 // 设置位置
  polygon2.position.y = -4; 

  // 创建一个面的材质
  var mat = new BABYLON.StandardMaterial("", scene);
  // 设置材质贴图
  mat.diffuseTexture = new BABYLON.Texture(
      "https://i.imgur.com/JbvoYlB.png",
      scene);
  
  // 设置同样的材质
  polygon1.material = mat;
  polygon2.material = mat;
}

const demo3 = (scene:BABYLON.Scene)=>{
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, 3 * Math.PI / 8, 30, BABYLON.Vector3.Zero(), scene);

    //  绑定事件
	camera.attachControl(true);

    // 半球光
	var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 50, 0), scene);

    // 定义样条
	var myPath = [
		 	new BABYLON.Vector3(5.0, 0, 0.0),
			new BABYLON.Vector3(0, 1, 0.1),
			new BABYLON.Vector3(-4.0, 1, 0.2)
	];

	//split image between sides
    var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
    var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width 

	var tube = BABYLON.MeshBuilder.CreateTube("tube", {
        path: myPath, 
        radius: 3, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        // 外面
        frontUVs: f,
        // 内面 
        backUVs: b}, scene);

    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/ntIgFT6.jpg", scene);
    tube.material = mat;	
}

const demo4 = (scene:BABYLON.Scene)=>{

     // 创建一个轨道相机
     var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
     camera.attachControl(true);
 
     // 创建灯光
     var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
 
     // Add and manipulate meshes in the scene
     //split image between sides
     var f = new BABYLON.Vector4(0.5,0, 1, 1); // front image = half the whole image along the width 
     var b = new BABYLON.Vector4(0,0, 0.5, 1); // back image = second half along the width 
 
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            sideOrientation: BABYLON.Mesh.DOUBLESIDE, 
            frontUVs: f, 
            backUVs: b
       }, scene);
 
     var mat = new BABYLON.StandardMaterial("", scene);
     mat.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/ntIgFT6.jpg", scene);
     sphere.material = mat;

}