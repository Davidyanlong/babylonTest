import { BABYLON } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 场景基本的构建方法
export const meshFacesScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {

    // 创建一个场景
    var scene = new BABYLON.Scene(engine);
    // 清屏色
    scene.clearColor = new BABYLON.Color4(.5, .5, .5);

    // 创建轨道相机
    var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, Math.PI / 2.2, 5, new BABYLON.Vector3(0, 0, 0), scene);
   
    camera.setPosition(new BABYLON.Vector3(0, 0, -20));
    // 绑定事件
    camera.attachControl(canvas, true);

    // 创建半球光
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // 光的强度
    light.intensity = 0.7;

    // 创建半球光
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
    // 光的强度
    light1.intensity = 0.5;

    // 创建一个点光源
    var pl = new BABYLON.PointLight("pl", BABYLON.Vector3.Zero(), scene);
    // 设置光强度
    pl.intensity = 0.5;

    // 创建一个材质
    var mat = new BABYLON.StandardMaterial("mat", scene);
  


 
    // const options = demo1(scene, mat);
    // const options = demo2(scene, mat);
    // const options = demo3(scene, mat);
    // const options = demo4(scene, mat);
    // const options = demo5(scene, mat);
     // 创建box, 设置UV 的faceUV
    //  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    //  box.material = mat;
    //  showAxis(1, scene);


    // demo6(scene, mat);
    // demo7(scene, mat);

    // demo9(scene, mat);

    // demo10(scene,mat);
    // faces colors
    // demo11(scene);
    // demo12(scene);
    // demo13(scene,mat);
    demo14(scene,mat);
   

   

    scene.registerBeforeRender(function () {
        pl.position = camera.position;
    });


    return scene;
}

const demo1 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{

      // 创建一个贴图， 横向的 1， 2， 3， 4， 5 
      var texture = new BABYLON.Texture("https://i.imgur.com/lXehwjZ.jpg", scene);
      // 设置材质的贴图
      mat.diffuseTexture = texture;
  

    // 六列
    var columns = 6;  // 6 columns
    // 一行
    var rows = 1;  // 1 row

       // 面UV 拆分
     var faceUV = new Array(6);
        /**
     * side 0 faces the positive z direction
     * side 1 faces the negative z direction
     * side 2 faces the positive x direction
     * side 3 faces the negative x direction
     * side 4 faces the positive y direction
     * side 5 faces the negative y direction
     */




    // 设置每一个面的UV
    for (var i = 0; i < 6; i++) {
        // x, y ,width, height
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
    // 设置warp 方式
    var options = {
        faceUV: faceUV,
        wrap: true
    };
    
    return options;
}


const demo2 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;

    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    // 长 宽 高
    var options = {
        width: 1,
        height: 1,
        depth: 1,
        faceUV: faceUV
    };

    return options;

} 

const demo3 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;


    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    faceUV[1] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
    };

    return options;

}


const demo4 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;


    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    //set all values to zero
    for (var i = 0; i < 6; i++) {
        // UV 不设置
        faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
    }

    faceUV[1] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
    };

    return options;

}


const demo5 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;
    mat.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);

    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    //set all values to zero
    for (var i = 0; i < 6; i++) {
        // UV 不设置
        faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
    }

    let x = 3 / columns;
    let y = 0;
    let z = (3 + 1) / columns;
    let w = 1 / rows;
    // 设置faceUV
    faceUV[1] = new BABYLON.Vector4(x, y, z, w)

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceUV: faceUV
    };

    return options;

}



const demo6 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;


    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    //alien sprite
    var faceUV_alien = new Array(6);

    // 设置相同的面
    for (var i = 0; i < 6; i++) {
        faceUV_alien[i] = new BABYLON.Vector4(3 / columns, 0, (3 + 1) / columns, 1 / rows);
    }

    var options_alien = {
        faceUV: faceUV_alien
    };

    var box_alien = BABYLON.MeshBuilder.CreateBox('box_alien', options_alien, scene);
    box_alien.material = mat;
    box_alien.position.y = 0.75;

    //knight sprite
    var faceUV_knight = new Array(6);

    // 设置相同的面
    for (var i = 0; i < 6; i++) {
        faceUV_knight[i] = new BABYLON.Vector4(2 / columns, 1 / rows, 3 / columns, 2 / rows);
    }

    var options_knight = {
        faceUV: faceUV_knight
    };

    var box_knight = BABYLON.MeshBuilder.CreateBox('box_knight', options_knight, scene);
    box_knight.material = mat;
    box_knight.position.y = -0.75;
}

