import { BABYLON } from "../base/commonIncludes";
import { localAxes, showAxis } from "../utils/axis";

export const parentSubmeshDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {

    const scene = new BABYLON.Scene(engine);
    
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2.2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    // 盒子六个面的颜色， 通过 faceColors 设置
    const faceColors:BABYLON.Color4[] = [];
	faceColors[0] = BABYLON.Color4.FromColor3(BABYLON.Color3.Blue());
	faceColors[1] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Teal());
	faceColors[2] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Red());
	faceColors[3] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Purple());
	faceColors[4] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Green());
	faceColors[5] =  BABYLON.Color4.FromColor3(BABYLON.Color3.Yellow());
    
    // 父盒子
	const boxParent = BABYLON.MeshBuilder.CreateBox("Box", {faceColors:faceColors});
    // 子盒子
    const boxChild = BABYLON.MeshBuilder.CreateBox("Box", {size: 0.5, faceColors:faceColors});
    // 设置父子关系
    boxChild.setParent(boxParent);
    
    // 移动子盒子的位置
    boxChild.position.x = 0;
    boxChild.position.y = 2;
    boxChild.position.z = 0;

    // 旋转子盒子
    boxChild.rotation.x = Math.PI / 4;
    boxChild.rotation.y = Math.PI / 4;
    boxChild.rotation.z = Math.PI / 4;

    // 移动父盒子的位置， 子盒子随之移动
    boxParent.position.x = 2;
    boxParent.position.y = 0;
    boxParent.position.z = 0;

    // 旋转父盒子，子盒子随着转动
    boxParent.rotation.x = 0;
    boxParent.rotation.y = 0;
    boxParent.rotation.z =  -Math.PI / 4;
    // 绘制局部坐标
    const boxChildAxes = localAxes(1, scene);
    // 将坐标轴的父节点设置为子盒子，坐标轴就与子盒子一致了
    boxChildAxes.parent = boxChild; 

    showAxis(6, scene);
    return scene;

}