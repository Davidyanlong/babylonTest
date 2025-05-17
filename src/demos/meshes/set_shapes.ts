import { BABYLON, earcut, GUI } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 预设的一些几何图形
export const setShapesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    // 为相机绑定canvas，进行相关事件获取 
    camera.attachControl(canvas, true);

    // 创建一个半球光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 设置光的强度
    light.intensity = 0.7;
    // light.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    // 创建几何图形
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
    // demo12(scene);
    // demo13(scene);
    // demo14(scene);
    // demo15(scene);
    // demo16(scene);
    // demo17(scene);
    // demo18(scene);
    // demo19(scene);
    // demo20(scene);
    // demo21(scene);
    // demo22(scene);
    // demo23(scene);
    // demo24(scene);
    // demo25(scene);
    // demo26(scene);
    // demo27(scene);
    // demo28(scene);
    // demo29(scene);
    // demo31(scene);
    // demo32(scene);
    // demo33(scene);
    // demo34(scene);
    // demo35(scene);
    // demo36(scene);
    // demo37(scene);
    // demo38(scene);
    // demo39(scene);
    // demo40(scene);
    // demo41(scene);
    // demo42(scene);
    // demo43(scene);
    // demo44(scene);
    // demo45(scene);
    demo46(scene);

    return scene;
};

// #region 创建一个box

// 创建box
const demo1 = (scene:BABYLON.Scene )=>{

    /**
     * box options 参数的所有项
     * options                 property	value	                                        default value
     * size	                    (number) size of each box side	                                1
     * height	                (number) height size, overwrites size option	                size
     * width	                (number) width size, overwrites size option	                    size
     * depth	                (number) depth size, overwrites size option	                    size
     * faceColors	            (Color4[]) array of 6 Color4, one per box face	                Color4(1, 1, 1, 1) for each side
     * faceUV	                (Vector4[]) array of 6 Vector4, one per box face	            UVs(0, 0, 1, 1) for each side
     * wrap	                    (boolean) ( BJS 4.0 or >) when true all vertical sides
     *                          (0, 1, 2, 3) will apply image textures upright	                false
     * topBaseAt	            (number) (BJS 4.0 or >) base of top touches side given 
     *                          0, 1, 2, 3	                                                    1
     * bottomBaseAt	            (number) (BJS 4.0 or >) base of bottom touches side given 
     *                          0, 1, 2, 3	                                                    0
     * updatable	            (boolean) true if the mesh is updatable	                        false
     * sideOrientation	       (number) side orientation	                                    DEFAULTSIDE
     * frontUVs	              (Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	                (Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set Vector4(0,0, 1,1)
     */

    const box = BABYLON.MeshBuilder.CreateBox("box", {
        height: 1, 
        width: 0.75, 
        depth: 0.25
    });
}

// box的纹理
const demo2 = (scene:BABYLON.Scene )=>{

    /**
     * box options 参数的所有项
     * options                 property	value	                                        default value
     * size	                    (number) size of each box side	                                1
     * height	                (number) height size, overwrites size option	                size
     * width	                (number) width size, overwrites size option	                    size
     * depth	                (number) depth size, overwrites size option	                    size
     * //每个面的颜色
     * faceColors	            (Color4[]) array of 6 Color4, one per box face	                Color4(1, 1, 1, 1) for each side
     * // 每一个面的UV坐标
     * faceUV	                (Vector4[]) array of 6 Vector4, one per box face	            UVs(0, 0, 1, 1) for each side
     * // 纹理朝向右上
     * wrap	                    (boolean) ( BJS 4.0 or >) when true all vertical sides
     *                          (0, 1, 2, 3) will apply image textures upright	                false
     * // 盒子顶部UV坐标的操作， 值为0-3
     * topBaseAt	            (number) (BJS 4.0 or >) base of top touches side given 
     *                          0, 1, 2, 3	                                                    1
     * // 盒子低部UV坐标的操作， 值为0-3
     * bottomBaseAt	            (number) (BJS 4.0 or >) base of bottom touches side given 
     *                          0, 1, 2, 3	                                                    0
     * // 几何体是否可更新
     * updatable	            (boolean) true if the mesh is updatable	                        false
     * // 渲染 前面 背面 双面
     * sideOrientation	        (number) side orientation	                                    DEFAULTSIDE
     * // 纹理的正面UV坐标
     * frontUVs	                (Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * // 纹理的反面UV坐标
     * backUVs	                (Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set Vector4(0,0, 1,1)
     */

    const mat = new BABYLON.StandardMaterial("mat");
    const texture = new BABYLON.Texture("https://assets.babylonjs.com/environments/numbers.jpg");
    mat.diffuseTexture = texture;

    var columns = 6;
    var rows = 1;

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    const options = {
        faceUV: faceUV,
        wrap: true,
    };

    const box = BABYLON.MeshBuilder.CreateBox("box", options);
    box.material = mat;
    showAxis(1, scene);
}

// #endregion

// #region 创建一个tiled box

