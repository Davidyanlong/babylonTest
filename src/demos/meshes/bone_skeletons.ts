import { BABYLON, GUI } from "../../base/commonIncludes";

// 模型合并
export const boneSkeletonsMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
    
    var scene = new BABYLON.Scene(engine);
    
    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    demo4(scene, canvas);




    return scene;
}

// 基本骨骼动画
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
      BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/Dude/Dude.babylon", scene).then(
        function (result) {          
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();
            
            scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
        }
    );

}

// 骨骼附加mesh
const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {


    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);

    // 定义材质，应用材质 
	sphere.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
	var materialSphere = new BABYLON.StandardMaterial("texture1", scene);
	materialSphere.diffuseColor = BABYLON.Color3.Red();
	sphere.material = materialSphere;


      BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/Dude/Dude.babylon", scene).then(
        function (result) {          
            scene.createDefaultCameraOrLight(true, true, true);
            scene.createDefaultEnvironment();
            
            const dude = result.meshes[0];
            const  skeleton = result.skeletons[0];
        //	console.log(skeleton.bones)
            dude.rotation.y = Math.PI;
            // dude.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
            dude.position = new BABYLON.Vector3(0, 0, 0);
            // skeleton.position = new BABYLON.Vector3(0, 0, 0);
            // skeleton.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
                      
            // 附加 mesh
            sphere.attachToBone(skeleton.bones[34], dude);
            sphere.scaling = new BABYLON.Vector3(5, 5, 5);
            
            scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

            scene.registerBeforeRender(function () {
                dude.position.z+= 0.005;
            });
        }
    );

}

// 骨骼世界空间旋转动画
const demo3 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 创建灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 0, 10), scene);

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 10, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	
    // 数据转换为字符串
	var strData = JSON.stringify(modelData);
	
	BABYLON.ImportMeshAsync('data:' + strData, scene).then(
        ({meshes, skeletons})=>{

		var skeleton = skeletons[0];
		var mesh = meshes[0];
		
		mesh.rotation.x = Math.PI * .25;
		
		scene.registerBeforeRender(function () {
            // 世界空间旋转
			skeleton.bones[0].rotate(BABYLON.Axis.Z, .01, BABYLON.Space.WORLD, mesh);
			skeleton.bones[1].rotate(BABYLON.Axis.Z, .01, BABYLON.Space.WORLD, mesh);
			skeleton.bones[2].rotate(BABYLON.Axis.Z, .01, BABYLON.Space.WORLD, mesh);
			
		});
		
	});
	
}

// 局部空间
const demo4 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 创建灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 0, 10), scene);

    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 10, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	
    // 数据转换为字符串
	var strData = JSON.stringify(modelData);
	
	BABYLON.ImportMeshAsync('data:' + strData, scene).then(
        ({meshes, skeletons})=>{

		var skeleton = skeletons[0];
		var mesh = meshes[0];
		
		mesh.rotation.x = Math.PI * .25;
		
		scene.registerBeforeRender(function () {
            // 世界空间旋转
			skeleton.bones[0].rotate(BABYLON.Axis.Z, .01);
			skeleton.bones[1].rotate(BABYLON.Axis.Z, .01);
			skeleton.bones[2].rotate(BABYLON.Axis.Z, .01);
			
		});
		
	});
	
}

