import { BABYLON } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 模型合并
export const path3dScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
     var scene = new BABYLON.Scene(engine);  
  
      demo1(scene, canvas);
      // demo2(scene, canvas);
      // demo3(scene, canvas);
      // demo4(scene, canvas);
      // demo5(scene, canvas);
    //   demo6(scene, canvas);
  
     return scene;  
   
}

const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
    
    // 清屏色
    scene.clearColor = new BABYLON.Color4( .5, .5, .5, 1);
	
    // 创建相机
	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
	camera.setPosition(new BABYLON.Vector3(0, 0, -70));
	camera.attachControl(canvas, true);
	
	// 创建点
	var points:BABYLON.Vector3[] = [];
	for (var i = 0; i < 50; i++) {
		points.push( new BABYLON.Vector3(i - 25, 5 * Math.sin(i / 2), 0) );
	}
	
	// Path3D
    // 创建一条path3D
	var path3d = new BABYLON.Path3D(points);
    
    // 获取所有切线
	var tangents = path3d.getTangents();
    // 获取所有法线
	var normals = path3d.getNormals();
    // 获取所有副法线
	var binormals = path3d.getBinormals();

    // 得到曲线上的点
	var curve = path3d.getCurve();

    // 常用的方法
    // const distances = path3d.getDistances();
    // 更新数据
    // path3d.update(points2);
	
    const pathArray:BABYLON.LinesMesh[] = []
	// 可视化
    // 划线
    const showTBN =()=>{
        curve = path3d.getCurve();

        let line:BABYLON.LinesMesh | undefined;
        while(line = pathArray.pop()){
           line.dispose();
        }

        for(var p = 0; p < curve.length; p++) {
        // 绘制切线
		var tg = BABYLON.MeshBuilder.CreateLines('tg', 
            { points:[ curve[p],  curve[p].add(tangents[p]) ]}, scene);
		tg.color = BABYLON.Color3.Red();
        
        // 绘制法线
		var no = BABYLON.MeshBuilder.CreateLines('no', 
            {points:[ curve[p], curve[p].add(normals[p]) ]}, scene);
		no.color = BABYLON.Color3.Blue();

        // 绘制副法线
		var bi = BABYLON.MeshBuilder.CreateLines('bi', 
            {points:[ curve[p], curve[p].add(binormals[p]) ]}, scene);
		bi.color = BABYLON.Color3.Green();

        pathArray.push(tg, no, bi)
	}
    }
	
    // 调用update 必须在创建线条是设置  updatable: true
    var li = BABYLON.MeshBuilder.CreateLines('li', {points:curve, updatable: true}, scene);

 scene.onBeforeRenderObservable.add(() => {
        points.forEach((p, i) => {
            p.y = 5 * Math.sin(i / 2 + Date.now() * 0.01);
        });

        path3d.update(points);
        
        showTBN();

        li = BABYLON.MeshBuilder.CreateLines('li', {points: path3d.getCurve(), updatable: true, instance: li});
    })

}