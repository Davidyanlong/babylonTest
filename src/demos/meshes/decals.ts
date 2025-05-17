import { BABYLON, GUI } from "../../base/commonIncludes";


// 贴花案例
export const decalsScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
   var scene = new BABYLON.Scene(engine);

	// 创建灯光
	var light = new BABYLON.HemisphericLight("Hemi", new BABYLON.Vector3(0, 1, 0), scene);

	// 创建相交
	var camera = new BABYLON.ArcRotateCamera("Camera", -1.85, 1.2, 200, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	// The first parameter can be used to specify which mesh to import. Here we import all meshes
	BABYLON.ImportMeshAsync("https://playground.babylonjs.com//scenes/SSAOcat.babylon", scene,{
        meshNames:["Shcroendiger'scat"]
    }).then(function (result) {
		var cat = result.meshes[0];

		// Set the target of the camera to the first imported mesh
		camera.target = cat.position;

        // 定义标准材质
		var decalMaterial = new BABYLON.StandardMaterial("decalMat", scene);
        // 设置贴花背景图
		decalMaterial.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/impact.png", scene);
		// 开启 alpha 通道
        decalMaterial.diffuseTexture.hasAlpha = true;
        // 仿真闪面 z-fighting
		decalMaterial.zOffset = -2;

		var onPointerDown = function (evt:MouseEvent) {
			if (evt.button !== 0) {
				return;
			}

			// 拾取
			var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh === cat; });
			if (pickInfo.hit) {
                // 定义一个大小
				var decalSize = new BABYLON.Vector3(10, 10, 10);

			/**************************CREATE DECAL*************************************************/
              // 创建贴花  
              /**
               * 
               * property	value	default value
               * position	(Vector3) position of the decal (World coordinates)	(0, 0, 0)
               * normal	(Vector3) the normal of the mesh where the decal is applied onto (World coordinates)	Vector3.Up
               * size	(Vector3) the x, y, z sizes of the decal	(1, 1, 1)
               * angle	(number) the angle to rotate the decal	0
               */
            var decal = BABYLON.MeshBuilder.CreateDecal(
                "decal", cat, {
                    position: pickInfo.pickedPoint!, 
                    normal: pickInfo.getNormal(true)!, 
                    size: decalSize
                });

            console.log(decal)
                // 设置贴花的材质
				decal.material = decalMaterial;
			/***************************************************************************************/	
			
			}
		}
		var canvas = engine.getRenderingCanvas();
		canvas!.addEventListener("pointerdown", onPointerDown, false);

		scene.onDispose = function () {
			canvas!.removeEventListener("pointerdown", onPointerDown);
		}
	});

	return scene;
}

// 大量的案例，使用时深入研究 https://doc.babylonjs.com/features/featuresDeepDive/mesh/decals/