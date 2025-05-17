import { BABYLON } from "../../base/commonIncludes";


// 晶体网格，用于变形Mesh
export const latticeScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景
    const scene = new BABYLON.Scene(engine);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);                                                                                
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    
    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    demo1(scene)

    return scene;
}

const demo1 = (scene:BABYLON.Scene)=>{

        // 创建一个球
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
        // 获取顶点数据
        const positions = sphere.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        
        // 定义一个float32Array 数组
        const updates = new Float32Array(positions!.length);

        // lattice
        var lattice = new BABYLON.Lattice(
            { 
                size: new BABYLON.Vector3(2, 2, 2), 
                position: BABYLON.Vector3.Zero()
            });

        // Make it pointy
       // 抬升顶部控制点（制造隆起效果）
        for (let x = 0; x < lattice.resolutionX; x++) {
            for (let z = 0; z < lattice.resolutionZ; z++) {
                
                const control = lattice.data[x][lattice.resolutionY - 1][z];
                control.y += 1;
            }
        }

        // Shrink that belly!
        /// 收缩腰部（消除中间膨胀
        for (let x = 0; x < lattice.resolutionX; x++) {
            for (let z = 0; z < lattice.resolutionZ; z++) {
                const control = lattice.data[x][1][z];
              
                control.x = 0;
                control.z = 0;
            }
        }

        let offset = -2;
        scene.onBeforeRenderObservable.add(() => {
            lattice.position.x = offset; // 每帧横向移动格子
            offset += 0.01;
            
            // 存储变更的点
            lattice.deform(positions!, updates);
            // 从新设置数据
            sphere.setVerticesData(BABYLON.VertexBuffer.PositionKind, updates, true);
            // 更新法线数据
            sphere.createNormals(true);
        });
}
