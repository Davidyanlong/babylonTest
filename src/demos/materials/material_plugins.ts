import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const materialPluginsScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);
    // demo5(scene, canvas);
    demo6(engine, scene, canvas);




    
    return scene;
}


/**
 * Extend from MaterialPluginBase to create your plugin.
 */
class BlackAndWhitePluginMaterial extends BABYLON.MaterialPluginBase {
    constructor(material:any) {
      // the second parameter is the name of this plugin.
      // the third one is a priority, which lets you define the order multiple plugins are run. Lower numbers run first.
      // the fourth one is a list of defines used in the shader code.
      super(material, "BlackAndWhite", 200, { BLACKANDWHITE: false });
  
      // 
      this._enable(true);
    }
  
    // Also, you should always associate a define with your plugin because the list of defines (and their values)
    // is what triggers a recompilation of the shader: a shader is recompiled only if a value of a define changes.
    prepareDefines(defines:Record<string, any>, scene:any, mesh:any) {
      defines["BLACKANDWHITE"] = true;
    }
  
    getClassName() {
      // 返回类名
      return "BlackAndWhitePluginMaterial";
    }
  
    // shader语言的兼容
    isCompatible(shaderLanguage:BABYLON.ShaderLanguage) {
      switch (shaderLanguage) {
          case BABYLON.ShaderLanguage.GLSL:
          case BABYLON.ShaderLanguage.WGSL:
              return true;
          default:
              return false;
      }
    }
  
    getCustomCode(shaderType:string, shaderLanguage:BABYLON.ShaderLanguage) {
        if (shaderType === "fragment") { 
          // we're adding this specific code at the end of the main() function
          if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
              return {
                  CUSTOM_FRAGMENT_MAIN_END: `
                              var luma = fragmentOutputs.color.r*0.299 + fragmentOutputs.color.g*0.587 + fragmentOutputs.color.b*0.114;
                              fragmentOutputs.color = vec4f(luma, luma, luma, 1.0);
                          `,
              };
          }
           
          return {
              CUSTOM_FRAGMENT_MAIN_END: `
                          float luma = gl_FragColor.r*0.299 + gl_FragColor.g*0.587 + gl_FragColor.b*0.114;
                          gl_FragColor = vec4(luma, luma, luma, 1.0);
                      `,
          };
      }
      // for other shader types we're not doing anything, return null
      return null;
    }
  }

const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
        // 创建相机
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // 注册一个材质插件
        BABYLON.RegisterMaterialPlugin("BlackAndWhite", (material:BABYLON.Material) => {
            // @ts-ignore
            material.blackandwhite = new BlackAndWhitePluginMaterial(material);
            // @ts-ignore
            return material.blackandwhite;
        });
        
        // Append glTF model to scene.
        BABYLON.AppendSceneAsync("https://playground.babylonjs.com/scenes/BoomBox/BoomBox.gltf", scene).then((result)=>{
            // Create a default arc rotate camera and light.
            scene.createDefaultCameraOrLight(true, true, true);
    
            // The default camera looks at the back of the asset.
            // Rotate the camera by 180 degrees to the front of the asset.
            (scene.activeCamera as BABYLON.ArcRotateCamera).alpha += Math.PI;
        });
  }


class ColorifyPluginMaterial extends BABYLON.MaterialPluginBase {

    color = new BABYLON.Color3(1, .0, 0.0);
    private _varColorName: any;

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(enabled) {
        if (this._isEnabled === enabled) {
            return;
        }
        this._isEnabled = enabled;
        this.markAllDefinesAsDirty();
        this._enable(this._isEnabled);
    }

    _isEnabled = false;

    isCompatible(shaderLanguage:BABYLON.ShaderLanguage) {
        switch (shaderLanguage) {
            case BABYLON.ShaderLanguage.GLSL:
            case BABYLON.ShaderLanguage.WGSL:
                return true;
            default:
                return false;
        }
    }

    constructor(material:BABYLON.Material) {
        super(material, "Colorify", 200, { "COLORIFY": false });

        // @ts-ignore
        this._varColorName = material instanceof BABYLON.PBRBaseMaterial ? "finalColor" : "color";
    }

