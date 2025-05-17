import { BABYLON } from "../../base/commonIncludes";


// 克隆 拷贝 实例化
export const cloneCopyInstanceScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景
    const scene = new BABYLON.Scene(engine);

    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);                                                                                
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    
    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;


    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    // demo4(scene);
    // demo5(engine, scene);
    // demo6(scene);
    // demo7(scene);
    demo8(scene);
    
    return scene;
}

// 改变几何体一起发生变化
const demo1 = (scene:BABYLON.Scene) => {

    // 创建一个盒子box
    const box = BABYLON.MeshBuilder.CreateBox("box", 
        {height: 1, width: 0.75, depth: 0.25, updatable: true}
    );
    // 克隆
    const box1 = box.clone("box2");
    // box1.makeGeometryUnique();
    // 修改位置
    box.position.x = -1;
    box1.position.x = 1;
    //获取盒子的顶点数据
    let positions = box.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    // 每一个值都乘以2，相当于放大2倍
    positions = positions!.map((v) => 2 * v);
    // 更新盒子， 克隆盒子也发生了改变
    box.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions)

}

//  改变transfrom  独立变化
const demo2 = (scene:BABYLON.Scene) => {

    // 创建一个盒子box
    const box = BABYLON.MeshBuilder.CreateBox("box", 
        {height: 1, width: 0.75, depth: 0.25, updatable: true}
    );
    // 克隆
    const box1 = box.clone("box2");
    // box1.makeGeometryUnique();
    // 修改位置
    box.position.x = -1;
    box1.position.x = 1;
    box1.scaling = new BABYLON.Vector3(2, 2, 2);

}



//  改变材质, 如果不重新创建材质，材质也是公用的
const demo3 = (scene:BABYLON.Scene) => {

    // 创建一个盒子box
    const box = BABYLON.MeshBuilder.CreateBox("box", 
        {height: 1, width: 0.75, depth: 0.25, updatable: true}
    );
    // 克隆
    const box1 = box.clone("box2");
    box.position.x = -1;
    let mat1 = box.material = new BABYLON.StandardMaterial("mat");
    mat1.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/grass.png");
    box1.position.x = 1;
    // 创建独立的材质
    let mat2 = box1.material = new BABYLON.StandardMaterial("mat1");
    mat2.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png");
    
}

// 实例化
const demo4 = (scene:BABYLON.Scene) => {
     
    // 创建一个球
     var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

     // 快照生成材质
     BABYLON.NodeMaterial.ParseFromSnippetAsync("DGN9E2#1").then((material) => {
         sphere.material = material;
     });
 
     // 实例化的个数
     var nInstances = 100;
     var range = 50;
     const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
     camera.radius = range;
 
     for (let i = 0; i < nInstances; i++) {
         // 创建球的实例
         var inst = sphere.createInstance("s" + i);
         // 避免视锥体裁剪
         inst.alwaysSelectAsActiveMesh = true;
 
         // 设置随机的位置
         inst.position.x = (Math.random()-0.5)*range;
         inst.position.y = (Math.random()-0.5)*range;
         inst.position.z = (Math.random()-0.5)*range;
     }
}

