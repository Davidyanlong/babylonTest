import { BABYLON } from "../../base/commonIncludes";

// 自定义相机输入2
export const freeCameraPointersInputDemo = function (
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
) {
    // 创建一个场景
    var scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // 相机朝向
    camera.setTarget(BABYLON.Vector3.Zero());

    // 相机的事件
    camera.attachControl(canvas, true);

    //  默认的鼠标事件
    const mouse = camera.inputs.attached.mouse;
    // 移除默认的鼠标输入事件
    camera.inputs.remove(mouse);

    // 默认的移动端触摸事件
    const touch = camera.inputs.attached.touch;
    // 移除默认的触摸事件
    camera.inputs.remove(touch);
    
    // 添加自定义的触摸事件
    camera.inputs.add(new FreeCameraPointersInput());
    
    // 获取触摸事件
    //When using Typescript, you will need to cast the object in order to access specific variable
    const p: FreeCameraPointersInput = camera.inputs.attached.pointers as FreeCameraPointersInput;

    // These are a couple of examples for flags you can set to change the behavior.  
    // 单手指旋转
    //p.singleFingerRotate = true;
    // 关闭触摸
    //p.touchEnabled = false;

    // 创建半球灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // 灯光强度
    light.intensity = 0.7;

    // 创建一个球
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // 设置球的位置
    sphere.position.y = 1;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
}

// 自定义触摸事件， 继承实现 BABYLON.BaseCameraPointersInput
class FreeCameraPointersInput extends BABYLON.BaseCameraPointersInput {
    public camera: BABYLON.FreeCamera;
    public angularSensibility = 2000.0;

    // Touch-based variables
    public singleFingerRotate: boolean = false;
    public touchMoveSensibility: number = 250.0;
    public touchAngularSensibility: number = 200000.0;
    public touchEnabled: boolean = true;

    private _offsetX: BABYLON.Nullable<number> = null;
    private _offsetY: BABYLON.Nullable<number> = null;
    private _previousPositionX: BABYLON.Nullable<number> = null;
    private _previousPositionY: BABYLON.Nullable<number> = null;
    private _touches: number = 0;

    public getClassName(): string {
        return "FreeCameraPointersInput";
    }

    // We don't need to add the getSimpleName function as the base class
    // already provides a value of "pointers".  If you want it to be something
    // else though, feel free to implement it.

    // public getSimpleName(): string;

    // While normally, you'd also have to add an attachControl and detachControl function
    // when creating a custom input, this will already be handled by the base class.
    // You can also override them if you want but they do a lot of the heavy lifting so
    // be warned.

    // public attachControl(noPreventDefault?: boolean): void;
    // public detachControl(): void;

    /**
     * checkInputs
     * 
     * It should be noted that this class is optional in general custom input development.
     * It will execute this function every frame.  We're using it here to update the camera 
     * position/rotation in the same way as the touch class it's based off of.  If you don't
     * need to update something each frame, this function doesn't need to be overridden.
     */
    // 每帧检查触碰
    public checkInputs(): void {
        if (this.touchEnabled || this._offsetX === null || this._offsetY === null) {
            return;
        }
        if (this._offsetX === 0 && this._offsetY === 0) {
            return;
        }

        // For most camera types (except for any based off of ArcRotateCamera), positions
        // and rotations are changed by modifying the cameraDirection and cameraRotation
        // vectors.
        const camera = this.camera;
        // 相机旋转
        camera.cameraRotation.y = this._offsetX / this.touchAngularSensibility;

        const rotateCamera = (this.singleFingerRotate && this._touches === 1) || (!this.singleFingerRotate && this._touches > 1);

        if (rotateCamera) {
            camera.cameraRotation.x = -this._offsetY / this.touchAngularSensibility;
        } else {
            const speed = camera._computeLocalCameraSpeed();
            const direction = new BABYLON.Vector3(0, 0, this.touchMoveSensibility !== 0 ? (speed * this._offsetY) / this.touchMoveSensibility : 0);

            BABYLON.Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, camera._cameraRotationMatrix);
            // 变换相机朝向
            camera.cameraDirection.addInPlace(BABYLON.Vector3.TransformCoordinates(direction, camera._cameraRotationMatrix));
        }
    }

    /**
     * onTouch
     * 
     * This function is required.  This will handle all logic related to a single touch.
     * This is called during a POINTERMOVE event.
     */
    public onTouch(point: BABYLON.Nullable<BABYLON.PointerTouch>, offsetX: number, offsetY: number): void {
       
        let directionAdjust = 1;
        if (this.camera.getScene().useRightHandedSystem) {
                directionAdjust *= -1;
        }
        if (this.camera.parent && this.camera.parent._getWorldMatrixDeterminant() < 0) {
            directionAdjust *= -1;
        }
        
        this.camera.cameraRotation.y += directionAdjust * offsetX / this.angularSensibility;
        
        // Since point holds the 'pointerType' from the firing event, we can access it here via 'type'
        // offsetX/Y will be clientX/Y - the previously stored point's x/y
        if (point && point.type === "mouse" || (point && point.type === "touch" && this.touchEnabled)) {
            this.camera.cameraRotation.x += offsetY / this.angularSensibility;
        }
        else if (this._previousPositionX === null || this._previousPositionY === null) {
            return;
        }
        else {
            // 手指触碰记录位置
            if(point){
                this._offsetX = point.x - this._previousPositionX;
                this._offsetY = -(point.y - this._previousPositionY);
            }
            
        }
    }

    /**
     * onMultiTouch
     * 
     * This function is required.  This will handle all logic when there are multiple active touches.
     * This is called during a POINTERMOVE event.
     * 
     * pointA and B should never be null if this is called, unless you are manually calling this.
     * 
     * The distances should also always have a value.
     * 
     * The pan positions (which could be renamed as long as the data types are the same) may be 
     * null at the beginning or the end of a movement.
     */
    public onMultiTouch(
        pointA: BABYLON.Nullable<BABYLON.PointerTouch>,
        pointB: BABYLON.Nullable<BABYLON.PointerTouch>,
        previousPinchSquaredDistance: number,
        pinchSquaredDistance: number,
        previousMultiTouchPanPosition: BABYLON.Nullable<BABYLON.PointerTouch>,
        multiTouchPanPosition: BABYLON.Nullable<BABYLON.PointerTouch>
    ): void {
        // 计算偏移量
        if (!this.touchEnabled && multiTouchPanPosition) {
            this._offsetX = multiTouchPanPosition.x - this._previousPositionX!;
            this._offsetY = -(multiTouchPanPosition.y - this._previousPositionY!);
        }
    }

    /**
     * onButtonDown
     * 
     * This function will trigger when a touch or button is pressed down.
     */
    public onButtonDown(evt: BABYLON.IPointerEvent): void {
        if (evt.pointerType === "touch" && !this.touchEnabled) {
            // 记录位置
            this._previousPositionX = evt.clientX;
            this._previousPositionY = evt.clientY;
            this._touches++;
        }
    }

    /**
     * onButtonUp
     * 
     * This function will trigger when a touch or button is pressed up.
     */
    public onButtonUp(evt: BABYLON.IPointerEvent): void {
        if (evt.pointerType === "touch" && !this.touchEnabled) {
            // 清除位置
            this._previousPositionX = null;
            this._previousPositionY = null;
            this._offsetX = null;
            this._offsetY = null;
            this._touches -= this._touches > 0 ? 1 : 0;
        }
    }
}