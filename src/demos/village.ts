import { BABYLON, GUI } from "../base/commonIncludes";
// import { showAxis } from "../utils/axis";

// 场景基本的构建方法
export const villageDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  // 新建场景实例
  const scene = new BABYLON.Scene(engine);

  // 设置相机
  const camera = buildCamera('ArcRotateCamera', scene, canvas);
  // const camera = buildCamera('FollowCamera', scene, canvas)
  // 设置灯光
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  light.intensity = 0.1;
  buildGUI(light);

  const  dirLight1 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
  dirLight1.position = new BABYLON.Vector3(0, 50, -100);

 // Shadow generator
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight1);
  // shadowGenerator.bias = 0.1;



  //   buildDwellings();

  // 异步导入glb 模型
  BABYLON.ImportMeshAsync(
    "https://assets.babylonjs.com/meshes/valleyvillage.glb",
    scene
  ).then(()=>{
    scene.getMeshByName("ground")!.receiveShadows = true;
  });



  buildManWalk(scene, shadowGenerator, camera);
  buildSkybox(scene);
  buildTree(scene);
  buildUFO(scene);
  buildLathe(scene);
  BuildStreetLight(scene);
  buildCar(scene);

  //showAxis(10, scene);

  return scene;

  // async function initAudio() {
  //     const audioEngine = await BABYLON.CreateAudioEngineAsync();
  //     await audioEngine.unlockAsync();

  //     // Audio engine is ready to play sounds ...

  //     BABYLON.CreateStreamingSoundAsync("backgroundMusic", "https://amf-ms.github.io/AudioAssets/cc-music/electronic/Soulsonic--No.mp3", { autoplay: true, loop: true }, audioEngine);

  //     // Play the sound every 3 seconds.
  //     const sound = await BABYLON.CreateSoundAsync("bounce", "sounds/bounce.wav");
  //     setInterval(() => { sound.play(); }, 3000);

  // }

  // initAudio();
};


const buildCamera = (type:string, scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{

  let camera:BABYLON.Camera;
  if(type==='ArcRotateCamera'){
    camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      150,
      new BABYLON.Vector3(0, 60, 0)
    );
    (camera as BABYLON.ArcRotateCamera).upperBetaLimit = Math.PI / 2.2;
    camera.attachControl(canvas, true);
  }
  else if(type==='FollowCamera'){
      
    // 创建跟随相机
     const _camera:BABYLON.FollowCamera =  camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(-6, 0, 0), scene);
        
      //相机到目标的距离或旋转半径
      _camera.radius = 1;
      
      // 相对高度
      _camera.heightOffset = 8;
      
      // 相对旋转
      _camera.rotationOffset = 0;
      
      // 移动加速度
      _camera.cameraAcceleration = 0.005
      
      // 最大加速度
      _camera.maxCameraSpeed = 10
      
      //camera.target is set after the target's creation
        
      // 绑定
        camera.attachControl(true);
  }
  else{
    throw new Error(`不存在你指定类型 ${type} 的相机`);
  }

  return camera;
 




 
}

// 白天夜晚组件
const buildGUI = (light: BABYLON.HemisphericLight)=>{

    // 创建动态GUI
    const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // 创建一个Panel
    const panel = new GUI.StackPanel();
    panel.width = "220px";
    // 默认右下角
    panel.top = "-25px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    adt.addControl(panel);

    // 创建文字
    const header = new GUI.TextBlock();
    header.text = "Night to Day";
    header.height = "30px";
    header.color = "white";
    panel.addControl(header); 

    // 创建滑动条
    const slider = new GUI.Slider();
    slider.minimum = 0;
    slider.maximum = 1;
    slider.borderColor = "black";
    slider.color = "gray";
    slider.background = "white";
    slider.value = light.intensity;
    slider.height = "20px";
    slider.width = "200px";
    // 滑动触发事件
    slider.onValueChangedObservable.add((value) => {
        if (light) {
            light.intensity = value;
        }
    });
    panel.addControl(slider);

}

