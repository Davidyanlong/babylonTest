import { BABYLON, GUI } from "../../base/commonIncludes";

// 场景基本的构建方法
export const deviceSourceManagerScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建场景
     const scene = new BABYLON.Scene(engine);
    
    //  demo1(engine, scene);
     demo2(scene);


    return scene;

};

//#region demo1 代码部分

// 多种输入设备的输入控制 BABYLON.DeviceSourceManager
const demo1 = (engine:BABYLON.Engine, scene:BABYLON.Scene)=>{
    /*
     * Constructor: At a bare minimum, all that you need to do to 
     * use the DeviceSourceManager is to create an instance of it.
     */
    // 创建DeviceSourceManager 实例
    const dsm = new BABYLON.DeviceSourceManager(engine);
    // 创建天空
    const skybox = createSkybox(scene);

    // 创建相机
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 7, -15), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    // 创建天空
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    // 创建飞船
    const ship = createShip(scene, camera);

    //  创建文字提示块
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    const controlsText = new GUI.TextBlock();
    controlsText.text = "No connection to pilot controls.";
    controlsText.color = "white";
    controlsText.fontStyle = "bold";
    controlsText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    controlsText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    controlsText.fontSize = 24;
    advancedTexture.addControl(controlsText);

    /*
     * onAfterDeviceConnectedObservable:
     * One of two observables that works around a device being connected/added
     * to the DeviceSourceManager instance.  This observable activates after
     * the given device is connected.  The "device" parameter has two members, 
     * deviceType (Assigned type of connected device; BABYLON.DeviceType) and 
     * deviceSlot (Assigned slot of connected device; number).
     * 
     * The other connected observable is onBeforeDeviceConnectedObservable.
     */
    dsm.onDeviceConnectedObservable.add((device) => {
        //  设置为空值
        let shieldButton = "n/a";
        let fireButton = "n/a";
        let boostButton = "n/a";

        // 判断输入设备类型
        switch(device.deviceType) {
            // 键盘
            case BABYLON.DeviceType.Keyboard:
                // 飞船颜色
                currentColor = new BABYLON.Color3(1,0.5,0.5);
                // 文字颜色
                controlsText.color = "red";

                shieldButton = "Z";
                fireButton = "Spacebar";
                boostButton = "X";
                controlsText.text = `Established link to ${BABYLON.DeviceType[device.deviceType]}\n`;
                controlsText.text += `Pilot Controls\nShield: ${shieldButton}\nFire: ${fireButton}\nBoost: ${boostButton}`;
                break;
            // Xbox
            case BABYLON.DeviceType.Xbox:
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                controlsText.color = "green";
                shieldButton = "A";
                fireButton = "X";
                boostButton = "B";
                controlsText.text = `Established link to ${BABYLON.DeviceType[device.deviceType]}\n`;
                controlsText.text += `Pilot Controls\nShield: ${shieldButton}\nFire: ${fireButton}\nBoost: ${boostButton}`;
                break;
            // Dual Shock
            case BABYLON.DeviceType.DualShock:
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                controlsText.color = "blue";
                shieldButton = "Cross";
                fireButton = "Square";
                boostButton = "Circle";
                controlsText.text = `Established link to ${BABYLON.DeviceType[device.deviceType]}\n`;
                controlsText.text += `Pilot Controls\nShield: ${shieldButton}\nFire: ${fireButton}\nBoost: ${boostButton}`;
                break;
        }

        changeShipColors(ship, currentColor);
    });

    /*
     * onAfterDeviceDisconnectedObservable:
     * One of two observables that works around a device being disconnected/removed
     * to the DeviceSourceManager instance.  This observable activates after
     * the given device is disconnected.  The "device" parameter has two members, 
     * deviceType (Assigned type of connected device; BABYLON.DeviceType) and 
     * deviceSlot (Assigned slot of connected device; number).
     * 
     * The other connected observable is onBeforeDeviceDisconnectedObservable.
     */
    // 设备断开时触发
    dsm.onDeviceDisconnectedObservable.add((device) => {
        controlsText.color = "white";
        controlsText.text = `Lost connection to ${BABYLON.DeviceType[device.deviceType]}`;
    });

    // "Game" Loop
    // 游戏循环调用
    scene.registerBeforeRender(() => {

        skybox.rotate(ship.rotationQuaternion!.toEulerAngles(), moveSpeed);

        /*
         * getDeviceSource and getInput:
         * At a minimum, you'll need to use the getInput function to read 
         * data from user input devices.
         * 
         * In Typescript, you can combine the getDeviceSource and getInput in the 
         * if statements into a single like by using the null-conditional operator.
         * 
         * e.g. if(dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(90) == 1)
         */
        // 如果是键盘控制
        if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)) {
              currentColor = new BABYLON.Color3(1,0.5,0.5);

            // 按下Z键
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(90) == 1) {
                modifyShield(scene, ship);
                changeShipColors(ship, currentColor);
            }
            // 按下空格键
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(32) == 1) {
                fireBlasters(scene, ship);
                changeShipColors(ship, currentColor);
            }
            // 按下X键
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(88) == 1) {
                let color1 = new BABYLON.Color4(1.0, 0.8, 0.8, 1.0);
                let color2 = new BABYLON.Color4(1.0, 0.5, 0.5, 1.0);
                activateBoost(scene, ship, color1, color2, camera);
                changeShipColors(ship, currentColor);
            }
            // 按下左方向键
            if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(37) == 1) {
                turnLeft(ship);
                changeShipColors(ship, currentColor);
            }
            // 按下右方向键
            else if (dsm.getDeviceSource(BABYLON.DeviceType.Keyboard)?.getInput(39) == 1) {
              
                turnRight(ship);
                changeShipColors(ship, currentColor);
            }
             controlsText.color = "red";
             controlsText.text = "Pilot Controls\nShield: Z\nFire: Spacebar\nBoost: X";
        }

        if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)) {
            if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)?.getInput(BABYLON.XboxInput.A) == 1) {
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                modifyShield(scene, ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)?.getInput(BABYLON.XboxInput.X) == 1) {
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                fireBlasters(scene, ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)?.getInput(BABYLON.XboxInput.B) == 1) {
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                let color1 = new BABYLON.Color4(0.8, 1.0, 0.8, 1.0);
                let color2 = new BABYLON.Color4(0.5, 1.0, 0.5, 1.0);
                activateBoost(scene, ship, color1, color2, camera);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)?.getInput(BABYLON.XboxInput.LStickXAxis)! < -0.25) {
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                turnLeft(ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
            else if (dsm.getDeviceSource(BABYLON.DeviceType.Xbox)?.getInput(BABYLON.XboxInput.LStickXAxis)! > 0.25) {
                currentColor = new BABYLON.Color3(0.5,1,0.5);
                turnRight(ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
        }

        if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)) {
            if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)?.getInput(BABYLON.DualShockInput.Cross) == 1) {
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                modifyShield(scene, ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "blue";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)?.getInput(BABYLON.DualShockInput.Square) == 1) {
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                fireBlasters(scene, ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "blue";
                controlsText.text = "Pilot Controls\nShield: Cross\nFire: Square\nBoost: Circle";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)?.getInput(BABYLON.DualShockInput.Circle) == 1) {
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                let color1 = new BABYLON.Color4(0.8, 0.8, 1.0, 1.0);
                let color2 = new BABYLON.Color4(0.5, 0.5, 1.0, 1.0);
                activateBoost(scene, ship, color1, color2, camera);
                changeShipColors(ship, currentColor);
                controlsText.color = "blue";
                controlsText.text = "Pilot Controls\nShield: Cross\nFire: Square\nBoost: Circle";
            }
            if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)?.getInput(BABYLON.DualShockInput.LStickXAxis)! < -0.25) {
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                turnLeft(ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "green";
                controlsText.text = "Pilot Controls\nShield: A\nFire: X\nBoost: B";
            }
            else if (dsm.getDeviceSource(BABYLON.DeviceType.DualShock)?.getInput(BABYLON.DualShockInput.LStickXAxis)! > 0.25) {
                currentColor = new BABYLON.Color3(0.5,0.5,1);
                turnRight(ship);
                changeShipColors(ship, currentColor);
                controlsText.color = "blue";
                controlsText.text = "Pilot Controls\nShield: Cross\nFire: Square\nBoost: Circle";
            }
        }
    });
}


