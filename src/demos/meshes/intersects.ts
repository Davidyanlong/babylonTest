import { BABYLON, GUI } from "../../base/commonIncludes";


// 碰撞时间相关案例
export const intersectsMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {
   // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);
    // demo5(scene, canvas);
    // demo6(scene, canvas);
    // demo7(scene, canvas);
    // demo8(scene, canvas);
    demo9(engine, scene, canvas);


    return scene;
}

// 使用 intersectsMesh intersectsPoint 碰撞
const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
     // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 70, new BABYLON.Vector3(5, 0, 0), scene);
    camera.attachControl(canvas, true);

    // 创建标准材质
    var matPlan = new BABYLON.StandardMaterial("matPlan1", scene);
    matPlan.backFaceCulling = false;
    matPlan.emissiveColor = new BABYLON.Color3(0.2, 1, 0.2);

    var matBB = new BABYLON.StandardMaterial("matBB", scene);
    matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
    matBB.wireframe = true;

    // 创建相交的球体
    var pointToIntersect = new BABYLON.Vector3(-30, 0, 0);
    var origin = BABYLON.MeshBuilder.CreateSphere("origin", {segments:4, diameter:0.3}, scene);
    origin.position = pointToIntersect;
    origin.material = matPlan;

    // 创建一个相交的面
    var plan1 = BABYLON.MeshBuilder.CreatePlane("plane1", {size:20}, scene);
    plan1.position = new BABYLON.Vector3(13, 0, 0);
    // 绕x轴旋转45度
    plan1.rotation.x = -Math.PI / 4;
    plan1.material = matPlan;

    // 创建相机的面
    var plan2 = BABYLON.MeshBuilder.CreatePlane("plane2", {size:20}, scene);
    plan2.position = new BABYLON.Vector3(-13, 0, 0);
    // 绕x轴旋转45度
    plan2.rotation.x = -Math.PI / 4;
    plan2.material = matPlan;

    // AABB - Axis aligned bounding box
    // 创建AABB包围盒
    var planAABB = BABYLON.MeshBuilder.CreateBox("AABB", {size:20}, scene);
    planAABB.material = matBB;
    // 定义相同的位置
    planAABB.position = new BABYLON.Vector3(13, 0, 0);
    // 放大包围面
    planAABB.scaling = new BABYLON.Vector3(1, Math.cos(Math.PI / 4), Math.cos(Math.PI / 4));

    // OBB - Object boundind box
    // 创建OBB 包围盒
    var planOBB = BABYLON.MeshBuilder.CreateBox("OBB", {size:20}, scene);
    // 包围面
    planOBB.scaling = new BABYLON.Vector3(1, 1, 0.05);
    // 设为子集
    planOBB.parent = plan2;
    planOBB.material = matBB;

    // Balloons
    // 创建碰撞球
    var balloon1 = BABYLON.MeshBuilder.CreateSphere("balloon1", {segments:10, diameter:2.0}, scene);
    var balloon2 = BABYLON.MeshBuilder.CreateSphere("balloon2", {segments:10, diameter:2.0}, scene);
    var balloon3 = BABYLON.MeshBuilder.CreateSphere("balloon3", {segments:10, diameter:2.0}, scene);
    // 定义不同的材质
    balloon1.material = new BABYLON.StandardMaterial("matBallon", scene);
    balloon2.material = new BABYLON.StandardMaterial("matBallon", scene);
    balloon3.material = new BABYLON.StandardMaterial("matBallon", scene);

    balloon1.position = new BABYLON.Vector3(6, 5, 0);
    balloon2.position = new BABYLON.Vector3(-6, 5, 0);
    balloon3.position = new BABYLON.Vector3(-30, 5, 0);

    //Animation
    var alpha = Math.PI;
    scene.registerBeforeRender(function () {

        // 调用 intersectsMesh 不精确判断判断，根据AABB
        //Balloon 1 intersection -- Precise = false
        if (balloon1.intersectsMesh(plan1, false)) {
            (balloon1.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
             (balloon1.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 1);
        }

        // 调用 intersectsMesh 精确判断，根据OBB
        //Balloon 2 intersection -- Precise = true
        if (balloon2.intersectsMesh(plan2, true)) {
              (balloon2.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
             (balloon2.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 1);
        }

        // 调用 intersectsPoint 判断与某个点碰撞
        //balloon 3 intersection on single point
        if (balloon3.intersectsPoint(pointToIntersect)) {
            (balloon3.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 0, 0);
        } else {
              (balloon3.material as BABYLON.StandardMaterial).emissiveColor = new BABYLON.Color3(1, 1, 1);
        }

        alpha += 0.01;
        balloon1.position.y += Math.cos(alpha) / 10;
        balloon2.position.y =  balloon1.position.y 
        balloon3.position.y =  balloon1.position.y 
    });
}

// 使用射线
const demo2 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    
    // var ray = new BABYLON.Ray(origin, direction, length);
    // var hit = scene.pickWithRay(ray);

    // 创建灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    
    // 创建地面对象
    var ground = BABYLON.MeshBuilder.CreateGround("ground",
        {
            width: 500, 
            height: 500, 
            subdivisions: 10
        }, scene);

    // 创建一个红色盒子    
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 4.0}, scene);
    box.position.y = 2;
    box.scaling.z = 2;
    var matBox = new BABYLON.StandardMaterial("matBox", scene);
    matBox.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.1);
    box.material = matBox;
    // 设置不可拾取
    box.isPickable = false; 

    // 创建一个蓝色盒子 isPickable 默认是true
    var box2 = BABYLON.MeshBuilder.CreateBox("box2", {size: 8.0}, scene);
    box2.position = new BABYLON.Vector3(-20, 4, 0); 
    var matBox2 = new BABYLON.StandardMaterial("matBox2", scene);
    matBox2.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1);
    box2.material = matBox2;

    // 克隆一个盒子
    var box3 = box2.clone();
    box3.position.x -= 20;

    // 创建一个绿盒子
    var box4 = BABYLON.MeshBuilder.CreateBox("box4", {size: 8.0}, scene);
    box4.position = new BABYLON.Vector3(0, 4, 30); 
    var matBox4 = new BABYLON.StandardMaterial("matBox4", scene);
    matBox4.diffuseColor = new BABYLON.Color3(0.1, 1, 0.1);
    box4.material = matBox4;

   
    //鼠标移动调用函数
    function mousemovef(){
        // scene.pointerX, scene.pointerY 可以获取鼠标的位置, 屏幕坐标
        console.log(scene.pointerX, scene.pointerY)
	    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

	    if (pickResult.hit) {
            // 计算上一次和本次鼠标在XOZ平面的平移位置差， 通过 Math.atan2 计算偏移角度
		    var diffX = pickResult.pickedPoint!.x - box.position.x;
		    var diffY = pickResult.pickedPoint!.z - box.position.z;
		    box.rotation.y = Math.atan2(diffX,diffY);			          
    	}	
    }

    // 鼠标移动方法
    // onPointerMove 是提供的待实现的方法函数
    scene.onPointerMove = function () {
        mousemovef();
    };

    // 基于Mesh的局部空间进行变换
    function vecToLocal(vector:BABYLON.Vector3, mesh:BABYLON.Mesh){
        // 获取世界矩阵
        var m = mesh.getWorldMatrix();
        // 变换点
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    // 投掷射线
    function castRay(){   
        // 获取box 的位置    
        var origin = box.position;
	
        // 默认前方为 Z 轴正向
	    var forward = new BABYLON.Vector3(0,0,1);	
        // 计算box的前方	
	    forward = vecToLocal(forward, box);
	
        // 计算执行前方的向量
	    var direction = forward.subtract(origin);
        // 向量归一化
	    direction = BABYLON.Vector3.Normalize(direction);
	
        // 定义向量的长度
	    var length = 100;
	
        // 创建一条射线
        /**
         * Creates a new ray
         * @param origin origin point
         * @param direction direction
         * @param length length of the ray
         * @param epsilon The epsilon value to use when calculating the ray/triangle intersection (default: Epsilon from math constants)
         */
	    var ray = new BABYLON.Ray(origin, direction, length);

        // 创建射线的帮助组件
		let rayHelper = new BABYLON.RayHelper(ray);		
        // 显示射线
		rayHelper.show(scene);		

        // 射线去扫射整个场景
        var hit = scene.pickWithRay(ray);

        // 每当射线与box 相交， box 就会增高
        if (hit?.pickedMesh){
		   hit.pickedMesh.scaling.y += 0.01;
	    }
    }
 
    scene.registerBeforeRender(function () {
        castRay();
    });
}


