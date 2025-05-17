import { BABYLON, GUI } from "../../base/commonIncludes";


// 高亮边缘
export const highLightingScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
   var scene = new BABYLON.Scene(engine);    
   
     
    //  demo1(scene, canvas);
     demo2(scene, canvas);


     return scene;

}

// 大量的案例 https://doc.babylonjs.com/features/featuresDeepDive/mesh/highlightLayer/
const demo1 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
 // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
    sphere.position.x += 1.1;
    sphere.position.y = 1;

    // 克隆
    var sphereAlpha = sphere.clone("sphereAlpha");
    sphereAlpha.position.x -= 2.1;
    // 设置透明度
    sphereAlpha.visibility = 0.5;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width:6, height:6, subdivisions:2}, scene);
	
	// 添加高亮层
    /**
     * Add a mesh in the highlight layer in order to make it glow with the chosen color.
     * @param mesh The mesh to highlight
     * @param color The color of the highlight
     * @param glowEmissiveOnly Extract the glow from the emissive texture
     */
	var hl = new BABYLON.HighlightLayer("hl1", scene);
    // 设置绿色高亮层
	hl.addMesh(sphere, BABYLON.Color3.Green());
    // 设置红色高亮层
	hl.addMesh(sphereAlpha, BABYLON.Color3.Red());

    // 移除高亮
    setTimeout(()=>{
        hl.removeMesh(sphere);
    },5000)
}

const demo2 = (scene:BABYLON.Scene,canvas:HTMLCanvasElement) => {
       scene.createDefaultCamera(true);

    // Load the model
    BABYLON.AppendSceneAsync("https://www.babylonjs.com/Assets/NeonPipe/glTF/NeonPipe.gltf", scene).then( (result)=> {
        // 定义泛光
        var gl = new BABYLON.GlowLayer("glow", scene,{ 
            mainTextureFixedSize: 256,
            blurKernelSize: 64,
            mainTextureSamples: 4,
        });

        // Create a camera pointing at your model.
        scene.createDefaultCameraOrLight(true, true, true);
        
        var helper = scene.createDefaultEnvironment() as BABYLON.EnvironmentHelper;
        helper.setMainColor(BABYLON.Color3.Gray());

        var t = 0;
        scene.onBeforeRenderObservable.add(function() {
            t += 0.01;
            gl.intensity = Math.cos(t) * 0.5 + 0.5;
        });

        // 排除该mesh
        // gl.addExcludedMesh(mesh);
        // 只包含该mesh
        // gl.addIncludedOnlyMesh(mesh);
    });
}