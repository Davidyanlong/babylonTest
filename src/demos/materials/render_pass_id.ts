import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const renderPassIdScene =function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(engine, scene, canvas);
    demo2(engine, scene, canvas);
        
    return scene;
}


const demo1 = (engine:BABYLON.Engine, scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    const camera = new BABYLON.ArcRotateCamera("Camera", 0.9232, 1.1295, 286, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // 创建灯光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    
    
    // 创建材质一
    var mat1 = new BABYLON.PBRMaterial("mat1", scene);
    // 漫反射贴图
    mat1.albedoTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/co.png', scene)
    // 发光贴图
    mat1.emissiveTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/co.png', scene)
    mat1.alpha = 0.7
    mat1.roughness = 1


    // 创建材质二
    var mat2 = new BABYLON.PBRMaterial("mat1", scene);
    // 漫反射贴图
    mat2.albedoTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/sand.jpg', scene)
    // 发光贴图
    mat1.emissiveTexture = new BABYLON.Texture('https://playground.babylonjs.com/textures/sand.jpg', scene)
    mat2.roughness = 1

    // 当前的RenderPassId
    const renderPassCO = camera.renderPassId;
    // 创建一个新的 renderpassId
    const renderPassSand = engine.createRenderPassId("sand pass");

    var px = 0;
    var pz = -200;
    for (var i = 0; i < 6000; i++) {
        const box = BABYLON.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 1 });
        box.material = mat1;
        // renderPassCO 使用材质一
        box.setMaterialForRenderPass(renderPassCO, mat1);
         // renderPassCO 使用材质二
        box.setMaterialForRenderPass(renderPassSand, mat2);
        if (i % 50 == 0) {
            px = 0;
            pz += 3;
        } else {
            px += 2
        }
        box.position.x = px;
        box.position.z = pz;
    }


    // UI
    var advancedTexture =  GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var UiPanel = new  GUI.StackPanel();
    UiPanel.width = "220px";
    UiPanel.fontSize = "14px";
    UiPanel.horizontalAlignment =  GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    UiPanel.verticalAlignment =  GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(UiPanel);
    var button =  GUI.Button.CreateSimpleButton("but1", "material 1");
    button.paddingTop = "10px";
    button.width = "100px";
    button.height = "50px";
    button.color = "white";
    button.background = "green";
    button.onPointerDownObservable.add(() => {
        // 设置相机使用 材质一通道
        camera.renderPassId = renderPassCO;
    });
    UiPanel.addControl(button);
    var button1 =  GUI.Button.CreateSimpleButton("but2", "material 2");
    button1.paddingTop = "10px";
    button1.width = "100px";
    button1.height = "50px";
    button1.color = "white";
    button1.background = "green";
    button1.onPointerDownObservable.add(() => {
        // 设置相机使用 材质二通道
        camera.renderPassId = renderPassSand;
    });
    UiPanel.addControl(button1);
}

const demo2 = (engine:BABYLON.Engine, scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 2, 3, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const rotate = true;

    // 定义自定义shader 顶点着色器
    BABYLON.Effect.ShadersStore["customcubeVertexShader"]= `   
		precision highp float;
    	// Attributes
    	attribute vec3 position;
        attribute vec3 normal;
    	// Uniforms
    	uniform mat4 worldViewProjection;
        uniform float time;
    	// Varying
    #ifdef FORDEPTH
        uniform vec2 depthValues;
        varying float vDepthMetric;
    #else
    	attribute vec2 uv;
    	varying vec2 vUV;
    #endif
    	void main(void) {
            vec4 q = vec4(position, 1.0);
            vec3 p = q.xyz;
            p.x = p.x + sin(2.0 * position.y + time) * 1.5;
            p.y = p.y + sin(time + 4.0) * 0.6;
    	    gl_Position = worldViewProjection * vec4(p, 1.0);
        #ifdef FORDEPTH
            #ifdef USE_REVERSE_DEPTHBUFFER
                vDepthMetric = ((-gl_Position.z + depthValues.x) / (depthValues.y));
            #else
                vDepthMetric = ((gl_Position.z + depthValues.x) / (depthValues.y));
            #endif
        #else
    	    vUV = uv;
        #endif
    	}`;

    // 定义自定义shader 片元着色器
    BABYLON.Effect.ShadersStore["customcubeFragmentShader"]=`
	    precision highp float;
    #ifdef FORDEPTH
        varying float vDepthMetric;
    #else
        varying vec2 vUV;
    	uniform sampler2D textureSampler;
    #endif

    	void main(void) {
        #ifdef FORDEPTH
            gl_FragColor = vec4(vDepthMetric, 0.0, 0.0, 1.0);
        #else
            gl_FragColor = texture2D(textureSampler, vUV);
        #endif
    	}`;

    // 创建自定义材质
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "customcube",
        fragment: "customcube",
	    },
        {
			attributes: ["position", "normal", "uv"],
			uniforms: ["worldViewProjection", "time"]
        });

    // 创建自定义材质 defines FORDEPTH
    var shaderMaterialForDepthRenderer = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "customcube",
        fragment: "customcube",
	    },
        {
			attributes: ["position", "normal", "uv"],
			uniforms: ["worldViewProjection", "depthValues", "time"],
            defines: ["#define FORDEPTH"]
        });

    var mainTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene);

    // 启用深度渲染
    const depthRenderer = scene.enableDepthRenderer();
    const depthMap = depthRenderer.getDepthMap();
   
    return new Promise((resolve) => {
        mainTexture.onLoadObservable.addOnce(() => {
            // 设置纹理
            shaderMaterial.setTexture("https://playground.babylonjs.com/textureSampler", mainTexture);
            
            // 创建一个盒子
            var box = BABYLON.MeshBuilder.CreateBox("box", { size: 0.75 }, scene);
            box.material = shaderMaterial;
            box.position.y -= 0.5;

            // 创建一个球
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.8 }, scene);
            sphere.position.x = 0.8;
            sphere.position.y = -0.3 - 0.5;
            sphere.position.z = 2;
            sphere.bakeCurrentTransformIntoVertices();
            sphere.material = shaderMaterial;

            // 使用材质 shaderMaterialForDepthRenderer 渲染
            depthRenderer.setMaterialForRendering([box, sphere], shaderMaterialForDepthRenderer);

            // 创建一个平面对象
            const plane = BABYLON.MeshBuilder.CreatePlane("plane", { size: 1 }, scene);
            plane.position.y = 0.8 - 0.5;

            // 创建材质
            const matPlane = new BABYLON.StandardMaterial("matplane", scene);
            // 将深度贴图绘制
            matPlane.emissiveTexture = depthMap;
            matPlane.emissiveColor = new BABYLON.Color3(0, 1, 0);
            // 不启用灯光
            matPlane.disableLighting = true;
            // 不写入深度
            matPlane.disableDepthWrite = true;

            plane.material = matPlane;

            if (rotate) {
                var time = 10.12;
                scene.registerBeforeRender(function() {
                    shaderMaterial.setFloat("time", time);
                    shaderMaterialForDepthRenderer.setFloat("time", time);
                    time += 0.01;        
                });
            }

            resolve(scene);
        });
    });
}