// 创建一个tiled box
const demo3 = (scene:BABYLON.Scene )=>{


    // 创建一个材质
    var mat = new BABYLON.StandardMaterial("bricks");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/bricktile.jpg");
	

     /** 
     * 不反转与旋转
     * Mesh pattern setting : no flip or rotate
     */
     // static readonly NO_FLIP = 0;

     /**
      * 反转每行每列上的，在Y轴上反转
      * Mesh pattern setting : flip (reflect in y axis) alternate tiles on each row or column
      */
     // static readonly FLIP_TILE = 1;

     /**
      * 旋转180度， 每行每列上的
      * Mesh pattern setting : rotate (180degs) alternate tiles on each row or column
      */
     // static readonly ROTATE_TILE = 2;

     /**
      * 反转每行上的，在Y轴上反转
      * Mesh pattern setting : flip (reflect in y axis) all tiles on alternate rows
      */
     // static readonly FLIP_ROW = 3;

     /**
      * 旋转180度， 每行上的
      * Mesh pattern setting : rotate (180degs) all tiles on alternate rows
      */
     // static readonly ROTATE_ROW = 4;

     /**
      * 旋转和反转， 每行每列上的
      * Mesh pattern setting : flip and rotate alternate tiles on each row or column
      */
     // static readonly FLIP_N_ROTATE_TILE = 5;

     /**
      * 旋转
      * Mesh pattern setting : rotate pattern and rotate
      */
     // static readonly FLIP_N_ROTATE_ROW = 6;

     /**
      * BABYLON.Mesh.NO_FLIP, default
      * BABYLON.Mesh.FLIP_TILE,
      * BABYLON.Mesh.ROTATE_TILE,
      * BABYLON.Mesh.FLIP_ROW,
      * BABYLON.Mesh.ROTATE_ROW,
      * BABYLON.Mesh.FLIP_N_ROTATE_TILE,
      * BABYLON.Mesh.FLIP_N_ROTATE_ROW
      */
	const pat = BABYLON.Mesh.FLIP_TILE;
    // 从左上角开始平铺tile
    /**
     * BABYLON.Mesh.CENTER, default
     * BABYLON.Mesh.TOP,
     * BABYLON.Mesh.BOTTOM
     */
	const av = BABYLON.Mesh.TOP;
    /**
     * BABYLON.Mesh.CENTER, default
     * BABYLON.Mesh.LEFT,
     * BABYLON.Mesh.RIGHT
     */
	const ah = BABYLON.Mesh.LEFT;
	
	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        // 重复纹理时，纹理的铺设方式，在X轴上铺设， 在Y轴上铺设, 是否反转，是否旋转
		pattern: pat,
        // 纵向顶部对齐
		alignVertical: av,
        // 横向左对齐
		alignHorizontal: ah,
        // box 的大小
        width: 6.9,
		height: 3.9,
		depth: 2.8,
        // 每个tile的大小，计算纹理的平铺方式 
		tileSize: 1,
        // 瓦片的宽度，如果不设置，就取tileSize的值 
		tileWidth:3
	}

    
	/**
     * option	value	default value
     * size	(number) size of each box side	1
     * height	(number) height size, overwrites size option	size
     * width	(number) width size, overwrites size option	size
     * depth	(number) depth size, overwrites size option	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * faceColors	(Color4[]) array of 6 Color4, one per box face	Color4(1, 1, 1, 1) for each side
     * faceUV	(Vector4[]) array of 6 Vector4, one per box face	UVs(0, 0, 1, 1) for each side
     * pattern	(number) how tiles are reflected or rotatedacross a face	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */
	const tiledBox = BABYLON.MeshBuilder.CreateTiledBox("", options);
	tiledBox.material = mat;
    showAxis(3, scene);
}


// 创建一个tiled box 不同的面
const demo4 = (scene:BABYLON.Scene )=>{


    // 创建一个材质
    var mat = new BABYLON.StandardMaterial("arrows");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/arrows.jpg");
	
	const pat = BABYLON.Mesh.FLIP_N_ROTATE_ROW;

    const columns = 6;  // 6 columns
    const rows = 1;  // 4 rows

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
	
	const options = {
		pattern: pat,
        faceUV: faceUV,
		width: 7,
		height: 4,
		depth: 4,
		tileSize: 1,
		tileWidth:1
	}
	
	const tiledBox = BABYLON.MeshBuilder.CreateTiledBox("", options);
	tiledBox.material = mat;
}

// 创建一个tiled box 不同的对齐方式展示
const demo5 = (scene:BABYLON.Scene )=>{
    
    const radius = 640 / (2 * Math.PI);
    const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, radius * 0.8));
    camera.setTarget(new BABYLON.Vector3(0, 0, radius));
    scene.activeCamera = camera;
    

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/arrows.jpg");
	
	const root = new BABYLON.TransformNode("");
	
    // 不同的平铺方式
	const pat =  [ BABYLON.Mesh.NO_FLIP,
		BABYLON.Mesh.FLIP_TILE,
        BABYLON.Mesh.ROTATE_TILE,
		BABYLON.Mesh.FLIP_ROW,
		BABYLON.Mesh.ROTATE_ROW,
		BABYLON.Mesh.FLIP_N_ROTATE_TILE,
		BABYLON.Mesh.FLIP_N_ROTATE_ROW
	];


    // 不同的纵向对齐方式
	const av = [ BABYLON.Mesh.CENTER,
		BABYLON.Mesh.TOP,
		BABYLON.Mesh.BOTTOM
	];
    // 不同的横向对齐方式
	const ah = [ BABYLON.Mesh.CENTER,
		BABYLON.Mesh.LEFT,
		BABYLON.Mesh.RIGHT
	];

    const patText =  [ "No Flip",
		"Flip Tile",
        "Rotate Tile",
		"Flip Row",
		"Rotate Row",
		"Flip and Rotate Tile",
		"Flip and Rotate Tile"
	];
	const avText = [ "Vert - Center",
		"Vert - Top",
		"Vert - Bottom"
	];
	const ahText = [ "Horz - Center",
		"Horz - Left",
		"Horz - Right"
	];

	const columns = 6;  // 6 columns
    const rows = 1;  // 4 rows

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
	
	const angle = 2 * Math.PI / 63;
	
	let theta = 0;
	
	const mesh:BABYLON.Mesh[] = [];
	const options = [];
	let count = 0
	
	const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
	for (let i = 0; i < 7; i++) {
		for (let j = 0; j < 3; j++) {
			for (let k = 0; k < 3; k++) {			
				options[count] = {
					pattern: pat[i],
					alignVertical: av[j],
					alignHorizontal: ah[k],
					faceUV: faceUV,
					width: 6.9,
					height: 3.9,
					depth: 2.8,
					tileSize: 1,
					tileWidth:1
				}
	
				mesh[count] = BABYLON.MeshBuilder.CreateTiledBox("mesh" + count, options[count]);
				mesh[count].parent = root;
				mesh[count].position.x = radius * Math.cos(theta);
				mesh[count].position.z = radius * Math.sin(theta);
				
				theta += angle;
				mesh[count].material = mat;
			
				const rect1 = new GUI.Rectangle();
				rect1.width = "200px";
				rect1.height = "80px";
				rect1.color = "Orange";
				rect1.thickness = 2;
				rect1.background = "green";
				advancedTexture.addControl(rect1);

				const label = new GUI.TextBlock();
				label.text = patText[i] + "\n" + avText[j] + "\n" + ahText[k];
				rect1.addControl(label);

				rect1.linkWithMesh(mesh[count]);   
				rect1.linkOffsetY = -280; 
				count++;
			}
		}
	}

	scene.onBeforeRenderObservable.add(() => {
		root.rotation.y += 0.001; 
		for (let m = 0; m < mesh.length; m++) {		
			mesh[m].addRotation(0, 0, 0.01).addRotation(0, 0.02, 0).addRotation(0.03, 0, 0);
		}
	})
}

