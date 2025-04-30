import { BABYLON } from "../../base/commonIncludes";

// 自定义相机输入1
export const customInputCamera1Demo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
  // 创建一个场景
  var scene = new BABYLON.Scene(engine);

  // 创建一个自由相机
  var camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );

  // 自由相机朝向[0,0,0]
  camera.setTarget(BABYLON.Vector3.Zero());

  // 自由相机绑定事件
  camera.attachControl(canvas, true);

  // 创建半球光
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  //  半球光强度
  light.intensity = 0.7;

  // 创建一个球
  var sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere1",
    { segments: 16, diameter: 2 },
    scene
  );

  // 设置位置
  sphere.position.y = 1;

  // 创建一个地面
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground1",
    { width: 6, height: 6, subdivisions: 2 },
    scene
  );

  // 移除默认的键盘事件
  camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

  type keyType = (...args:any[])=>void

  // 创建自己的键盘管理键
  class FreeCameraKeyboardRotateInput
    implements BABYLON.ICameraInput<BABYLON.FreeCamera>
  {
    _keys: number[] = [];
    keysLeft:number[];
    keysRight:number[];
    sensibility:number;
    camera: BABYLON.FreeCamera;
    _onKeyDown:keyType|null;
    _onKeyUp:keyType|null;
    constructor() {
      this.camera = camera;
      this._onKeyDown = null;
      this._onKeyUp = null;
      //当前按下的键
      this._keys = [];
      // 按键事件
      this.keysLeft = [65,37],
      this.keysRight = [68,39],
      // 触发后旋转的幅度
      this.sensibility = 0.01
    }
    // 返回类的名称，用于序列号 
    getClassName(): string {
      return "FreeCameraKeyboardRotateInput";
    }

    // 绑定控制
    attachControl(noPreventDefault: boolean) {
      var _this = this;
      var engine = this.camera.getEngine();
      var element = engine.getInputElement() as HTMLElement;
      // 是否定义按下事件
      if (!this._onKeyDown) {
        // 得到输入的DOM 对象，设置Tab index
        element.tabIndex = 1;
        
        // 按下事件
        this._onKeyDown = (evt)=> {
          // 如果按照的是左键或者右键 keyA keyS 
          if (
            _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
            _this.keysRight.indexOf(evt.keyCode) !== -1
          ) {
            var index = _this._keys.indexOf(evt.keyCode);
            if (index === -1) {
              // 当前按下的键
              _this._keys.push(evt.keyCode);
            }
            if (!noPreventDefault) {
              evt.preventDefault();
            }
          }
        };

        // 松开按键
        this._onKeyUp =  (evt)=> {
          // 如果按照的是左键或者右键 keyA keyS 
          if (
            _this.keysLeft.indexOf(evt.keyCode) !== -1 ||
            _this.keysRight.indexOf(evt.keyCode) !== -1
          ) {
            // 是否是当前按键
            var index = _this._keys.indexOf(evt.keyCode);
            if (index >= 0) {
              // 清除这个按键
              _this._keys.splice(index, 1);
            }
            if (!noPreventDefault) {
              evt.preventDefault();
            }
          }
        };

        // DOM 绑定事件
        element.addEventListener("keydown", this._onKeyDown, false);
        element.addEventListener("keyup", this._onKeyUp, false);
       
        // 注册失去焦点
        BABYLON.Tools.RegisterTopRootEvents(window, [
          { name: "blur", handler: this._onLostFocus },
        ]);
      }
    }

    detachControl() {
      // 是否存在事件
      if (this._onKeyDown && this._onKeyUp) {
        var engine = this.camera.getEngine();
        var element = engine.getInputElement();
        // 移除事件
        element!.removeEventListener("keydown", this._onKeyDown);
        element!.removeEventListener("keyup", this._onKeyUp);
        // 移除失去焦点事件
        BABYLON.Tools.UnregisterTopRootEvents(window, [
          { name: "blur", handler: this._onLostFocus },
        ]);
        this._keys = [];
        this._onKeyDown = null;
        this._onKeyUp = null;
      }
    }
    // 会一直调用这个方法
    checkInputs() {
      
      // 是否存在按下事件
      if (this._onKeyDown) {
        var camera = this.camera;

        //  实行按下的键触发的动作
        for (var index = 0; index < this._keys.length; index++) {
          var keyCode = this._keys[index];
          // 如果按键是向左的键
          if (this.keysLeft.indexOf(keyCode) !== -1) {
            // 绕 Y 轴 逆时针转
            camera.cameraRotation.y += this.sensibility;

          } else if (this.keysRight.indexOf(keyCode) !== -1) {
            // 绕 Y 轴顺时针转
            camera.cameraRotation.y -= this.sensibility;
          }
        }
      }
    }

    getTypeName() {
      return "FreeCameraKeyboardRotateInput";
    }

    _onLostFocus(e:Event) {
      this._keys = [];
    }

    getSimpleName() {
      return "keyboardRotate";
    }
  }

  // Connect to camera:
  camera.inputs.add(new FreeCameraKeyboardRotateInput());

  return scene;
};



