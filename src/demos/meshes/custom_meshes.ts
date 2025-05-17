import { BABYLON } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";


// 预设的一些几何图形
export const customMeshesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    var scene = new BABYLON.Scene(engine);

	var light = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(0, 0, 1), scene);
	var light1 = new BABYLON.DirectionalLight("direct", new BABYLON.Vector3(0, 0, -1), scene);

	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  	camera.setPosition(new BABYLON.Vector3(0, 5, -30));
	camera.attachControl(canvas, true);
	  

    // case

    // demo1(scene)
    // demo2(scene)
    // demo3(scene)
    // demo4(scene)
    // demo5(scene)
    demo6(scene)

	return scene;
}

// 自定义三角形
const demo1 = (scene:BABYLON.Scene) =>{
    
    // 创建一个mesh 
	var customMesh = new BABYLON.Mesh("custom", scene);
	
	// 定义顶点数据
	var positions = [
        -5, 2, -3, 
        -7, -2, -3, 
        -3, -2, -3, 
        
        5, 2, 3, 
        7, -2, 3, 
        3, -2, 3
    ];
    // 索引数据
	var indices = [0, 1, 2, 3, 4, 5];
	
	// 创建顶点数据对象
	var vertexData = new BABYLON.VertexData();

	// 设置顶点数据
	vertexData.positions = positions;
	vertexData.indices = indices;	

	// 应用顶点数据
	vertexData.applyToMesh(customMesh);
	
	
	// 创建一个材质
	var mat = new BABYLON.StandardMaterial("mat", scene);
	mat.wireframe = true;
	customMesh.material = mat;
    mat.backFaceCulling = false
    	
	showAxis(5, scene);
}

// 顶点着色
const demo2 = (scene:BABYLON.Scene) =>{
    
    // 创建mesh 网格体
	var customMesh = new BABYLON.Mesh("custom", scene);
	
	// 定义顶点数据
	var positions = [
        -5, 2, -3, 
        -7, -2, -3, 
        -3, -2, -3, 
        5, 2, 3, 
        7,-2, 3, 
        3, -2, 3
    ];
	var indices = [0, 1, 2, 3, 4, 5];	
    // 顶点颜色
	var colors = [
        1, 0, 0, 1, 
        1, 0, 0, 1, 
        1, 0, 0, 1, 

        0, 1, 0, 0, 
        0, 1, 1, 0,  
        0, 1, 0, 1
    ];
	
	// 计算获得法线数据
	var normals:number[] = [];
	
    // 定义顶点数据对象
	var vertexData = new BABYLON.VertexData();

    // 计算顶点法线
	BABYLON.VertexData.ComputeNormals(positions, indices, normals);

	// 设置顶点数据
	vertexData.positions = positions;
	vertexData.indices = indices;
	vertexData.normals = normals;
	vertexData.colors = colors;

	// 应用顶点数据
	vertexData.applyToMesh(customMesh);
}
// 增加贴图UV
const demo3 = (scene:BABYLON.Scene) =>{
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.5;
    // 定义顶点数据
    var positions = [
        -4, 0, 4,
        4, 0, 4,
        4, 0, -4,
        -4, 0, -4,
        -3, 0, 1,
        -1, 0, 1,
        -1, 0, -1,
        -3, 0, -1,
        -2.5, 1, 0.5,
        -1.5, 1, 0.5,
        -1.5, 1, -0.5,
        -2.5, 1, -0.5,
        1, 0, 1,
        3, 0, 1,
        3, 0, -1,
        1, 0, -1,
        2, 1.5, 0,
        -3, 0, 4,
        -1, 0, 4,
        1, 0, 4,
        3, 0, 4,
        3, 0, -4,
        1, 0, -4,
        -1, 0, -4,
        -3, 0, -4
    ];

    // 定义索引数据
    var indices = [
        9, 8, 10,
        8, 11, 10,
        8, 4, 11,
        11, 4, 7,
        8, 5, 4,
        8, 9, 5,
        9, 10, 5,
        10, 6, 5,
        10, 7, 6,
        10, 11, 7,
        16, 12, 15,
        16, 13, 12,
        16, 14, 13,
        16, 15, 14,
        4, 18, 17,
        4, 5, 18,
        5, 19, 18,
        5, 12, 19,
        5, 6, 15,
        5, 15, 12,
        12, 20, 19, 
        12, 13, 20,
        13, 1, 20,
        13, 2, 1,
        13, 14, 2,
        14, 21, 2,
        14, 22, 21,
        14, 15, 22,
        15, 23, 22,
        15, 6, 23, 
        6, 24, 23,
        7, 24, 6,
        7, 3, 24, 
        7, 0, 3,
        7, 4, 0,
        4, 17, 0
    ];

    //take uv value relative to bottom left corner of roof (-4, -4) noting length and width of roof is 8
    // base uv value on the x, z coordinates only
    // 定义UV数据
    var uvs = [];
    for(var p = 0; p < positions.length / 3; p++) {
        uvs.push((positions[3 * p] - (-4)) / 8, (positions[3 * p + 2] - (-4)) / 8);
    }

    // 定义空的网格体
    var customMesh = new BABYLON.Mesh("custom", scene);

    //Empty array to contain calculated values or normals added
    // 计算法线数据
    var normals:number[] = [];

    //Calculations of normals added
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);

    // 定义顶点数据对象
    var vertexData = new BABYLON.VertexData();

    // 设置数据
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals; //Assignment of normal to vertexData added
    vertexData.uvs = uvs;

    // 应用数据到网格体
    vertexData.applyToMesh(customMesh);

    // 平滑单独面网格体 this means each mesh facet will then have its own normals
    customMesh.convertToFlatShadedMesh();

    var mat = new BABYLON.StandardMaterial("", scene);
    mat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/co.png")
    //mat.wireframe = true;

    customMesh.material = mat;
	return scene;
}