// #endregion

// #region 创建一个sphere 球

// 创建一个sphere 球
const demo6 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * segments	(number) number of horizontal segments	32
     * diameter	(number) diameter of the sphere	1
     * diameterX	(number) diameter on X axis, overwrites diameter option	diameter
     * diameterY	(number) diameter on Y axis, overwrites diameter option	diameter
     * diameterZ	(number) diameter on Z axis, overwrites diameter option	diameter
     * arc	(number) ratio of the circumference (latitude) between 0 and 1	1
     * slice	(number) ratio of the height (longitude) between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     */
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {});
}

// 创建一个sphere 椭球
const demo7 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * segments	(number) number of horizontal segments	32
     * diameter	(number) diameter of the sphere	1
     * diameterX	(number) diameter on X axis, overwrites diameter option	diameter
     * diameterY	(number) diameter on Y axis, overwrites diameter option	diameter
     * diameterZ	(number) diameter on Z axis, overwrites diameter option	diameter
     * arc	(number) ratio of the circumference (latitude) between 0 and 1	1
     * slice	(number) ratio of the height (longitude) between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     */
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameterX: 1, diameterY: 0.5, diameterZ: 0.5});
}

// 创建一个sphere 半球面
const demo8 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * segments	(number) number of horizontal segments	32
     * diameter	(number) diameter of the sphere	1
     * diameterX	(number) diameter on X axis, overwrites diameter option	diameter
     * diameterY	(number) diameter on Y axis, overwrites diameter option	diameter
     * diameterZ	(number) diameter on Z axis, overwrites diameter option	diameter
     * arc	(number) ratio of the circumference (latitude) between 0 and 1	1
     * slice	(number) ratio of the height (longitude) between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     */
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {arc: 0.25, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
}

// 创建一个sphere 上半球面
const demo9 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * segments	(number) number of horizontal segments	32
     * diameter	(number) diameter of the sphere	1
     * diameterX	(number) diameter on X axis, overwrites diameter option	diameter
     * diameterY	(number) diameter on Y axis, overwrites diameter option	diameter
     * diameterZ	(number) diameter on Z axis, overwrites diameter option	diameter
     * arc	(number) ratio of the circumference (latitude) between 0 and 1	1
     * slice	(number) ratio of the height (longitude) between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0, 0, 1,1)
     */
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {slice: 0.4, sideOrientation: BABYLON.Mesh.DOUBLESIDE});}

// #endregion

// #region 创建一个cylinder 圆柱体 柱体 椎体


// 创建一个cylinder 圆柱体
const demo10 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * // 圆弧上的分隔段
     * tessellation	(number) number of radial sides	24
     * // 圆柱体的高度上的分隔段
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {},scene);
}

// 创建一个cylinder 圆椎体
const demo11 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * tessellation	(number) number of radial sides	24
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {diameterTop: 0});
}


// 创建一个cylinder 三棱柱
const demo12 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * tessellation	(number) number of radial sides	24
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation: 3});

}


// 创建一个cylinder 半个圆柱面
const demo13 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * tessellation	(number) number of radial sides	24
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {arc: 0.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE});

}



// 创建一个cylinder 封闭的半圆柱
const demo14 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * tessellation	(number) number of radial sides	24
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {arc: 0.1, enclose: true, height: 0.3 });

}

// 创建一个cylinder 增加贴图
const demo15 = (scene:BABYLON.Scene )=>{
    /**
     * option	value	default value
     * height	(number) height of the cylinder	2
     * diameterTop	(number) diameter of the top cap, can be zero to create a cone, overwrites the diameter option	1
     * diameterBottom	(number) diameter of the bottom cap, can't be zero, overwrites the diameter option	1
     * diameter	(number) diameter of both caps	1
     * tessellation	(number) number of radial sides	24
     * subdivisions	(number) number of rings	1
     * faceColors	(Color4[]) array of 3 Color4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	Color4(1, 1, 1, 1) for each face
     * faceUV	(Vector4[]) array of 3 Vector4, 0 : bottom cap, 1 : cylinder tube, 2 : top cap	UVs(0, 0, 1, 1) for each face
     * arc	(number) ratio of the circumference between 0 and 1	1
     * hasRings	(boolean) makes the subdivisions independent from each other, so they become different faces	false
     * enclose	(boolean) adds two extra faces per subdivision to a sliced cylinder to close it around its height axis	false
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set
     */
    const canMaterial = new BABYLON.StandardMaterial("material", scene);
	canMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/logo_label.jpg")
	
	const faceUV = [];
	faceUV[0] =	new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[1] =	new BABYLON.Vector4(1, 0, 0.25, 1); // x, z swapped to flip image
    faceUV[2] = new BABYLON.Vector4(0, 0, 0.24, 1);
	
	

    const faceColors = [ ];
    faceColors[0] = new BABYLON.Color4(0.5, 0.5, 0.5, 1)
	
	const can = BABYLON.MeshBuilder.CreateCylinder("can", {  height:1.16, faceUV: faceUV, faceColors: faceColors});
	can.material = canMaterial;

}

// #endregion

// #region 创建一个Capsule 胶囊体

