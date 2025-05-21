import { BABYLON, earcut } from "../../base/commonIncludes";

export const extrudePolygonDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0)
  );

  // 通过一些点，构建一个polygon 多边形
  //base
  const outline = [
    new BABYLON.Vector3(-0.3, 0, -0.1),
    new BABYLON.Vector3(0.2, 0, -0.1),
  ];

  //curved front
  for (let i = 0; i < 20; i++) {
    outline.push(
      new BABYLON.Vector3(
        0.2 * Math.cos((i * Math.PI) / 40),
        0,
        0.2 * Math.sin((i * Math.PI) / 40) - 0.1
      )
    );
  }

  //top
  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.3, 0, 0.1));

  //  抽取，根据给定的 polygon 与抽取的depth 生成立体几何体
  const car = BABYLON.MeshBuilder.ExtrudePolygon(
    "car",
    { shape: outline, depth: 0.2 },
    scene,
    earcut
  );

  return scene;
};