    prepareDefines(defines:Record<string, any>, scene:any, mesh:any) {
        defines.COLORIFY = this._isEnabled;
    }

    getUniforms(shaderLanguage:BABYLON.ShaderLanguage) {
        if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
            return {
                "ubo": [
                    { name: "myColor", size: 3, type: "vec3" },
                ]
            };
        }
        return {
            "ubo": [
                { name: "myColor", size: 3, type: "vec3" },
            ],
            "fragment":
                `#ifdef COLORIFY
                    uniform vec3 myColor;
                #endif`,
        };
    }

    bindForSubMesh(uniformBuffer:BABYLON.UniformBuffer, scene:any, engine:any, subMesh:any) {
        if (this._isEnabled) {
            uniformBuffer.updateColor3("myColor", this.color);
        }
    }

    getClassName() {
        return "ColorifyPluginMaterial";
    }

    getCustomCode(shaderType:string, shaderLanguage:BABYLON.ShaderLanguage) {
        if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
            return shaderType === "vertex" ? null : {
                "CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR": `
                    #ifdef COLORIFY
                        ${this._varColorName} = vec4f(${this._varColorName}.rgb * uniforms.myColor, ${this._varColorName}.a);
                    #endif
                `,

                "!diffuseBase\\+=info\\.diffuse\\*shadow;": `
                    diffuseBase += info.diffuse*shadow;
                    diffuseBase += vec3f(0., 0.2, 0.8);
                `,
            };
        }


        return shaderType === "vertex" ? null : {
            "CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR": `
                #ifdef COLORIFY
                    ${this._varColorName}.rgb *= myColor;
                #endif
            `,

            "!diffuseBase\\+=info\\.diffuse\\*shadow;": `
                diffuseBase += info.diffuse*shadow;
                diffuseBase += vec3(0., 0.2, 0.8);
            `,
        };
    }
}



const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
      // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);


    BABYLON.RegisterMaterialPlugin("Colorify", (material:BABYLON.Material) => {
        // @ts-ignore
        material.colorify = new ColorifyPluginMaterial(material);
        // @ts-ignore
        return material.colorify;
    });
    
    // 环境光照
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
    var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);


       // Append glTF model to scene.
    BABYLON.AppendSceneAsync("https://playground.babylonjs.com/scenes/BoomBox/BoomBox.gltf", scene).then((result)=>{
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        (scene.activeCamera as BABYLON.ArcRotateCamera).alpha += Math.PI;

        scene.meshes.forEach((m) => {
            if (m.material && m.material.name !== "skyBox") {
                // @ts-ignore
                m.material.pluginManager.getPlugin("Colorify").isEnabled = true;
            }
        });
    });

}


class TestMaterialPlugin extends BABYLON.MaterialPluginBase {
    textureIndex = 0;
    texture = null;

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(enabled) {
        if (this._isEnabled === enabled) {
            return;
        }
        this._isEnabled = enabled;
        this.markAllDefinesAsDirty();
        this._enable(this._isEnabled);
    }

    _isEnabled = false;

    isCompatible(shaderLanguage:BABYLON.ShaderLanguage) {
      switch (shaderLanguage) {
          case BABYLON.ShaderLanguage.GLSL:
          case BABYLON.ShaderLanguage.WGSL:
              return true;
          default:
              return false;
      }
  }

    constructor(material:BABYLON.Material, texArray:any) {
        super(material, "TestPlugin", 200, { "TWOD_ARRAY_TEXTURE": false });
    }

    prepareDefines(defines:Record<string,any>, scene:any, mesh:any) {
        defines["TWOD_ARRAY_TEXTURE"] = this._isEnabled;
    }

    getClassName() {
        return "TestMaterialPluginName"
    }

    getSamplers(samplers:string[]) {
        samplers.push("arrayTex");
    }

    getUniforms(shaderLanguage:BABYLON.ShaderLanguage) {
        return {
            "ubo": [
                { name: "texIndex", size: 1, type: "float" },
            ],
            "fragment":
                `#ifdef TWOD_ARRAY_TEXTURE
                    uniform float texIndex;
                #endif
                `,
        }
    }