// 使用射线 使用谓词函数
const demo3 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    
    // var ray = new BABYLON.Ray(origin, direction, length);
    // var hit = scene.pickWithRay(ray);

    // 创建灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    // 创建相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    
    // 创建地面对象
    var ground = BABYLON.MeshBuilder.CreateGround("ground",
        {
            width: 500, 
            height: 500, 
            subdivisions: 10
        }, scene);

    // 创建一个红色盒子    
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 4.0}, scene);
    box.position.y = 2;
    box.scaling.z = 2;
    var matBox = new BABYLON.StandardMaterial("matBox", scene);
    matBox.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.1);
    box.material = matBox;
    // 设置不可拾取
    box.isPickable = false; 

    // 创建一个蓝色盒子 isPickable 默认是true
    var box2 = BABYLON.MeshBuilder.CreateBox("box2", {size: 8.0}, scene);
    box2.position = new BABYLON.Vector3(-20, 4, 0); 
    var matBox2 = new BABYLON.StandardMaterial("matBox2", scene);
    matBox2.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1);
    box2.material = matBox2;

    // 克隆一个盒子
    var box3 = box2.clone("box3");
    box3.position.x -= 20;
     var matBox3 = new BABYLON.StandardMaterial("matBox2", scene);
    matBox3.diffuseColor = new BABYLON.Color3(1, 1, 1);
   box3.material = matBox3;

    // 创建一个绿盒子
    var box4 = BABYLON.MeshBuilder.CreateBox("box4", {size: 8.0}, scene);
    box4.position = new BABYLON.Vector3(0, 4, 30); 
    var matBox4 = new BABYLON.StandardMaterial("matBox4", scene);
    matBox4.diffuseColor = new BABYLON.Color3(0.1, 1, 0.1);
    box4.material = matBox4;

   
    //鼠标移动调用函数
    function mousemovef(){
        // scene.pointerX, scene.pointerY 可以获取鼠标的位置, 屏幕坐标
	    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

	    if (pickResult.hit) {
            // 计算上一次和本次鼠标在XOZ平面的平移位置差， 通过 Math.atan2 计算偏移角度
		    var diffX = pickResult.pickedPoint!.x - box.position.x;
		    var diffY = pickResult.pickedPoint!.z - box.position.z;
		    box.rotation.y = Math.atan2(diffX,diffY);			          
    	}	
    }

    // 鼠标移动方法
    // onPointerMove 是提供的待实现的方法函数
    scene.onPointerMove = function () {
        mousemovef();
    };

    // 基于Mesh的局部空间进行变换
    function vecToLocal(vector:BABYLON.Vector3, mesh:BABYLON.Mesh){
        // 获取世界矩阵
        var m = mesh.getWorldMatrix();
        // 变换点
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    // 谓词函数， 调用该函数返回 isPickable 的具体值
    function predicate(mesh:BABYLON.AbstractMesh){
        if (mesh == box3 || mesh == box){
            return false;
        }
        return true;
    }

    // 投掷射线
    function castRay(){   
        // 获取box 的位置    
        var origin = box.position;
	
        // 默认前方为 Z 轴正向
	    var forward = new BABYLON.Vector3(0,0,1);	
        // 计算box的前方	
	    forward = vecToLocal(forward, box);
	
        // 计算执行前方的向量
	    var direction = forward.subtract(origin);
        // 向量归一化
	    direction = BABYLON.Vector3.Normalize(direction);
	
        // 定义向量的长度
	    var length = 100;
	
        // 创建一条射线
        /**
         * Creates a new ray
         * @param origin origin point
         * @param direction direction
         * @param length length of the ray
         * @param epsilon The epsilon value to use when calculating the ray/triangle intersection (default: Epsilon from math constants)
         */
	    var ray = new BABYLON.Ray(origin, direction, length);

        // 射线去扫射整个场景
        var hit = scene.pickWithRay(ray, predicate);

        // 每当射线与box 相交， box 就会增高
        if (hit?.pickedMesh){
		   hit.pickedMesh.scaling.y += 0.01;
	    }
    }
 
    scene.registerBeforeRender(function () {
        castRay();
    });
}

