import { BABYLON, earcut } from "../../base/commonIncludes";

// 场景基本的构建方法
export const meshFace2sScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

  //  创建一个轨道相机
  var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
  // 创建半球光
  var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(10, 10, 0), scene);


	
	// XZ 平面的多边形
	var wallData = [ 
					new BABYLON.Vector3(-3.5, 0, -2.5), 
                    new BABYLON.Vector3(0.5, 0, -2.5), 
                    new BABYLON.Vector3(0.5, 0, -0.5), 
                    new BABYLON.Vector3(1.5, 0, -0.5), 
                    new BABYLON.Vector3(1.5, 0, -2.5),
                    new BABYLON.Vector3(3.5, 0, -2.5), 
                    new BABYLON.Vector3(3.5, 0, 2.5), 
                    new BABYLON.Vector3(-3.5, 0, 2.5)
              ];
			  
	// XZ平面上的洞
	var holes = [];
		holes[0] = [ new BABYLON.Vector3(-2.5, 0, -2),
                 new BABYLON.Vector3(-0.5, 0, -2),
                 new BABYLON.Vector3(-0.5, 0, -0.5),
                 new BABYLON.Vector3(-2.5, 0, -0.5)
               ];
		holes[1] = [ new BABYLON.Vector3(-3.0, 0, 0.75),
                 new BABYLON.Vector3(-1.5, 0, 0.75),
                 new BABYLON.Vector3(-1.5, 0, 1.75),
                 new BABYLON.Vector3(-3.0, 0, 1.75)
               ];

       holes[2] = [ new BABYLON.Vector3(0, 0, 0.75),
                 new BABYLON.Vector3(1.5, 0, 0.75),
                 new BABYLON.Vector3(1.5, 0, 1.75),
                 new BABYLON.Vector3(0, 0, 1.75)
               ]; 
       holes[3] = [ new BABYLON.Vector3(2, 0, 0.75),
                 new BABYLON.Vector3(3, 0, 0.75),
                 new BABYLON.Vector3(3, 0, 1.75),
                 new BABYLON.Vector3(2, 0, 1.75)
               ];                
	
    // face 0 is the top, face 1 the extruded sides and face 2 the bottom.
	var faceUV = new Array(3);
	// 正面
	faceUV[0] = new BABYLON.Vector4(0, 0, 7/15, 1);
    // 拉伸面
	faceUV[1] = new BABYLON.Vector4(14/15, 0, 1, 1);
    // 背面
	faceUV[2] = new BABYLON.Vector4(7/15, 0, 14/15, 1);
	
    // 创建一个抽取网格对象
	var wall = BABYLON.MeshBuilder.ExtrudePolygon("wall", 
        {
          shape:wallData, 
          // 厚度
          depth: 0.15, 
          holes:holes, 
          faceUV: faceUV
        }, scene,earcut);
    // 旋转90度
	wall.rotation.x = -Math.PI/2;
	
    // 创建墙面的材质
	var wallmat = new BABYLON.StandardMaterial("wallmaterial", scene);
    wallmat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/OrdRedm.jpg",
        scene);


    wall.material = wallmat;

    // 创建楼梯
    var stairsDepth = 2;
    var stairsHeight = 2.5;
    var stairsThickness = 0.05;
    var nBStairs = 12;
    var stairs = [];
    var x = 0;
    var z = 0;
    
    //up
    stairs.push(new BABYLON.Vector3(x, 0, z));
    z += stairsHeight/nBStairs - stairsThickness;
    stairs.push(new BABYLON.Vector3(x, 0, z));
    for(var i = 0; i<nBStairs; i++) {
        x += stairsDepth/nBStairs;
        stairs.push(new BABYLON.Vector3(x, 0, z));
        z += stairsHeight/nBStairs;
        stairs.push(new BABYLON.Vector3(x, 0, z));
    }
    x += stairsDepth/nBStairs - stairsThickness;
    stairs.push(new BABYLON.Vector3(x, 0, z));
    z += stairsThickness;
    stairs.push(new BABYLON.Vector3(x, 0, z));
	//down
    for(var i = 0; i<=nBStairs; i++) {
        x -= stairsDepth/nBStairs
        stairs.push(new BABYLON.Vector3(x, 0, z));
        z -= stairsHeight/nBStairs;
        stairs.push(new BABYLON.Vector3(x, 0, z));
    }
	
	const faceColors = [];
	faceColors[0] = new BABYLON.Color4(0, 0, 0 , 1);
	faceColors[1] = new BABYLON.Color4(1, 0, 0 , 1);
	faceColors[2] = new BABYLON.Color4(0, 0, 0 , 1);

    var stairsWidth = 1.5;
    // 抽取一个楼梯
    var stairCase = BABYLON.MeshBuilder.ExtrudePolygon("stairs", {
        shape:stairs, 
        depth: stairsWidth, 
        faceColors: faceColors
    }, scene, earcut);

    // 楼梯的位置
	stairCase.position.x = 3.5;
    stairCase.position.y = - 2.5;
    stairCase.position.z = 1;
    stairCase.rotation.x = -Math.PI/2;
    stairCase.rotation.y = -Math.PI/2;
    
    // 地面图形
	var floorData = [ 
					new BABYLON.Vector3(-3.5, 0, 0), 
                    new BABYLON.Vector3(3.5, 0, 0),
					new BABYLON.Vector3(3.5, 0, 1.5),
					new BABYLON.Vector3(2, 0, 1.5),
					new BABYLON.Vector3(2, 0, 2.85),
					new BABYLON.Vector3(3.5, 0, 2.85),
                    new BABYLON.Vector3(3.5, 0, 4), 
                    new BABYLON.Vector3(-3.5, 0, 4)
              ];
			  
	var floorFaceUV = new Array(3);
	
	floorFaceUV[0] = new BABYLON.Vector4(0, 0, 0.5, 1);
	floorFaceUV[2] = new BABYLON.Vector4(0.5, 0, 1, 1);
	

	var floor = BABYLON.MeshBuilder.ExtrudePolygon("stairs", {
        shape:floorData, 
        depth: 0.1, 
        faceUV: floorFaceUV
    }, scene, earcut);
	floor.position.y = 0.21;
	floor.position.z = 0.15;
	
    // 创建地面材质
	var floormat = new BABYLON.StandardMaterial("floormaterial", scene);
    floormat.diffuseTexture = new BABYLON.Texture(
        "https://i.imgur.com/P6dZ2On.jpg",
        scene);
	
	floor.material = floormat;
    return scene;
}