    bindForSubMesh(uniformBuffer:BABYLON.UniformBuffer, scene:any, engine:any, subMesh:any) {
        if (this._isEnabled) {
            uniformBuffer.updateFloat('texIndex', this.textureIndex);
            uniformBuffer.setTexture('arrayTex', this.texture);
        }
    }

    getCustomCode(shaderType: string, shaderLanguage?: BABYLON.ShaderLanguage): BABYLON.Nullable<{ [pointName: string]: string; }> {
        if (shaderType === "fragment") {
            if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
                return {
                     "!baseColor\\=textureSample\\(diffuseSampler,diffuseSamplerSampler,fragmentInputs.vDiffuseUV\\+uvOffset\\);":
                         `baseColor = textureSample(arrayTex, arrayTexSampler, fragmentInputs.vDiffuseUV, i32(uniforms.texIndex));`,
                     "CUSTOM_FRAGMENT_DEFINITIONS": `
                          var arrayTexSampler: sampler;
                         var arrayTex: texture_2d_array<f32>;
                    `
                }
            }
            return {
                "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);":
                `baseColor = texture(arrayTex, vec3(vDiffuseUV, texIndex));`,
                "CUSTOM_FRAGMENT_DEFINITIONS": `
                 uniform highp sampler2DArray arrayTex;
                 `
            }
        }
        return null
    }

}



const demo3 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 5, Math.PI / 3, 4, BABYLON.Vector3.Zero(), scene)
    // 创建半球光
    new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(1, 1, 0), scene)
    camera.attachControl(canvas, true)

    // 创建box
    var cube = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, scene)
    // 创建标准材质
    cube.material = new BABYLON.StandardMaterial('', scene);

    (cube.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene)

    // 创建box
    var cube2 = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 1, depth: 1 }, scene)
    // 设置位置
    cube2.position.copyFromFloats(-1, 0, -1.5)
    // 创建标准材质
    cube2.material = new BABYLON.StandardMaterial('', scene);

    (cube2.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene)

    // TEXTURE 2D ARRAY
    var N_LAYERS = 3
    var WH = 4
    var data = new Uint8Array(WH * WH * N_LAYERS * 4)
    var rand = (a:number, b:number) => a + Math.random() * (b - a)
    for (var layer = 0; layer < N_LAYERS; layer++) {
        for (var i = 0; i < WH * WH * 4; i++) {
            var value = (i % 4 === layer) ? 0 : Math.round(rand(0.7, 0.9) * 255)
            data[layer * WH * WH * 4 + i] = value
        }
    }
    var texArray = new BABYLON.RawTexture2DArray(
        data, WH, WH, N_LAYERS,
        BABYLON.Engine.TEXTUREFORMAT_RGBA,
        scene, false, false,
        BABYLON.Texture.NEAREST_SAMPLINGMODE,
    )

    // 应用插件
    // @ts-ignore
    cube.material.testplugin = new TestMaterialPlugin(cube.material);

    // @ts-ignore
    cube.material.testplugin.texture = texArray;
    // @ts-ignore
    cube.material.testplugin.textureIndex = 0;
    // @ts-ignore
    cube.material.testplugin.isEnabled = true;

    let t = 0;
    scene.onBeforeRenderObservable.add(() => {
        // @ts-ignore
        cube.material.testplugin.textureIndex = Math.floor(t);
        t += 1 / 60;
        t = t % 3;
    });
}


class TestMaterialPlugin2 extends BABYLON.MaterialPluginBase {
    private _texArray: any;

    isCompatible(shaderLanguage:BABYLON.ShaderLanguage) {
      switch (shaderLanguage) {
          case BABYLON.ShaderLanguage.GLSL:
          case BABYLON.ShaderLanguage.WGSL:
              return true;
          default:
              return false;
      }
    }

    constructor(material:BABYLON.Material, texArray:any) {
        var priority = 200
        var defines = { "TWOD_ARRAY_TEXTURE": false }
        super(material, "TestPlugin", priority, defines)
        this._texArray = texArray
        this._enable(true)
    }

    prepareDefines(defines:Record<string,any>, scene:any, mesh:any) {
        defines["TWOD_ARRAY_TEXTURE"] = true
    }