// 创建一个Capsule 胶囊体
const demo16 = (scene:BABYLON.Scene )=>{

    /**
     * option	value	default value
     * orientation?	(Vector3) Direction of the capsule upon inception.	Vector3.Up
     * subdivisions	(number) Number of sub segments on the tube section of the capsule running parallel to orientation.	2
     * tessellation	(number) Number of cylindrical segments on the capsule.	16
     * height	(number) Height or length of the capsule.	1
     * radius	(number) Radius of the capsule.	0.25
     * capSubdivisions	(number) Number of sub segments on the cap sections of the capsule running parallel to orientation.	6
     * radiusTop?	(number) Overwrite for the top radius.	
     *  
     * radiusBottom?	(number) Overwrite for the bottom radius.	
     *  
     * topCapSubdivisions?	(number) Overwrite for the top capSubdivisions.	
     *  
     * bottomCapSubdivisions?	(number) Overwrite for the bottom capSubdivisions.	
 
     */
    const capsule = BABYLON.MeshBuilder.CreateCapsule("capsule", {}, scene)
      

}



// 创建一个Capsule 胶囊体 细分
const demo17 = (scene:BABYLON.Scene )=>{

    /**
     * option	value	default value
     * orientation?	(Vector3) Direction of the capsule upon inception.	Vector3.Up
     * subdivisions	(number) Number of sub segments on the tube section of the capsule running parallel to orientation.	2
     * tessellation	(number) Number of cylindrical segments on the capsule.	16
     * height	(number) Height or length of the capsule.	1
     * radius	(number) Radius of the capsule.	0.25
     * capSubdivisions	(number) Number of sub segments on the cap sections of the capsule running parallel to orientation.	6
     * radiusTop?	(number) Overwrite for the top radius.	
     *  
     * radiusBottom?	(number) Overwrite for the bottom radius.	
     *  
     * topCapSubdivisions?	(number) Overwrite for the top capSubdivisions.	
     *  
     * bottomCapSubdivisions?	(number) Overwrite for the bottom capSubdivisions.	
 
     */
    const capsule =  BABYLON.MeshBuilder.CreateCapsule("capsule", {
        radius:0.5, 
        capSubdivisions: 1, 
        height:2, 
        tessellation:4, 
        topCapSubdivisions:12
    });

      

}


// 创建一个Capsule 胶囊体 改变默认的方向
const demo18 = (scene:BABYLON.Scene )=>{

    /**
     * option	value	default value
     * orientation?	(Vector3) Direction of the capsule upon inception.	Vector3.Up
     * subdivisions	(number) Number of sub segments on the tube section of the capsule running parallel to orientation.	2
     * tessellation	(number) Number of cylindrical segments on the capsule.	16
     * height	(number) Height or length of the capsule.	1
     * radius	(number) Radius of the capsule.	0.25
     * capSubdivisions	(number) Number of sub segments on the cap sections of the capsule running parallel to orientation.	6
     * radiusTop?	(number) Overwrite for the top radius.	
     *  
     * radiusBottom?	(number) Overwrite for the bottom radius.	
     *  
     * topCapSubdivisions?	(number) Overwrite for the top capSubdivisions.	
     *  
     * bottomCapSubdivisions?	(number) Overwrite for the bottom capSubdivisions.	
 
     */
    const capsule = BABYLON.MeshBuilder.CreateCapsule("capsule", 
        {
            radius:0.25, 
            capSubdivisions: 6, 
            subdivisions:6, 
            tessellation:36, 
            height:2, 
            // 默认朝上
            orientation:BABYLON.Vector3.Forward()
        });  

}


// 创建一个Capsule 胶囊体 创建一个变形的胶囊体
const demo19 = (scene:BABYLON.Scene )=>{
    const camera =  scene.activeCamera
    camera!.position = new BABYLON.Vector3(0, 0, 20);
    /**
     * option	value	default value
     * orientation?	(Vector3) Direction of the capsule upon inception.	Vector3.Up
     * subdivisions	(number) Number of sub segments on the tube section of the capsule running parallel to orientation.	2
     * tessellation	(number) Number of cylindrical segments on the capsule.	16
     * height	(number) Height or length of the capsule.	1
     * radius	(number) Radius of the capsule.	0.25
     * capSubdivisions	(number) Number of sub segments on the cap sections of the capsule running parallel to orientation.	6
     * radiusTop?	(number) Overwrite for the top radius.	
     *  
     * radiusBottom?	(number) Overwrite for the bottom radius.	
     *  
     * topCapSubdivisions?	(number) Overwrite for the top capSubdivisions.	
     *  
     * bottomCapSubdivisions?	(number) Overwrite for the bottom capSubdivisions.	
 
     */

    const capsule = BABYLON.MeshBuilder.CreateCapsule("capsule", {
         radius:0.5,
         height:10, 
         radiusTop:4
        });

}

// #endregion


// #region 创建一个plane 平面

// 创建一个plane 平面
const demo20 = (scene:BABYLON.Scene )=>{
    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;
   
    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * sourcePlane	(Plane) source plane (math) the mesh will be transformed to	null
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {height:2, width: 1});
}