// 使用射线， 使用三角性谓词函数， 计算每个三角形，返回isPickable 的值
const demo4 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
     
    // 设置清屏色
     scene.clearColor = new BABYLON.Color4( 0, 0, 0, 1);
  
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, -0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, -20));
    camera.attachControl(canvas, true);
  
    // 创建灯光
    var light = new BABYLON.PointLight("pl", BABYLON.Vector3.Zero(), scene);
  
    // 立方体面着色
    var faceColors = [];
    faceColors.push(new BABYLON.Color4(1,0,0,1));
    faceColors.push(new BABYLON.Color4(0,1,0,1));
    faceColors.push(new BABYLON.Color4(0,0,1,1));
    faceColors.push(new BABYLON.Color4(0,1,1,1));
    faceColors.push(new BABYLON.Color4(1,0,1,1));
    faceColors.push(new BABYLON.Color4(1,1,0,1));
  
    var options = {
      size: 10,
      faceColors : faceColors,
      sideOrientation: BABYLON.Mesh.BACKSIDE
    };
  
    //  创建一个box 作为房间
    var room = BABYLON.MeshBuilder.CreateBox('room', options, scene);
    // 设置可以拾取
    room.isPickable = true;
    // 创建box
    var box  = BABYLON.MeshBuilder.CreateBox('box ',{}, scene);
    const mat = box.material = new BABYLON.StandardMaterial('mat', scene);
    mat.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    // 设置可以拾取
    box.isPickable = true;
  
    // 鼠标按下事件
    var onPointerDown = function(e:BABYLON.PointerInfoPre){

        /** Launch a ray to try to pick a mesh in the scene
        * @param x position on screen
        * @param y position on screen
        * @param predicate Predicate function used to determine eligible meshes. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
        * @param fastCheck defines if the first intersection will be used (and not the closest)
        * @param camera to use for computing the picking ray. Can be set to null. In this case, the scene.activeCamera will be used
        * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
        * @returns a PickingInfo
        */
        var pick = scene.pick(
            scene.pointerX, scene.pointerY, undefined, false, null, 
            // 定义三角谓词
            // export type TrianglePickingPredicate = (p0: Vector3, p1: Vector3, p2: Vector3, ray: Ray, i0: number, i1: number, i2: number) => boolean;
            (p0, p1, p2, ray) => {
            // 计算三角形一条边的向量
            var p0p1 = p0.subtract(p1);
            // 计算另一条相邻的边的向量
            var p2p1 = p2.subtract(p1);
            //  计算三角形的朝向
            var normal = BABYLON.Vector3.Cross(p0p1, p2p1);
            // 返回朝向与相机射线的方向是否一致
            return (BABYLON.Vector3.Dot(ray.direction, normal) < 0);
          });

          if(pick.hit) {
            console.log(pick.pickedMesh!.name);
          }
    };
   
    // 鼠标按下事件
    scene.onPrePointerObservable.add(onPointerDown, BABYLON.PointerEventTypes.POINTERDOWN);
  
    scene.onDispose = function(){
        scene.onPrePointerObservable.removeCallback(onPointerDown);
    };
}

