import { BABYLON, earcut } from "../../base/commonIncludes";

export const carDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    
    // const car = buildCar(scene);
    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "car.babylon").then(() =>  {
        //car animatiion
        const car = scene.getMeshByName("car") as BABYLON.Mesh;
        
        // 定义平移动画
        const animCar = new BABYLON.Animation("carAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  
        const carKeys = []; 
  
        carKeys.push({
          frame: 0,
          value: -4
        });
  
  
        carKeys.push({
          frame: 150,
          value: 4
        });
  
        carKeys.push({
          frame: 210,
          value: 4
        });
        
        // 设置帧到动画中
        animCar.setKeys(carKeys);
  
        car.animations = [];
        car.animations.push(animCar);
        
        // 启动逐帧平移动画
        scene.beginAnimation(car, 0, 210, true);
        
        //wheel animation
        const wheelRB = scene.getMeshByName("wheelRB");
        const wheelRF = scene.getMeshByName("wheelRF");
        const wheelLB = scene.getMeshByName("wheelLB");
        const wheelLF = scene.getMeshByName("wheelLF");

        // 启动逐帧旋转动画
        scene.beginAnimation(wheelRB, 0, 30, true);
        scene.beginAnimation(wheelRF, 0, 30, true);
        scene.beginAnimation(wheelLB, 0, 30, true);
        scene.beginAnimation(wheelLF, 0, 30, true);
      });
  

    return scene;
}



// 创造车体
const buildCar = (scene: BABYLON.Scene) => {
    
    //base
    const outline = [
        new BABYLON.Vector3(-0.3, 0, -0.1),
        new BABYLON.Vector3(0.2, 0, -0.1),
    ]

    //curved front
    for (let i = 0; i < 20; i++) {
        outline.push(new BABYLON.Vector3(0.2 * Math.cos(i * Math.PI / 40), 0, 0.2 * Math.sin(i * Math.PI / 40) - 0.1));
    }

    //top
    outline.push(new BABYLON.Vector3(0, 0, 0.1));
    outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));


    //face UVs
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
    faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

     //material
     const carMat = new BABYLON.StandardMaterial("carMat");
     carMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/car.png");
 

    //back formed automatically
    const car = BABYLON.MeshBuilder.ExtrudePolygon("car", {shape: outline, depth: 0.2, faceUV: faceUV, wrap: true}, scene, earcut);
    car.material = carMat;

    // ============ 车轮 =====================================================
 
    const wheelUV = [];
    wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
    wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
    wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);
    
    // 车轮材质
    const wheelMat = new BABYLON.StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/wheel.png");


    // 创建一个圆柱体
    const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {diameter: 0.125, height: 0.05, faceUV: wheelUV})
    wheelRB.material = wheelMat;
    // 父对象为 car 
    wheelRB.parent = car;
    // 设置位置
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;

    // 克隆车轮
    const wheelRF = wheelRB.clone("wheelRF");
    // 调整位置
    wheelRF.position.x = 0.1;

    // 克隆车轮
    const wheelLB = wheelRB.clone("wheelLB");
    // 调整位置
    wheelLB.position.y = -0.2 - 0.035;

    // 克隆车轮
    const wheelLF = wheelRF.clone("wheelLF");
    // 调整位置
    wheelLF.position.y = -0.2 - 0.035;



    // 车轮动画绕 y 轴旋转， 每秒旋转30帧
    const animWheel = new BABYLON.Animation("wheelAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const wheelKeys = []; 

    //At the animation key 0, the value of rotation.y is 0
    // 设置关键帧
    wheelKeys.push({
        frame: 0,
        value: 0
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    // 设置关键帧， 30帧 旋转 2PI
    wheelKeys.push({
        frame: 30,
        value: 2 * Math.PI
    });

    // 设置关键帧到帧动画中
    //set the keys
    animWheel.setKeys(wheelKeys);

    //Link this animation to a wheel
    // 绑定动画给车轮
    wheelRB.animations = [];
    wheelRB.animations.push(animWheel);

    wheelRF.animations = [];
    wheelRF.animations.push(animWheel);

    wheelLB.animations = [];
    wheelLB.animations.push(animWheel);

    wheelLF.animations = [];
    wheelLF.animations.push(animWheel);

    // 启动逐帧动画
    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);


    return car;

}