import { BABYLON } from "../base/commonIncludes";

// 绘制世界坐标
export const showAxis = (size:number, scene:BABYLON.Scene) => {
    
    // 动态创建文字贴图
	const makeTextPlane = (text:string, color:string, size:number) => {
        // 创建动态贴图
		const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
		// 是否开启透明通道
        dynamicTexture.hasAlpha = true;
        // 绘制文字
		dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
        
        // 创建一个面
        const plane = BABYLON.MeshBuilder.CreatePlane("TextPlane", {size, updatable: true}, scene);
		// 创建面材质
        const material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        // 设置材质
        plane.material = material;
        // 双面渲染， 背面裁切关闭
	    material.backFaceCulling = false;
        // 设置高光为黑色
	    material.specularColor = new BABYLON.Color3(0, 0, 0);
        // 设置漫反射贴图
	    material.diffuseTexture = dynamicTexture;
		return plane;
    };
  
    // // x 轴 
    // const axisX = BABYLON.MeshBuilder.CreateLines("axisX", { points: [ 
	// 	BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
	// 	new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	// ]});
	// axisX.color = new BABYLON.Color3(1, 0, 0);
	// const xChar = makeTextPlane("X", "red", size / 10);
	// xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    // const axisY = BABYLON.MeshBuilder.CreateLines("axisY", { points:[
    //     BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
    //     new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
    // ]});
    // axisY.color = new BABYLON.Color3(0, 1, 0);
    // const yChar = makeTextPlane("Y", "green", size / 10);
    // yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    
    // const axisZ = BABYLON.MeshBuilder.CreateLines("axisZ", { points: [
    //     BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
    //     new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
    // ]}); 
    // axisZ.color = new BABYLON.Color3(0, 0, 1);
    // const zChar = makeTextPlane("Z", "blue", size / 10);
    // zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    const axis = localAxes(size, scene);

 	const xChar = makeTextPlane("X", "red", size / 10);
	xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

    const yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

    const zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

};
  
// 绘制局部坐标
export const localAxes = (size:number, scene:BABYLON.Scene) => {
    // 绘制 x 轴线条
    const local_axisX = BABYLON.MeshBuilder.CreateLines("local_axisX", { points: [
         BABYLON.Vector3.Zero(), 
         // x 方向为size
         new BABYLON.Vector3(size, 0, 0), 
        // 绘制一侧箭头
        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        // 回到箭头顶端
        new BABYLON.Vector3(size, 0, 0), 
        //  绘制另一侧箭头
        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ]}, scene);

    // 设置 x 轴颜色
    local_axisX.color = BABYLON.Color3.Red();

    // 绘制 y 轴线条
    const local_axisY = BABYLON.MeshBuilder.CreateLines("local_axisY", { points: [
        BABYLON.Vector3.Zero(), 
        // y 方向size
        new BABYLON.Vector3(0, size, 0), 
        // 绘制一侧箭头
        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        // 回到箭头顶端
        new BABYLON.Vector3(0, size, 0), 
         //  绘制另一侧箭头
        new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ]}, scene);

    // 设置 y 轴颜色
    local_axisY.color = new BABYLON.Color3(0, 1, 0);

    const local_axisZ = BABYLON.MeshBuilder.CreateLines("local_axisZ", { points: [
        // 000 点出发
        BABYLON.Vector3.Zero(), 
        // z 方向为size
        new BABYLON.Vector3(0, 0, size), 
        // 绘制一侧箭头
        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
         // 回到箭头顶端
        new BABYLON.Vector3(0, 0, size), 
         //  绘制另一侧箭头
        new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ]}, scene);

     // 设置 z 轴颜色
    local_axisZ.color = new BABYLON.Color3(0, 0, 1);


    // 定义一个空节点
    const local_origin = new BABYLON.TransformNode("local_origin");

    // 设置 坐标轴的父节点
    local_axisX.parent = local_origin;
    local_axisY.parent = local_origin;
    local_axisZ.parent = local_origin;
    // 返回坐标轴的父节点
    return local_origin;
}