const modelData = {
    "producer": {
        "name": "Blender",
        "version": "2.76 (sub 0)",
        "exporter_version": "4.6.0",
        "file": "test3.babylon"
    },
    "autoClear": true,
    "clearColor": [0.0509, 0.0509, 0.0509],
    "ambientColor": [0, 0, 0],
    "gravity": [0, -9.81, 0],
    "materials": [{
        "name": "test3.Material",
        "id": "test3.Material",
        "ambient": [0.8, 0.8, 0.8],
        "diffuse": [0.64, 0.64, 0.64],
        "specular": [0.5, 0.5, 0.5],
        "emissive": [0, 0, 0],
        "specularPower": 50,
        "alpha": 1,
        "backFaceCulling": true,
        "checkReadyOnlyOnce": false
    }],
    "multiMaterials": [],
    "skeletons": [{
        "name": "Armature",
        "id": 0,
        "dimensionsAtRest": [0, 3.0652, 0],
        "bones": [{
                "name": "Bone",
                "index": 0,
                "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1],
                "rest": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1],
                "parentBoneIndex": -1,
                "length": 1
            },
            {
                "name": "Bone.001",
                "index": 1,
                "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                "rest": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                "parentBoneIndex": 0,
                "length": 0.9815
            },
            {
                "name": "Bone.002",
                "index": 2,
                "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.9815, 0, 1],
                "rest": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.9815, 0, 1],
                "parentBoneIndex": 1,
                "length": 1.0838
            }
        ]
    }],
    "meshes": [{
        "name": "Cube",
        "id": "Cube",
        "materialId": "test3.Material",
        "billboardMode": 0,
        "position": [0, 0, 0],
        "rotation": [0, 0, 0],
        "scaling": [1, 1, 1],
        "isVisible": true,
        "freezeWorldMatrix": false,
        "isEnabled": true,
        "checkCollisions": false,
        "receiveShadows": false,
        "skeletonId": 0,
        "numBoneInfluencers": 2,
        "positions": [-0.2743, 0.897, 0.2743, -0.2743, -0.0422, 0.2743, -0.2743, -0.0422, -0.2743, 0.2743, 0.897, 0.2743, 0.2743, -0.0422, 0.2743, 0.2743, 0.897, -0.2743, 0.2743, -0.0422, -0.2743, -0.2743, 0.897, -0.2743, -0.2743, 1.1148, -0.2743, -0.2743, 1.1148, 0.2743, 0.2743, 1.1148, 0.2743, 0.2743, 1.8536, 0.2743, 0.2743, 1.8536, -0.2743, 0.2743, 1.1148, -0.2743, 0.2743, 2.1056, -0.2743, -0.2743, 2.1056, -0.2743, -0.2743, 1.8536, -0.2743, -0.2743, 1.8536, 0.2743, 0.2743, 2.1056, 0.2743, 0.2743, 3.0981, 0.2743, 0.2743, 3.0981, -0.2743, -0.2743, 2.1056, 0.2743, -0.2743, 3.0981, 0.2743, -0.2743, 3.0981, -0.2743],
        "normals": [-0.7071, 0, 0.7071, -0.5773, -0.5773, 0.5773, -0.5773, -0.5773, -0.5773, 0.7071, 0, 0.7071, 0.5773, -0.5773, 0.5773, 0.7071, 0, -0.7071, 0.5773, -0.5773, -0.5773, -0.7071, 0, -0.7071, -0.7071, 0, -0.7071, -0.7071, 0, 0.7071, 0.7071, 0, 0.7071, 0.7071, 0, 0.7071, 0.7071, 0, -0.7071, 0.7071, 0, -0.7071, 0.7071, 0, -0.7071, -0.7071, 0, -0.7071, -0.7071, 0, -0.7071, -0.7071, 0, 0.7071, 0.7071, 0, 0.7071, 0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, -0.7071, 0, 0.7071, -0.5773, 0.5773, 0.5773, -0.5773, 0.5773, -0.5773],
        "matricesWeights": [0.8258, 0.1712, 0, 0, 0.9877, 0, 0, 0, 0.9868, 0, 0, 0, 0.8257, 0.1712, 0, 0, 0.9868, 0, 0, 0, 0.8258, 0.1712, 0, 0, 0.9877, 0, 0, 0, 0.8257, 0.1712, 0, 0, 0.2042, 0.7818, 0, 0, 0.2042, 0.7818, 0, 0, 0.2042, 0.7818, 0, 0, 0.8013, 0.1831, 0, 0, 0.8013, 0.1831, 0, 0, 0.2042, 0.7818, 0, 0, 0.1482, 0.849, 0, 0, 0.1482, 0.8489, 0, 0, 0.8013, 0.1831, 0, 0, 0.8013, 0.1831, 0, 0, 0.1482, 0.8489, 0, 0, 0.9894, 0, 0, 0, 0.9903, 0, 0, 0, 0.1482, 0.849, 0, 0, 0.9903, 0, 0, 0, 0.9894, 0, 0, 0],
        "matricesIndices": [256, 0, 0, 256, 0, 256, 0, 256, 256, 256, 256, 513, 513, 256, 513, 513, 513, 513, 513, 2, 2, 513, 2, 2],
        "indices": [0, 1, 2, 3, 4, 1, 5, 6, 4, 7, 2, 6, 1, 4, 6, 7, 8, 9, 10, 11, 12, 5, 13, 8, 0, 9, 10, 3, 10, 13, 12, 14, 15, 8, 16, 17, 13, 12, 16, 9, 17, 11, 18, 19, 20, 17, 21, 18, 11, 18, 14, 16, 15, 21, 20, 19, 22, 15, 23, 22, 14, 20, 23, 21, 22, 19, 7, 0, 2, 0, 3, 1, 3, 5, 4, 5, 7, 6, 2, 1, 6, 0, 7, 9, 13, 10, 12, 7, 5, 8, 3, 0, 10, 5, 3, 13, 16, 12, 15, 9, 8, 17, 8, 13, 16, 10, 9, 11, 14, 18, 20, 11, 17, 18, 12, 11, 14, 17, 16, 21, 23, 20, 22, 21, 15, 22, 15, 14, 23, 18, 21, 19],
        "subMeshes": [{
            "materialIndex": 0,
            "verticesStart": 0,
            "verticesCount": 24,
            "indexStart": 0,
            "indexCount": 132
        }],
        "instances": []
    }],
    "cameras": [{
        "name": "Camera",
        "id": "Camera",
        "position": [7.4811, 5.3437, -6.5076],
        "rotation": [0.4615, -0.8149, 0.0108],
        "fov": 0.8576,
        "minZ": 0.1,
        "maxZ": 100,
        "speed": 1,
        "inertia": 0.9,
        "checkCollisions": false,
        "applyGravity": false,
        "ellipsoid": [0.2, 0.9, 0.2],
        "cameraRigMode": 0,
        "interaxial_distance": 0.0637,
        "type": "FreeCamera"
    }],
    "activeCamera": "Camera",
    "lights": [{
        "name": "Lamp",
        "id": "Lamp",
        "type": 0,
        "position": [4.0762, 5.9039, 1.0055],
        "intensity": 1,
        "diffuse": [1, 1, 1],
        "specular": [1, 1, 1]
    }],
    "shadowGenerators": []
};