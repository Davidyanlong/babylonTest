import { BABYLON } from "../../base/commonIncludes";


/**
 *  15种多面体
 * type	name	number of faces
 * 0	Tetrahedron	4
 * 1	Octahedron	8
 * 2	Dodecahedron	12
 * 3	Icosahedron	20
 * 4	Rhombicuboctahedron	26
 * 5	Triangular Prism	5
 * 6	Pentagonal Prism	7
 * 7	Hexagonal Prism	8
 * 8	Square Pyramid (J1)	5
 * 9	Pentagonal Pyramid (J2)	6
 * 10	Triangular Dipyramid (J12)	6
 * 11	Pentagonal Dipyramid (J13)	10
 * 12	Elongated Square Dipyramid (J15)	12
 * 13	Elongated Pentagonal Dipyramid (J16)	15
 * 14	Elongated Pentagonal Cupola (J20)	22
 */



// 预设的一些几何图形
export const polyhedraSharpScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    // 创建场景
    const scene = new BABYLON.Scene(engine);
	
    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", -Math. PI / 2, Math.PI / 2, 100, BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
    
    const light1 = new BABYLON.PointLight("light1",new BABYLON.Vector3(100, 100, 100) );
    const  light2 = new BABYLON.PointLight("light2",new BABYLON.Vector3(-100, -100, -100));


    // show case
    // demo1(scene);
    demo2(scene);


	return scene;
}

// 多面体
const demo1 = (scene:BABYLON.Scene)=>{
    /**
     * 
     * option	value	default value
     * type	(number) polyhedron type in the range [0,14]	0
     * size	(number) polyhedron size	1
     * sizeX	(number) X polyhedron size, overwrites the size property	1
     * sizeY	(number) Y polyhedron size, overwrites the size property	1
     * sizeZ	(number) Z polyhedron size, overwrites the size property	1
     * custom	(polygonObjectReference) a polyhedron object, overwrites the type property	null
     * faceColors	(Color4[]) array of Color4, one per face	Color4(1, 1, 1, 1) for each side
     * faceUV	(Vector4[]) array of Vector4, one per face	UVs(0, 0, 1, 1) for each side
     * flat	(boolean) if false, a polyhedron has a single global face, faceUV and faceColors are ignored	true
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */
   
    for(let i = 0; i < 15; i++) {
        const shape = BABYLON.MeshBuilder.CreatePolyhedron("shape" + i, 
            {   type: i, 
                size: 3
            }, 
            scene);
        shape.position = new BABYLON.Vector3(-30 + 15 * (i % 5), 20 + (-15 * Math.floor(i/5)), 0);
    }
}

// IOS 球体
const demo2 = (scene:BABYLON.Scene)=>{

    /**
     * options	value	default value
     * radius	(number) radius	1
     * radiusX	(number) the X radius, overwrites the radius value	radius
     * radiusY	(Vector3) the Y radius, overwrites the radius value	radius
     * radiusZ	(number) the Z radius, overwrites the radius value	radius
     * subdivisions	(number) the number of subdivisions	4
     * flat	(boolean) if true, the mesh faces have their own normals	true
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */
    const icosphere = BABYLON.MeshBuilder.CreateIcoSphere("icosphere", {radius:2, subdivisions: 16});

}