// 创建一个plane 平面 双面渲染
const demo21 = (scene:BABYLON.Scene )=>{
    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;
   
    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * sourcePlane	(Plane) source plane (math) the mesh will be transformed to	null
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {
        height:2, 
        width: 1, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
}


// 创建一个plane 平面, 设置正面和背面不同的纹理
const demo22 = (scene:BABYLON.Scene )=>{

   
    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * sourcePlane	(Plane) source plane (math) the mesh will be transformed to	null
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/tile1.jpg");

    const f = new BABYLON.Vector4(0,0, 0.5, 1); // front image = half the whole image along the width 
	const b = new BABYLON.Vector4(0.5,0, 1, 1); // back image = second half along the width
    
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {
        frontUVs: f, 
        backUVs: b, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    plane.material = mat;
}


// 创建一个plane 平面 通过数据模型创建一个平面
const demo23 = (scene:BABYLON.Scene )=>{
    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;
   
    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * sourcePlane	(Plane) source plane (math) the mesh will be transformed to	null
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
   // 抽象一个面，法线 和 点
   const abstractPlane = BABYLON.Plane.FromPositionAndNormal(
    new BABYLON.Vector3(1, 1, 1), 
    new BABYLON.Vector3(0.2, 0.5, -1)
);

   const plane = BABYLON.MeshBuilder.CreatePlane("plane", {
    sourcePlane: abstractPlane, 
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });

}

// #endregion


// #region 创建一个tiled plane 平面


// 创建一个tiled plane 平面
const demo24 = (scene:BABYLON.Scene )=>{

    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 3 * Math.PI / 2;
    camera.beta = Math.PI / 2.3;
    camera.radius = 8;

    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * pattern	(number) how tiles are reflected or rotated	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/lava/lavatile.jpg");
	
	const pat = BABYLON.Mesh.NO_FLIP;

	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		pattern: pat,
		width: 5,
		height: 5,
		tileSize: 1,
		tileWidth:1
	}
	
	const tiledPane = BABYLON.MeshBuilder.CreateTiledPlane("", options);
	tiledPane.material = mat;
}


// 创建一个tiled plane 平面  反转tile
const demo25 = (scene:BABYLON.Scene )=>{

    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 3 * Math.PI / 2;
    camera.beta = Math.PI / 2.3;
    camera.radius = 8;

    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * pattern	(number) how tiles are reflected or rotated	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/lava/lavatile.jpg");
	
	const pat = BABYLON.Mesh.FLIP_TILE;

	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		pattern: pat,
		width: 5,
		height: 5,
		tileSize: 1,
		tileWidth:1
	}
	
	const tiledPane = BABYLON.MeshBuilder.CreateTiledPlane("", options);
	tiledPane.material = mat;
}

// 创建一个tiled plane 平面  行反转
const demo26 = (scene:BABYLON.Scene )=>{

    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 3 * Math.PI / 2;
    camera.beta = Math.PI / 2.3;
    camera.radius = 8;

    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * pattern	(number) how tiles are reflected or rotated	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/tile1.jpg");
	
    /**
     * BABYLON.Mesh.NO_FLIP, default
     * BABYLON.Mesh.FLIP_TILE,
     * BABYLON.Mesh.ROTATE_TILE,
     * BABYLON.Mesh.FLIP_ROW,
     * BABYLON.Mesh.ROTATE_ROW,
     * BABYLON.Mesh.FLIP_N_ROTATE_TILE,
     * BABYLON.Mesh.FLIP_N_ROTATE_ROW
     */
	const pat = BABYLON.Mesh.FLIP_ROW;
	
	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		pattern: pat,
		width: 3 * 4,
		height: 8,
		tileSize: 1,
		tileWidth:2
	}
	
	const tiledPane = BABYLON.MeshBuilder.CreateTiledPlane("", options);
	tiledPane.material = mat;
}

// 创建一个tiled plane 平面  行列都反转
const demo27 = (scene:BABYLON.Scene )=>{

    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 3 * Math.PI / 2;
    camera.beta = Math.PI / 2.3;
    camera.radius = 8;

    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * pattern	(number) how tiles are reflected or rotated	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/tile1.jpg");
	
    /**
     * BABYLON.Mesh.NO_FLIP, default
     * BABYLON.Mesh.FLIP_TILE,
     * BABYLON.Mesh.ROTATE_TILE,
     * BABYLON.Mesh.FLIP_ROW,
     * BABYLON.Mesh.ROTATE_ROW,
     * BABYLON.Mesh.FLIP_N_ROTATE_TILE,
     * BABYLON.Mesh.FLIP_N_ROTATE_ROW
     */
	const pat = BABYLON.Mesh.FLIP_TILE;
	
	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
		pattern: pat,
		width: 2 * 5,
		height: 8,
		tileSize: 1,
		tileWidth:2
	}
	
	const tiledPane = BABYLON.MeshBuilder.CreateTiledPlane("", options);
	tiledPane.material = mat;
}


// 创建一个tiled plane 平面  前后面不同的物理平铺
const demo28 = (scene:BABYLON.Scene )=>{

    const camera =  scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = 3 * Math.PI / 2;
    camera.beta = Math.PI / 2.3;
    camera.radius = 8;

    /**
     * option	value	default value
     * size	(number) side size of the plane	1
     * width	(number) size of the width	size
     * height	(number) size of the height	size
     * tileSize	(number) size of each tile side	1
     * tileHeight	(number) tile height size, overwrites tileSize option	tileSize
     * tileWidth	(number) tile width size, overwrites tileSize option	tileSize
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * pattern	(number) how tiles are reflected or rotated	NO_FLIP
     * alignVertical	(number) positions whole tiles at top, bottom or center of a face	CENTER
     * alignHorizontal	(number) positions whole tiles at left, right or center of a face	CENTER
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */

    const mat = new BABYLON.StandardMaterial("");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/tile1.jpg");
	
    /**
     * BABYLON.Mesh.NO_FLIP, default
     * BABYLON.Mesh.FLIP_TILE,
     * BABYLON.Mesh.ROTATE_TILE,
     * BABYLON.Mesh.FLIP_ROW,
     * BABYLON.Mesh.ROTATE_ROW,
     * BABYLON.Mesh.FLIP_N_ROTATE_TILE,
     * BABYLON.Mesh.FLIP_N_ROTATE_ROW
     */
	const pat = BABYLON.Mesh.FLIP_N_ROTATE_TILE;
    // 从中间开始排列
	const av = BABYLON.Mesh.CENTER;
	const ah =BABYLON.Mesh.CENTER;

    const f = new BABYLON.Vector4(0,0, 0.5, 1); // front image = half the whole image along the width 
	const b = new BABYLON.Vector4(0.5,0, 1, 1); // back image = second half along the width
	
	const options = {
		sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        frontUVs: f,
		backUVs: b,
		pattern: pat,
		alignVertical: av,
		alignHorizontal: ah,
		width: 8.6,
		height: 8.6,
		tileSize: 1,
		tileWidth:1
	}
	
	const tiledPane = BABYLON.MeshBuilder.CreateTiledPlane("", options);
	tiledPane.material = mat;
}

// #endregion


// #region 创建一个Disc 圆面

