import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const customShaderScene = function (engine: BABYLON.Engine,canvas: HTMLCanvasElement) {
    
    // 创建一个场景 
    var scene = new BABYLON.Scene(engine);

//    demo1(scene, canvas);

//    demo3(scene, canvas);
//    demo4(scene, canvas);
//    demo5(scene, canvas);
// demo6(scene, canvas);
demo7(scene, canvas);



    return scene;
}

const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
 // 创建轨道相机
 var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
 camera.attachControl(canvas, true);
 
  // 创建灯光
 var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);


 // 自定义shader
 BABYLON.Effect.ShadersStore["customVertexShader"]= "\r\n"+   
     "precision highp float;\r\n"+

     "// Attributes\r\n"+
     "attribute vec3 position;\r\n"+
     "attribute vec2 uv;\r\n"+

     "// Uniforms\r\n"+
     "uniform mat4 worldViewProjection;\r\n"+

     "// Varying\r\n"+
     "varying vec2 vUV;\r\n"+

     "void main(void) {\r\n"+
     "    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n"+

     "    vUV = uv;\r\n"+
     "}\r\n";

 BABYLON.Effect.ShadersStore["customFragmentShader"]="\r\n"+
    "precision highp float;\r\n"+

     "varying vec2 vUV;\r\n"+

     "uniform sampler2D textureSampler;\r\n"+

     "void main(void) {\r\n"+
     "    gl_FragColor = texture2D(textureSampler, vUV);\r\n"+
     "}\r\n";



 // 创建一个材质
 var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "custom",
        fragment: "custom",
     },
     {
         attributes: ["position", "normal", "uv"],
         uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
     });


 // 创建材质
 var mainTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);

 // 设置材质的贴图
 shaderMaterial.setTexture("textureSampler", mainTexture);

 // 关闭背面裁剪
 shaderMaterial.backFaceCulling = false;

 // 创建一个box
 var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
 // 应用材质
 box.material = shaderMaterial;
}


// const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
//       // This creates a basic Babylon Scene object (non-mesh)
//       var scene = new BABYLON.Scene(engine);

//       // This creates and positions a free camera (non-mesh)
//         camera = new BABYLON.ArcRotateCamera("camera1",3.,3.,0., new BABYLON.Vector3(0, 5, -10), scene);
  
//       // This targets the camera to scene origin
//       camera.setTarget(BABYLON.Vector3.Zero());
  
//       // This attaches the camera to the canvas
//       camera.attachControl(canvas, true);
  
//       // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//       var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  
//       // Default intensity is 1. Let's dim the light a small amount
//       light.intensity = 0.7;


//       var url = "https://cdn.rawgit.com/NasimiAsl/Extensions/master/ShaderBuilder/Babylonx.ShaderBuilder.js";
//     var s = document.createElement("script");
//     s.src = url;
//     document.head.appendChild(s);

//     var camera;


      
//       s.onload = function (params) {
//             BABYLONX.ShaderBuilder.InitializeEngine();
        
//             var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:5}, scene);
           
//             sphere.material = new BABYLONX.ShaderBuilder()
//               .Map({ path: 'textures/amiga.jpg' })
//               .BuildMaterial(scene); 
            
//       }
      
//       return scene;
// }


const demo3 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);


    // 相机
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 创建盒子
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2});
    box.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 使用ShadersStore 存储shader代码
    BABYLON.Effect.ShadersStore['customVertexShader'] = `
        precision highp float;
        attribute vec3 position;
        uniform mat4 worldViewProjection;
        
        void main() {
            vec4 p = vec4(position, 1.);
            gl_Position = worldViewProjection * p;
        }
    `;

    BABYLON.Effect.ShadersStore['customFragmentShader'] = `
        precision highp float;

        void main() {
            gl_FragColor = vec4(1.,0.,0.,1.);
        }
    `;

    // 使用 'custom' 获取shader
    var shaderMaterial = new BABYLON.ShaderMaterial('custom', scene, 'custom', {

    });

    // 应用材质
    box.material = shaderMaterial;
}

