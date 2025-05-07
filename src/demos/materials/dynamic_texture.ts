import { BABYLON } from "../../base/commonIncludes";

// 场景基本的构建方法
export const dynamicTextureScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    
    // // 测试案例
    // demo1(scene, canvas);
    // demo2(scene, canvas);
    // demo3(scene, canvas);
    // demo4(scene, canvas);
    // demo5(scene, canvas);
    // demo6(scene, canvas);
    // demo7(scene, canvas);
    demo8(scene, canvas);
        
    return scene;
}

// 绘制简单图案
const demo1 = (scene:BABYLON.Scene, canvas:HTMLCanvasElement)=>{
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, 0, 25, BABYLON.Vector3.Zero(), scene);
	// 绑定相机事件
    camera.attachControl(canvas, true);

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: 10, height: 10, subdivisions: 25}, scene);

    // canvas 的大小
    var canvasSize = 1024;
    var canvas = document.createElement('canvas');
    canvas.id = "newCanvas";
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    // 不可见
    canvas.hidden = true;

    // 加入到 body
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);

    // get added canvas
    const newCanvas = document.getElementById("newCanvas") as HTMLCanvasElement;

    // 利用canvas进行绘制
    var ctx = newCanvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvasSize/2, canvasSize/2);
    ctx.fillStyle = "green";
    ctx.fillRect(canvasSize/2, 0, canvasSize/2, canvasSize/2);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, canvasSize/2, canvasSize/2, canvasSize/2);
    ctx.fillStyle = "purple";
    ctx.fillRect(canvasSize/2, canvasSize/2, canvasSize/2, canvasSize/2);

    // 创建动态纹理添加canvas
	var textureGround = new BABYLON.DynamicTexture("dynamic texture", newCanvas, scene);   
    
    // 更新贴图
    textureGround.update();

    // 创建地面材质
    var materialGround = new BABYLON.BackgroundMaterial("backgroundMaterial", scene);
    // 设置动态贴图
	materialGround.diffuseTexture = textureGround;
    // 设置地面材质
	ground.material = materialGround;
		
    // 创建移除前执行
    scene.onDisposeObservable.add(() => {
        (document.getElementById("newCanvas") as HTMLCanvasElement).remove();
    });

}

// 绘制文字
const demo2 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, BABYLON.Vector3.Zero(), scene);
	// 绑定事件
    camera.attachControl(canvas, true);

    // 创建一个半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	// 设置光线强度
    light.intensity = 0.7;

    // 地面的床
	var groundWidth = 20;
    // 地面的宽
    var groundHeight = 10;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 25}, scene);

    //Create dynamic texture
    //  动态纹理的大小
    var textureResolution = 512;
    // 创建一个动态纹理
	var textureGround = new BABYLON.DynamicTexture("dynamic texture", {width:512, height:256}, scene);   
	// 动态纹理的上下文
    var textureContext = textureGround.getContext();
	
    // 创建一个材质
	var materialGround = new BABYLON.StandardMaterial("Mat", scene);
    // 设置纹理为动态纹理    				
	materialGround.diffuseTexture = textureGround;
    // 设置材质
	ground.material = materialGround;
	
    // 文字样式
    var font = "bold 44px monospace";
    // 添加文字
    /**
     * @param text — defines the text to be drawn
     * @param x — defines the placement of the text from the left
     * @param y — defines the placement of the text from the top when invertY is true and from the bottom when false
     * @param font — defines the font to be used with font-style, font-size, font-name
     * @param color — defines the color used for the text
     * @param fillColor — defines the color for the canvas, use null to not overwrite canvas (this bleands with the background to replace, use the clear function)
     * @param invertY — defines the direction for the Y axis (default is true - y increases downwards)
     * @param update — defines whether texture is immediately update (default is true)
     */
    textureGround.drawText("Grass", 75, 135, font, "green", "white", true, true);
	
}

// 绘制一个气泡图案
const demo3 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建一个轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, BABYLON.Vector3.Zero(), scene);
	// 绑定相机事件
    camera.attachControl(canvas, true);

    // 创建一个半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	// 光的强度
    light.intensity = 0.7;

    // 地面大小
	var groundWidth = 20;
    var groundHeight = 10;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 25}, scene);

    // 动态纹理的大小
    var textureResolution = 512;
    // 创建要给动态纹理
	var textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);   
	// 动态纹理的上下文
    var textureContext = textureGround.getContext();
	
    // 定义地面的材质
	var materialGround = new BABYLON.StandardMaterial("Mat", scene);    
    // 设置材质的贴图为动态贴图				
	materialGround.diffuseTexture = textureGround;
    // 设置材质
	ground.material = materialGround;
		
    // 绘制 canvas
    textureContext.beginPath();
    textureContext.moveTo(75*2, 25*2);
    textureContext.quadraticCurveTo(25*2, 25*2, 25*2, 62.5*2);
    textureContext.quadraticCurveTo(25*2, 100*2, 50*2, 100*2);
    textureContext.quadraticCurveTo(50*2, 120*2, 30*2, 125*2);
    textureContext.quadraticCurveTo(60*2, 120*2, 65*2, 100*2);
    textureContext.quadraticCurveTo(125*2, 100*2, 125*2, 62.5*2);
    textureContext.quadraticCurveTo(125*2, 25*2, 75*2, 25*2);
    textureContext.fillStyle = "white";
    textureContext.fill();
    // 更新动态纹理
    textureGround.update();

    return scene;

}