var currentColor = new BABYLON.Color3(0.5, 0.5, 1);
var moveSpeed = 0.0002;
var shieldActive = false;
var bulletActive = false;
var boostActive = false;

var turnLeft = (ship:BABYLON.Mesh) => {
    if (ship.position.x > -5) {
        ship.position.x -= 0.04;
    }
}

var turnRight = (ship:BABYLON.Mesh) => {
    if (ship.position.x < 5) {
        ship.position.x += 0.04;
    }
}

// Activate Booster animation
var activateBoost = (scene:BABYLON.Scene, ship:BABYLON.Mesh, color1:BABYLON.Color4, color2:BABYLON.Color4, camera:BABYLON.FreeCamera) => {
    if (!boostActive) {
        boostActive = true;

        const particleSystem = findMesh(ship, "jet").getConnectedParticleSystems()[0] as BABYLON.ParticleSystem;

        particleSystem.color1 = color1;
        particleSystem.color2 = color2;
        particleSystem.direction1 = new BABYLON.Vector3(0, -5, 0);
        const anim = scene.beginAnimation(camera, 0, 120, false);
        moveSpeed = 0.0004;

        setTimeout(() => {
            particleSystem.direction1 = new BABYLON.Vector3(0, -1, 0);
            moveSpeed = 0.0002;
        }, 3000);
        setTimeout(() => {
            boostActive = false;
        }, 4000);
    }
}