    getClassName() {
        return "TestMaterialPluginName2"
    }

    getSamplers(samplers:string[]) {
        samplers.push("arrayTex")
    }

    getAttributes(attributes:string[]) {
        attributes.push('texIndices')
    }

    getUniforms() {
        return {
            "ubo": [],
        }
    }

    bindForSubMesh(uniformBuffer:BABYLON.UniformBuffer, scene:any, engine:any, subMesh:any) {
        uniformBuffer.setTexture('arrayTex', this._texArray)
    }

    getCustomCode(shaderType:string, shaderLanguage:BABYLON.ShaderLanguage):BABYLON.Nullable<{ [pointName: string]: string; }> {
        if (shaderLanguage === BABYLON.ShaderLanguage.WGSL) {
            if (shaderType === "vertex") return {
                "CUSTOM_VERTEX_MAIN_BEGIN": `
                    vertexOutputs.texIndex = input.texIndices;
                `,
                "CUSTOM_VERTEX_DEFINITIONS": `
                    attribute texIndices: f32;
                    varying texIndex: f32;
                `
            }
            if (shaderType === "fragment") return {
                "!baseColor\\=textureSample\\(diffuseSampler,diffuseSamplerSampler,fragmentInputs.vDiffuseUV\\+uvOffset\\);":
                    `baseColor = textureSample(arrayTex, arrayTexSampler, fragmentInputs.vDiffuseUV, i32(input.texIndex));`,
                "CUSTOM_FRAGMENT_DEFINITIONS": `
                    var arrayTexSampler: sampler;
                    var arrayTex: texture_2d_array<f32>;
                    varying texIndex: f32;
                `
            }
        }


        if (shaderType === "vertex") return {
            "CUSTOM_VERTEX_MAIN_BEGIN": `
                texIndex = texIndices;
            `,
            "CUSTOM_VERTEX_DEFINITIONS": `
                uniform highp sampler2DArray arrayTex;
                attribute float texIndices;
                varying float texIndex;
            `
        }
        if (shaderType === "fragment") return {
            "!baseColor\\=texture2D\\(diffuseSampler,vDiffuseUV\\+uvOffset\\);":
                `baseColor = texture(arrayTex, vec3(vDiffuseUV, texIndex));`,
            "CUSTOM_FRAGMENT_DEFINITIONS": `
                uniform highp sampler2DArray arrayTex;
                varying float texIndex;
            `
        }
        return null
    }
}

const demo4 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
     
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 5, Math.PI / 3, 4, BABYLON.Vector3.Zero(), scene)
    new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(1, 1, 0), scene)
    camera.attachControl(canvas, true)

    // 创建box
    var cube = BABYLON.MeshBuilder.CreateBox("cube1", { width: 1, height: 1, depth: 1 }, scene)
    cube.material = new BABYLON.StandardMaterial('', scene);

    (cube.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene)

    // second cube for reference, behind
    var cube2 = BABYLON.MeshBuilder.CreateBox("cube2", { width: 1, height: 1, depth: 1 }, scene)
    cube2.position.copyFromFloats(-1, 0, -2)
    cube2.material = new BABYLON.StandardMaterial('', scene);
    (cube2.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png", scene)


    // TEXTURE 2D ARRAY
    var N_LAYERS = 3
    var WH = 4
    var data = new Uint8Array(WH * WH * N_LAYERS * 4)
    var rand = (a:number, b:number) => a + Math.random() * (b - a)
    for (var layer = 0; layer < N_LAYERS; layer++) {
        for (var i = 0; i < WH * WH * 4; i++) {
            var value = (i % 4 === layer) ? 0 : Math.round(rand(0.7, 0.9) * 255)
            data[layer * WH * WH * 4 + i] = value
        }
    }
    var texArray = new BABYLON.RawTexture2DArray(
        data, WH, WH, N_LAYERS,
        BABYLON.Engine.TEXTUREFORMAT_RGBA,
        scene, false, false,
        BABYLON.Texture.NEAREST_SAMPLINGMODE,
    )

    // APPLY THE PLUGIN
    new TestMaterialPlugin2(cube.material, texArray)

    // add vertex data to mesh
    var texIndices = Array.from(Array(24)).map((n, i) => {
        return Math.floor(i / 6) % N_LAYERS
    })
    cube.setVerticesData("texIndices", texIndices, false, 1)
}