// 绘制图片
const demo4 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, BABYLON.Vector3.Zero(), scene);
	// 绑定事件
    camera.attachControl(canvas, true);

    // 创建半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	// 设置光的强度
    light.intensity = 0.7;

    // 地面大小
	var groundWidth = 20;
    var groundHeight = 10;

    // 创建一个地面
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 25}, scene);

    // 动态纹理的大小
    var textureResolution = 512;
    // 创建动态纹理
    /**
     * @param name — defines the name of the texture
     * @param options — provides 3 alternatives for width and height of texture, a canvas, object with width and height properties, number for both width and height
     * @param scene — defines the scene where you want the texture
     * @param generateMipMaps — defines the use of MinMaps or not (default is false)
     * @param samplingMode — defines the sampling mode to use (default is Texture.TRILINEAR_SAMPLINGMODE)
     * @param format — defines the texture format to use (default is Engine.TEXTUREFORMAT_RGBA)
     * @param invertY — defines if the texture needs to be inverted on the y axis during loading
     */
	var textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);   
	
	// 获取上下文
    var textureContext = textureGround.getContext();
    // 创建标准材质
	var materialGround = new BABYLON.StandardMaterial("Mat", scene);    
    // 设置贴图为动态纹理				
	materialGround.diffuseTexture = textureGround;
    // 设置材质
	ground.material = materialGround;
	
	// 定义一个图片对象
    var img = new Image();
	img.src = './textures/grass.png';
    // 图片加载完成后调用
	img.onload = function() {
 
        //绘制图片到动态纹理
        textureContext.drawImage(this, 0, 0);
        // 更新纹理
		textureGround.update();
        
         /**
         * Draws the specified image. This method is available in multiple formats, providing a great deal of flexibility in its use.
         * @param image An element to draw into the context.
         * @param sx The x-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
         * @param sy The y-axis coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.
         * @param sWidth The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.
         * @param sHeight The height of the sub-rectangle of the source image to draw into the destination context.
         * @param dx The x-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
         * @param dy The y-axis coordinate in the destination canvas at which to place the top-left corner of the source image.
         * @param dWidth The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
         * @param dHeight The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
         */
        // 拉升图片绘制
        textureContext.drawImage(this, 10, 490, 10, 12, 156, 136, 200, 220)
        // 更新纹理
		textureGround.update();	

    }	
}

// 动态变换
const demo5 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
     // 创建一个轨道相机
     const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/2, 10, BABYLON.Vector3.Zero(), scene);
     // 限定最小alpha的角度
     camera.lowerAlphaLimit = -3;
     // 限定最大alpha的角度
     camera.upperAlphaLimit = -0.125;
 
     // 设置相机朝向
     camera.setTarget(BABYLON.Vector3.Zero());
 
     // 绑定事件
     camera.attachControl(canvas, true);
 
     // 创建一个直射灯
     const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-0.5, -0.5, 1), scene);
 
     // 光的强度
     light.intensity = 0.7;
 
     // 创建一个平面
     const plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 4}, scene);
 
     // 创建一个材质
     const planeMat = new BABYLON.StandardMaterial("planeMat", scene);
     // 设置平面材质
     plane.material = planeMat;
 
     // 动态纹理的大小
     const texSize = 512;
     // 创建动态纹理
     const dynTex = new BABYLON.DynamicTexture("decalTex", {width: texSize, height: texSize}, scene);
     // 得到动态纹理的上下文
     const context = dynTex.getContext();
 
     // 设置材质的贴图为动态纹理
     planeMat.diffuseTexture = dynTex;
 
     let offset = 0.0;
     scene.onBeforeRenderObservable.add(() => {
         // 清空画布
         context.clearRect(0, 0, texSize, texSize);
 
         // 保存当前的状态
         context.save();
 
         // 设置填充色
         context.fillStyle = "DarkRed";
         // 填充整个画布
         context.fillRect(0, 0, texSize, texSize);
 
         // 定义画布的位置与大小
         const left = 0;
         const top = texSize - (texSize * 0.25);
         const width = 0.25 * texSize;
         const height = 0.25 * texSize;
 
         // 定义画布的相对位置
         const offsetU = ((Math.sin(offset) * 0.5) + 0.5) * (texSize - (texSize * 0.25));
         const offsetV = ((Math.sin(offset) * 0.5) + 0.5) * (-texSize + (texSize * 0.25));
 
         // 旋转变化画布
         const rectangleU = width * 0.5 + left;
         const rectangleV = height * 0.5 + top;
         // 执行平移动画
         context.translate(rectangleU + offsetU, rectangleV + offsetV);
 
         //智享会旋转动画
         context.rotate(offset);
 
         // 定义画布颜色
         context.fillStyle = "DarkOrange";
         // 填充画布颜色
         context.fillRect(-width * 0.5, -height * 0.5, width, height);
 
         // 恢复最初的状态
         context.restore();
 
         // 更新画布
         dynTex.update();
 
         // 旋转系数
         offset += 0.01;
     })
}

