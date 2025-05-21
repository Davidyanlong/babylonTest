import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const streetLightDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2.2, 50, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 50, 0));
    light.intensity = 0.5

    // 创建一个聚光灯
    const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), Math.PI, 1, scene);
    // 颜色为光色，黄光
    lampLight.diffuse = BABYLON.Color3.Yellow();


	// 构建灯架shape
	const lampShape = [];
    for(let i = 0; i < 20; i++) {
        lampShape.push(new BABYLON.Vector3(Math.cos(i * Math.PI / 10), Math.sin(i * Math.PI / 10), 0));
    }
	lampShape.push(lampShape[0]); //close shape

	// 拉伸的 path
    const lampPath = [];
	lampPath.push(new BABYLON.Vector3(0, 0, 0));
	lampPath.push(new BABYLON.Vector3(0, 10, 0));
    for(let i = 0; i < 20; i++) {
        lampPath.push(new BABYLON.Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
    }
    lampPath.push(new BABYLON.Vector3(3, 11, 0));

    // 
    const yellowMat = new BABYLON.StandardMaterial("yellowMat");
    // 自发光黄色
    yellowMat.emissiveColor = BABYLON.Color3.Yellow();

	//抽取出灯架
	const lamp = BABYLON.MeshBuilder.ExtrudeShape("lamp", 
        {cap: BABYLON.Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5});
	
    //灯泡
    const bulb = BABYLON.MeshBuilder.CreateSphere("bulb", {diameterX: 1.5, diameterZ: 0.8});
    
    bulb.material = yellowMat;
    // 灯泡作为灯杆的子部件
    bulb.parent = lamp;
    bulb.position.x = 2;
    bulb.position.y = 10.5;

    lampLight.parent = bulb;
    // 创建一个地面
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height: 50})

    return scene;

}