// // You need to extend the BaseCameraPointersInput to get the required functionality
// class YourCustomInputClass extends BABYLON.BaseCameraPointersInput {
//     // This is the constructor.  Unless you have something specific that you need
//     // to do when you create your object, you don't need to implement this. You
//     // must call the super() function though, if you do.
//     // constructor() { super(); }
  
//     // This is exactly the same the function in the previous section and will still need to be
//     // implemented.
//     getClassName() {}
  
//     // This function is the exact same thing as the previous section.  However, it has already
//     // been implemented with a value of "pointers" and is technically optional.
//     // getSimpleName() {};
  
//     // This function is already implemented.  If you are planning to use this class, it is
//     // recommened to not override it.
//     // attachControl(noPreventDefault) {};
  
//     // Same thing with detachControl
//     // detachControl() {};
  
//     // This optional function will get called for each rendered frame, if you want to synchronize your
//     // input to rendering, no need to use requestAnimationFrame. It's a good place for applying
//     // calculations if you have to.
//     // Return void.
//     checkInputs() {}
  
//     // This function will fire during a POINTERMOVE event where there is either an active mouse
//     // button down or only one active touch.  "point" will contain the coordinates, pointerId,
//     // and pointer type.  The offsets are just the changes in position from the previous point.
//     // This will NOT fire if multiple touches are active.  This method is required.
//     onTouch(point, offsetX, offsetY) {}
  
//     // This function will only fire during a POINTERMOVE event where more than one touch is active.
//     // This function will only support the first two active touches and all others will be ignored.
//     // Points A and B are said touches.  Both previous and current pinch distances and positions are
//     // available to support basic gesture logic, as needed.  As a warning, the previous movement may
//     // be null at the beginning of a multi-touch movement.
//     onMultiTouch(pointA, pointB, previousPinchSquaredDistance, pinchSquaredDistance, previousMultiTouchPanPosition, multiTouchPanPosition) {}
  
//     // This function will only fire during a POINTERDOUBLETAP event.  The "type" parameter
//     // is just the pointer type (mouse, touch, etc.).  This is optional.
//     onDoubleTap(type) {}
  
//     // This function will fire when a contextmenu event occurs (right-click menu).
//     // "evt" is the triggering event.  This is optional.
//     onContextMenu(evt) {}
  
//     // This function will fire when a POINTERDOWN event occurs.
//     // "evt" is the triggering event.  This is optional.
//     onButtonDown(evt) {}
  
//     // This function will fire when a POINTERUP event occurs (right-click menu).
//     // "evt" is the triggering event.  This is optional.
//     onButtonUp(evt) {}
  
//     // This function will fire when the window loses focus (eg. blur event)
//     // This is optional.
//     onLostFocus() {}
//   }