const buildCar = (scene:BABYLON.Scene)=>{
  BABYLON.ImportMeshAsync(
    "https://assets.babylonjs.com/meshes/car.glb",
    scene
  ).then(() => {
    const car = scene.getMeshByName("car") as BABYLON.Mesh;
    car.rotation = new BABYLON.Vector3(Math.PI / 2, 0, -Math.PI / 2);
    car.position.y = 0.16;
    car.position.x = -3;
    car.position.z = 8;

    const animCar = new BABYLON.Animation(
      "carAnimation",
      "position.z",
      30,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const carKeys = [];

    carKeys.push({
      frame: 0,
      value: 8,
    });

    carKeys.push({
      frame: 150,
      value: -7,
    });

    carKeys.push({
      frame: 200,
      value: -7,
    });

    animCar.setKeys(carKeys);

    car.animations = [];
    car.animations.push(animCar);

    scene.beginAnimation(car, 0, 200, true);

    //wheel animation
    const wheelRB = scene.getMeshByName("wheelRB");
    const wheelRF = scene.getMeshByName("wheelRF");
    const wheelLB = scene.getMeshByName("wheelLB");
    const wheelLF = scene.getMeshByName("wheelLF");

    scene.beginAnimation(wheelRB, 0, 30, true);
    scene.beginAnimation(wheelRF, 0, 30, true);
    scene.beginAnimation(wheelLB, 0, 30, true);
    scene.beginAnimation(wheelLF, 0, 30, true);
  });
}

const BuildStreetLight = (scene: BABYLON.Scene) => {
  BABYLON.ImportMeshAsync(
    "https://assets.babylonjs.com/meshes/lamp.babylon",
    scene
  ).then(() => {
    // 定义聚光灯
    const lampLight = new BABYLON.SpotLight(
      "lampLight",
      BABYLON.Vector3.Zero(),
      new BABYLON.Vector3(0, -1, 0),
      0.8 * Math.PI,
      0.01,
      scene
    );
    // 聚光灯的颜色
    lampLight.diffuse = BABYLON.Color3.Yellow();
    // 聚光灯作为灯泡的子部件
    lampLight.parent = scene.getMeshByName("bulb");

    // 设置灯架
    const lamp = scene.getMeshByName("lamp") as BABYLON.Mesh;
    lamp.position = new BABYLON.Vector3(2, 0, 2);
    lamp.rotation = BABYLON.Vector3.Zero();
    lamp.rotation.y = -Math.PI / 4;

    // 克隆
    const lamp3 = lamp.clone("lamp3")  as BABYLON.Mesh;
    lamp3.position.z = -8;

    const lamp1 = lamp.clone("lamp1")  as BABYLON.Mesh;
    lamp1.position.x = -8;
    lamp1.position.z = 1.2;
    lamp1.rotation.y = Math.PI / 2;

    const lamp2 = lamp1.clone("lamp2")  as BABYLON.Mesh;
    lamp2.position.x = -2.7;
    lamp2.position.z = 0.8;
    lamp2.rotation.y = -Math.PI / 2;
  });
};

// 喷泉
const buildLathe = (scene: BABYLON.Scene) => {
  // 粒子状态
  let switched = false;
  const pointerDown = (mesh: BABYLON.Mesh) => {
    if (mesh === fountain) {
      switched = !switched;
      if (switched) {
        // Start the particle system
        particleSystem.start();
      } else {
        // Stop the particle system
        particleSystem.stop();
      }
    }
  };

  // 点击事件
  scene.onPointerObservable.add((pointerInfo) => {
    // console.log(pointerInfo)
    switch (pointerInfo.type) {
      // 鼠标按下
      case BABYLON.PointerEventTypes.POINTERDOWN:
        // 如果点击到物体
        if (pointerInfo?.pickInfo?.hit) {
          pointerDown(pointerInfo!.pickInfo!.pickedMesh as BABYLON.Mesh);
        }
        break;
    }
  });

  // 参数化图形作为底座
  const fountainProfile = [
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0.5, 0, 0),
    new BABYLON.Vector3(0.5, 0.2, 0),
    new BABYLON.Vector3(0.4, 0.2, 0),
    new BABYLON.Vector3(0.4, 0.05, 0),
    new BABYLON.Vector3(0.05, 0.1, 0),
    new BABYLON.Vector3(0.05, 0.8, 0),
    new BABYLON.Vector3(0.15, 0.9, 0),
  ];

  //  创建参数化图形
  const fountain = BABYLON.MeshBuilder.CreateLathe(
    "fountain",
    { shape: fountainProfile, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  fountain.position.x = -4;
  fountain.position.z = -6;

  //  创建粒子系统
  var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);

  // 粒子的纹理贴图
  particleSystem.particleTexture = new BABYLON.Texture(
    "https://playground.babylonjs.com/textures/flare.png",
    scene
  );

  // 粒子从哪里开始反射
  particleSystem.emitter = new BABYLON.Vector3(-4, 0.8, -6); // the starting object, the emitter
  // 发射面的范围
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.01, 0, -0.01); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.01, 0, 0.01); // To...

  // 粒子的颜色在两个颜色中随机插值
  particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
  particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
  // 粒子的死亡颜色
  particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

  // 随机粒子大小在这两个值之间
  particleSystem.minSize = 0.01;
  particleSystem.maxSize = 0.05;

  //随机粒子的生命周期
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // 每次粒子的发射率
  particleSystem.emitRate = 1500;

  // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

  // 粒子的重力加速度
  particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

  // 粒子的发射方向在这两个值直接插值
  particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
  particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);

  //  随机粒子的角速度插值
  particleSystem.minAngularSpeed = 0;
  particleSystem.maxAngularSpeed = Math.PI;

  // 粒子的随机速度
  particleSystem.minEmitPower = 0.2;
  particleSystem.maxEmitPower = 0.6;
  // 动画的速度
  particleSystem.updateSpeed = 0.01;
};