// 创建一个Disc 圆面
const demo29 = (scene:BABYLON.Scene )=>{

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;

    /**
     * option	value	default value
     * radius	(number) the radius of the disc or polygon	0.5
     * tessellation	(number) the number of disc/polygon sides	64
     * arc	(number) ratio of the circumference between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE

     */
    const disc = BABYLON.MeshBuilder.CreateDisc("disc", {});
}

// 创建一个Disc 圆面
//  创建一个三角面
const demo30 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;

        /**
     * option	value	default value
     * radius	(number) the radius of the disc or polygon	0.5
     * tessellation	(number) the number of disc/polygon sides	64
     * arc	(number) ratio of the circumference between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE

     */
    const disc = BABYLON.MeshBuilder.CreateDisc("disc", {tessellation: 3});
}


//  创建一个扇形
const demo31 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.alpha = -Math.PI / 2;
    camera.beta = Math.PI / 2;
    camera.radius = 3;

        /**
     * option	value	default value
     * radius	(number) the radius of the disc or polygon	0.5
     * tessellation	(number) the number of disc/polygon sides	64
     * arc	(number) ratio of the circumference between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE

     */
        const disc = BABYLON.MeshBuilder.CreateDisc("disc", {tessellation: 12, arc: 5 / 6});
}



// #endregion 


// #region 创建一个圆环 tours

// 创建一个圆环 tours
const demo32 = (scene:BABYLON.Scene )=>{

    /**
     * 
     * option	value	default value
     * diameter	(number) diameter of the torus	1
     * thickness	(number) thickness of its tube	0.5
     * tessellation	(number) number of segments along the circle	16
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */

    const torus = BABYLON.MeshBuilder.CreateTorus("torus", {});
}


// 创建一个圆环 tours
const demo33 = (scene:BABYLON.Scene )=>{

    /**
     * 
     * option	value	default value
     * diameter	(number) diameter of the torus	1
     * thickness	(number) thickness of its tube	0.5
     * tessellation	(number) number of segments along the circle	16
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */

    const torus = BABYLON.MeshBuilder.CreateTorus("torus", {
        thickness: 0.25, 
        diameter: 2
    });
}

// #endregion

// #region 创建一个环形结 Torus Knot

// 创建一个环形结 Torus Knot
const demo34 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * option	value	default value
     * radius	(number) radius of the torus knot	2
     * tube	(number) thickness of its tube	0.5
     * radialSegments	(number) number of radial segments	32
     * tubularSegments	(number) number of tubular segments	32
     * p	(number) number of windings	2
     * q	(number) number of windings	3
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const torus_knot = BABYLON.MeshBuilder.CreateTorusKnot("tk", {
        tube: 0.1, 
        radialSegments: 128
    });
}


// 创建一个环形结 Torus Knot
const demo35 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * option	value	default value
     * radius	(number) radius of the torus knot	2
     * tube	(number) thickness of its tube	0.5
     * radialSegments	(number) number of radial segments	32
     * tubularSegments	(number) number of tubular segments	32
     * p	(number) number of windings	2
     * q	(number) number of windings	3
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const torus_knot = BABYLON.MeshBuilder.CreateTorusKnot("tk", {
        tube: 0.1,
         radialSegments: 128, 
         p:5,
         q:3
        });
}

// 创建一个环形结 Torus Knot
const demo36 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * option	value	default value
     * radius	(number) radius of the torus knot	2
     * tube	(number) thickness of its tube	0.5
     * radialSegments	(number) number of radial segments	32
     * tubularSegments	(number) number of tubular segments	32
     * p	(number) number of windings	2
     * q	(number) number of windings	3
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const torus_knot = BABYLON.MeshBuilder.CreateTorusKnot("tk", {
        tube: 0.01, 
        radialSegments: 1024, 
        p:120, 
        q:180
    });

}

// 创建一个环形结 Torus Knot
const demo37 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * option	value	default value
     * radius	(number) radius of the torus knot	2
     * tube	(number) thickness of its tube	0.5
     * radialSegments	(number) number of radial segments	32
     * tubularSegments	(number) number of tubular segments	32
     * p	(number) number of windings	2
     * q	(number) number of windings	3
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE set	Vector4(0,0, 1,1)
     */
    const torus_knot = BABYLON.MeshBuilder.CreateTorusKnot("tk", {
        tube: 0.01, 
        radialSegments: 1024, 
        p:-117.885, 
        q:-169.656465
    });


}

// #endregion

// #region 创建一个 地面 ground

// 创建一个 地面 ground
const demo38 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * 
     * option	value	default value
     * width	(number) size of the width	1
     * height	(number) size of the height	1
     * updatable	(boolean) true if the mesh is updatable	false
     * subdivisions	(number) number of square subdivisions along each axis	1     */
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {
        height: 1.5, 
        width: 2.5, 
        subdivisions: 4
    });
}

// #endregion


// #region 创建一个 高低地形图   heightMap

// 创建一个 高低地形图   heightMap
const demo39 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * 
     * option	value	default value
     * width	(number) size of the map width	10
     * height	(number) size of the map height	10
     * subdivisions	(number) number of map subdivisions	1
     * minHeight	(number) minimum altitude	0
     * maxHeight	(number) maximum altitude	1
     * onReady	(function) a callback js function that is called and passed the just built mesh	(mesh) => {return;}
     * updatable	(boolean) true if the mesh is updatable	false  
     * */
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", 
        "https://playground.babylonjs.com/textures/heightMap.png", 
        {
            width:5, 
            height :5, 
            subdivisions: 10, 
            maxHeight: 1
        });
}


// 创建一个 高低地形图   heightMap 多细分
const demo40 = (scene:BABYLON.Scene )=>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * 
     * option	value	default value
     * width	(number) size of the map width	10
     * height	(number) size of the map height	10
     * subdivisions	(number) number of map subdivisions	1
     * minHeight	(number) minimum altitude	0
     * maxHeight	(number) maximum altitude	1
     * onReady	(function) a callback js function that is called and passed the just built mesh	(mesh) => {return;}
     * updatable	(boolean) true if the mesh is updatable	false  
     * */
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", 
        "https://playground.babylonjs.com/textures/heightMap.png", 
        {
            width:5, 
            height :5, 
            subdivisions: 500, 
            maxHeight: 1
        });
}


