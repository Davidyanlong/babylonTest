import { BABYLON } from "../../base/commonIncludes";


/**
 * Function to create and return the Scene object
 * 
 * This function makes use of Viewports, Layer Masks, and SceneLoader.
 * 
 * MultiViews Part 2:
 * https://doc.babylonjs.com/divingDeeper/cameras/multiViewsPart2
 * 
 * Layer Masks and Multi-Cam Textures:
 * https://doc.babylonjs.com/divingDeeper/cameras/layerMasksAndMultiCam
 * 
 * Loading Any File Type:
 * https://doc.babylonjs.com/divingDeeper/importers/loadingFileTypes
 */

var omittedMeshes:BABYLON.Mesh[] = [];

export const pictureInPictuceVistualCameraDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

     // 创建一个场景
     var scene = new BABYLON.Scene(engine);

     // 定义一个自由相机
     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, 0), scene);
 
     // 导入场景模型
     BABYLON.ImportMeshAsync(
        "models/sponza/Sponza.gltf", scene)
        .then((rootMesh)=> {
        
            var pipCamera = new BABYLON.FreeCamera("pipCamera", new BABYLON.Vector3(0,20,0), scene);
         pipCamera.setTarget(BABYLON.Vector3.Zero());
 
         // We want to preserve the square PIP look so we'll use the main camera's aspect ratio to adjust the sizes accordingly
         // Aspect ratio < 1 = Portrait, > 1 = Landscape
         // 获取屏幕像素比
         let ar = engine.getAspectRatio(camera);
         let pipW = (ar < 1) ? 0.3 : 0.3 * (1/ar);
         let pipH = (ar < 1) ? 0.3 * ar : 0.3;
         let pipX = 1 - pipW;
         let pipY = 1 - pipH;
 
         // 定义相机的视口是全屏        
         camera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
         //  定义相机的视口是 [0.7,0.7, 0.3,0.3]
         pipCamera.viewport = new BABYLON.Viewport(pipX, pipY, pipW, pipH);
 
         // 定义相机的掩码  掩码为 0x10000000 和 0x20000000 都可以看到 
         camera.layerMask = 0x30000000;  // Set layer mask so that it can see 0x10000000 and 0x20000000 objects
         // 定义相机的掩码
         pipCamera.layerMask = 0x10000000; // Set layer mask to only see 0x10000000 objects
 
        // 添加活跃相机
        scene.activeCameras ||=[];
        scene.activeCameras.push(camera);
        scene.activeCameras.push(pipCamera);
 
         // 创建一个box 表示 head
         var head = createHead(scene);
         // 关闭拾取
         head.isPickable = false; // We're turning off picking on the head mesh because we don't want it to be picked up by our overhead ray
        
         // 设置为相机的子Mesh
         head.setParent(camera);
         // 设置位置， 与相机位置一致
         head.position = BABYLON.Vector3.Zero();
 
         // 创建半球光
         var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
 
         // 半球光的强度
         light.intensity = 0.7;
 
         // For each part of the Sponza mesh, we want to increase the size and set its layer mask so that
         // it's visible to both cameras
         // 将场景中添加的所有Mesh 掩码设置为 0x10000000
         scene.meshes.forEach((mesh) => {
            // 放大 3 倍
             mesh.scaling = new BABYLON.Vector3(3,3,3);
             mesh.layerMask = 0x10000000; // Set layer mask so that meshes are visible to all cameras
         });
 
         // 相机朝向 [1,6, 0]
         camera.setTarget(new BABYLON.Vector3(1,6,0));
 
         // 创建天空
         createSkyBox(scene);
 
         // Create and initialize our DeviceSourceManager
         var dsm = initializeInput(scene, camera, pipCamera);
     });
 
     return scene;
};

function castRay(scene:BABYLON.Scene) {
    // Since we're just pointing straight down, we can just use the given vector
    // 定义一个向下的方向
    let direction = new BABYLON.Vector3(0, -1, 1);
    // 获取两个相机
    let mainCamera = scene.activeCameras![0];
    let pipCamera = scene.activeCameras![1];

    // 计算两个相机y 方向的距离
    let length = pipCamera.position.y - mainCamera.position.y;
    // 在pipCamera相机的位置上，向下发出射线，射线的长度为两个相机Y的间距
    let ray = new BABYLON.Ray(pipCamera.position, direction, length);
    // 返回射线的数据
    let hits = scene.multiPickWithRay(ray);

    // 如果hits 存在
    if (hits) {

        let meshesToCheck:BABYLON.Mesh[] = []; // Array to hold currently picked meshes

        hits.forEach((hit) => {
            // 设置射线击中目标Mesh的 掩码为 0x20000000
            hit.pickedMesh!.layerMask = 0x20000000; // Set layer mask so that only the main camera can see the mesh
            meshesToCheck.push(hit.pickedMesh as BABYLON.Mesh);
        });
        // 如果omittedMeshes 找到了击中的目标Mesh, 更改掩码
        let meshesToReAdd = omittedMeshes.filter(omittedMesh => meshesToCheck.indexOf(omittedMesh) < 0);
        meshesToReAdd.forEach((omittedMesh) => {
            // 掩码为  0x10000000
            omittedMesh.layerMask = 0x10000000;
        });
        // 将刚击中的目标存放到全局变量中
        omittedMeshes = meshesToCheck;
    }
}
 


