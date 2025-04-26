import { BABYLON } from "../base/commonIncludes";

// 场景基本的构建方法
export const moveToPathDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 1.5, Math.PI / 5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    //create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25});
    sphere.position = new BABYLON.Vector3(2, 0, 2);

    // 第四个点是一个闭合的区间
    //draw lines to form a triangle
    const points = [];
    points.push(new BABYLON.Vector3(2, 0, 2));
    points.push(new BABYLON.Vector3(2, 0, -2));
    points.push(new BABYLON.Vector3(-2, 0, -2));
    points.push(points[0]); //close the triangle;

    // 绘制三角形线条
    BABYLON.MeshBuilder.CreateLines("triangle", {points: points})

    class Slide{
        constructor(public turn:number, public dist:number) { 
            //after covering dist apply turn
            // 方向
            this.turn = turn;
            // 距离
            this.dist = dist;
        }
    }
    
    // 定义每一个段
    const track:Slide[] = [];
    track.push(new Slide(Math.PI / 2, 4));
    track.push(new Slide(3 * Math.PI / 4, 8));
    track.push(new Slide(3 * Math.PI / 4, 8 + 4 * Math.sqrt(2)));

    let distance = 0;
    let step = 0.05;
    let p = 0;

    // 每帧调用
    scene.onBeforeRenderObservable.add(() => {
        // 每一帧向前移动step个长度
		sphere.movePOV(0, 0, step);
        // 当前移动的距离
        distance += step;
         
        // 如果距离大于当前段距离时
        if (distance > track[p].dist) {     
            // 绕Y轴旋转， 旋转当前段设定好的角度， 在局部坐标下变换   
            sphere.rotate(BABYLON.Axis.Y, track[p].turn, BABYLON.Space.LOCAL);
            // 进入下一段
            p +=1;
            // 取余保证动画循环
            p %= track.length;
            // 当 p 为 0 的时候
            if (p === 0) {
                // 距离初始化为 0 
                distance = 0;
                // 球的位置回到原始位置
                sphere.position = new BABYLON.Vector3(2, 0, 2); //reset to initial conditions
                // 球的旋转角度为初始角度
                sphere.rotation = BABYLON.Vector3.Zero();//prevents error accumulation
            }
        }
    });
    
    return scene;

}