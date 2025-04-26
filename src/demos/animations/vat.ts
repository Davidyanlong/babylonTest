import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
// Vertex Animation Textures
export const  VATDemo =  function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

   // This creates a basic Babylon Scene object (non-mesh)
   var scene = new BABYLON.Scene(engine);

   // This creates and positions a free camera (non-mesh)
   var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, 10), scene);

   // This targets the camera to scene origin
   camera.setTarget(BABYLON.Vector3.Zero());

   // This attaches the camera to the canvas
   camera.attachControl(canvas, true);

   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
   var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

   // Default intensity is 1. Let's dim the light a small amount
   light.intensity = 2;

   //  demo1(engine, scene);

//    demo2(engine, scene);
   demo3(engine, scene);
   

   return scene;
}

const demo1 = (engine:BABYLON.Engine ,scene:BABYLON.Scene)=>{
    const animationRanges:BABYLON.AnimationRange[] = [
        new BABYLON.AnimationRange('', 7, 31),
        new BABYLON.AnimationRange('', 33, 61),
        new BABYLON.AnimationRange('', 63, 91),
        new BABYLON.AnimationRange('', 93, 130),
    ] 
 
    BABYLON.ImportMeshAsync(
        "https://raw.githubusercontent.com/RaggarDK/Baby/baby/arr.babylon",
        scene
    ).then((importResult)=>{
     const mesh = importResult.meshes[0] as  BABYLON.Mesh;
     //  烘焙动画到纹理
     const baker = new BABYLON.VertexAnimationBaker(scene, mesh);
  
     baker.bakeVertexData(
      [
          new BABYLON.AnimationRange("My animation",0,animationRanges[animationRanges.length - 1].to)
      ]).then((vertexData) => {
          // 创建VAT材质
         const vertexTexture = baker.textureFromBakedVertexData(vertexData);
  
         // VAT 管理
         const manager = new BABYLON.BakedVertexAnimationManager(scene);
  
         // 设置烘焙的顶点动画纹理
         manager.texture = vertexTexture;
         // 设置动画参数
         manager.animationParameters = new BABYLON.Vector4(
             animationRanges[0].from,
             animationRanges[0].to,
             0, 
             30
         );
  
         mesh.bakedVertexAnimationManager = manager;
  
         scene.registerBeforeRender(() => {
             manager.time += engine.getDeltaTime() / 1000.0;
         });
     });
    });
 
}

// 实例化
const demo2 = (engine:BABYLON.Engine ,scene:BABYLON.Scene)=>{
    const animationRanges = [
        { from: 7, to: 31 },
        { from: 33, to: 61 },
        { from: 63, to: 91 },
        { from: 93, to: 130 }
    ]

     BABYLON.ImportMeshAsync(
        "https://raw.githubusercontent.com/RaggarDK/Baby/baby/arr.babylon",
        scene,
    ).then((importResult)=>{

        const setAnimationParameters = (vec:BABYLON.Vector4) => {
            // 随机动画
            const anim = animationRanges[Math.floor(Math.random() * animationRanges.length)];
            const ofst = Math.floor(Math.random() * (anim.to - anim.from + 1));
            vec.set(anim.from, anim.to, ofst, Math.random() * 50 + 30);
        };
    
        const mesh = importResult.meshes[0] as BABYLON.Mesh;
        const baker = new BABYLON.VertexAnimationBaker(scene, mesh);
        
        // 注册实例化Buffer
        mesh.registerInstancedBuffer("bakedVertexAnimationSettingsInstanced", 4);
        
        mesh.instancedBuffers.bakedVertexAnimationSettingsInstanced = new BABYLON.Vector4(0, 0, 0, 0);
    
        // 实例化动画参数
        setAnimationParameters(mesh.instancedBuffers.bakedVertexAnimationSettingsInstanced);
    
        baker.bakeVertexData([
            new BABYLON.AnimationRange("My animation",0,animationRanges[animationRanges.length - 1].to)
        ]).then((vertexData) => {
            const vertexTexture = baker.textureFromBakedVertexData(vertexData);
    
            const manager = new BABYLON.BakedVertexAnimationManager(scene);
    
            manager.texture = vertexTexture;
    
            mesh.bakedVertexAnimationManager = manager;
            
            // 实例化 500 个
            const numInstances = 500;
            for (let i = 0; i < numInstances; i++) {
                const instance = mesh.createInstance("instance" + i)
                instance.instancedBuffers.bakedVertexAnimationSettingsInstanced = new BABYLON.Vector4(0, 0, 0, 0);
                setAnimationParameters(instance.instancedBuffers.bakedVertexAnimationSettingsInstanced);
                instance.position.x += Math.random() * 100 - 50;
                instance.position.z += Math.random() * 100 - 50;
            }
    
            scene.registerBeforeRender(() => {
                manager.time += engine.getDeltaTime() / 1000.0;
            });
        });

    });

   
}


const demo3 = (engine:BABYLON.Engine ,scene:BABYLON.Scene)=>{
    const animationRanges = [
        { from: 7, to: 31 },
        { from: 33, to: 61 },
        { from: 63, to: 91 },
        { from: 93, to: 130 }
    ]

     BABYLON.ImportMeshAsync(
         "https://raw.githubusercontent.com/RaggarDK/Baby/baby/arr.babylon",
        scene,
    ).then((importResult)=>{
        const setAnimationParameters = (vec:BABYLON.Vector4) => {
            const anim = animationRanges[Math.floor(Math.random() * animationRanges.length)];
            const ofst = Math.floor(Math.random() * (anim.to - anim.from + 1));
            vec.set(anim.from, anim.to, ofst, Math.random() * 50 + 30);
        };
    
        const mesh = importResult.meshes[0] as BABYLON.Mesh;
        const baker = new BABYLON.VertexAnimationBaker(scene, mesh);
    
        baker.bakeVertexData([
            new BABYLON.AnimationRange("My animation",0,animationRanges[animationRanges.length - 1].to)
        ]).then((vertexData) => {
            const vertexTexture = baker.textureFromBakedVertexData(vertexData);
    
            const manager = new BABYLON.BakedVertexAnimationManager(scene);
    
            manager.texture = vertexTexture;
    
            mesh.bakedVertexAnimationManager = manager;
    
            const numInstances = 500;
            // 创建一个矩阵
            const matrices = new Float32Array(numInstances * 16);
            // 创建动画实例化数据
            const animParameters = new Float32Array(numInstances * 4);
    
            const params = new BABYLON.Vector4();
            for (let i = 0; i < numInstances; i++) {
                // 设置矩阵的位置数据
                const matrix = BABYLON.Matrix.Translation(
                    Math.random() * 100 - 50, 
                    0, 
                    Math.random() * 100 - 50);
                // 设置实例化数据，通过矩阵的方式
                matrices.set(matrix.toArray(), i * 16);
    
                setAnimationParameters(params);
                // 设置动画的数据
                animParameters.set(params.asArray(), i * 4);
            }
            
            // 设置位置buffer
            mesh.thinInstanceSetBuffer("matrix", matrices);
            // 设置动画buffer
            mesh.thinInstanceSetBuffer("bakedVertexAnimationSettingsInstanced", animParameters, 4);
    
            scene.registerBeforeRender(() => {
                manager.time += engine.getDeltaTime() / 1000.0;
            });
        });

    })

    
}