function initializeInput(scene:BABYLON.Scene, camera:BABYLON.FreeCamera, pipCamera:BABYLON.FreeCamera) {
    // 用于统一管理多种输入设备的强大工具类，它提供了对键盘、鼠标、游戏手柄、触摸屏等输入设备的集中访问和控制。
    let dsm = new BABYLON.DeviceSourceManager(scene.getEngine());

    dsm.onDeviceConnectedObservable.add((device) => {
        // 键盘配置
        if (device.deviceType === BABYLON.DeviceType.Keyboard) {
            // 每帧渲染前执行
            scene.onBeforeRenderObservable.add(() => {
                let transformMatrix = BABYLON.Matrix.Zero();
                let localDirection = BABYLON.Vector3.Zero();
                let transformedDirection = BABYLON.Vector3.Zero();
                let isMoving = false;

                //  判断是否按下了WASD 键
                if (device.getInput(65) === 1) {
                    localDirection.x = -0.1;
                    isMoving = true;
                }
                if (device.getInput(68) === 1) {
                    localDirection.x = 0.1;
                    isMoving = true;
                }

                if (device.getInput(87) === 1) {
                    localDirection.z = 0.1;
                    isMoving = true;
                }
                if (device.getInput(83) === 1) {
                    localDirection.z = -0.1;
                    isMoving = true;
                }

                // 是否按下方向键
                if (device.getInput(37) === 1) {
                    camera.rotation.y -= 0.01;
                }
                if (device.getInput(39) === 1) {
                    camera.rotation.y += 0.01;
                }
                if (device.getInput(38) === 1) {
                    camera.rotation.x -= 0.01;
                }
                if (device.getInput(40) === 1) {
                    camera.rotation.x += 0.01;
                }

                // 是否需要移动
                if (isMoving) {
                    // 得到相机的世界矩阵
                    camera.getViewMatrix().invertToRef(transformMatrix);
                    // 计算相机世界矩阵的变化
                    BABYLON.Vector3.TransformNormalToRef(localDirection, transformMatrix, transformedDirection);
                    // 修改相机的位置
                    camera.position.addInPlace(transformedDirection);
                    pipCamera.position.addInPlace(transformedDirection);

                    castRay(scene);
                }
            });
        }
        //  鼠标 或移动设备
        else if (device.deviceType === BABYLON.DeviceType.Mouse || device.deviceType === BABYLON.DeviceType.Touch) {
            
            device.onInputChangedObservable.add((deviceData) => {
                // 鼠标事件
                if (deviceData.inputIndex === BABYLON.PointerInput.Move && device.getInput(BABYLON.PointerInput.LeftClick) === 1) {
                    camera.rotation.y += deviceData.movementX * 0.00175;
                    camera.rotation.x += deviceData.movementY * 0.00175;
                }
            });

            // Move forward if 2 fingers are pressed against screen
            // 移动设备
            if (!scene.beforeRender && device.deviceType === BABYLON.DeviceType.Touch ) {
                scene.beforeRender = () => {
                    let transformMatrix = BABYLON.Matrix.Zero();
                    let localDirection = BABYLON.Vector3.Zero();
                    let transformedDirection = BABYLON.Vector3.Zero();
                    let isMoving = false;

                    if (dsm.getDeviceSources(BABYLON.DeviceType.Touch).length === 2) {
                        localDirection.z = 0.1;
                        isMoving = true;
                    }

                    if (isMoving) {
                        camera.getViewMatrix().invertToRef(transformMatrix);
                        BABYLON.Vector3.TransformNormalToRef(localDirection, transformMatrix, transformedDirection);
                        camera.position.addInPlace(transformedDirection);
                        pipCamera.position.addInPlace(transformedDirection);
                        castRay(scene);
                    }
                };
            }
        }
    });

    return dsm;
};


function createSkyBox(scene:BABYLON.Scene) {
    // 创建一个天空盒
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    // 设置掩码为 0x10000000
    skybox.layerMask = 0x10000000;

    // 添加天空的材质
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    // 取消背面裁剪
	skyboxMaterial.backFaceCulling = false;

    // 加载天空贴图
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/skybox", scene);
	// 设置UV坐标模式 x y z
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 颜色为黑色
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    // 高亮色为黑色
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // 设置纹理
	skybox.material = skyboxMaterial;
};


function createHead (scene:BABYLON.Scene) {
    // 创建一个标准材质
    var mat = new BABYLON.StandardMaterial("mat", scene);
    // 材质基本贴图
    var texture = new BABYLON.Texture("https://i.imgur.com/vxH5bCg.jpg", scene);
    // 设置贴图
    mat.diffuseTexture = texture;

    // 定义六个面的颜色
    var faceUV = new Array(6);
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 1 / 3, 1);  // Right ear
    faceUV[1] = new BABYLON.Vector4(1 / 3, 0, 2 / 3, 0.5);  // Top of head
    faceUV[2] = new BABYLON.Vector4(2 / 3, 0, 1, 0.5); // Bottom
    faceUV[3] = new BABYLON.Vector4(0, 0, 1 / 3, 0.5); //Back of Head
    faceUV[4] = new BABYLON.Vector4(1 / 3, 0.5, 2 / 3, 1); // Face
    faceUV[5] = new BABYLON.Vector4(2 /3, 0.5, 1, 1); // Left Ear

    
    var options = {
        // 设置每个面的颜色
        faceUV: faceUV,
        // 设置wrap方式
        wrap: true
    };

    // 创建一个box
    let head = BABYLON.MeshBuilder.CreateBox('head', options, scene);
    // 绕Y轴，旋转PI
    head.rotate(BABYLON.Axis.Y, Math.PI);
    // 设置材质
    head.material = mat;

    return head;
}