const demo4 =  (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建一个相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);


    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // 创建一个平面
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {});

    // 请求shader 地址
    /**
     * https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/shaders/basic.vertex.fx
     * https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/shaders/basic.fragment.fx
     */
    var shader = new BABYLON.ShaderMaterial(
        "shader", 
        scene, 
        "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/shaders/basic", 
        {
            attributes: ["position", "uv"],
            uniforms: ["worldViewProjection"],
            samplers: ["textureSampler"],
        }
    );

    // 创建一个贴图
    const amigaTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);
    // 设置贴图
    shader.setTexture("textureSampler", amigaTexture);
    // 应用材质
    plane.material = shader;

}

// 动态更改uniform
const demo5 =  (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
     
    // 创建相机
     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, -10), scene);
     // This targets the camera to scene origin
     camera.setTarget(BABYLON.Vector3.Zero());
     // This attaches the camera to the canvas
     camera.attachControl(canvas, true);
 
     // 创建灯光
     var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
     // Default intensity is 1. Let's dim the light a small amount
     light.intensity = 0.7;
 
     // 创建盒子
     var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2});
     box.position.y = 1;
 
     // 创建地面
     var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
 
     // 创建自定义shader code
     BABYLON.Effect.ShadersStore['customVertexShader'] = `
         precision highp float;
         attribute vec3 position;
         uniform mat4 worldViewProjection;
         
         void main() {
             vec4 p = vec4(position, 1.);
             gl_Position = worldViewProjection * p;
         }
     `;
 
     BABYLON.Effect.ShadersStore['customFragmentShader'] = `
         precision highp float;
         uniform vec3 color;
 
         void main() {
             gl_FragColor = vec4(color, 1.);
         }
     `;
 
     // 设置uniform color 
     var shaderMaterial = new BABYLON.ShaderMaterial(
         'custom', 
         scene, 
         'custom', 
         {
             attributes: ["position"],
             uniforms: ["worldViewProjection", "color"]
         }
     );
 
     // 设置颜色
     var shaderColor = new BABYLON.Color3(0,0,0);
     shaderMaterial.setColor3("color", shaderColor);
 
     box.material = shaderMaterial;
 
     var speed = 0.001;
     scene.onBeforeRenderObservable.add(() => {
         var t = Date.now() * speed;
         shaderColor.r = Math.sin(t) * 0.5 + 0.5; 
         // 动态改变uniform
         shaderMaterial.setColor3("color", shaderColor);
     });
}

// 雾的完整代码
const demo6 =  (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    BABYLON.Effect.ShadersStore["myshaderVertexShader"] = `
       attribute vec3 position;                
       uniform mat4 world;                    
       uniform mat4 view;                    
       uniform mat4 viewProjection;          
       varying float fFogDistance;
       void main(void) {
               vec4 worldPosition = world * vec4(position, 1.0);
               fFogDistance = (view * worldPosition).z;
               gl_Position =  viewProjection * worldPosition;
       }`;

BABYLON.Effect.ShadersStore["myshaderFragmentShader"] = `
    #define FOGMODE_NONE 0.
    #define FOGMODE_EXP 1.
    #define FOGMODE_EXP2 2.
    #define FOGMODE_LINEAR 3.
    #define E 2.71828

    uniform vec4 vFogInfos;
    uniform vec3 vFogColor;
    varying float fFogDistance;

    float CalcFogFactor()
    {
        float fogCoeff = 1.0;
        float fogStart = vFogInfos.y;
        float fogEnd = vFogInfos.z;
        float fogDensity = vFogInfos.w;

        if (FOGMODE_LINEAR == vFogInfos.x)
        {
            fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);
        }
        else if (FOGMODE_EXP == vFogInfos.x)
        {
            fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);
        }
        else if (FOGMODE_EXP2 == vFogInfos.x)
        {
            fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);
        }

        return clamp(fogCoeff, 0.0, 1.0);
    }

    uniform sampler2D textureSampler;               
    void main(void) {               
        float fog = CalcFogFactor();
        vec3 color = vec3(1.0, 0., 1.0);
        color = fog * color + (1.0 - fog) * vFogColor;                
        gl_FragColor = vec4(color, 1.); 
    }`;



     // This creates and positions a free camera (non-mesh)
     var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI, Math.PI / 2.0, 5, new BABYLON.Vector3(0, 0, 0), scene);

     // This targets the camera to scene origin
     camera.setTarget(BABYLON.Vector3.Zero());
 
     // This attaches the camera to the canvas
     camera.attachControl(canvas, true);
 
     var box = BABYLON.Mesh.CreateBox("test", 1.0, scene);
     var boxMaterial = new BABYLON.ShaderMaterial("test", scene, {
             vertex: "myshader",
             fragment: "myshader"
         },
         {
             needAlphaBlending: true,
             attributes: ["position"],
             uniforms:   ["world","view","viewProjection", "vFogInfos", "vFogColor"],
             samplers:   []
         });
     box.material = boxMaterial;
 
     box.material = boxMaterial;
     // shard bind 时候回调
     boxMaterial.onBind = function(mesh) {
         var effect = boxMaterial.getEffect();
         effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity); 
         effect.setColor3("vFogColor", scene.fogColor);
     }
 
     scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
     scene.fogStart = 0;
     scene.fogEnd = 10;
     scene.fogColor = new  BABYLON.Color3(scene.clearColor.r, scene.clearColor.g, scene.clearColor.b);


}