const buildUFO = (scene: BABYLON.Scene) => {
  // 精灵管理器
  const spriteManagerUFO = new BABYLON.SpriteManager(
    "UFOManager",
    "https://assets.babylonjs.com/environments/ufo.png",
    1,
    { width: 128, height: 76 },
    scene
  );
  // 创建精灵
  const ufo = new BABYLON.Sprite("ufo", spriteManagerUFO);
  // 精灵动画, 雪碧图动画
  ufo.playAnimation(0, 16, true, 125);
  ufo.position.y = 5;
  ufo.position.z = 0;
  ufo.width = 2;
  ufo.height = 1;
};

const buildTree = (scene: BABYLON.Scene) => {
  // 创建精灵管理
  const spriteManagerTrees = new BABYLON.SpriteManager(
    "treesManager",
    "https://playground.babylonjs.com/textures/palm.png",
    2000,
    { width: 512, height: 1024 },
    scene
  );

  //We create trees at random positions
  for (let i = 0; i < 500; i++) {
    // 创建精灵
    const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * -30;
    tree.position.z = Math.random() * 20 + 8;
    tree.position.y = 0.5;
  }

  for (let i = 0; i < 500; i++) {
    const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
    tree.position.x = Math.random() * 25 + 7;
    tree.position.z = Math.random() * -35 + 8;
    tree.position.y = 0.5;
  }
};

// 创建天空盒
const buildSkybox = (scene: BABYLON.Scene) => {
  // 创建天空,利用 box
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
  // 创建天空标准材质
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  // 关闭背面裁剪
  skyboxMaterial.backFaceCulling = false;
  // 加载天空cube贴图
  //appends "_px.jpg", "_nx.jpg", "_py.jpg", "_ny.jpg", "_pz.jpg", and "_nz.jpg" to load the +x, -x, +y, -y, +z, and -z facing sides of the cube.
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "https://playground.babylonjs.com/textures/skybox",
    scene
  );
  // 反射纹理模式设置为 天空盒模式, 纹理UV作为 xyz
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;

  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
};

// 人员行走动画
const buildManWalk = (scene: BABYLON.Scene, shadowGenerator:BABYLON.ShadowGenerator, camera:BABYLON.Camera) => {
  // 行走一段信息
  class Walk {
    constructor(public turn: number, public dist: number) {
      // 旋转方向, 角度
      this.turn = turn;
      // 行走距离
      this.dist = dist;
    }
  }

  // 行走的段
  const track: Walk[] = [];
  track.push(new Walk(86, 7));
  track.push(new Walk(-85, 14.8));
  track.push(new Walk(-93, 16.5));
  track.push(new Walk(48, 25.5));
  track.push(new Walk(-112, 30.5));
  track.push(new Walk(-72, 33.2));
  track.push(new Walk(42, 37.5));
  track.push(new Walk(-98, 45.2));
  track.push(new Walk(0, 47));

  // Dude
  BABYLON.ImportMeshAsync(
    "https://playground.babylonjs.com/scenes/Dude/Dude.babylon",
    scene
  ).then((result) => {
    const dude = result.meshes[0];
    dude.scaling = new BABYLON.Vector3(0.008, 0.008, 0.008);

    shadowGenerator.addShadowCaster(dude, true);

    if(camera instanceof BABYLON.ArcRotateCamera){
      camera.parent = dude;
    }else if(camera instanceof BABYLON.FollowCamera){
      camera.lockedTarget = dude;
    }
    else{
      // todo
    }
    

    dude.position = new BABYLON.Vector3(-6, 0, 0);
    // 初始化人物绕Y轴旋转-95度
    dude.rotate(
      BABYLON.Axis.Y,
      BABYLON.Tools.ToRadians(-95),
      BABYLON.Space.LOCAL
    );
    // 保存当前的旋转四元素
    const startRotation = dude.rotationQuaternion!.clone();

    // 开启人物行走骨骼动画
    scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);

    let distance = 0;
    let step = 0.005;
    let p = 0;

    // 每帧场景渲染前调用
    scene.onBeforeRenderObservable.add(() => {
      // 向前移动 setp距离
      dude.movePOV(0, 0, step);
      // 总的移动距离
      distance += step;
      // 代码 同 move_to_path 示例， 这里不做注释
      if (distance > track[p].dist) {
        dude.rotate(
          BABYLON.Axis.Y,
          BABYLON.Tools.ToRadians(track[p].turn),
          BABYLON.Space.LOCAL
        );
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new BABYLON.Vector3(-6, 0, 0);
          dude.rotationQuaternion = startRotation.clone();
        }
      }
    });
  });
};