const demo7 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;

    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(0, 0, 1 / columns, 1 / rows);
    }

    //overwrite face with sprite coordinates
    var Ubottom_left = 3 / columns;
    var Vbottom_left = 0;
    var Utop_right = (3 + 1) / columns;
    var Vtop_right = 1 / rows;
    faceUV[1] = new BABYLON.Vector4(Ubottom_left, Vbottom_left, Utop_right, Vtop_right);

    var options = {
        faceUV: faceUV
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;
    box.position.y = 1.75;

    //Reflect in Vertical Line - Swap U (horizontal) coordinates
    var faceUV_V_reflect = faceUV.concat([]); // shallow clone
    faceUV_V_reflect[1] = new BABYLON.Vector4(Utop_right, Vbottom_left, Ubottom_left, Vtop_right);

    var options_V_reflect = {
        faceUV: faceUV_V_reflect
    };

    var box_V_reflect = BABYLON.MeshBuilder.CreateBox('box', options_V_reflect, scene);
    box_V_reflect.material = mat;
    box_V_reflect.position.y = 0.25;

    //Reflect in Horizontal Line - Swap V (vertical) coordinates
    var faceUV_H_reflect = faceUV.concat([]); // shallow clone
    faceUV_H_reflect[1] = new BABYLON.Vector4(Ubottom_left, Vtop_right, Utop_right, Vbottom_left);

    var options_H_reflect = {
        faceUV: faceUV_H_reflect
    };

    var box_H_reflect = BABYLON.MeshBuilder.CreateBox('box', options_H_reflect, scene);
    box_H_reflect.material = mat;
    box_H_reflect.position.y = -1.25;

    //Refect in Vertical and Horizontal Lines - Swap U and V coordinates
    var faceUV_VH_reflect = faceUV.concat([]); // shallow clone
    faceUV_VH_reflect[1] = new BABYLON.Vector4(Utop_right, Vtop_right, Ubottom_left, Vbottom_left);

    var options_VH_reflect = {
        faceUV: faceUV_VH_reflect
    };

    var box_VH_reflect = BABYLON.MeshBuilder.CreateBox('box', options_VH_reflect, scene);
    box_VH_reflect.material = mat;
    box_VH_reflect.position.x = 1.5;
    box_VH_reflect.position.y = 0.25
}

const demo8 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("http://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseTexture = texture;

    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(0, 0, 1 / columns, 1 / rows);
    }

    //overwrite face with sprite coordinates
    var Ubottom_left = 3 / columns;
    var Vbottom_left = 0;
    var Utop_right = (3 + 1) / columns;
    var Vtop_right = 1 / rows;
    faceUV[1] = new BABYLON.Vector4(Ubottom_left, Vbottom_left, Utop_right, Vtop_right);

    var options = {
        faceUV: faceUV
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;
    box.position.y = 1.75;

    //Reflect in Vertical Line - Swap U (horizontal) coordinates
    var faceUV_V_reflect = faceUV.concat([]); // shallow clone
    faceUV_V_reflect[1] = new BABYLON.Vector4(Utop_right, Vbottom_left, Ubottom_left, Vtop_right);

    var options_V_reflect = {
        faceUV: faceUV_V_reflect
    };

    var box_V_reflect = BABYLON.MeshBuilder.CreateBox('box', options_V_reflect, scene);
    box_V_reflect.material = mat;
    box_V_reflect.position.y = 0.25;

    //Reflect in Horizontal Line - Swap V (vertical) coordinates
    var faceUV_H_reflect = faceUV.concat([]); // shallow clone
    faceUV_H_reflect[1] = new BABYLON.Vector4(Ubottom_left, Vtop_right, Utop_right, Vbottom_left);

    var options_H_reflect = {
        faceUV: faceUV_H_reflect
    };

    var box_H_reflect = BABYLON.MeshBuilder.CreateBox('box', options_H_reflect, scene);
    box_H_reflect.material = mat;
    box_H_reflect.position.y = -1.25;

    //Refect in Vertical and Horizontal Lines - Swap U and V coordinates
    var faceUV_VH_reflect = faceUV.concat([]); // shallow clone
    faceUV_VH_reflect[1] = new BABYLON.Vector4(Utop_right, Vtop_right, Ubottom_left, Vbottom_left);

    var options_VH_reflect = {
        faceUV: faceUV_VH_reflect
    };

    var box_VH_reflect = BABYLON.MeshBuilder.CreateBox('box', options_VH_reflect, scene);
    box_VH_reflect.material = mat;
    box_VH_reflect.position.x = 1.5;
    box_VH_reflect.position.y = 0.25
}