// 修改顶点数据
const demo4 = (scene:BABYLON.Scene) =>{
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {updatable:true}, scene);
	
	var positions = sphere.getVerticesData(BABYLON.VertexBuffer.PositionKind) as BABYLON.FloatArray;
	
	var numberOfVertices = positions.length/3;	
    // 修改顶点数据
	for(var i = 0; i<numberOfVertices; i++) {
		positions[i*3] *= 1.5;
		positions[i*3+1] *= 3
		positions[i*3+2] *= 2.5;
	}
	
    // 更新顶点数据
	sphere.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);

}

// 添加顶点颜色数据
const demo5 = (scene:BABYLON.Scene) =>{
    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:10, updatable: true}, scene);

    // 获取顶点颜色数据
    var colors = sphere.getVerticesData(BABYLON.VertexBuffer.ColorKind);
    if(!colors) {
        colors = [];

        // 获取位置数据
        var positions = sphere.getVerticesData(BABYLON.VertexBuffer.PositionKind) as BABYLON.FloatArray;

        for(var p = 0; p < positions.length / 3; p++) {
            let r = 0, g=0, b=0;
            if(p<positions.length/3/3){
                r = 1
            }else if(p < 2* positions.length/3/3){
                g = 1;
            }else{
                b =1;
            }
            colors.push(r, g,b,1);
        }
    }

    sphere.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);

}
// 显示法线
const demo6 = (scene:BABYLON.Scene) =>{

  // 定义材质  
  var mat = new BABYLON.StandardMaterial("mat1", scene);
  mat.alpha = 1.0;
  mat.wireframe = true;


  const cube1 = {
		"vertex":[[-1,1,-1],[1,1,-1],[1,-1,-1],[-1,-1,-1],[-1,1,1],[1,1,1],[1,-1,1],[-1,-1,1]],
		"face":[[0,1,2,3],[4,7,6,5],[1,5,6,2],[0,3,7,4],[0,4,5,1],[3,2,6,7]]
    }
		
	 // create  polyhedron from the POLYHEDRA object
	  var createPolyhedron = function (data:typeof cube1, size:number, scene:BABYLON.Scene) {
		  var positions = [];
		  var indices = [];
		  var normals:number[] = [];
		  var uvs:number[] = [];
		  var face_uvs=[[0,0],[1,0],[1,1],[0,1]];

		  // positions
		  for (var i = 0; i < data.vertex.length; i++) {
			  positions.push(data.vertex[i][0] * size, data.vertex[i][1] * size, data.vertex[i][2] * size);			  
		  }

		  // indices from faces		  
		  for (var f = 0; f < data.face.length; f++) {
			  for(var j = 0; j < data.face[f].length; j++) {
		  	  	uvs=uvs.concat(face_uvs[j]);
		  	  }
			  for (i = 0; i < data.face[f].length - 2; i++) {
				  indices.push(data.face[f][0], data.face[f][i + 2], data.face[f][i + 1]);
			  }
		  }

		  BABYLON.VertexData.ComputeNormals(positions, indices, normals);
		  BABYLON.VertexData._ComputeSides(BABYLON.Mesh.FRONTSIDE, positions, indices, normals, uvs);

		  var vertexData = new BABYLON.VertexData();
		  vertexData.positions = positions;
		  vertexData.indices = indices;
		  vertexData.normals = normals;
		  vertexData.uvs = uvs;

		  var polygon = new BABYLON.Mesh('', scene);
		  vertexData.applyToMesh(polygon);

		  return polygon;
	  };
	  
	  var line;
	  
	 //Create cube using create polyhedron function
	var box = createPolyhedron(cube1, 1, scene);
	box.material = mat;
	box.position.y = 3;
	
	
	
	//Show normals for polyCube
	var pdata = box.getVerticesData(BABYLON.VertexBuffer.PositionKind) as BABYLON.FloatArray;
	var ndata = box.getVerticesData(BABYLON.VertexBuffer.NormalKind) as BABYLON.FloatArray;
	// 绘制法线
	for (var p = 0; p < pdata.length; p += 3) {
			line=BABYLON.MeshBuilder.CreateLines("lines", {points: [
            new BABYLON.Vector3(pdata[p],pdata[p+1],pdata[p+2]),
			new BABYLON.Vector3(pdata[p]+ndata[p],pdata[p+1]+ndata[p+1],pdata[p+2]+ndata[p+2])
        ]}, scene);
		line.position.y = 3;
	}
	
	var box2 = box.clone("cube2");
	box2.position.y = -3;
	box2.convertToFlatShadedMesh();
	
	
	//Show normals for cube
	var pdata = box2.getVerticesData(BABYLON.VertexBuffer.PositionKind) as BABYLON.FloatArray;
	var ndata = box2.getVerticesData(BABYLON.VertexBuffer.NormalKind) as BABYLON.FloatArray;

    // 绘制法线
	for (var p = 0; p < pdata.length; p += 3) {
			line=BABYLON.MeshBuilder.CreateLines("lines", {points:[
            new BABYLON.Vector3(pdata[p],pdata[p+1],pdata[p+2]),
			new BABYLON.Vector3(pdata[p]+ndata[p],pdata[p+1]+ndata[p+1],pdata[p+2]+ndata[p+2])
        ]}, scene);
			line.position.y = -3;
	}
	
}