// 自定义buffer
const demo5 = (engine:BABYLON.Engine, scene:BABYLON.Scene) => {
    // 创建box
    var box = BABYLON.MeshBuilder.CreateBox("root", {size: 2});
    // 避免被视锥裁剪
    box.alwaysSelectAsActiveMesh = true;

    // 实例化个数
    let instanceCount = 1000;
    // 构建颜色buffer的大小
    let colorData = new Float32Array(4 * instanceCount);

    // 添加随机颜色值
    for (var index = 0; index < instanceCount; index++) {
        colorData[index * 4] = Math.random();
        colorData[index * 4 + 1] = Math.random();
        colorData[index * 4 + 2] = Math.random();
        colorData[index * 4 + 3] = 1.0;
    }

    // 创建顶点buffer
    /**
     * Constructor
     * @param engine the engine
     * @param data the data to use for this vertex buffer
     * @param kind the vertex buffer kind
     * @param updatable whether the data is updatable
     * @param postponeInternalCreation whether to postpone creating the internal WebGL buffer (optional)
     * @param stride the stride (optional)
     * @param instanced whether the buffer is instanced (optional)
     * @param offset the offset of the data (optional)
     * @param size the number of components (optional)
     * @param type the type of the component (optional)
     * @param normalized whether the data contains normalized data (optional)
     * @param useBytes set to true if stride and offset are in bytes (optional)
     * @param divisor defines the instance divisor to use (1 by default)
     * @param takeBufferOwnership defines if the buffer should be released when the vertex buffer is disposed
     */
    var buffer = new BABYLON.VertexBuffer(
        engine, 
        colorData, 
        BABYLON.VertexBuffer.ColorKind, 
        false, 
        false, 
        4, 
        true
    );
    // 设置buffer
    box.setVerticesBuffer(buffer);

    // 创建材质
    const mat = box.material = new BABYLON.StandardMaterial("material");
    // 不启用灯光
    mat.disableLighting = true;
    mat.emissiveColor = BABYLON.Color3.White();

    box.registerInstancedBuffer("color", 4);
    box.instancedBuffers.color = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1);


    let baseColors = [];
    let alphas:number[] = [];


    for (var index = 0; index < instanceCount - 1; index++) {
        // 创建实例化
        let instance = box.createInstance("box" + index);
        instance.position.x = 20 - Math.random() * 40;
        instance.position.y = 20 - Math.random() * 40;
        instance.position.z = 20 - Math.random() * 40;
        // 总是渲染
        instance.alwaysSelectAsActiveMesh = true;

        alphas.push(Math.random());
        baseColors.push(new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1));
        instance.instancedBuffers.color = baseColors[baseColors.length - 1].clone();

    }

    scene.registerBeforeRender(() => {
        for (var instanceIndex = 0; instanceIndex < box.instances.length; instanceIndex++) {
            let alpha = alphas[instanceIndex];
            let cos = Math.abs(Math.cos(alpha));
            alpha += 0.01;

            alphas[instanceIndex] = alpha;

            var instance = box.instances[instanceIndex];
            // 颜色乘以 cos, 结果赋值给实例
            baseColors[instanceIndex].scaleToRef(cos, instance.instancedBuffers.color);
        }
    });

    // 停止活动网格的计算
    scene.freezeActiveMeshes();
}



