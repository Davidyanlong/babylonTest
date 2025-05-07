import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const detailMapScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 设置清屏色
    scene.clearColor = new BABYLON.Color4( .5, .5, .5, 1);

    // 创建一个轨道相机
	var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    // 设置相机的惯性 0.7
    camera.inertia = 0.7;

    // 设置相机的朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 绑定事件
    camera.attachControl(canvas, true);

    // 创建一个向下的直射光
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -1, 0), scene);

    // 创建一个点光源
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(-1, 5, 3), scene);

    // 创建第二个点光源
    var light3 = new BABYLON.PointLight("light3", new BABYLON.Vector3(3, 0, -5), scene);

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // 设置位置
    sphere.position.x = -1;
    sphere.position.y = 1;

    // 创建一个盒子
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2}, scene);

    // 设置位置
    box.position.x = 1.8;
    box.position.y = 1;
    box.position.z = -1.5;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    // 漫反射贴图
    const diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ParallaxDiffuse.png", scene);
    // 细节贴图， 小圆点
    const detailTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/detailmap.png", scene);;
    // 法线贴图
    const bumpTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/ParallaxNormal.png", scene);
    //const diffuseTexture = new BABYLON.Texture("temp/marble_albedo.png", scene);
    //const detailTexture = new BABYLON.Texture("temp/marble_detailmap.png", scene);;
    //const bumpTexture = new BABYLON.Texture("temp/marble_normal.png", scene);

    const setDetailTexture = (mat:BABYLON.StandardMaterial|BABYLON.PBRMaterial) => {
        mat.detailMap.isEnabled = true;
        mat.detailMap.texture = detailTexture;
        detailTexture.uScale =  10;
        detailTexture.vScale = 10;
    };

    // 创建一个标准材质
    var matStd = new BABYLON.StandardMaterial("mat", scene);

    // 设置漫反射忒图
    matStd.diffuseTexture = diffuseTexture;
    // 启用细节贴图
    matStd.detailMap.isEnabled = true;
    // 与漫反射贴图的混合系数
    matStd.detailMap.diffuseBlendLevel = 0.1;
    // 与法线的系数
    matStd.detailMap.bumpLevel = 1;
    // 设置bumpTexture
    matStd.bumpTexture = bumpTexture;
    // 设置bumpmap的强度
    matStd.bumpTexture.level = 1;
    // 与粗糙度的混合系数
    matStd.detailMap.roughnessBlendLevel = 0.25;

    // 设置重复
    setDetailTexture(matStd);

    // 创建一个PBR材质
    var matPBR = new BABYLON.PBRMaterial("matpbr", scene);

    // 设置金属度
    matPBR.metallic = 1.0;
    // 设置粗糙度
    matPBR.roughness = 0.5;
    // 设置漫反射贴图
    matPBR.albedoTexture = diffuseTexture;
    // 设置与漫反射的混合比
    matPBR.detailMap.diffuseBlendLevel = 0.1;
    // 设置bumpmap的强度
    matPBR.detailMap.bumpLevel = 1;
    // 设置bumpTexture
    matPBR.bumpTexture = bumpTexture;

    // 设置bump的强度
    matPBR.bumpTexture.level = 0.34;
    // 设置与粗糙度的混合比
    matPBR.detailMap.roughnessBlendLevel = 0.25;

    setDetailTexture(matPBR);
    // 是否启用PBR
    var usePBR = false;

    let mat:BABYLON.StandardMaterial|BABYLON.PBRMaterial = matStd;

    // 设置材质
    const setMaterial = () => {
        // 如果当前是PBR， 就使用PBR
        var matDst = usePBR ? matPBR : matStd;
        // 相仿操作
        var matSrc = usePBR ? matStd : matPBR;

        // 将源材质的属性 设置 到目标材质
        matDst.detailMap.texture = matSrc.detailMap.texture;
        matDst.bumpTexture = matSrc.bumpTexture;
        matDst.detailMap.normalBlendMethod = matSrc.detailMap.normalBlendMethod;
        matDst.detailMap.diffuseBlendLevel = matSrc.detailMap.diffuseBlendLevel;
        matDst.detailMap.bumpLevel = matSrc.detailMap.bumpLevel;
        matDst.detailMap.isEnabled = matSrc.detailMap.isEnabled;
        
        // 设置三维物体的材质为目标材质
        ground.material = matDst;
        sphere.material = matDst;
        box.material = matDst;

        // 是否使用多材质
        const pbrMult = usePBR ? 6 : 1;

        // 灯光的强度
        light.intensity = usePBR ? 1 : 0.2;
        light2.intensity = usePBR ? 20 : 0.6;
        light3.intensity = usePBR ? 20 : 0.6;

        // 当前的材质
        mat = usePBR ? matPBR : matStd;
        // window.mat=mat;
    }

    // 设置材质
    setMaterial();

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var selectBox = new GUI.SelectionPanel("sp");

    selectBox.width = 0.30;
    selectBox.height = 0.25;
    selectBox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    selectBox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    selectBox.color = "white";
    selectBox.headerColor = "white";

    advancedTexture.addControl(selectBox);

    var activationGroup = new GUI.CheckboxGroup("Activation");
     // 是否使用bump map
    const setActivationBumpMapping = (c:boolean) => {
        if (c) {
            mat.bumpTexture = bumpTexture;
        } else {
            mat.bumpTexture = null;
        }
    };

    // 是否使用细节贴图
    const setActivationDetailMapping = (c:boolean) => {
        setDetailTexture(mat);
        mat.detailMap.isEnabled = c;
    };

    // 是否使用PBR 材质
    const setActivationPBR = (c:boolean) => {
        usePBR = c;
        setMaterial();
    };

    // 设置多选框
    activationGroup.addCheckbox("Bump mapping", setActivationBumpMapping, 
        mat.bumpTexture !== null);
    activationGroup.addCheckbox("Detail mapping", setActivationDetailMapping, 
        mat.detailMap.isEnabled !== null);
    activationGroup.addCheckbox("PBR material", setActivationPBR, usePBR);

    selectBox.addGroup(activationGroup);

    var normalBlendMethodGroup = new GUI.RadioGroup("Normal blend method");
    
    const setNormalBlendMethod = (b:number) => {
        mat.detailMap.normalBlendMethod = b;
    };

    normalBlendMethodGroup.addRadio("Whiteout", setNormalBlendMethod, 
        mat.detailMap.normalBlendMethod === BABYLON.Material.MATERIAL_NORMALBLENDMETHOD_WHITEOUT);
    normalBlendMethodGroup.addRadio("Rotated Normal Mapping", setNormalBlendMethod, 
        mat.detailMap.normalBlendMethod === BABYLON.Material.MATERIAL_NORMALBLENDMETHOD_RNM);

    selectBox.addGroup(normalBlendMethodGroup);

    var selectBox2 = new GUI.SelectionPanel("sp2");

    selectBox2.width = 0.25;
    selectBox2.height = 0.25;
    selectBox2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    selectBox2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    selectBox2.color = "white";
    selectBox2.headerColor = "white";

    advancedTexture.addControl(selectBox2);

    var slidersGroup = new GUI.SliderGroup("Detail sliders");

    slidersGroup.addSlider("uvScale", (v) => mat.detailMap.texture && 
    ((mat.detailMap.texture as BABYLON.Texture).uScale = v, 
    (mat.detailMap.texture as BABYLON.Texture).vScale = v), "", 1, 20, 
    (mat.detailMap.texture as BABYLON.Texture).uScale, (v) => +v.toFixed(2)
);
    slidersGroup.addSlider("diffuse blending", 
        (v) => mat.detailMap.diffuseBlendLevel = v, "", 0, 1, 
        mat.detailMap.diffuseBlendLevel, (v) => +v.toFixed(2));
    slidersGroup.addSlider("bump level", 
        (v) => mat.detailMap.bumpLevel = v, "", 0, 1, mat.detailMap.bumpLevel, 
        (v) => +v.toFixed(2));
    slidersGroup.addSlider("roughness blending (PBR)", 
        (v) => mat.detailMap.roughnessBlendLevel = v, "", 0, 1, 
        mat.detailMap.roughnessBlendLevel, (v) => +v.toFixed(2));

    selectBox2.addGroup(slidersGroup);

    let t = 0;

    scene.onBeforeRenderObservable.add(() => {
        sphere.rotation.y = t * 0.5;
        box.rotation.y = t * 0.5;
        t += 0.01;
    });

    return scene;
}