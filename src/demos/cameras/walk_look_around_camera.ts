import { BABYLON } from "../../base/commonIncludes";

// 自定义相机输入2
export const walkLookAroundCameraDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {

    const ws:WeakMap<BABYLON.UniversalCamera, Record<string, any>> = new WeakMap()

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 定义一个直射灯， 直射灯的方向 
    var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);

    // 定义一个普通相机
    var camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 1, 0), scene);
    // 相机最小的Z
    camera.minZ = 0.0001;
    // 相机的事件
    camera.attachControl(canvas, true);
    // 速度
    camera.speed = 0.02;

    const angle = Math.PI/2;
    ws.set(camera,{
        angularSpeed:0.05,
        angle,
        direction: new BABYLON.Vector3(Math.cos(angle), 0, Math.sin(angle))
    })

    
    // 定义一个普通相机
    var viewCamera = new BABYLON.UniversalCamera("viewCamera", new BABYLON.Vector3(0, 3, -3), scene);
    // 相机的父级
    viewCamera.parent = camera;
    // 相机的朝向目标
    viewCamera.setTarget(new BABYLON.Vector3(0, -0.0001, 1));
    
    // 添加到活动相机
    scene.activeCameras = scene.activeCameras ||[];
    scene.activeCameras.push(viewCamera);
    scene.activeCameras.push(camera);

    // 为两个相机设置视口
    // 上半屏
    camera.viewport = new BABYLON.Viewport(0, 0.5, 1.0, 0.5);
    // 下半屏
    viewCamera.viewport = new BABYLON.Viewport(0, 0, 1.0, 0.5);  
    
    // 圆锥作为假的相机
    var cone = BABYLON.MeshBuilder.CreateCylinder("dummyCamera", {
        diameterTop:0.01, diameterBottom:0.2, height:0.2},
         scene);
    // 圆锥作为相机的 子集
    cone.parent = camera;
    // 圆锥绕 X 旋转
    cone.rotation.x = Math.PI/2;

    /* Set Up Scenery 
    _____________________*/

    // 地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 20, height: 20}, scene);
    let groundMat = ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    groundMat.backFaceCulling = false;

    // 下面的地面
    var lowerGround = ground.clone("lowerGround");
    lowerGround.scaling.x = 4;
    lowerGround.scaling.z = 4;
    lowerGround.position.y = -16;
    const lowerGroundMap = lowerGround.material = ground.material.clone("lowerMat") as BABYLON.StandardMaterial;
    lowerGroundMap.diffuseColor = new BABYLON.Color3(0, 1, 0);


    // 创建一个木箱
    var box = BABYLON.MeshBuilder.CreateBox("crate", {size: 2}, scene);
    const boxMat = box.material = new BABYLON.StandardMaterial("Mat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/crate.png", scene);
    //开启碰撞
    box.checkCollisions = true;

    var boxNb = 6;
    var theta = 0;
    var radius = 6;
    // 随机位置
    box.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));

    // 随机创建箱子
    var boxes = [box];
    for (var i = 1; i < boxNb; i++) {
        theta += 2 * Math.PI / boxNb;
        var newBox = box.clone("box" + i);
        boxes.push(newBox);
        newBox.position = new BABYLON.Vector3((radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.cos(theta + randomNumber(-0.1 * theta, 0.1 * theta)), 1, (radius + randomNumber(-0.5 * radius, 0.5 * radius)) * Math.sin(theta + randomNumber(-0.1 * theta, 0.1 * theta)));
    }
    /* End Create Scenery */

    // 重力加速度
    scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    // 启用碰撞
    scene.collisionsEnabled = true;

    // 启用相机碰撞
    camera.checkCollisions = true;
    camera.applyGravity = true;

    // 地板碰撞
    ground.checkCollisions = true;
    lowerGround.checkCollisions = true;

    // 相机椭球
    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    // 椭球位置偏移
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0); 

    // 创建一个可见的椭球
    var a = 0.5;
    var b = 1;
    var points = [];
    for(var theta = -Math.PI/2; theta < Math.PI/2; theta += Math.PI/36) {
        points.push(new BABYLON.Vector3(0, b * Math.sin(theta), a * Math.cos(theta)));
    }

    var ellipse = [];
    ellipse[0] = BABYLON.MeshBuilder.CreateLines("e", {points:points}, scene);
    ellipse[0].color = BABYLON.Color3.Red();
    ellipse[0].parent = camera;
    ellipse[0].rotation.y = 5 * Math.PI/ 16;
    for(var i = 1; i < 23; i++) {
            ellipse[i] = ellipse[0].clone("el" + i);
            ellipse[i].parent = camera;
            ellipse[i].rotation.y = 5 * Math.PI/ 16 + i * Math.PI/16;
    }
    
    /* New Input Management for Camera
    __________________________________*/
    
    // 移除默认的时间
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
    camera.inputs.removeByType("FreeCameraMouseInput");
     
    //Key Input Manager To Use Keys to Move Forward and BackWard and Look to the Left or Right
    // var FreeCameraKeyboardWalkInput = function () {
    //     this._keys = [];
    //     this.keysUp = [38];
    //     this.keysDown = [40];
    //     this.keysLeft = [37];
    //     this.keysRight = [39];
    // }

    type keyFnType = (...args:any[])=>void

    class FreeCameraKeyboardWalkInput {
        _keys:number[];
        keysUp:number[];
        keysDown:number[];
        keysLeft:number[];
        keysRight:number[];
        camera:BABYLON.UniversalCamera|null;
        _onKeyDown:keyFnType | null
        _onKeyUp:keyFnType | null
        constructor(){
            this._keys = [];
            this.keysUp = [38];
            this.keysDown = [40];
            this.keysLeft = [37];
            this.keysRight = [39];
            this.camera = null;
            this._onKeyDown = null;
            this._onKeyUp = null;
        }

        // 绑定事件
        attachControl(noPreventDefault:boolean) {
            var _this = this;
            var engine = this.camera!.getEngine();
            var element = engine.getInputElement() as HTMLElement;
            if (!this._onKeyDown) {
                element.tabIndex = 1;
                this._onKeyDown = function (evt) {                 
                    if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index === -1) {
                            _this._keys.push(evt.keyCode);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                this._onKeyUp = function (evt) {
                    if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
                        _this.keysDown.indexOf(evt.keyCode) !== -1 ||
                        _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                        _this.keysRight.indexOf(evt.keyCode) !== -1) {
                        var index = _this._keys.indexOf(evt.keyCode);
                        if (index >= 0) {
                            _this._keys.splice(index, 1);
                        }
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
                element.addEventListener("keydown", this._onKeyDown, false);
                element.addEventListener("keyup", this._onKeyUp, false);
            }
        }


        detachControl() {
            var engine = this.camera!.getEngine();
            var element = engine.getInputElement() as HTMLElement;
            if (this._onKeyDown && this._onKeyUp) {
                element.removeEventListener("keydown", this._onKeyDown);
                element.removeEventListener("keyup", this._onKeyUp);
                BABYLON.Tools.UnregisterTopRootEvents(window, [
                    { name: "blur", handler: this._onLostFocus }
                ]);
                this._keys = [];
                this._onKeyDown = null;
                this._onKeyUp = null;
            }
        }

        checkInputs() {
            if (this._onKeyDown) {
                var camera = this.camera as BABYLON.UniversalCamera;
                for (var index = 0; index < this._keys.length; index++) {
                    var keyCode = this._keys[index];
                    var speed = camera!.speed;

                    const opt = ws.get(camera) as any;

                    if (this.keysLeft.indexOf(keyCode) !== -1) {
                        camera!.rotation.y -= opt.angularSpeed;
                        opt.direction.copyFromFloats(0, 0, 0);  
                        // camera!.direction.copyFromFloats(0, 0, 0);                
                    }
                    else if (this.keysUp.indexOf(keyCode) !== -1) {
                        opt.direction.copyFromFloats(0, 0, speed);
                        // camera!.direction.copyFromFloats(0, 0, speed);               
                    }
                    else if (this.keysRight.indexOf(keyCode) !== -1) {
                        camera!.rotation.y += opt.angularSpeed;
                        opt.direction.copyFromFloats(0, 0, 0);
                        // camera!.direction.copyFromFloats(0, 0, 0);
                    }
                    else if (this.keysDown.indexOf(keyCode) !== -1) {
                        opt.direction.copyFromFloats(0, 0, -speed);
                        // camera!.direction.copyFromFloats(0, 0, -speed);
                    }
                    if (camera!.getScene().useRightHandedSystem) {
                        // camera!.direction.z *= -1;
                        opt.direction.z *= -1;
                        
                    }

                    camera!.getViewMatrix().invertToRef(camera!._cameraTransformMatrix);
                    BABYLON.Vector3.TransformNormalToRef(
                        opt.direction, 
                        camera!._cameraTransformMatrix, 
                        camera!._transformedDirection);
                    // 添加变换的相机
                    camera!.cameraDirection.addInPlace(camera!._transformedDirection);
                }
            }
        }

        _onLostFocus() {
            this._keys = [];
        }

        getClassName() {
            return "FreeCameraKeyboardWalkInput";
        }

        getSimpleName() {
            return "keyboard";
        }

    }

     camera.inputs.add(new FreeCameraKeyboardWalkInput());


     interface pointerType {
        x:number, 
        y:number
     }

    // 添加鼠标事件
    class FreeCameraSearchInput {
        buttons: number[];
        touchEnabled: boolean;
        angularSensibility:number;
        restrictionX:number;
        restrictionY:number;
        camera:BABYLON.UniversalCamera |null
        _pointerInput: keyFnType | null
        previousPosition:pointerType | null;
        _onSearchMove:keyFnType | null;
        _observer:any
        constructor(touchEnabled = true){
            if (touchEnabled === void 0) { touchEnabled = true; }

            this.touchEnabled = touchEnabled;
            this.buttons = [0, 1, 2];
            this.angularSensibility = 2000.0;
            this.restrictionX = 100;
            this.restrictionY = 60;
            this.camera = null;
            this._pointerInput = null;
            this.previousPosition = null;
            this._onSearchMove = null;
        }

        attachControl(noPreventDefault:boolean) {
            var _this = this;
            var engine = this.camera!.getEngine();
            var element = engine.getInputElement() as HTMLElement;
            var angle = {x:0, y:0};

            if (!this._pointerInput) {
                this._pointerInput = function (p, s) {
                    var evt = p.event;
                    if (!_this.touchEnabled && evt.pointerType === "touch") {
                        return;
                    }
                    if (p.type !== BABYLON.PointerEventTypes.POINTERMOVE && _this.buttons.indexOf(evt.button) === -1) {          
                        return;
                    }
                    if (p.type === BABYLON.PointerEventTypes.POINTERDOWN) {          
                        try {
                            evt.srcElement.setPointerCapture(evt.pointerId);
                        }
                        catch (e) {
                            //Nothing to do with the error. Execution will continue.
                        }
                        // 鼠标按下记录鼠标位置
                        _this.previousPosition = {
                            x: evt.clientX,
                            y: evt.clientY
                        };

                        if (!noPreventDefault) {
                            evt.preventDefault();
                            element.focus();
                        }
                    }
                    else if (p.type === BABYLON.PointerEventTypes.POINTERUP) {          
                        try {
                            evt.srcElement.releasePointerCapture(evt.pointerId);
                        }
                        catch (e) {
                            //Nothing to do with the error.
                        }
                        // 鼠标弹起，清空鼠标位置
                        _this.previousPosition = null;
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                    else if (p.type === BABYLON.PointerEventTypes.POINTERMOVE) {            
                        if (!_this.previousPosition || engine.isPointerLock) {
                            return;
                        }
                        console.log(333)
                        // 计算鼠标移动的偏移量
                        var offsetX = evt.clientX - _this.previousPosition.x;
                        var offsetY = evt.clientY - _this.previousPosition.y;                   
                        angle.x +=offsetX;
                        angle.y -=offsetY; 
                        // 如果变化量操作  restrictionX 就保持不变
                        if(Math.abs(angle.x) > _this.restrictionX )  {
                            angle.x -=offsetX;
                        }
                        // 如果变化量操作  restrictionY 就保持不变
                        if(Math.abs(angle.y) > _this.restrictionY )  {
                            angle.y +=offsetY;
                        }   
                        // 相机旋转    
                        if (_this.camera!.getScene().useRightHandedSystem) {
                            if(Math.abs(angle.x) < _this.restrictionX )  {
                                _this.camera!.cameraRotation.y -= offsetX / _this.angularSensibility;
                            }
                        }
                        else {
                            if(Math.abs(angle.x) < _this.restrictionX )  {
                                _this.camera!.cameraRotation.y += offsetX / _this.angularSensibility;
                            }
                        }
                        // 相机旋转
                        if(Math.abs(angle.y) < _this.restrictionY )  {
                            _this.camera!.cameraRotation.x += offsetY / _this.angularSensibility;
                        }
                        // 记录位置
                        _this.previousPosition = {
                            x: evt.clientX,
                            y: evt.clientY
                        };
                        if (!noPreventDefault) {
                            evt.preventDefault();
                        }
                    }
                };
            }

            // 鼠标移动就执行， 似乎这个执行不到， 根据不同的浏览器，兼容方案吧
            this._onSearchMove = function (evt:any) {       
                if (!engine.isPointerLock) {
                    return;
                }       
                var offsetX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || evt.msMovementX || 0;
                var offsetY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || evt.msMovementY || 0;
                
                // 鼠标左右移动绕 y 旋转
                if (_this.camera!.getScene().useRightHandedSystem) {

                    _this.camera!.cameraRotation.y -= offsetX / _this.angularSensibility;
                }
                else {
                    _this.camera!.cameraRotation.y += offsetX / _this.angularSensibility;
                }
                // 鼠标山下移动 绕x旋转
                _this.camera!.cameraRotation.x += offsetY / _this.angularSensibility;
                _this.previousPosition = null;
                if (!noPreventDefault) {
                    evt.preventDefault();
                }
            };
            
         

            this._observer = this.camera!.getScene().onPointerObservable.add(this._pointerInput, BABYLON.PointerEventTypes.POINTERDOWN | BABYLON.PointerEventTypes.POINTERUP | BABYLON.PointerEventTypes.POINTERMOVE);
            
            element.addEventListener("mousemove", this._onSearchMove , false);
        }

        detachControl() {
            var engine = this.camera!.getEngine();
            var element = engine.getInputElement();
            if (this._observer && element) {
                this.camera!.getScene().onPointerObservable.remove(this._observer);
                element.removeEventListener("mousemove", this._onSearchMove as keyFnType);
                this._observer = null;
                this._onSearchMove = null;
                this.previousPosition = null;
            }
        }
        getClassName() {
            return "FreeCameraSearchInput";
        }

        getSimpleName() {
            return "MouseSearchCamera";
        };
    }


    //Add the new mouse input manager to the camera
    camera.inputs.add(new FreeCameraSearchInput());

    

    return scene;
};


function randomNumber(min:number, max:number) {
    if (min == max) {
        return (min);
    }
    var random = Math.random();
    return ((random * (max - min)) + min);
};