// 使用内置类库编写雾
const demo7 =  (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 自定义shader 
    BABYLON.Effect.ShadersStore["myshaderVertexShader"] = `
            precision highp float;
            attribute vec3 position;
            attribute vec2 uv;
            uniform mat4 world;    
            uniform mat4 view;    
            uniform mat4 viewProjection;
            varying vec2 vUV;

            #include<fogVertexDeclaration>

            void main() {
                vec4 p = vec4(position, 1.);
                vec4 worldPos = world * p;
                gl_Position = viewProjection * worldPos;
                vUV = uv;

                #include<fogVertex>
            }`;

    BABYLON.Effect.ShadersStore["myshaderFragmentShader"] = `
    varying vec2 vUV;

    uniform sampler2D tex;
    #include<fogFragmentDeclaration>

    vec2 uvPixelPerfect(vec2 uv) {
        vec2 res = vec2(textureSize(tex, 0));
        
        uv = uv * res;
        vec2 seam = floor(uv + 0.5);
        uv = seam + clamp((uv-seam) / fwidth(uv), -0.5, 0.5);
        return uv / res;
    }

    void main() {
        vec4 color = texture2D(tex,vUV);
        gl_FragColor = color;
        #include<fogFragment>(color,gl_FragColor)
    }`;



     // This creates and positions a free camera (non-mesh)
     var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI, Math.PI / 2.0, 5, new BABYLON.Vector3(0, 0, 0), scene);

     // This targets the camera to scene origin
     camera.setTarget(BABYLON.Vector3.Zero());
 
     // This attaches the camera to the canvas
     camera.attachControl(canvas, true);
 
     var box = BABYLON.MeshBuilder.CreateBox("test", {size:1.0}, scene);
     var boxMaterial = new BABYLON.ShaderMaterial("test", scene, {
             vertex: "myshader",
             fragment: "myshader"
         },
         {
             needAlphaBlending: true,
             attributes: ["position"],
             uniforms:   ["world","view","viewProjection", "vFogInfos", "vFogColor"],
             samplers:   ['tex']
         });
     box.material = boxMaterial;
 
        // 创建一个贴图
     const amigaTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/amiga.jpg", scene);

     // shard bind 时候回调
     boxMaterial.onBind = function(mesh) {
         var effect = boxMaterial.getEffect();
         effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity); 
         effect.setColor3("vFogColor", scene.fogColor);

        // 设置贴图
        effect.setTexture("tex", amigaTexture);

     }
 
     scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
     scene.fogStart = 0;
     scene.fogEnd = 10;
     scene.fogColor = new  BABYLON.Color3(scene.clearColor.r, scene.clearColor.g, scene.clearColor.b);
}