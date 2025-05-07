import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const videoTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
  
    // demo1(scene, canvas);
    demo2(scene, canvas);

        
    return scene;
}

// 在平面上播放视频
const  demo1 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
    // 创建一个相机
    var camera = new BABYLON.ArcRotateCamera("arcR", -Math.PI/2, Math.PI/2, 15, BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建平面的参数
	var planeOpts = {
			height: 5.4762, 
			width: 7.3967, 
			sideOrientation: BABYLON.Mesh.DOUBLESIDE
	};
    // 创建衣蛾屏幕
	var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
    // 设置视频的位置
	var vidPos = (new BABYLON.Vector3(0,0,0.1))
    ANote0Video.position = vidPos;

    // 创建一个标准材质
	var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
    // 创建视频贴图
	var ANote0VideoVidTex = new BABYLON.VideoTexture("vidtex","https://playground.babylonjs.com/textures/babylonjs.mp4", scene);
	// 设置纹理为视频贴图
    ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
    //设置粗糙度，避免反光
	ANote0VideoMat.roughness = 1;
    // 设置自发光颜色
	ANote0VideoMat.emissiveColor = BABYLON.Color3.White();
    // 设置材质
	ANote0Video.material = ANote0VideoMat;
    

    // 鼠标点击场景时触发
	scene.onPointerObservable.add(function(evt){
            // 如果点击的物体是网格体，并且是ANote0Video
			if(evt.pickInfo!.pickedMesh === ANote0Video){
                //console.log("picked");
                     
                    // 如果视频是暂停
					if(ANote0VideoVidTex.video.paused)
                        // 开始播放
						ANote0VideoVidTex.video.play();
					else
                        // 暂停播放
						ANote0VideoVidTex.video.pause();
                    // 输出播放状态
                    console.log(ANote0VideoVidTex.video.paused?"paused":"playing");
			}
    // 拾取事件
	}, BABYLON.PointerEventTypes.POINTERPICK);
    //console.log(ANote0Video);
}

// 在球面上播放视频
const  demo2 = (scene: BABYLON.Scene, canvas: HTMLCanvasElement)=>{
     // 创建一个相机
     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
     // This targets the camera to scene origin
     camera.setTarget(BABYLON.Vector3.Zero());
     // This attaches the camera to the canvas
     camera.attachControl(canvas, true);
 
     // 创建半球光
     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
     // Default intensity is 1. Let's dim the light a small amount
     light.intensity = 0.7;
 
     // 创建一个球
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", {segments:16, diameter:2}, scene);
     // Move the sphere upward 1/2 its height
     sphere.position.y = 1;
     
     // 创建标准材质
     var mat = new BABYLON.StandardMaterial("mat", scene);
     
     // 创建视频贴图
        /**
     * Creates a video texture.
     * If you want to display a video in your scene, this is the special texture for that.
     * This special texture works similar to other textures, with the exception of a few parameters.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/materials/using/videoTexture
     * @param name optional name, will detect from video source, if not defined
     * @param src can be used to provide an url, array of urls or an already setup HTML video element.
     * @param scene is obviously the current scene.
     * @param generateMipMaps can be used to turn on mipmaps (Can be expensive for videoTextures because they are often updated).
     * @param invertY is false by default but can be used to invert video on Y axis
     * @param samplingMode controls the sampling method and is set to TRILINEAR_SAMPLINGMODE by default
     * @param settings allows finer control over video usage
     * @param onError defines a callback triggered when an error occurred during the loading session
     * @param format defines the texture format to use (Engine.TEXTUREFORMAT_RGBA by default)
     */
     var videoTexture = new BABYLON.VideoTexture(
         "video",
         // 视频的兼容格式
         [
           "https://playground.babylonjs.com/textures/babylonjs.mp4", 
          "https://playground.babylonjs.com/textures/babylonjs.webm"
        ],
         scene,
         false,
         false,
         BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE,
         {
             autoPlay:false,
             autoUpdateTexture:true
         }
     );
     
     // 设置贴图为视频贴图
     mat.diffuseTexture = videoTexture;

     // U方向反转
     videoTexture.uScale = -1
     sphere.material = mat;
     
     scene.onPointerUp = () => {
         // 自动播放
         videoTexture.video.play()
         scene.onPointerUp = undefined
     }
     
}