// 构建乡村
const buildDwellings = () => {
  const ground = buildGround();

  const detached_house = buildHouse(1);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = buildHouse(2);
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  //each entry is an array [house type, rotation, x, z]
  const places = [];
  places.push([1, -Math.PI / 16, -6.8, 2.5]);
  places.push([2, -Math.PI / 16, -4.5, 3]);
  places.push([2, -Math.PI / 16, -1.5, 4]);
  places.push([2, -Math.PI / 3, 1.5, 6]);
  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
  places.push([1, (5 * Math.PI) / 4, 0, -1]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
  places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
  places.push([2, Math.PI / 1.9, 4.75, -1]);
  places.push([1, Math.PI / 1.95, 4.5, -3]);
  places.push([2, Math.PI / 1.9, 4.75, -5]);
  places.push([1, Math.PI / 1.9, 4.75, -7]);
  places.push([2, -Math.PI / 3, 5.25, 2]);
  places.push([1, -Math.PI / 3, 6, 4]);

  // 实例化的方式创建房屋
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    if (places[i][0] === 1) {
      houses[i] = detached_house.createInstance("house" + i);
    } else {
      houses[i] = semi_house.createInstance("house" + i);
    }
    // 实例化旋转数据
    houses[i].rotation.y = places[i][1];

    // 实例化位置数据
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};

const buildHouse = (width: number = 1) => {
  const box = buildBox(width);
  const roof = buildRoof(width);
  // 几何体合并, 单材质
  //  const house = BABYLON.Mesh.MergeMeshes([box, roof]);
  // 几何体合并, 多材质
  const house = BABYLON.Mesh.MergeMeshes(
    [box, roof],
    true,
    false,
    undefined,
    false,
    true
  ) as BABYLON.Mesh;

  return house;
};

const buildGround = () => {
  // 地面材质
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  // 漫反射颜色
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 15,
    height: 16,
  });
  ground.material = groundMat;
  return ground;
};

const buildBox = (width = 1) => {
  // 房体材质
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  if (width === 2) {
    boxMat.diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/semihouse.png"
    );
  } else {
    boxMat.diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/cubehouse.png"
    );
  }

  // 房体材质贴图
  // boxMat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png")

  // UV 坐标，为每一个面设置不同的UV
  //  (lower left x, lower left y, upper right x, upper right y)
  const faceUV = [];
  if (width === 2) {
    faceUV[0] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); //front face
    faceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  } else {
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //后面
    faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //前面
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); // 右面
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); // 左面
    // 顶面和地面都不需要设置
  }

  // 房体， 传入UV
  // faceUV的顺序 0 for back, 1 front, 2 right, 3 left, 4 top and 5 bottom.
  const box = BABYLON.MeshBuilder.CreateBox("box", {
    width,
    faceUV: faceUV,
    wrap: true,
  });

  // 房体材质
  box.material = boxMat;
  box.position.y = 0.5;
  return box;
};

const buildRoof = (width = 1) => {
  //房顶材质
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  // 房顶材质的纹理图
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg"
  );

  // 房顶材质
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3,
  });
  roof.material = roofMat;
  roof.scaling.x = 0.75;
  roof.scaling.y = width;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  return roof;
};

// 声音
// BABYLON.CreateStreamingSoundAsync("name", "<sound file URL>", { loop: true, autoplay: true }, audioEngine);

// BABYLON.Color3.Red();
// BABYLON.Color3.Green();
// BABYLON.Color3.Blue();
// BABYLON.Color3.Black();
// BABYLON.Color3.White();
// BABYLON.Color3.Purple();
// BABYLON.Color3.Magenta();
// BABYLON.Color3.Yellow();
// BABYLON.Color3.Gray();
// BABYLON.Color3.Teal();