var fireBlasters = (scene:BABYLON.Scene, ship:BABYLON.Mesh) => {
    if (!bulletActive) {
        bulletActive = true;
        const bulletLeft = findMesh(ship, "bulletLeft");

        setTimeout(async () => {
            const anim = scene.beginAnimation(bulletLeft, 0, 10, false);

            await anim.waitAsync();
            bulletLeft.position.y = 0;
            bulletActive = false;
        });
    }
}

// Activate shield animation
var modifyShield = (scene:BABYLON.Scene, ship:BABYLON.Mesh) => {
    if (!shieldActive) {
        shieldActive = true;

        const shield = findMesh(ship, "shield");

        setTimeout(async () => {
            const anim = scene.beginAnimation(shield, 0, 90, false);

            await anim.waitAsync();
            shieldActive = false;
        });  
    }
}

// Find child mesh inside of ship
var findMesh = (ship:BABYLON.Mesh, childName:string) => {
    // 调用 getChildMeshes 谓词函数predicate
    return ship.getChildMeshes(false, (child) => {
        if (child.name == childName) {
            return true;
        }
        else {
            return false;
        }
    })[0] as BABYLON.Mesh;
}


// 改变飞船颜色
var changeShipColors = (ship:BABYLON.Mesh, color:BABYLON.Color3) => {
    const blasterLeft = findMesh(ship, "blasterLeft");
    const bulletLeft = findMesh(ship, "bulletLeft");
    const jet = findMesh(ship, "jet");
    const shield = findMesh(ship, "shield");

    (jet.material as BABYLON.StandardMaterial).emissiveColor = color;
    (blasterLeft.material as BABYLON.StandardMaterial).diffuseColor = color;
    (shield.material as BABYLON.StandardMaterial).emissiveColor = color;
    (bulletLeft.material as BABYLON.StandardMaterial).emissiveColor = color;
}

// 创建天空
var createSkybox = (scene:BABYLON.Scene) => {
	const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
    let files = [
        "textures/Space/space_left.jpg",
        "textures/Space/space_up.jpg",
        "textures/Space/space_front.jpg",
        "textures/Space/space_right.jpg",
        "textures/Space/space_down.jpg",
        "textures/Space/space_back.jpg",
    ];
    files = files.map(url=>`https://playground.babylonjs.com/${url}`)
	skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    // 不感光
	skyboxMaterial.disableLighting = true;
	skybox.material = skyboxMaterial;

    return skybox;
}