const demo5 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    // Our built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial",scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(1,0,0);
    sphere.material = sphereMaterial;
    sphere.position.y = 3;

        // Our built-in 'sphere' shape.
    var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
    var sphere2Material = new BABYLON.StandardMaterial("sphere2Material",scene);
    sphere2Material.diffuseColor = new BABYLON.Color3(1,0,0);
    sphere2.material = sphere2Material;
    sphere2.position.y = 1;
    //@ts-ignore
    sphere2Material.blackAndWhite = new BlackAndWhitePluginMaterial(sphere2Material);

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.8,0.5,0);
    ground.material = groundMaterial;
}

class ColorifyPluginMaterial2 extends BABYLON.MaterialPluginBase {
    static color = new BABYLON.Color3(1, .0, 0.0);
    private _varColorName: string;

    constructor(material:BABYLON.Material) {
        super(material, "Colorify", 200, { "COLORIFY": false });

        this._varColorName = material instanceof BABYLON.PBRBaseMaterial ? "finalColor" : "color";
    }

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(enabled) {
        if (this._isEnabled === enabled) {
            return;
        }
        this._isEnabled = enabled;
        this.markAllDefinesAsDirty();
        this._enable(this._isEnabled);
    }

    _isEnabled = false;

    prepareDefines(defines:Record<string, any>, scene:any, mesh:any) {
        defines.COLORIFY = this._isEnabled;
    }

    getUniforms() {
        return {
            "ubo": [
                { name: "myColor", size: 3, type: "vec3" },
            ],
            "fragment":
                `#ifdef COLORIFY
                    uniform vec3 myColor;
                #endif`,
        };
    }

    bindForSubMesh(uniformBuffer:BABYLON.UniformBuffer, scene:any, engine:any, subMesh:any) {
        if (this._isEnabled) {
            uniformBuffer.updateColor3("myColor", ColorifyPluginMaterial2.color);
        }
    }

    getClassName() {
        return "ColorifyPluginMaterial2";
    }

    getCustomCode(shaderType:string) {
        return shaderType === "vertex" ? null : {
            "CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR": `
                #ifdef COLORIFY
                    ${this._varColorName}.rgb *= myColor;
                #endif
            `,

            "!diffuseBase\\+=info\\.diffuse\\*shadow;": `
                diffuseBase += info.diffuse*shadow;
                diffuseBase += vec3(0., 0.2, 0.8);
            `,
        };
    }
}

const demo6 = ( engine:BABYLON.Engine, scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
        
    // 创建相机
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // 注册插件
        BABYLON.RegisterMaterialPlugin("Colorify", (material) => {
            // @ts-ignore
            material.colorify = new ColorifyPluginMaterial2(material);
            // @ts-ignore
            return material.colorify;
        });
        
        var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/environment.dds", scene);
        var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
    
        // Append glTF model to scene.
        BABYLON.AppendSceneAsync("https://playground.babylonjs.com/scenes/BoomBox/BoomBox.gltf", scene).then((result)=> {
            // Create a default arc rotate camera and light.
            scene.createDefaultCameraOrLight(true, true, true);
    
            // The default camera looks at the back of the asset.
            // Rotate the camera by 180 degrees to the front of the asset.
            (scene.activeCamera as BABYLON.ArcRotateCamera).alpha += Math.PI;
    
            scene.meshes.forEach((m) => {
                if (m.material && m.material.name !== "skyBox") {
                    // @ts-ignore
                    m.material.pluginManager.getPlugin("Colorify").isEnabled = true;
                }
            });
        });
    
        const startTime = new Date();
        engine.runRenderLoop(() => {
          const endTime = new Date();
          // @ts-ignore
          const timeElapsed = (endTime - startTime) / 1000.0; // in s
          // @ts-ignore
          ColorifyPluginMaterial2.color.r = (timeElapsed / 5.0) % 1;
        })
    
}