// 使用射线 multiPickWithRay 一次拾取多个对象
const demo5 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    
    // 创建灯光
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // 创建地面
    var ground = BABYLON.Mesh.CreateGround("ground", 500, 500, 10, scene);

    // 创建发射射线的物体
    var box = BABYLON.MeshBuilder.CreateBox("box", {size:4.0}, scene);
    box.position.y = 2;
    box.scaling.z = 2;
    var matBox = new BABYLON.StandardMaterial("matBox", scene);
    matBox.diffuseColor = new BABYLON.Color3(1.0, 0.1, 0.1);
    box.material = matBox;
    // 不可拾取
    box.isPickable = false; 

    // 创建拾取对象
    var box2 = BABYLON.Mesh.CreateBox("box2", 8.0, scene);
    box2.position = new BABYLON.Vector3(-20, 4, 0); 
    var matBox2 = new BABYLON.StandardMaterial("matBox2", scene);
    matBox2.diffuseColor = new BABYLON.Color3(0.1, 0.1, 1);
    box2.material = matBox2;

    // 克隆一个新的拾取对象
    var box3 = box2.clone();
    box3.position.x -= 20;

    // 创建一个拾取对象
    var box4 = BABYLON.MeshBuilder.CreateBox("box4", {size:8.0}, scene);
    box4.position = new BABYLON.Vector3(0, 4, 30); 
    var matBox4 = new BABYLON.StandardMaterial("matBox4", scene);
    matBox4.diffuseColor = new BABYLON.Color3(0.1, 1, 0.1);
    box4.material = matBox4;

   // 鼠标移动时触发
    function mousemovef(){
        // 射线拾取
	    var pickResult = scene.pick(scene.pointerX, scene.pointerY);

         // 判断是否拾取到物体
	    if (pickResult.hit) {
            // 根据拾取到的点计算 x, y 便宜
		    var diffX = pickResult.pickedPoint!.x - box.position.x;
		    var diffY = pickResult.pickedPoint!.z - box.position.z;
            // 计算盒子的旋转
		    box.rotation.y = Math.atan2(diffX,diffY);			          
    	}	
    }

    // 定义场景鼠标移动触发函数
    scene.onPointerMove = function () {
        mousemovef();
    };

    function vecToLocal(vector:BABYLON.Vector3, mesh:BABYLON.AbstractMesh){
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
		return v;		 
    }

    function castRay(){       
        var origin = box.position;
	
	    var forward = new BABYLON.Vector3(0,0,1);		
	    forward = vecToLocal(forward, box);
	
	    var direction = forward.subtract(origin);
	    direction = BABYLON.Vector3.Normalize(direction);
	
	    var length = 100;
        
        // 定义射线
	    var ray = new BABYLON.Ray(origin, direction, length);

        // 拾取场景中的对象，返回多个拾取的对象
          /**
         * Launch a ray to try to pick a mesh in the scene
         * @param ray Ray to use
         * @param predicate Predicate function used to determine eligible meshes and instances. Can be set to null. In this case, a mesh must be enabled, visible and with isPickable set to true. thinInstanceIndex is -1 when the mesh is non-instanced
         * @param trianglePredicate defines an optional predicate used to select faces when a mesh intersection is detected
         * @returns an array of PickingInfo
         */
        var hits = scene.multiPickWithRay(ray) as BABYLON.PickingInfo[];
      
        if (hits?.length){
            // https://doc.babylonjs.com/typedoc/classes/BABYLON.PickingInfo
           // 所有拾取到的对象都升高
		   for (var i=0; i<hits.length; i++){
               hits[i].pickedMesh!.scaling.y += 0.01;
           }
	    }
    }
 
    scene.registerBeforeRender(function () {
        castRay();
    });
}

