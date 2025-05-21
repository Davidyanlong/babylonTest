import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const latheDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

	const scene = new BABYLON.Scene(engine);

	const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 2.5, 70, BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);

	const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0));

	const fountainProfile = [
		new BABYLON.Vector3(0, 0, 0),
		new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(10, 4, 0),
		new BABYLON.Vector3(8, 4, 0),
        new BABYLON.Vector3(8, 1, 0),
        new BABYLON.Vector3(1, 2, 0),
		new BABYLON.Vector3(1, 15, 0),
		new BABYLON.Vector3(3, 17, 0)
	];
	
	// 创造一个参数化图形， 360度旋转
	const fountain = BABYLON.MeshBuilder.CreateLathe("fountain", {shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
	
	return scene;
};