// 背景图合并
const demo6 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3, 25, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = 0.7;

    // 创建地面
	var groundWidth = 20;
    var groundHeight = 10;
    var ground = BABYLON.MeshBuilder.CreateGround("ground1", {width: groundWidth, height: groundHeight, subdivisions: 25}, scene);

    // 创建动态纹理
    var textureResolution = 512;
	var textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);   
	var textureContext = textureGround.getContext();
	
    // 创建材质，设置动态纹理
	var materialGround = new BABYLON.StandardMaterial("Mat", scene);    				
	materialGround.diffuseTexture = textureGround;
	ground.material = materialGround;
	
	
    var img = new Image();
	img.src = './textures/grass.png';
	img.onload = function() {
        // 绘制图片
        textureContext.drawImage(this, 0, 0);
        // 更新
		textureGround.update();	

        // 绘制气泡
        textureContext.beginPath();
        textureContext.moveTo(75*2, 25*2);
        textureContext.quadraticCurveTo(25*2, 25*2, 25*2, 62.5*2);
        textureContext.quadraticCurveTo(25*2, 100*2, 50*2, 100*2);
        textureContext.quadraticCurveTo(50*2, 120*2, 30*2, 125*2);
        textureContext.quadraticCurveTo(60*2, 120*2, 65*2, 100*2);
        textureContext.quadraticCurveTo(125*2, 100*2, 125*2, 62.5*2);
        textureContext.quadraticCurveTo(125*2, 25*2, 75*2, 25*2);
        textureContext.fillStyle = "white";
        textureContext.fill();
        // 更新
        textureGround.update();

        // 添加文字
        var font = "bold 44px monospace";
        textureGround.drawText("Grass", 75, 135, font, "green", null, true, true);
    }	
}

// 适配文字到面上
const demo7 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1",  -Math.PI / 2.5, Math.PI / 3, 25, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
   
    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, -1), scene);
    light.intensity = 0.9;

    
    // 设置字体格式
    var font_type = "Arial";
	
	// 设置画布大小
    var planeWidth = 10;
    var planeHeight = 3;

    // 创建平面
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);

    // 动态纹理贴图的大小
    var DTWidth = planeWidth * 60;
    var DTHeight = planeHeight * 60;

    // 设置文字内容
    var text = "Some words to fit";
    
    // 创建动态纹理
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene);

    // 获取canvas2D上下文
    var ctx = dynamicTexture.getContext();
    // 定义文字大小
	var size = 12; //any value will work
    // 设置字体样式
    ctx.font = size + "px " + font_type;
    // 测量所有文字的宽度
    var textWidth = ctx.measureText(text).width;
    
    //计算文字的总宽度与字号大小的比例
    var ratio = textWidth/size;
	
	//根据纹理的宽度， 计算出合适的文字字号
    var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
   // 定义文字格式
    var font = font_size + "px " + font_type;
	
	// 绘制文字
    dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);

    //创建材质
    var mat = new BABYLON.StandardMaterial("mat", scene);
    // 设置动态纹理贴图
    mat.diffuseTexture = dynamicTexture;
    
    // 应用材质
    plane.material = mat;
}

// 适配面到文字
const demo8 = (scene:BABYLON.Scene,  canvas:HTMLCanvasElement)=>{
    // 创建相机
    var camera = new BABYLON.ArcRotateCamera("camera1",  -Math.PI / 2.5, Math.PI / 3, 25, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    
    // 创建灯光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 0, -1), scene);
    light.intensity = 0.9;

    
    // 文字大小
    var font_size = 48;
	var font = "bold " + font_size + "px Arial";
	
	//  设置面的高度
    var planeHeight = 3;
    
    // 设置纹理的期待高度
    var DTHeight = 1.5 * font_size; //or set as wished
    
    // 计算面高度与纹理高度的比率
    var ratio = planeHeight/DTHeight;
	
	// 绘制的文字
    var text = "Some words";
	
	// 创建动态纹理
    var temp = new BABYLON.DynamicTexture("DynamicTexture", 64, scene);
	var tmpctx = temp.getContext();
	tmpctx.font = font;
    // 测量文字的宽度，并保留8px
    var DTWidth = tmpctx.measureText(text).width + 8;
    
    // 根据比例，计算面的纹理宽度
    var planeWidth = DTWidth * ratio;

    // 创建动态纹理
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene, false);
    // 创建材质，设置动态纹理
    var mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = dynamicTexture;
    dynamicTexture.drawText(text, null, null, font, "#000000", "#ffffff", true);
    
    //创建面， 设置材质
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene);
    plane.material = mat;
}