// 创建一个 高低地形图   heightMap 增加贴图
const demo41 = (scene:BABYLON.Scene )=>{

    scene.getLightByName("light")!.intensity = 0.0;

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    /**
     * 
     * option	value	default value
     * width	(number) size of the map width	10
     * height	(number) size of the map height	10
     * subdivisions	(number) number of map subdivisions	1
     * minHeight	(number) minimum altitude	0
     * maxHeight	(number) maximum altitude	1
     * onReady	(function) a callback js function that is called and passed the just built mesh	(mesh) => {return;}
     * updatable	(boolean) true if the mesh is updatable	false  
     * */
  // Light
  const spot = new BABYLON.PointLight("spot", new BABYLON.Vector3(0, 30, 10));
  spot.diffuse = new BABYLON.Color3(1, 1, 1);
  spot.specular = new BABYLON.Color3(0, 0, 0);


  // Ground
    const groundMaterial = new BABYLON.StandardMaterial("ground");
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/earth.jpg");

    const options = {
        width: 200,
        height: 200,
        subdivisions: 250,
        maxHeight: 10
    }
    
    const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground", "https://playground.babylonjs.com/textures/worldHeightMap.jpg", options);
    ground.material = groundMaterial;

    //Sphere to see the light's position
    const sun = BABYLON.MeshBuilder.CreateSphere("sun", {segments:10, diameter:4});
    const sumMat = sun.material = new BABYLON.StandardMaterial("sun");
    sumMat.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // 创建天空
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:800.0});
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox");
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    //Sun animation
    scene.onBeforeRenderObservable.add(() => {
        sun.position = spot.position;
        spot.position.x -= 0.5;
        if (spot.position.x < -90)
            spot.position.x = 100;
    });
}

// #endregion

// #region 创建一个 瓦片地面   tiled ground

// 创建一个 瓦片地面   tiled ground
const demo42 = (scene:BABYLON.Scene )=>{

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * 
     * option	value	default value
     * xmin	(number) map min x coordinate value	-1
     * zmin	(number) map min z coordinate value	-1
     * xmax	(number) map max x coordinate value	1
     * zmin	(number) map max z coordinate value	1
     * subdivisions	object ( {w: number, h: number} ) number of subdivisions (tiles) on the height and the width of the map	{w: 6, h: 6}
     * precision	( {w: number, h: number} ) number of subdivisions on the height and the width of each tile	{w: 2, h: 2}
     * updatable	(boolean) true if the mesh is updatable	false
     * */
    var grid = {
        'h' : 8,
        'w' : 8
    };
	
    const tiledGround = BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
        xmin: -3, 
        zmin: -3, 
        xmax: 3, 
        zmax: 3, 
        subdivisions: grid});

	//Create the multi material
    // 创建白色材质
    const whiteMaterial = new BABYLON.StandardMaterial("White");
    whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // 创建黑色材质
    const blackMaterial = new BABYLON.StandardMaterial("Black");
    blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // 创建多材质
    const multimat = new BABYLON.MultiMaterial("multi", scene);
    // 设置子材质
    multimat.subMaterials.push(whiteMaterial);
    multimat.subMaterials.push(blackMaterial);
    

    // Apply the multi material
    // Define multimat as material of the tiled ground
    // 应用材质
    tiledGround.material = multimat;
   
    // Needed variables to set subMeshes
    // 得到顶点总数
    const verticesCount = tiledGround.getTotalVertices();
    // 得到每个瓦片的索引数
    const tileIndicesLength = tiledGround.getIndices()!.length / (grid.w * grid.h);
    
    // Set subMeshes of the tiled ground
    tiledGround.subMeshes = [];
    let base = 0;
    for (let row = 0; row < grid.h; row++) {
        for (let col = 0; col < grid.w; col++) {
               /**
                 * Creates a new submesh
                 * @param materialIndex defines the material index to use
                 * @param verticesStart defines vertex index start
                 * @param verticesCount defines vertices count
                 * @param indexStart defines index start
                 * @param indexCount defines indices count
                 * @param mesh defines the parent mesh
                 * @param renderingMesh defines an optional rendering mesh
                 * @param createBoundingBox defines if bounding box should be created for this submesh
                 * @param addToMesh defines a boolean indicating that the submesh must be added to the mesh.subMeshes array (true by default)
                 */
            tiledGround.subMeshes.push(
                new BABYLON.SubMesh(
                    row%2 ^ col%2, 
                     0, 
                     verticesCount,
                     base, 
                     tileIndicesLength, 
                     tiledGround));
            // 计算下一个瓦片的索引 
            base += tileIndicesLength;
        }
    }
}