// 使用射线函数 intersectsMesh
const demo6 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    
    // 创建相机
    let camera = new BABYLON.ArcRotateCamera("camera", 2.5, 1.0, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // 创建灯光
    let light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.25, -1, -0.5), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    const transformNode = new BABYLON.TransformNode('root', scene)
    transformNode.rotation.y = Math.PI/3;

    // 创建一个box
    let box = BABYLON.MeshBuilder.CreateBox("box", {size: 1.0}, scene);
    // box.rotation.y = Math.PI/4
    //  box.position.y = 0.25
    box.parent = transformNode   
    // 计算世界矩阵
    box.computeWorldMatrix();


    // 创建一个球
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.25}, scene);
    sphere.setEnabled(false);

    // 射线原点
    let origin = new BABYLON.Vector3(0.0, 0.0, 1.5);
    // 射线方向
    let dir = new BABYLON.Vector3(0.0, 0.0, -1.0);
    // 射线长度
    let length = 5.0;

    // 创建一条射线
    let myRay = new BABYLON.Ray(origin, dir, length);

 

    // transform the ray into the local space of the mesh to get an accurate intersection point 
    // in this case we are using the inverse of the mesh's world matrix to transform
    // 将射线转换到box 的局部空间内，计算局部空间的位置
    myRay = BABYLON.Ray.Transform(myRay, box.getWorldMatrix().invert())

         // 射线帮助组件
    let rayHelper = new BABYLON.RayHelper(myRay);
    rayHelper.show(scene);

    // check to see if the ray intersects the mesh and collect the pick information
    // 计算线性是否和box 相交
    let pickingInfo = myRay.intersectsMesh(box);

    // move the sphere to the picked point on the mesh
    if (pickingInfo.hit) {
        sphere.setEnabled(true);
        //如果相交， 就把球放到相交点的位置
        sphere.position = pickingInfo.pickedPoint as BABYLON.Vector3;
    }
}

