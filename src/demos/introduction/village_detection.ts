import { BABYLON } from "../../base/commonIncludes";
// 场景基本的构建方法
export const villageDetectionDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2.2,
    Math.PI / 2.2,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  // 碰撞盒材质，方便查看碰撞，实际使用中设置为透明
  const wireMat = new BABYLON.StandardMaterial("wireMat");
  wireMat.wireframe = true;
  // wireMat.alpha = 0;

  // 碰撞盒
  const hitBox = BABYLON.MeshBuilder.CreateBox("carbox", {
    width: 0.5,
    height: 0.6,
    depth: 4.5,
  });
  hitBox.material = wireMat;
  hitBox.position.x = 3.1;
  hitBox.position.y = 0.3;
  hitBox.position.z = -5;

  // 车轮是否初始化完成
  let carReady = false;

  BABYLON.ImportMeshAsync(
    "https://assets.babylonjs.com/meshes/car.glb",
    scene
  ).then(() => {
    const car = scene.getMeshByName("car") as BABYLON.Mesh;
    carReady = true;
    car.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);
    car.position.y = 0.16;
    car.position.x = -3;
    car.position.z = 8;

    const animCar = new BABYLON.Animation(
      "carAnimation",
      "position.z",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const carKeys = [];

    carKeys.push({
      frame: 0,
      value: 8,
    });

    carKeys.push({
      frame: 150,
      value: -7,
    });

    carKeys.push({
      frame: 200,
      value: -7,
    });

    animCar.setKeys(carKeys);

    car.animations = [];
    car.animations.push(animCar);

    scene.beginAnimation(car, 0, 200, true);

    //wheel animation
    const wheelRB = scene.getMeshByName("wheelRB");
    const wheelRF = scene.getMeshByName("wheelRF");
    const wheelLB = scene.getMeshByName("wheelLB");
    const wheelLF = scene.getMeshByName("wheelLF");

    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
  });

  BABYLON.ImportMeshAsync(
    "https://assets.babylonjs.com/meshes/village.glb",
    scene
  );

  class Walk {
    constructor(public turn: number, public dist: number) {
      this.turn = turn;
      this.dist = dist;
    }
  }

  const track: Walk[] = [];
  track.push(new Walk(180, 2.5));
  track.push(new Walk(0, 5));

  // Dude
  BABYLON.ImportMeshAsync(
    "https://playground.babylonjs.com/scenes/Dude/Dude.babylon",
    scene
  ).then((result) => {
    var dude = result.meshes[0];
    dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);

    dude.position = new BABYLON.Vector3(1.5, 0, -6.9);
    dude.rotate(
      BABYLON.Axis.Y,
      BABYLON.Tools.ToRadians(-90),
      BABYLON.Space.LOCAL
    );
    const startRotation = dude.rotationQuaternion!.clone();

    scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

    let distance = 0;
    let step = 0.015;
    let p = 0;

    scene.onBeforeRenderObservable.add(() => {
        // 当车轮初始化完成
        if (carReady) {
            // 人员 与 碰撞盒是否发生相交， 并且 车辆也与包围盒相交， 人员行走动画将不执行
        if (
          !(dude.getChildren()[1] as BABYLON.Mesh).intersectsMesh(hitBox) &&
          (scene.getMeshByName("car") as BABYLON.Mesh).intersectsMesh(hitBox)
        ) {
          return;
        }
      }
      dude.movePOV(0, 0, step);
      distance += step;

      if (distance > track[p].dist) {
        dude.rotate(
          BABYLON.Axis.Y,
          BABYLON.Tools.ToRadians(track[p].turn),
          BABYLON.Space.LOCAL
        );
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new BABYLON.Vector3(1.5, 0, -6.9);
          dude.rotationQuaternion = startRotation.clone();
        }
      }
    });
  });

  return scene;
};
