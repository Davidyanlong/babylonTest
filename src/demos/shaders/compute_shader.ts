import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const computeShaderScene = function (engine: BABYLON.WebGPUEngine,canvas: HTMLCanvasElement) {
    
    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 设置灯光强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    // 设置位置
    sphere.position.y = 1;

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    
    // 检查是否支持WebGPU 
    if (!checkComputeShadersSupported(engine, scene)) {
        return scene;
    }
    // -------- COMPUTE 1 -------------------------
    // 创建compute shader
    const cs1 = new BABYLON.ComputeShader("myCompute", engine, { 
        computeSource: copyTextureComputeShader 
    }, { bindingsMapping:
        {
            "dest": { group: 0, binding: 0 },
            "src": { group: 0, binding: 2 }
        }
    });

    const src = new BABYLON.Texture("https://playground.babylonjs.com/textures/ground.jpg", scene);
    // Creates a RGBA storage texture from some data.
    // 创建一个storage Texture
    const dest = BABYLON.RawTexture.CreateRGBAStorageTexture(null, 512, 512, scene, false, false);

    // 设置数据
    cs1.setTexture("src", src);
    cs1.setStorageTexture("dest", dest);

    // 异步执行
    cs1.dispatchWhenReady(dest.getSize().width, dest.getSize().height, 1).then(() => {
        // 读取执行的结果
        dest.readPixels()!.then((data) => {
            //console.log(data);
        });
    });

    // 创建标准材质
    const mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = dest;

    // 应用材质
    ground.material = mat;

    // -------- COMPUTE 2 -------------------------
    // 创建compute shader 利用输入的颜色值，生成一个texture
    const cs2 = new BABYLON.ComputeShader("myCompute2", engine, 
        { computeSource: clearTextureComputeShader }, 
        { bindingsMapping:
        {
            "tbuf": { group: 0, binding: 0 },
            "params": { group: 0, binding: 1 }
        }
    });

    // 创建 storage Texture
    const dest2 = BABYLON.RawTexture.CreateRGBAStorageTexture(null, 512, 512, scene, false, false);

    // 创建uniformBuffer
    const uBuffer = new BABYLON.UniformBuffer(engine);

    // 传递数据
    uBuffer.updateColor4("color", new BABYLON.Color3(1, 0.6, 0.8), 1);
    // 更新数据
    uBuffer.update();

    // 设置数据
    cs2.setStorageTexture("tbuf", dest2);
    cs2.setUniformBuffer("params", uBuffer);

    // 异步执行
    cs2.dispatchWhenReady(dest2.getSize().width, dest2.getSize().height, 1);

    // 创建标准材质
    const mat2 = new BABYLON.StandardMaterial("mat2", scene);
    // 应用计算结果
    mat2.diffuseTexture = dest2;

    // 应用材质
    sphere.material = mat2;

    // -------- COMPUTE 3 -------------------------
    // 创建计算着色器 compute shader 矩阵计算
    const cs3 = new BABYLON.ComputeShader("myCompute3", engine, {
         computeSource: matrixMulComputeShader }, 
         { bindingsMapping:
        {
            "firstMatrix": { group: 0, binding: 0 },
            "secondMatrix": { group: 0, binding: 1 },
            "resultMatrix": { group: 0, binding: 2 }
        }
    });

    // 创建数据
    const firstMatrix = new Float32Array([
        2 /* rows */, 4 /* columns */,
        1, 2, 3, 4,
        5, 6, 7, 8
    ]);

    // 创建 storage Buffer
    const bufferFirstMatrix = new BABYLON.StorageBuffer(engine, firstMatrix.byteLength);
    // 更新数据
    bufferFirstMatrix.update(firstMatrix);

    // 创建数据
    const secondMatrix = new Float32Array([
        4 /* rows */, 2 /* columns */,
        1, 2,
        3, 4,
        5, 6,
        7, 8
    ]);

    // 创建 storage buffer
    const bufferSecondMatrix = new BABYLON.StorageBuffer(engine, secondMatrix.byteLength);
    // 更新buffer
    bufferSecondMatrix.update(secondMatrix);

    // 创建 storage buffer 
    const bufferResultMatrix = new BABYLON.StorageBuffer(engine, Float32Array.BYTES_PER_ELEMENT * (2 + firstMatrix[0] * secondMatrix[1]));

    // 设置数据
    cs3.setStorageBuffer("firstMatrix", bufferFirstMatrix);
    cs3.setStorageBuffer("secondMatrix", bufferSecondMatrix);
    cs3.setStorageBuffer("resultMatrix", bufferResultMatrix);

    // 异步执行
    cs3.dispatchWhenReady(firstMatrix[0], secondMatrix[1]).then(() => {
        bufferResultMatrix.read().then((res) => {
            // we know the result buffer contains floats
            const resFloats = new Float32Array(res.buffer);
            console.log(resFloats);
        });
    });

    return scene;
}