// 点击模型
const demo7 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    
    // 设置清屏颜色
    scene.clearColor = new BABYLON.Color4(0.2, 0.59, 0.67, 1);

    //This creates an arcRotate camera
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(128), BABYLON.Tools.ToRadians(75), 5, BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 3;

    //This creates a direction light
    var dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0.25, -1, -1), scene);
    dirLight.intensity = 1.5;

    BABYLON.ImportMeshAsync("https://raw.githubusercontent.com/PirateJC/assets/master/pirateFort/cannon.glb", scene).then(function(result){
        scene.getMeshByName("cannon")!.metadata = "cannon";

        scene.onPointerDown = function castRay(){
            var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera, false);	

            var hit = scene.pickWithRay(ray);

            console.log("debug");
            // 点击到，显示GUI
            if (hit?.pickedMesh && hit.pickedMesh.metadata == "cannon"){
                createGUIButton();
            }
        }   
    });

function createGUIButton(){
    //Creates a gui label to display the cannon
    let guiCanvas = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    let guiButton = GUI.Button.CreateSimpleButton("guiButton", "Cannon Selected");
    guiButton.width = "150px"
    guiButton.height = "40px";
    guiButton.color = "white";
    guiButton.cornerRadius = 5;
    guiButton.background = "green";
    // 点击后销毁
    guiButton.onPointerUpObservable.add(function() {
        guiCanvas.dispose();
    });
    guiButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    guiCanvas.addControl(guiButton);
}
}

// GPU picking GPU拾取
const demo8 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{
    // 定义相机
    let camera = new BABYLON.ArcRotateCamera("camera1", Math.PI /2, Math.PI /2, 80, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    let sphereCount = 50;    
    let materialCount = 5;
    let materials = [];
    let spheres = [];
    let instanceCount = 4;

     // 创建随机颜色的PBR材质
    for (let index = 0; index < materialCount; index++) {
        let pbr = new BABYLON.PBRMaterial("mat " + index, scene);
        pbr.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        materials.push(pbr);
    }

    // 创建一些球，随机位置， 随机材质
    for (let index = 0; index < sphereCount; index++) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere" + index, {diameter: Math.random() * 4 + 2, segments: 32}, scene);
        sphere.position = new BABYLON.Vector3(20 - Math.random() * 40, 20 - Math.random() * 40, 20 - Math.random() * 40);
        sphere.isPickable = true;
        sphere.material = materials[index % materialCount];
        spheres.push(sphere);

        if (index > sphereCount / 2) {
            continue;
        }
        
        // 创建部分实例化的球， 随机位置
        for (var i = 0; i < instanceCount; i++) {
            var instance = sphere.createInstance("Instance" + i);
            instance.position = new BABYLON.Vector3(20 - Math.random() * 40, 20 - Math.random() * 40, 20 - Math.random() * 40);
            
            spheres.push(instance);         
        }
    }

    // 创建默认环境
    scene.createDefaultEnvironment();

    // GUI
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var text1 = new GUI.TextBlock();
    text1.text = "Move over the sphere with your mouse";
    text1.color = "white";
    text1.fontSize = 24;
    text1.height = "50px";
    text1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(text1);   

    //  创建GPU拾取
    var picker = new BABYLON.GPUPicker();
    // 设置拾取的 Mesh 对象
    picker.setPickingList(spheres);

    //  鼠标移动事件
    scene.onPointerObservable.add(() => {
        // pick 是否就绪
        if (picker.pickingInProgress) {
            return;
        }
        // 异步PICK 异步拾取
            /**
         * Execute a picking operation
         * @param x defines the X coordinates where to run the pick
         * @param y defines the Y coordinates where to run the pick
         * @param disposeWhenDone defines a boolean indicating we do not want to keep resources alive (false by default)
         * @returns A promise with the picking results IGPUPickingInfo
         */
        picker.pickAsync(scene.pointerX, scene.pointerY).then(pickingInfo => {
            // 如果存在，返回拾取到的内容
            if (pickingInfo) {
                text1.text = pickingInfo.mesh.name;
            } else {
                text1.text = "";
            }
        });

        // interface IGPUPickingInfo {
        //     /**
        //      * Picked mesh
        //      */
        //     mesh: AbstractMesh;
        //     /**
        //      * Picked thin instance index
        //      */
        //     thinInstanceIndex?: number;
        // }
   });

}


