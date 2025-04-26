import { BABYLON } from "../base/commonIncludes";

// 场景基本的构建方法
export const skeletonsDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  // 新建场景实例
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 50, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

  // 导入Dude 动画模型
  BABYLON.ImportMeshAsync("https://playground.babylonjs.com/scenes/Dude/Dude.babylon", scene).then((result) => {
      var dude = result.meshes[0];
      dude.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
      // 播放骨骼动画 0         
      scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
  });

  return scene;
}