const demo9 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://i.imgur.com/vxH5bCg.jpg", scene);
    mat.diffuseTexture = texture;

    var faceUV = new Array(6);

    //set all faces
    faceUV[0] = new BABYLON.Vector4(0, 0.5, 1 / 3, 1);
    faceUV[1] = new BABYLON.Vector4(1 / 3, 0, 2 / 3, 0.5);
    faceUV[2] = new BABYLON.Vector4(2 / 3, 0, 1, 0.5);
    faceUV[3] = new BABYLON.Vector4(0, 0, 1 / 3, 0.5);
    faceUV[4] = new BABYLON.Vector4(1 / 3, 0.5, 2 / 3, 1);
    faceUV[5] = new BABYLON.Vector4(2 /3, 0.5, 1, 1);

    //wrap set
    var options = {
        faceUV: faceUV,
        wrap: true
    };


    var head = BABYLON.MeshBuilder.CreateBox('head', options, scene);
    head.material = mat;
}

const demo10 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://i.imgur.com/zVMIM8r.jpg", scene);
    mat.diffuseTexture = texture;

    // 顶一个六个面的UV
    var faceUV = new Array(6);

    // 六列
    var columns = 6;  // 6 columns
    // 一行
    var rows = 1;  // 1 row

    // 根据顺序获取， U 方向为 i/columns (i+1)/columns    V方向为 0， 1/rows
    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var options = {
        faceUV: faceUV
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;
}

// faces color
const demo11 =  (scene:BABYLON.Scene)=>{
   
    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceColors = new Array(6);

    faceColors[4] = new BABYLON.Color4(1,0,0,1);   // red top
    faceColors[1] = new BABYLON.Color4(0,1,0,1);   // green front

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceColors: faceColors
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);

}


const demo12 =  (scene:BABYLON.Scene)=>{
   
    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    //inner box
    var faceColors_inner = new Array(6);

    faceColors_inner[4] = new BABYLON.Color4(0,1,0,1);   // green top
    faceColors_inner[1] = new BABYLON.Color4(0,0,1,1);   // blue front

    var options_inner = {
        width: 3,
        height: 1,
        depth: 2,
        faceColors: faceColors_inner
    };

    var box_inner = BABYLON.MeshBuilder.CreateBox('box_inner', options_inner, scene);

    //outer box with transparent colors
    var faceColors = new Array(6);

    faceColors[4] = new BABYLON.Color4(1,0,0,0.25);   // red top
    faceColors[1] = new BABYLON.Color4(0,1,0,0.25);   // green front

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        faceColors: faceColors
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    // 顶点着色，加入透明度
    box.hasVertexAlpha = true;

}

// 面颜色与面贴图混合
const demo13 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    var texture = new BABYLON.Texture("https://jerome.bousquie.fr/BJS/images/spriteAtlas.png", scene);
    mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
    mat.diffuseTexture = texture;

    var columns = 6;  // 6 columns
    var rows = 4;  // 4 rows

    var faceColors = new Array(6);

    faceColors[4] = new BABYLON.Color4(1,0,0,1);   // red top
    faceColors[1] = new BABYLON.Color4(0,1,0,1);   // green front

    var faceUV = new Array(6);

    for (var i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }

    var options = {
        width: 10,
        height: 3,
        depth: 5,
        // 面UV
        faceUV: faceUV,
        // 面颜色
        faceColors: faceColors
    };

    var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
    box.material = mat;

}


const demo14 = (scene:BABYLON.Scene, mat:BABYLON.StandardMaterial)=>{
    mat.diffuseTexture = new BABYLON.Texture("https://i.imgur.com/Q6i4ZiX.jpg", scene)
	
	var faceUV = [];
    // 圆柱侧面
	faceUV[0] =	new BABYLON.Vector4(0, 0, 0, 0);
    // 圆柱底面
    faceUV[1] =	new BABYLON.Vector4(1, 0, 0.32, 1);
    // 圆柱顶面
    faceUV[2] = new BABYLON.Vector4(20/866, 12/319, 216/866, (319-30)/319);
	
	

    var faceColors = [ ];
    faceColors[0] = new BABYLON.Color4(0.5, 0.5, 0.5, 1)
	
    // 当定义圆的直径是1， 周长就是PI， 圆筒的一周就是 PI 的长度，于是高就是 h/pi = 319/866

    // width 866 pixels and height 319 pixels.
    // So make h = π * 319/866 = 1.16 to 2 decimal places.

	var can = BABYLON.MeshBuilder.CreateCylinder("can", {height:1.16, faceUV: faceUV, faceColors: faceColors,tessellation:64}, scene);
	can.material = mat;
}