function checkComputeShadersSupported(engine:BABYLON.WebGPUEngine, scene:BABYLON.Scene) {
    
    // 返回结果
    const supportCS = engine.getCaps().supportComputeShaders;
    console.log('supportCS', supportCS,engine.getCaps())
    if (supportCS) {
        return true;
    }

    var panel = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    
    // 不支持输出提示信息， 通过GUI输出
    const textNOk = "**Use WebGPU to watch this demo which requires compute shaders support. To enable WebGPU please use Edge Canary or Chrome canary. Also, select the WebGPU engine from the top right drop down menu.**";

    var info = new GUI.TextBlock();
    info.text = textNOk;
    info.width = "100%";
    info.paddingLeft = "5px";
    info.paddingRight = "5px";
    info.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    info.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    info.color = supportCS ? "green" : "red";
    info.fontSize = supportCS ? "18px" : "24px";
    info.fontStyle = supportCS ? "" : "bold";
    info.textWrapping = true;
    panel.addControl(info); 

    return false;
}

const clearTextureComputeShader = `
    @group(0) @binding(0) var tbuf : texture_storage_2d<rgba8unorm,write>;

    struct Params {
        color : vec4<f32>
    };
    @group(0) @binding(1) var<uniform> params : Params;

    @compute @workgroup_size(1, 1, 1)
    fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
        // 直接颜色写入
        textureStore(tbuf, vec2<i32>(global_id.xy), params.color);
    }
`;

const copyTextureComputeShader = `
    @group(0) @binding(0) var dest : texture_storage_2d<rgba8unorm,write>;
    @group(0) @binding(1) var samplerSrc : sampler;
    @group(0) @binding(2) var src : texture_2d<f32>;

    @compute @workgroup_size(1, 1, 1)
    fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
        let dims : vec2<f32> = vec2<f32>(textureDimensions(src, 0));
        // 采样纹理的数据
        let pix : vec4<f32> = textureSampleLevel(src, samplerSrc, vec2<f32>(global_id.xy) / dims, 0.0);
        // 写入采样的纹理,保留蓝色通道的颜色
        textureStore(dest, vec2<i32>(global_id.xy), pix * vec4f(0,0,1,1));
    }
`;

const matrixMulComputeShader = `
    struct Matrix {
      size : vec2<f32>,
      numbers: array<f32>,
    };

    @group(0) @binding(0) var<storage,read_write> firstMatrix : Matrix;
    @group(0) @binding(1) var<storage,read_write> secondMatrix : Matrix;
    @group(0) @binding(2) var<storage,read_write> resultMatrix : Matrix;

    @compute @workgroup_size(1, 1, 1)
    fn main(@builtin(global_invocation_id) global_id : vec3<u32>) {
      resultMatrix.size = vec2<f32>(firstMatrix.size.x, secondMatrix.size.y);

      let resultCell : vec2<u32> = vec2<u32>(global_id.x, global_id.y);
      var result : f32 = 0.0;
      for (var i : u32 = 0u; i < u32(firstMatrix.size.y); i = i + 1u) {
        let a : u32 = i + resultCell.x * u32(firstMatrix.size.y);
        let b : u32 = resultCell.y + i * u32(secondMatrix.size.y);
        result = result + firstMatrix.numbers[a] * secondMatrix.numbers[b];
      }

      let index : u32 = resultCell.y + resultCell.x * u32(secondMatrix.size.y);
      resultMatrix.numbers[index] = result;
    }
`;