// 创建飞船
var createShip = (scene:BABYLON.Scene, camera:BABYLON.FreeCamera) => {
    
    /*** Primary part of ship ***/
    const nose = BABYLON.MeshBuilder.CreateCylinder("nose", {height: 3, diameterTop: 0, diameterBottom: 1, tessellation: 4});
    
    /*** Tail and Jet Propulsion ***/
    const tail = BABYLON.MeshBuilder.CreateCylinder("tail", {height: 1, diameterTop: 1, diameterBottom: 0.5, tessellation: 4});
    tail.position.y = -2;
    tail.parent = nose;
    const jet =  BABYLON.MeshBuilder.CreateCylinder("jet", {height: 0.5, diameterTop: 0.4, diameterBottom: 0, tessellation: 4});
    jet.position.y = -0.75;
    jet.parent = tail;
    const jetMat = new BABYLON.StandardMaterial("jetMat", scene);
    jetMat.emissiveColor = currentColor;
    jetMat.alpha = 0.5;
    jet.material = jetMat;
    
    // 发光特效
    var gl = new BABYLON.GlowLayer("glow", scene);

    // 创建粒子系统
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = jet; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.1, 0, 0); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.5, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.1;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.2;
    particleSystem.maxLifeTime = 1;

    // Emission rate
    particleSystem.emitRate = 2000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(0, -1, 0);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();

    // 创建动画
    const boostAnim = new BABYLON.Animation("boostAnim", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // 关键帧
    const boostKeys = [];
    boostKeys.push({
        frame: 0,
        value: camera.position.z
    });
    boostKeys.push({
        frame: 5,
        value: camera.position.z
    });
    boostKeys.push({
        frame: 90,
        value: camera.position.z-1
    });
    boostKeys.push({
        frame: 120,
        value: camera.position.z
    });
    boostAnim.setKeys(boostKeys);
    camera.animations.push(boostAnim);

    /*** Blasters and bullets ***/
    const blasterMat = new BABYLON.StandardMaterial("blastMat", scene);
    blasterMat.diffuseColor = currentColor;

    const blasterLeft = BABYLON.MeshBuilder.CreateCylinder("blasterLeft", {height: 2, diameterTop: 0, diameterBottom: 0.75, tessellation: 4});
    blasterLeft.position = new BABYLON.Vector3(-0.75, -0.5, 0.25);
    blasterLeft.parent = nose;
    blasterLeft.material = blasterMat;

    const blasterRight = BABYLON.MeshBuilder.CreateCylinder("blasterRight", {height: 2, diameterTop: 0, diameterBottom: 0.75, tessellation: 4});
    blasterRight.position = new BABYLON.Vector3(0.75, -0.5, 0.25);
    blasterRight.parent = nose;
    blasterRight.material = blasterMat;

    const bulletLeft = BABYLON.MeshBuilder.CreateCylinder("bulletLeft", {diameter: 0.1, height: 0.5});
    const bulletRight = BABYLON.MeshBuilder.CreateCylinder("bulletRight", {diameter: 0.1, height: 0.5});
    bulletLeft.parent = blasterLeft;
    bulletRight.parent = bulletLeft;
    bulletRight.position.x = 1.5;

    const bulletMat = new BABYLON.StandardMaterial("bulletMaterial", scene);
    bulletMat.emissiveColor = currentColor;
    bulletLeft.material = bulletMat;
    bulletRight.material = bulletMat;
    // 子弹动画
    const bulletAnim = new BABYLON.Animation("bulletAnim", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // 子弹关键帧
    const bulletKeys = [];
    bulletKeys.push({
        frame: 0,
        value: 0
    });
    bulletKeys.push({
        frame: 30,
        value: 30
    });

    bulletAnim.setKeys(bulletKeys);
    bulletLeft.animations.push(bulletAnim);

    // 创建尾翼
    /*** Wings and Shield ***/
    const wingLeft = BABYLON.MeshBuilder.CreateCylinder("wLeft", {height: 3, diameterTop: 1, diameterBottom: 0, tessellation: 4});
    wingLeft.position.x = -1.75;
    wingLeft.position.y = -3;
    wingLeft.rotate(BABYLON.Axis.Z, -Math.PI / 4);
    wingLeft.parent = nose;

    const wingRight = BABYLON.MeshBuilder.CreateCylinder("wRight", {height: 3, diameterTop: 1, diameterBottom: 0, tessellation: 4});
    wingRight.position.x = 1.75;
    wingRight.position.y = -3;
    wingRight.rotate(BABYLON.Axis.Z, Math.PI / 4);
    wingRight.parent = nose;

    const shield = BABYLON.MeshBuilder.CreateSphere("shield", {diameterX: 7, diameterY: 8, diameterZ: 2});
    shield.position.y = -2;
    shield.parent = nose;
    const shieldMat = new BABYLON.StandardMaterial("shieldMat", scene);
    shieldMat.alpha = 0.0;
    shieldMat.emissiveColor = currentColor;
    shield.material = shieldMat;

    // 创建动画
    const shieldAnim = new BABYLON.Animation("shieldAnim", "material.alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    const shieldKeys = [];

    shieldKeys.push({
        frame: 0,
        value: 0
    });
    shieldKeys.push({
        frame: 30,
        value: 0.1
    });
    shieldKeys.push({
        frame: 60,
        value: 0.1
    });
    shieldKeys.push({
        frame: 90,
        value: 0
    });

    shieldAnim.setKeys(shieldKeys);

    shield.animations.push(shieldAnim);

    nose.setPivotPoint(new BABYLON.Vector3(0, -2.25, 0));
    nose.rotate(BABYLON.Axis.X, Math.PI / 2);
    return nose;
}

//#endregion

//#region demo2 代码部分

// 设备检查及显示 深入的值
const demo2 = (scene:BABYLON.Scene)=>{
    // 创建相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // GUI 创建GUI文字显示
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var lastConnected = new GUI.TextBlock();
    lastConnected.text = "onDeviceConnectedObservable:\nnone";
    lastConnected.color = "white";
    lastConnected.fontSize = 24;
    lastConnected.verticalAlignment = GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
    lastConnected.horizontalAlignment = GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    lastConnected.width = .5;
    lastConnected.height = .3;

    var lastDisconnected = new GUI.TextBlock();
    lastDisconnected.text = "onDeviceDisconnectedObservable:\nnone";
    lastDisconnected.color = "white";
    lastDisconnected.fontSize = 24;
    lastDisconnected.verticalAlignment = GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
    lastDisconnected.horizontalAlignment = GUI.TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
    lastDisconnected.width = .5;
    lastDisconnected.height = .3;

    var inputChanged = new GUI.TextBlock();
    inputChanged.text = "Press keys or mouse buttons";
    inputChanged.color = "white";
    inputChanged.fontSize = 24;
    inputChanged.verticalAlignment = GUI.TextBlock.VERTICAL_ALIGNMENT_CENTER;
    inputChanged.horizontalAlignment = GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
    inputChanged.width = 1;
    inputChanged.height = .3;

    advancedTexture.addControl(lastConnected);
    advancedTexture.addControl(lastDisconnected);
    advancedTexture.addControl(inputChanged);

    // Create Personal Instance of DeviceSourceManager
    // 创建 DeviceSourceManager 实例
    const deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());

    /**
     * onDeviceConnectedObservable is fired after a device is connected so any code that we
     * put in here should be able to reliably work against an existing device.
     * 
     * For onInputChangedObservable, this will only work with Mouse, Touch, and Keyboards because
     * the Gamepad API currently does not fire input changed events (polling only)
     */
    deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
        // 显示设备类型
        lastConnected.text = `onDeviceConnectedObservable:\n${BABYLON.DeviceType[deviceSource.deviceType]}`;

        // If Mouse/Touch, add an Observer to change text
        if (deviceSource.deviceType === BABYLON.DeviceType.Mouse || deviceSource.deviceType === BABYLON.DeviceType.Touch) {
            deviceSource.onInputChangedObservable.add((eventData) => {
                // 显示输入键值
                if (eventData.inputIndex !== BABYLON.PointerInput.Move) {
                    inputChanged.text = `onInputChangedObservable inputIndex\n${BABYLON.DeviceType[deviceSource.deviceType]}(${BABYLON.PointerInput[eventData.inputIndex]})`;
                }
            });
        }
        // If Keyboard, add an Observer to change text
        else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
            deviceSource.onInputChangedObservable.add((eventData) => {
                inputChanged.text = `onInputChangedObservable inputIndex\n${BABYLON.DeviceType[deviceSource.deviceType]}(${eventData.inputIndex})`;
            });
        }
    });

    /**
     * onDeviceDisconnectedObservable is fired after a device has been disconnected and removed from the
     * DeviceSourceManager.
     */
    //显示断连的设备
    deviceSourceManager.onDeviceDisconnectedObservable.add((deviceSource) => {
        lastDisconnected.text = `onDeviceDisconnectedObservable:\n${BABYLON.DeviceType[deviceSource.deviceType]}`;
    });

}

//#endregion