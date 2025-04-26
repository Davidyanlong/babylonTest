import { BABYLON,GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const sixDofDragBehaviorDemo = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


     // Create basic world
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 6, 8, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);
    ground.position.y= -1
    scene.createDefaultXRExperienceAsync({floorMeshes:[]})

    BABYLON.LoadAssetContainerAsync("https://models.babylonjs.com/seagulf.glb", scene).then
    ((container)=>{
        // 添加到场景中
        // demo1(scene, container);
        demo2(scene, container);
   
    });

   
    return scene;
};

const demo1 = (scene:BABYLON.Scene, container:BABYLON.AssetContainer)=>{
    container.addAllToScene();
        
    // 模型整体缩放0.002
    container.meshes[0].scaling.scaleInPlace(0.002)

    // wrap in bounding box mesh to avoid picking perf hit
    var gltfMesh = container.meshes[0] as BABYLON.Mesh;
    // 提升拾取性能， 对比包裹在包围盒中
    var boundingBox = BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh)
    
    // Create bounding box gizmo
    var utilLayer = new BABYLON.UtilityLayerRenderer(scene)
    utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
    var gizmo = new BABYLON.BoundingBoxGizmo(BABYLON.Color3.FromHexString("#0984e3"), utilLayer)
    gizmo.attachedMesh = boundingBox;

    // 创建 缩放， 旋转行为
    var sixDofDragBehavior = new BABYLON.SixDofDragBehavior()
    boundingBox.addBehavior(sixDofDragBehavior)
    
    // Mesh 根据包围盒缩放的行为
    var multiPointerScaleBehavior = new BABYLON.MultiPointerScaleBehavior()
    boundingBox.addBehavior(multiPointerScaleBehavior)
}


const demo2 = (scene:BABYLON.Scene, container:BABYLON.AssetContainer)=>{
   // Create the 3D UI manager
   var manager = new GUI.GUI3DManager(scene);
        
   // Add loaded file to the scene
   container.addAllToScene();
   
   // Scale and position the loaded model (First mesh loaded from gltf is the root node)
   container.meshes[0].scaling.scaleInPlace(0.002)

   // wrap in bounding box mesh to avoid picking perf hit
   var gltfMesh = container.meshes[0] as BABYLON.Mesh;
   var boundingBox = BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh)
   
   // Create bounding box gizmo
   var utilLayer = new BABYLON.UtilityLayerRenderer(scene)
   utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
   var gizmo = new BABYLON.BoundingBoxGizmo(BABYLON.Color3.FromHexString("#0984e3"), utilLayer)
   gizmo.attachedMesh = boundingBox;

   // Create behaviors to drag and scale with pointers in VR
   var sixDofDragBehavior = new BABYLON.SixDofDragBehavior()
   boundingBox.addBehavior(sixDofDragBehavior)
   var multiPointerScaleBehavior = new BABYLON.MultiPointerScaleBehavior()
   boundingBox.addBehavior(multiPointerScaleBehavior)

   // 创建APP bar
   var appBar = new BABYLON.TransformNode("");
   // 缩放0.2
   appBar.scaling.scaleInPlace(0.2)
   // 创建一个面板
   var panel = new GUI.PlanePanel();
   panel.margin = 0;
   panel.rows = 1;
   manager.addControl(panel);

   panel.linkToTransformNode(appBar);

   for (var index = 0; index < 2; index++) {
       // 按钮
       var button = new GUI.HolographicButton("orientation");
       panel.addControl(button);
       button.text = "Button #" + panel.children.length;
       if(index == 0){
           // 点击按钮
           button.onPointerClickObservable.add(()=>{
               // 移除行为 
               if(gizmo.attachedMesh){
                   gizmo.attachedMesh = null;
                   boundingBox.removeBehavior(sixDofDragBehavior)
                   boundingBox.removeBehavior(multiPointerScaleBehavior)
               }else{
                   // 添加行为
                   gizmo.attachedMesh = boundingBox;
                   boundingBox.addBehavior(sixDofDragBehavior)
                   boundingBox.addBehavior(multiPointerScaleBehavior)
               }
           })
       }
   }

   // 添加行为组件appBar
   var behavior = new BABYLON.AttachToBoxBehavior(appBar);
   // 添加行为到 boundingBox
   boundingBox.addBehavior(behavior);
}


