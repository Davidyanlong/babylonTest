import { BABYLON, GUI, dat } from "../../base/commonIncludes";

// 场景基本的构建方法
export const computeShaderBlurScene = function (engine: BABYLON.WebGPUEngine,canvas: HTMLCanvasElement) {
    
    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    
    // 检查是否支持WebGPU 
    if (!checkComputeShadersSupported(engine, scene)) {
        return scene;
    }


    const src = new BABYLON.Texture("https://playground.babylonjs.com/textures/skybox3_nx.jpg", scene, true);
    //  纹理加载完成后调用
    src.onLoadObservable.add(() => {
        const settings = {
            filterSize: 15,
            iterations: 1,
        };

        // 创建GUI
        const gui = getGUI();

        // 更新计算模糊
        const updateSettings = () => {
            blurCompute.apply(settings.filterSize, settings.iterations);
        };

        gui.add(settings, 'filterSize', 1, 33).step(2).onChange(updateSettings);
        gui.add(settings, 'iterations', 1, 10).step(1).onChange(updateSettings);

        const blurCompute = new BlurComputeShaders(src);

        // 创建标准材质
        const mat = new BABYLON.StandardMaterial("mat", scene);
        // 设置材质的自发光贴图
        mat.emissiveTexture = blurCompute.destTexture;
        // 不感光
        mat.disableLighting = true;

        // 应用材质
        ground.material = mat;
        // 执行一次
        updateSettings();
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


function getGUI() {
    var oldgui = document.getElementById("datGUI");
    if (oldgui != null) {
        oldgui.remove();
    }

    var gui = new dat.GUI();
    gui.domElement.style.marginTop = "100px";
    gui.domElement.id = "datGUI";

    return gui;
}


class BlurComputeShaders {
    src: BABYLON.Texture;
    engine: BABYLON.AbstractEngine;
    tempTexture: BABYLON.RawTexture;
    destTexture: BABYLON.RawTexture;
    buffParams: BABYLON.UniformBuffer;
    buffFlip0: BABYLON.UniformBuffer;
    buffFlip1: BABYLON.UniformBuffer;
    filterSize: number;
    numIterations: number;
    cs1: BABYLON.ComputeShader;
    cs2: BABYLON.ComputeShader;
    csIterations: BABYLON.ComputeShader[];
    constructor(src:BABYLON.Texture) {
        const srcWidth = src.getSize().width, srcHeight = src.getSize().height;
        const scene = src.getScene()!;
        
        this.src = src;
        this.engine = scene.getEngine();

        this.tempTexture = BABYLON.RawTexture.CreateRGBAStorageTexture(null, srcWidth, srcHeight, scene, false, false);
        this.destTexture = BABYLON.RawTexture.CreateRGBAStorageTexture(null, srcWidth, srcHeight, scene, false, false);

        this.buffParams = new BABYLON.UniformBuffer(this.engine, undefined, undefined, "buffParams");
        this.buffFlip0 = new BABYLON.UniformBuffer(this.engine, undefined, undefined, "buffFlip0");
        this.buffFlip1 = new BABYLON.UniformBuffer(this.engine, undefined, undefined, "buffFlip1");

        this.buffParams.addUniform("filterDim", 1);
        this.buffParams.addUniform("blockDim", 1);
        
        this.buffFlip0.updateInt("value", 0);
        this.buffFlip0.update();

        this.buffFlip1.updateInt("value", 1);
        this.buffFlip1.update();

        this.filterSize = 0;
        this.numIterations = -1;
    }

    apply(filterSize:number, numIterations:number) {
        if (this.numIterations !== numIterations) {
            const options = {
                bindingsMapping: {
                    "params": { group: 0, binding: 0 },
                    "inputText": { group: 0, binding: 2 },
                    "outputTex": { group: 0, binding: 3 },
                    "flip": { group: 0, binding: 4 },
                }
            };

            this.cs1 = new BABYLON.ComputeShader("compute1", this.engine, { computeSource: blurComputeShader }, options);

            this.cs1.setUniformBuffer("params", this.buffParams);
            this.cs1.setTexture("inputText", this.src);
            this.cs1.setStorageTexture("outputTex", this.tempTexture);
            this.cs1.setUniformBuffer("flip", this.buffFlip0);

            this.cs2 = new BABYLON.ComputeShader("compute2", this.engine, { computeSource: blurComputeShader }, options);

            this.cs2.setUniformBuffer("params", this.buffParams);
            this.cs2.setTexture("inputText", this.tempTexture);
            this.cs2.setStorageTexture("outputTex", this.destTexture);
            this.cs2.setUniformBuffer("flip", this.buffFlip1);

            this.csIterations = [];
            for (let i = 0; i < numIterations - 1; ++i) {
                let cs = new BABYLON.ComputeShader("compute" + (i*2 + 3), this.engine, { computeSource: blurComputeShader }, options);

                cs.setUniformBuffer("params", this.buffParams);
                cs.setTexture("inputText", this.destTexture);
                cs.setStorageTexture("outputTex", this.tempTexture);
                cs.setUniformBuffer("flip", this.buffFlip0);

                this.csIterations.push(cs);

                cs = new BABYLON.ComputeShader("compute" + (i*2 + 4), this.engine, { computeSource: blurComputeShader }, options);

                cs.setUniformBuffer("params", this.buffParams);
                cs.setTexture("inputText", this.tempTexture);
                cs.setStorageTexture("outputTex", this.destTexture);
                cs.setUniformBuffer("flip", this.buffFlip1);

                this.csIterations.push(cs);
            }
        }

        let blockDim = tileDim - (filterSize - 1);

        this.buffParams.updateInt("filterDim", filterSize);
        this.buffParams.updateInt("blockDim", blockDim);
        this.buffParams.update();

        this.filterSize = filterSize;
        this.numIterations = numIterations;

        const srcWidth = this.src.getSize().width, srcHeight = this.src.getSize().height;

        this.cs1.dispatchWhenReady(Math.ceil(srcWidth / blockDim), Math.ceil(srcHeight / batch[1])).then(() => {
            this.cs2.dispatch(Math.ceil(srcHeight / blockDim), Math.ceil(srcWidth / batch[1]));
            let d0 = srcWidth, d1 = srcHeight;
            for (let i = 0; i < numIterations - 1; ++i) {
                this.csIterations[i].dispatch(Math.ceil(d0 / blockDim), Math.ceil(d1 / batch[1]));
                const d = d0;
                d0 = d1;
                d1 = d;
            }
        });
    }
}

const tileDim = 128;
const batch = [4, 4];

const blurComputeShader = `
  struct Params {
    filterDim : i32,
    blockDim : u32,
  };

  @group(0) @binding(0) var<uniform> params : Params;
  @group(0) @binding(1) var samp : sampler;
  @group(0) @binding(2) var inputTex : texture_2d<f32>;
  @group(0) @binding(3) var outputTex : texture_storage_2d<rgba8unorm,write>;

  struct Flip {
    value : u32,
  };
  @group(0) @binding(4) var<uniform> flip : Flip;

  // This shader blurs the input texture in one direction, depending on whether
  // |flip.value| is 0 or 1.
  // It does so by running ${tileDim / batch[0]} threads per workgroup to load ${tileDim}
  // texels into ${batch[1]} rows of shared memory. Each thread loads a
  // ${batch[0]} x ${batch[1]} block of texels to take advantage of the texture sampling
  // hardware.
  // Then, each thread computes the blur result by averaging the adjacent texel values
  // in shared memory.
  // Because we're operating on a subset of the texture, we cannot compute all of the
  // results since not all of the neighbors are available in shared memory.
  // Specifically, with ${tileDim} x ${tileDim} tiles, we can only compute and write out
  // square blocks of size ${tileDim} - (filterSize - 1). We compute the number of blocks
  // needed and dispatch that amount.

  var<workgroup> tile : array<array<vec3<f32>, ${tileDim}>, ${batch[1]}>;
  
  @compute @workgroup_size(${tileDim / batch[0]}, 1, 1)
  fn main(
    @builtin(workgroup_id) WorkGroupID : vec3<u32>,
    @builtin(local_invocation_id) LocalInvocationID : vec3<u32>
  ) {
    let filterOffset = (params.filterDim - 1) / 2;
    let dims = vec2<i32>(textureDimensions(inputTex, 0));
    let baseIndex = vec2<i32>(WorkGroupID.xy * vec2(params.blockDim, ${batch[1]}) +
                              LocalInvocationID.xy * vec2(${batch[0]}, 1))
                    - vec2(filterOffset, 0);
  
    for (var r = 0; r < ${batch[1]}; r++) {
      for (var c = 0; c < ${batch[0]}; c++) {
        var loadIndex = baseIndex + vec2(c, r);
        if (flip.value != 0u) {
          loadIndex = loadIndex.yx;
        }
  
        tile[r][${batch[0]} * LocalInvocationID.x + u32(c)] = textureSampleLevel(
          inputTex,
          samp,
          (vec2<f32>(loadIndex) + vec2<f32>(0.25, 0.25)) / vec2<f32>(dims),
          0.0
        ).rgb;
      }
    }
  
    workgroupBarrier();
  
    for (var r = 0; r < ${batch[1]}; r++) {
      for (var c = 0; c < ${batch[0]}; c++) {
        var writeIndex = baseIndex + vec2(c, r);
        if (flip.value != 0) {
          writeIndex = writeIndex.yx;
        }
  
        let center = i32(${batch[0]} * LocalInvocationID.x) + c;
        if (center >= filterOffset &&
            center < ${tileDim} - filterOffset &&
            all(writeIndex < dims)) {
          var acc = vec3(0.0, 0.0, 0.0);
          for (var f = 0; f < params.filterDim; f++) {
            var i = center + f - filterOffset;
            acc = acc + (1.0 / f32(params.filterDim)) * tile[r][i];
          }
          textureStore(outputTex, writeIndex, vec4(acc, 1.0));
        }
      }
    }
  }
`;
