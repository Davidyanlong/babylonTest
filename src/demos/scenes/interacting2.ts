import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const interacting2Scene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    // 设置相机的位置
    camera.setPosition(new BABYLON.Vector3(20, 200, 400));
    // 设置事件绑定
    camera.attachControl(canvas, true);

    // 设置相机的最大bata角度
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;

    // 创建一个点光源
    var light = new BABYLON.PointLight("omni", new BABYLON.Vector3(50, 200, 0), scene);

    // 创建地面材质
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    // 去除高光
    groundMaterial.specularColor = BABYLON.Color3.Black();

    // 定义红色材质
    var redMat = new BABYLON.StandardMaterial("redmat", scene);
    // 基础色
    redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // 高光色
    redMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // 发光颜色
    redMat.emissiveColor = BABYLON.Color3.Red();

    // 定义绿色材质
    var greenMat = new BABYLON.StandardMaterial("greenmat", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.emissiveColor = BABYLON.Color3.Green();

    // 定义蓝色材质
    var blueMat = new BABYLON.StandardMaterial("bluemat", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();

    // 定义粉色
    var purpleMat = new BABYLON.StandardMaterial("purplemat", scene);
    purpleMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    purpleMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    purpleMat.emissiveColor = BABYLON.Color3.Purple();

    /*************************************Meshes****************************************/
    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:1000, height:1000,updatable:false}, scene);
    // 绑定材质
    ground.material = groundMaterial;

    // 红色球
    var redSphere = BABYLON.MeshBuilder.CreateSphere("red", {diameter:20}, scene);
    redSphere.material = redMat;
    redSphere.position.y = 10;
    redSphere.position.x -= 100;

    // 绿色盒子
    var greenBox = BABYLON.MeshBuilder.CreateBox("green", {size:20}, scene);
    greenBox.material = greenMat;
    greenBox.position.z -= 100;
    greenBox.position.y = 10;

    // 蓝色盒子
    var blueBox = BABYLON.MeshBuilder.CreateBox("blue", {size:20}, scene);
    blueBox.material = blueMat;
    blueBox.position.x += 100;
    blueBox.position.y = 10;


    // 粉色的甜甜圈
    var purpleDonut = BABYLON.MeshBuilder.CreateTorus("red", {diameter:30, thickness:10}, scene);
    purpleDonut.material = purpleMat;
    purpleDonut.position.y = 10;
    purpleDonut.position.z += 100;

    var startingPoint: BABYLON.Nullable<BABYLON.Vector3>;
    var currentMesh:BABYLON.Mesh;

    // 获取PICK 到的位置
    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }

        return null;
    }

    // 鼠标按下
    var pointerDown = function (mesh:BABYLON.Mesh) {
            currentMesh = mesh;
            // 得到位置
            startingPoint = getGroundPosition();
            // 如果获取到位置
            if (startingPoint) { // we need to disconnect camera from canvas
                setTimeout(function () {
                    // 解除相机事件
                    camera.detachControl();
                }, 0);
            }
    }

    // 鼠标弹起
    var pointerUp = function () {
        if (startingPoint) {
            // 绑定事件
            camera.attachControl(canvas, true);
            // 清除位置
            startingPoint = null;
            return;
        }
    }

    // 鼠标移动
    var pointerMove = function () {
        if (!startingPoint) {
            return;
        }
        // 当前位置
        var current = getGroundPosition();
        if (!current) {
            return;
        }

        // 差距
        var diff = current.subtract(startingPoint);
        // 更新位置
        currentMesh.position.addInPlace(diff);
        // 当前位置
        startingPoint = current;

    }

    scene.onPointerObservable.add((pointerInfo) => {      		
        switch (pointerInfo.type) {
            // 鼠标按下
			case BABYLON.PointerEventTypes.POINTERDOWN:
				if(pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh != ground) {
                    pointerDown(pointerInfo.pickInfo.pickedMesh as BABYLON.Mesh)
                }
				break;
            // 鼠标弹起
			case BABYLON.PointerEventTypes.POINTERUP:
                    pointerUp();
				break;
            // 鼠标移动
			case BABYLON.PointerEventTypes.POINTERMOVE:          
                    pointerMove();
				break;
        }
    });


    return scene;
};