// GPU pick  多个不太好用
let multiPickResult:(string | undefined)[] | undefined
const demo9 = (engine:BABYLON.Engine,scene:BABYLON.Scene, canvas:HTMLCanvasElement) =>{

    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 1.3, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.speed = 0.3;
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.8;

    // 预算物体
    const prefab = BABYLON.CreateBox("box", { size: 0.5 })

    const obstacles = [
        [
            0, -1.5, 0,          // pos
            0.4, 0.6, 0,    // rot
            1, 2, 1         // scl
        ],
        [
            -2, 0, 0,
            0, 0, 0.8,
            2, 2, 2
        ],
        [
            -2, 0, 1,
            1, 0.4, 0.3,
            2, 1, 2
        ],
        [
            -1, -1, -1,
            -1, -0.4, 0,
            1.4, 1.2, 0.4
        ],
        [
            1, 2, 1,
            -1.5, 0.4, 0.4,
            0.4, 0.2, 2.4
        ],
    ]

    const pickingListMeshes = []

    // 创建一些box
    for (let i = 0; i < obstacles.length; i++) {
        const obst = obstacles[i]
        const pos = new BABYLON.Vector3(obst[0], obst[1], obst[2])
        const rot = new BABYLON.Vector3(obst[3], obst[4], obst[5])
        const scl = new BABYLON.Vector3(obst[6], obst[7], obst[8])

        const cloneA = prefab.clone("boxA" + i)
        cloneA.position = pos
        cloneA.rotation = rot
        cloneA.scaling = scl
        pickingListMeshes.push(cloneA)

        const cloneB = prefab.clone("boxB" + i)
        cloneB.position = pos.scale(-1)
        cloneB.rotation = rot.scale(-1)
        cloneB.scaling = scl.scale(0.7)
        pickingListMeshes.push(cloneB)


        const matbox = new BABYLON.StandardMaterial("matbox")
        matbox.emissiveColor = BABYLON.Color3.Random()
        // matbox.wireframe = true

        cloneA.material = matbox
        cloneB.material = matbox
    }

    prefab.setEnabled(false)


    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui", true, scene);

    const text = new GUI.TextBlock("space", "Press space to show occlusion helper meshes.")
    text.fontSize = 24;
    text.top = -400;
    text.color = "white";
    ui.addControl(text)

    const sphere = BABYLON.CreateSphere("sphere", { diameter: 0.3 })
    const mat = new BABYLON.StandardMaterial("mat")
    mat.emissiveColor = BABYLON.Color3.Magenta()
    // mat.wireframe = true
    // sphere.visibility = 0.8

    const radius = 2.8
    const markerCount = 20;


    const createLabel = (i:number) => {
        // -------------- LABELS --------------------
        // Old way (performance issues)
        const markerNode = new BABYLON.TransformNode("marker_" + i, scene);
        const a = Math.PI * 2 / markerCount * i
        const pos = new BABYLON.Vector3(radius * Math.cos(a), Math.cos(a * 2), radius * Math.sin(a))
        markerNode.setAbsolutePosition(pos);

        const cloned = sphere.clone(sphere.name + "-" + i)
        cloned.parent = markerNode
        pickingListMeshes.push(cloned)

        const markerButton = GUI.Button.CreateSimpleButton("M" + i, "" + i);
        markerButton.width = "45px";
        markerButton.height = "45px";
        markerButton.fontSizeInPixels = 11;
        markerButton.color = "white";
        markerButton.background = "black";
        markerButton.cornerRadius = 17.5;
        markerButton.thickness = 1;
        ui.addControl(markerButton);
        markerButton.linkWithMesh(markerNode);
        const compound = { node: markerNode, circle: markerButton, targetAlpha: 1, mesh: cloned }
        markerButton.onPointerClickObservable.add(async () => {
            await doThePick();
            await pickOne(compound, i);
        })
        return compound
    }


    interface lableInfoType  {
    node: BABYLON.TransformNode;
    circle: GUI.Button;
    targetAlpha: number;
    mesh: BABYLON.Mesh;
    }

    const markerButtons:lableInfoType[] = []
    // 创建一些lable
    for (let i = 0; i < markerCount; i++) {
        markerButtons.push(createLabel(i));
    }

    const updateInterval = 4;

    // 开启GPU拾取
    var picker = new BABYLON.GPUPicker();
    // box 与 label 设置为拾取的对象
    picker.setPickingList(pickingListMeshes);

    const devicePixelRatio = 1 / engine._hardwareScalingLevel;

    // 设置球默认不渲染
    sphere.setEnabled(false)

    async function pickOne(marker:lableInfoType, i:number) {
        // 获取场景的变换矩阵
        const transformMatrix = scene.getTransformMatrix();

        // 创建一个viewport
        const viewport = camera.viewport.toGlobal(
            engine.getRenderWidth(), 
            engine.getRenderHeight()
        );
    
        // 计算三维点到平面空间
            /**
             * Project a Vector3 onto screen space
             * Example Playground https://playground.babylonjs.com/#R1F8YU#101
             * @param vector defines the Vector3 to project
             * @param world defines the world matrix to use
             * @param transform defines the transform (view x projection) matrix to use
             * @param viewport defines the screen viewport to use
             * @returns the new Vector3
             */
        const xyz = BABYLON.Vector3.Project(
            marker.node.getAbsolutePosition(), 
            BABYLON.Matrix.Identity(), 
            transformMatrix, 
            viewport
        );

        // 左移是向下取整的操作
        const x = (devicePixelRatio * xyz.x) >> 0;
        const y = (devicePixelRatio * xyz.y) >> 0;
        // const pi = await picker.pickAsync(x, y)
        // console.log("pickOne-gpu", i, x, y, pi?.mesh?.name)

        const cpuPickeResult = scene.pick(x, y)
        // 输出 CPU pick 到的信息
        console.log("pickOne-cpu", i, x, y, cpuPickeResult?.pickedMesh?.name)
        // 如果有结果，就输出
        multiPickResult && console.log("pickedMesh from multiPick", multiPickResult[i])
    }


    // 绑定鼠标事件
    scene.onKeyboardObservable.add((key) => {
        if (key.type === 2 && key.event.key === ' ') {
            // 按空格键改变透明度
            for (const m of markerButtons) {
                m.targetAlpha = 0.1
            }
        }
    })
  // 执行PICK
    async function doThePick() {
      
        // 创建的变换矩阵
        const transformMatrix = scene.getTransformMatrix();
        // 定义viewport
        const viewport = camera.viewport.toGlobal(
            engine.getRenderWidth(), 
            engine.getRenderHeight()
        );

        const xy = []
        // 计算每一个mark 的平面坐标位置
        for (let i = 0; i < markerCount; i++) {
            const marker = markerButtons[i];
            const xyz = BABYLON.Vector3.Project(marker.node.getAbsolutePosition(), BABYLON.Matrix.Identity(), transformMatrix, viewport);

            const x = (devicePixelRatio * xyz.x) >> 0;
            const y = (devicePixelRatio * xyz.y) >> 0;
            xy.push({ x, y })
            marker.circle.textBlock!.text = `${i}\n${x},${y}`
        }

        // 设置PICK 多个
        const pi = await picker.multiPickAsync(xy);

        multiPickResult = pi?.meshes?.map(m => m?.name)
        for (let i = 0; i < markerCount && multiPickResult; i++) {
            console.log("multiPick result", i, xy[i].x, xy[i].y, multiPickResult[i])
            const marker = markerButtons[i];
            const mesh = pi?.meshes[i];
            // 设置透明度
            marker.targetAlpha = (mesh?.name.startsWith("sphere") || !mesh?.name) ? 1 : 0.3
        }
    }

    let frameCnt = 0
    // 试图矩阵发生变化时调用
    camera.onViewMatrixChangedObservable.add(() => {
        // 每15帧更新一次
        if (frameCnt % updateInterval === 0) {
            doThePick();
        }
        frameCnt++;
    })

    // 渲染前计算
    scene.onBeforeRenderObservable.add(() => {
        const ar = scene.getAnimationRatio()

        for (let i = 0; i < markerCount; i++) {
            const marker = markerButtons[i];
            marker.circle.alpha = BABYLON.Scalar.Lerp(
                marker.circle.alpha,
                marker.targetAlpha,
                0.05 * ar
            )
        }
    })

    // 执行一次， 场景准备完毕调用
    scene.onReadyObservable.addOnce(() => {
        doThePick();

        // camera.useAutoRotationBehavior = true
    })

}