// 更新实例化矩阵buffer
const demo6= (scene:BABYLON.Scene) => {


    interface animationDataType {
         t:number
         factor:number 
         speed:number 
         xFactor:number 
         yFactor:number
         zFactor:number
         mx:number,
         my:number,
         mat:BABYLON.Matrix
         quat:BABYLON.Quaternion 
    }
    
    
    var mouseX:number;
    var mouseY:number;

    // 实例化的总数
    var particleNb = 20000;

    // 创建 多面体
    var poly = BABYLON.MeshBuilder.CreatePolyhedron('p', {type: 2, size: 1.0}, scene)
    // 不可见，不渲染
    poly.isVisible = false;
    // 设置为手动更新实例化的世界矩阵
    poly.manualUpdateOfWorldMatrixInstancedBuffer = true;

    var particles:BABYLON.InstancedMesh[] = [];                 // instances array
    var logicalParticles:animationDataType[] = [];          // instance data array
    for (var i = 0; i < particleNb; i++) {
        // 创建实例化
        var particle = poly.createInstance("i" + i);
        // 提升性能，关闭拾取
        particle.isPickable = false;
        // 保存实例化的对象
        particles.push(particle);
        // 生成运动相关的数据
        var t = Math.random() * 100.0;
        var factor = 20.0 + Math.random() * 100.0;
        var speed = 0.01 + Math.random() / 200.0;
        var xFactor = -50.0 + Math.random() * 100.0;
        var yFactor = -50.0 + Math.random() * 100.0;
        var zFactor = -50.0 + Math.random() * 100.0;
        var data = {t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, mat: new BABYLON.Matrix(), quat: new BABYLON.Quaternion()}
        logicalParticles.push(data);
    }

    var updateParticles = function() {
        var offset = 0;
        // 获取实例化矩阵世界矩阵的数据
        let instancedBuffer = poly.worldMatrixInstancedBuffer;
        
        if (!instancedBuffer) {
            return;
        }
        logicalParticles.forEach((particle, i) => {
            // logical particle
            let { t, factor, speed, xFactor, yFactor, zFactor, mat, quat } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            // 鼠标参与粒子的位移计算
            particle.mx += (mouseX - particle.mx) * 0.01
            particle.my += (mouseY * -1 - particle.my) * 0.01

            // instance
            var p = particles[i];
            var pos = p.position;
            pos.x = (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10;
            pos.y = (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10;
            pos.z = (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10;
            var scl = p.scaling;
            scl.x = scl.y = scl.z = Math.abs(s);
            var r = s * 5.0;
            // 根据旋转数据生成四元素
            BABYLON.Quaternion.RotationYawPitchRollToRef(r, r, r, quat);
            // 将缩放，旋转， 位移数据，计算到矩阵中
            BABYLON.Matrix.ComposeToRef(scl, quat, pos, mat);

            // 设置新的世界矩阵数据
            instancedBuffer.set(mat.m, offset);
            // 调整偏移量
            offset += 16;
        });
    }
    // const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    // var updateCamera = function() {
    //     camera.position.z = 50 + Math.sin(scene.deltaTime) * 30.0;
    // }

    scene.freezeActiveMeshes(true);

    scene.registerBeforeRender(function() {
        // 计算鼠标的位置
        mouseX = scene.pointerX - window.innerWidth * 0.5;
        mouseY = scene.pointerY - window.innerHeight * 0.5;
        updateParticles();
    })
}

// 实例化与LOD
const demo7 = (scene:BABYLON.Scene) => {

    var _addInstance = function (m:BABYLON.Mesh,n:string,x?:number,y?:number,z?:number){
        var i= m.createInstance(n);
        i.position.x = x||0;
        i.position.y = y||0;
        i.position.z = z||0;
        return i;
     }


    var plane = BABYLON.MeshBuilder.CreatePlane('impostor',{size:2},scene);
    // 创建标准材质
    var material = new BABYLON.StandardMaterial('',scene);
    material.diffuseColor = BABYLON.Color3.Red();
    // 关闭背面裁剪
    material.backFaceCulling = false;
    plane.material = material;

    // 创建球
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 1.;

    plane.setEnabled(false);
    sphere.setEnabled(false);
    console.log(plane.setEnabled)

     // 设置LOD
     /**
     * Add a mesh as LOD level triggered at the given distance.
     * @see https://doc.babylonjs.com/features/featuresDeepDive/mesh/LOD
     * @param distanceOrScreenCoverage Either distance from the center of the object to show this level or the screen coverage if `useScreenCoverage` is set to `true`.
     * If screen coverage, value is a fraction of the screen's total surface, between 0 and 1.
     * Example Playground for distance https://playground.babylonjs.com/#QE7KM#197
     * Example Playground for screen coverage https://playground.babylonjs.com/#QE7KM#196
     * @param mesh The mesh to be added as LOD level (can be null)
     * @returns This mesh (for chaining)
     */
     sphere.addLODLevel(30,plane);

    _addInstance(sphere,'root')
    _addInstance(sphere,'0',20,1)
    _addInstance(sphere,'1',-20,1)
    _addInstance(sphere,'2',0,1,20)
    _addInstance(sphere,'3',0,1,-20)
    
}

// 使用Thin Instances
const demo8 = (scene:BABYLON.Scene) => {

    var box = BABYLON.MeshBuilder.CreateBox("root", {size: 1});

    var numPerSide = 40, size = 100, ofst = size / (numPerSide - 1);

    var m = BABYLON.Matrix.Identity();
    var col = 0, index = 0;

    let instanceCount = numPerSide * numPerSide * numPerSide;

    let matricesData = new Float32Array(16 * instanceCount);
    let colorData = new Float32Array(4 * instanceCount);

    for (var x = 0; x < numPerSide; x++) {
        // 设置位置 x
        // @ts-ignore
        m.m[12] = -size / 2 + ofst * x;
        for (var y = 0; y < numPerSide; y++) {
            // 设置位置 y
            // @ts-ignore
            m.m[13] = -size / 2 + ofst * y;
            for (var z = 0; z < numPerSide; z++) {
                // 设置位置 z
                // @ts-ignore
                m.m[14] = -size / 2 + ofst * z;

                m.copyToArray(matricesData, index * 16);

                var coli = Math.floor(col);

                // 这只颜色
                colorData[index * 4 + 0] = ((coli & 0xff0000) >> 16) / 255;
                colorData[index * 4 + 1] = ((coli & 0x00ff00) >>  8) / 255;
                colorData[index * 4 + 2] = ((coli & 0x0000ff) >>  0) / 255;
                colorData[index * 4 + 3] = 1.0;

                index++;
                col += 0xffffff / instanceCount;
            }
        }
    }

    // 设置矩阵数据
    /**
     * Sets a buffer to be used with thin instances. This method is a faster way to setup multiple instances than calling thinInstanceAdd repeatedly
     * @param kind name of the attribute. Use "matrix" to setup the buffer of matrices
     * @param buffer buffer to set
     * @param stride size in floats of each value of the buffer
     * @param staticBuffer indicates that the buffer is static, so that you won't change it after it is set (better performances - true by default)
     */
    box.thinInstanceSetBuffer("matrix", matricesData, 16);
    box.thinInstanceSetBuffer("color", colorData, 4);

    const mat = box.material = new BABYLON.StandardMaterial("material");
    mat.disableLighting = true;
    mat.emissiveColor = BABYLON.Color3.White();

}