// 创建一个 瓦片地面   tiled ground 
const demo43 = (scene:BABYLON.Scene )=>{

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 10;
    /**
     * 
     * option	value	default value
     * xmin	(number) map min x coordinate value	-1
     * zmin	(number) map min z coordinate value	-1
     * xmax	(number) map max x coordinate value	1
     * zmin	(number) map max z coordinate value	1
     * subdivisions	object ( {w: number, h: number} ) number of subdivisions (tiles) on the height and the width of the map	{w: 6, h: 6}
     * precision	( {w: number, h: number} ) number of subdivisions on the height and the width of each tile	{w: 2, h: 2}
     * updatable	(boolean) true if the mesh is updatable	false
     * */
    var grid = {
        'h' : 8,
        'w' : 8
    };
	
    const tiledGround = BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
        xmin: -3, 
        zmin: -3, 
        xmax: 3, 
        zmax: 3, 
        subdivisions: grid});

	//Create the multi material
    // 创建白色材质
    const whiteMaterial = new BABYLON.StandardMaterial("White");
    whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    //Create the multi material
    // 创建草地材质
    const grassMaterial = new BABYLON.StandardMaterial("grass");
    grassMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png");

    // 创建石头材质
    const rockMaterial = new BABYLON.StandardMaterial("rock");
    rockMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/rock.png");

    // Create Multi Material
    const multimat = new BABYLON.MultiMaterial("multi", scene);
    multimat.subMaterials.push(grassMaterial);
    multimat.subMaterials.push(rockMaterial);
    

    // Apply the multi material
    // Define multimat as material of the tiled ground
    // 应用材质
    tiledGround.material = multimat;
   
    // Needed variables to set subMeshes
    // 得到顶点总数
    const verticesCount = tiledGround.getTotalVertices();
    // 得到每个瓦片的索引数
    const tileIndicesLength = tiledGround.getIndices()!.length / (grid.w * grid.h);
    
    // Set subMeshes of the tiled ground
    tiledGround.subMeshes = [];
    let base = 0;
    for (let row = 0; row < grid.h; row++) {
        for (let col = 0; col < grid.w; col++) {
               /**
                 * Creates a new submesh
                 * @param materialIndex defines the material index to use
                 * @param verticesStart defines vertex index start
                 * @param verticesCount defines vertices count
                 * @param indexStart defines index start
                 * @param indexCount defines indices count
                 * @param mesh defines the parent mesh
                 * @param renderingMesh defines an optional rendering mesh
                 * @param createBoundingBox defines if bounding box should be created for this submesh
                 * @param addToMesh defines a boolean indicating that the submesh must be added to the mesh.subMeshes array (true by default)
                 */
            tiledGround.subMeshes.push(
                new BABYLON.SubMesh(
                    row%2 ^ col%2, 
                     0, 
                     verticesCount,
                     base, 
                     tileIndicesLength, 
                     tiledGround));
            // 计算下一个瓦片的索引 
            base += tileIndicesLength;
        }
    }
}


// 创建一个 瓦片地图
const demo44 = (scene:BABYLON.Scene )=>{
    
    // Tiled Ground Tutorial
    // Part 1 : Creation of Tiled Ground
    // Parameters
    var xmin = -10;
    var zmin = -10;
    var xmax = 10;
    var zmax = 10;
    var precision = {
        "w": 2,
        "h": 2
    };
    var subdivisions = {
        'h': 8,
        'w': 8
    };


    // Create the Tiled Ground
    var tiledGround = BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
            xmin: xmin,
            zmin: zmin,
            xmax: xmax,
            zmax: zmax,
            subdivisions: subdivisions, 
            precision: precision
        }, scene);

    // Part 2 : Create the multi material
    // Create differents materials
    // var whiteMaterial = new BABYLON.StandardMaterial("White", scene);
    // whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // var blackMaterial = new BABYLON.StandardMaterial("Black", scene);
    // blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Create Multi Material
    var multimat = new BABYLON.MultiMaterial("multi", scene);
    var zoom = 12;
    // 瓦片编号
    var xTileBase = 2120;
    var yTileBase = 1498;
    for (var row = 0; row < subdivisions.h; row++) {
        for (var col = 0; col < subdivisions.w; col++) {
            var material = new BABYLON.StandardMaterial(
                "material" + row + "-" + col,
                scene
            );
            material.diffuseTexture = new BABYLON.Texture(
                "https://b.tile.openstreetmap.org/" + zoom + "/" + (xTileBase + col) + "/" + (yTileBase - row) + ".png",
                scene
            );
            // 拉伸铺满
            material.diffuseTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
            material.diffuseTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
            material.specularColor = new BABYLON.Color3(0, 0, 0);
            material.backFaceCulling = false;
            multimat.subMaterials.push(material);
        }
    }

    // Part 3 : Apply the multi material
    // Define multimat as material of the tiled ground
    tiledGround.material = multimat;

    // Needed variables to set subMeshes
    var verticesCount = tiledGround.getTotalVertices();
    var tileIndicesLength = tiledGround.getIndices()!.length / (subdivisions.w * subdivisions.h);

    // Set subMeshes of the tiled ground
    tiledGround.subMeshes = [];
    var index = 0;
    var base = 0;
    for (var row = 0; row < subdivisions.h; row++) {
        for (var col = 0; col < subdivisions.w; col++) {
            var submesh = new BABYLON.SubMesh(
                index++, 0, verticesCount, base, tileIndicesLength, tiledGround
            );
            tiledGround.subMeshes.push(submesh);
            base += tileIndicesLength;
        }
    }
}

// #endregion


// #region 创建3D文字 Text object

// 创建3D文字 Text object
const demo45 = async (scene:BABYLON.Scene )=>{

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.beta =  Math.PI / 2.5;
    camera.alpha = -Math.PI / 2;
    camera.radius = 250;
    
    var fontData = await (await fetch("https://assets.babylonjs.com/fonts/Droid Sans_Regular.json")).json();
    /**
     * 
     * options property	value	default value
     * size	(number) size of each letter	50
     * resolution	(number) number of points used when tracing curves	8
     * depth	(number) extrusion depth (on Y axis)	1.0
     * sideOrientation	(number) side orientation	DOUBLESIDE
     */
    
    var myText = BABYLON.MeshBuilder.CreateText("myText", "Hello World !! @ #$ % é", fontData, {
        size: 16,
        resolution: 64, 
        depth: 10
    },scene, earcut);
}


// 创建3D文字 Text object 添加视频纹理
const demo46 = async (scene:BABYLON.Scene )=>{

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.beta =  Math.PI / 2.5;
    camera.alpha = -Math.PI / 2;
    camera.radius = 250;
    
    var fontData = await (await fetch("https://assets.babylonjs.com/fonts/Droid Sans_Regular.json")).json();
    /**
     * 
     * options property	value	default value
     * size	(number) size of each letter	50
     * resolution	(number) number of points used when tracing curves	8
     * depth	(number) extrusion depth (on Y axis)	1.0
     * sideOrientation	(number) side orientation	DOUBLESIDE
     */
    
    var myText = BABYLON.MeshBuilder.CreateText("myText", "Hello World !! @ #$ % é", fontData, {
        size: 16,
        resolution: 64, 
        depth: 10
    },scene, earcut);

    const mat = new BABYLON.StandardMaterial("mat");
    mat.diffuseTexture = new BABYLON.VideoTexture("vidtex","https://playground.babylonjs.com/textures/babylonjs.mp4", scene);

    myText!.material = mat;
}

// #endregion