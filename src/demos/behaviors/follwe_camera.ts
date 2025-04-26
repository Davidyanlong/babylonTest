import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const followBehaviorDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  // 创建场景和相机
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 4,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // 创建一个要跟随的网格（例如一个盒子）
  const box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
  box.position.y = 1;

  // 创建一个跟随行为并附加到盒子
  const followBehavior = new BABYLON.FollowBehavior();
  followBehavior.attach(box);

  // 设置盒子跟随相机
  followBehavior.followedCamera = camera;
  // followBehavior. = 0.2;       // 调整跟随速度
  followBehavior.defaultDistance = 5; // 保持5单位距离
  followBehavior.fixedVerticalOffset = 5; // 在相机上方2单位位置
  followBehavior.orientToCameraDeadzoneDegrees = Math.PI/4

  // 可选：在控制台中调试行为
  scene.onBeforeRenderObservable.add(() => {
    console.log("盒子位置:", box.position.toString());
  });

  return scene;
};
