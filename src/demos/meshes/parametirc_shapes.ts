import { BABYLON, earcut, GUI } from "../../base/commonIncludes";
import { showAxis } from "../../utils/axis";

// 预设的一些几何图形
export const parametricMeshScene = function (engine:BABYLON.Engine, canvas:HTMLCanvasElement) {


    // 创建一个场景， 场景渲染引擎对象
    const scene = new BABYLON.Scene(engine);

    // 创建一个自由相机
    const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    // 为相机绑定canvas，进行相关事件获取 
    camera.attachControl(canvas, true);

    // 创建一个半球光
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    // 设置光的强度
    light.intensity = 0.7;
    // light.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    // 创建几何图形
    // demo1(scene);
    // demo2(scene);
    // demo3(scene);
    // demo4(scene);
    // demo5(scene);
    // demo6(scene);
    // demo7(scene);
    // demo8(scene);
    // demo9(scene);
    // demo10(scene);
    // demo11(scene);
    // demo12(scene);
    // demo13(scene);
    // demo14(scene);
    // demo15(scene);
    // demo16(scene);
    // demo17(scene);
    // demo18(scene);
    // demo19(scene);
    // demo20(scene);
    // demo21(scene);
    // demo22(scene);
    // demo23(scene);
    // demo24(scene);
    // demo25(scene);
    // demo26(scene);
    // demo27(scene);
    // demo28(scene);
    // demo29(scene);
    // demo30(scene);
    // demo31(scene);
    // demo32(scene);
    // demo33(scene);
    // demo34(scene);
    // demo35(scene);
    // demo36(scene);
    // demo37(scene);
    // demo38(scene);
    // demo39(scene);
    // demo40(scene);
    // demo41(scene);
    // demo42(scene);
    // demo43(scene);
    // demo44(scene);
    // demo45(scene);
    // demo46(scene);
    // demo47(scene);
    demo48(scene); 
    return scene;
}

// #region 创建线条

// 创建简单线条
const demo1 = (scene: BABYLON.Scene) =>{
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0),
    ]
    /**
     * option	value	default value
     * points	(Vector3[]) array of Vector3, the path of the line REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */
    const lines:BABYLON.LinesMesh = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints});

}

// 创建封闭线条
const demo2 = (scene: BABYLON.Scene) =>{
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ]

    myPoints.push(myPoints[0]);
      /**
     * option	value	default value
     * points	(Vector3[]) array of Vector3, the path of the line REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */
    const lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints});

}

// 创建 更新线条
const demo3 = (scene: BABYLON.Scene) =>{
    // 初始线条点
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0),
    ]
    // 封闭
    myPoints.push(myPoints[0]);

    const options:{
        points: BABYLON.Vector3[];
        updatable?: boolean;
        instance?: BABYLON.Nullable<BABYLON.LinesMesh>;
        colors?: BABYLON.Color4[];
        useVertexAlpha?: boolean;
        material?: BABYLON.Material;
    } = {
        points: myPoints,
        // 可动态修改
        updatable: true
    }
    
    // 创建线条
    let lines = BABYLON.MeshBuilder.CreateLines("lines", options);

    // 修改原神数据
    options.points[0] = new BABYLON.Vector3(-2, 1, -1);
    options.points[1] = new BABYLON.Vector3(0, -1, 0);
    options.points[2] = new BABYLON.Vector3(2, 0, 0);
    options.points[3] = new BABYLON.Vector3(-1, -2, 0);

    // 设置已经存在的实例对象 instance
    options.instance = lines;
    setTimeout(()=>{
        lines = BABYLON.MeshBuilder.CreateLines("lines", options);

    },2000)

}


// 创建 缠绕线条
const demo4 = (scene: BABYLON.Scene) =>{
    
    // 所有缠绕线上的点 
	let myPoints = [];

    const deltaTheta = 0.1;
    let deltaY = 0.005;

    let radius = 1;
    let theta = 0;
    let Y = 0;
    for (let i = 0; i < 400; i++) {
        myPoints.push(new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
        theta += deltaTheta;
        Y += deltaY
    }
	
	// 创建线条
	let lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints, updatable: true}); 

    deltaY = 0.001;

    radius = 0.25;
    theta = 0;
    Y = 0;
    for (let i = 0; i<myPoints.length; i++) {
        myPoints[i] = (new BABYLON.Vector3(radius * Math.cos(theta), Y, radius * Math.sin(theta)));
        theta += deltaTheta;
        Y += deltaY
    }
    setTimeout(()=>{
	    //Update lines - comment line 40 to see original
	    lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints, instance: lines}); 
    },2000)

}


// 创建 多颜色的线条
const demo5 = (scene: BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ]

    myPoints.push(myPoints[0]);

    const myColors = [
        new BABYLON.Color4(1, 0, 0, 1),
        new BABYLON.Color4(0, 1, 0, 1),
        new BABYLON.Color4(0, 0, 1, 1),
        new BABYLON.Color4(1, 1, 0, 1)
    ]
    
    const lines = BABYLON.MeshBuilder.CreateLines("lines", {
        points: myPoints, 
        colors: myColors
    });


}

// #endregion


// #region 创建虚线 Dashed Lines

// 创建Dashed Lines
const demo6 = (scene:BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ]
    
    /**
     * 
     * option	value	default value
     * points	(Vector3[]) array of Vector3, the path of the line REQUIRED	
     *  
     * dashSize	(number) size of the dashes	3
     * gapSize	(number) size of the gaps	1
     * dashNb	(number) intended number of dashes	200
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line mesh to be updated	null
     */
    const lines = BABYLON.MeshBuilder.CreateDashedLines("lines", {points: myPoints});

}


// 创建Dashed Lines 参数设置
const demo7 = (scene:BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0),
        new BABYLON.Vector3(3, 2, 0)
    ];

    const options = {
        points: myPoints,
        dashSize: 1000,
        gapSize: 500,
        dashNb: 16
    }
        /**
     * 
     * option	value	default value
     * points	(Vector3[]) array of Vector3, the path of the line REQUIRED	
     *  
     * // 单一段虚线的长度（dashSize 与 gapSize 是一个比例关系）
     * dashSize	(number) size of the dashes	3
     * // 虚线空挡的长度
     * gapSize	(number) size of the gaps	1
     * // 虚线的段数
     * dashNb	(number) intended number of dashes	200
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line mesh to be updated	null
     */
    const lines = BABYLON.MeshBuilder.CreateDashedLines("lines", options);


}

// 创建Dashed Lines 封闭区域
const demo8 = (scene:BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ];

    myPoints.push(myPoints[0]);

    const options = {
        points: myPoints,
        dashSize: 1000,
        gapSize: 500,
        dashNb: 80
    }
    
    const lines = BABYLON.MeshBuilder.CreateDashedLines("lines", options);

}



// 创建Dashed Lines 封闭区域 动态更新
const demo9 = (scene:BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ];

    myPoints.push(myPoints[0]);

    const options: {
        points: BABYLON.Vector3[];
        dashSize?: number;
        gapSize?: number;
        dashNb?: number;
        updatable?: boolean;
        instance?: BABYLON.LinesMesh;
        useVertexAlpha?: boolean;
        material?: BABYLON.Material;
    } = {
        points: myPoints,
        dashSize: 2,
        gapSize: 1,
        dashNb: 80,
        updatable: true
    }
    
    let lines = BABYLON.MeshBuilder.CreateDashedLines("lines", options);
    
    // 更新
    options.points[0] = new BABYLON.Vector3(-2, 1, -1);
    options.points[1] = new BABYLON.Vector3(0, -1, 0);
    options.points[2] = new BABYLON.Vector3(2, 0, 0);
    options.points[3] = new BABYLON.Vector3(-1, -2, 0);

    options.instance = lines;
    
    lines = BABYLON.MeshBuilder.CreateDashedLines("lines", options);


}


// 创建Dashed Lines 封闭区域 颜色线条
const demo10 = (scene:BABYLON.Scene) =>{
    
    const myPoints = [
        new BABYLON.Vector3(-2, -1, 0),
        new BABYLON.Vector3(0, 1, 0),
        new BABYLON.Vector3(2, -1, 0)
    ];

    myPoints.push(myPoints[0]);

    const options: {
        points: BABYLON.Vector3[];
        dashSize?: number;
        gapSize?: number;
        dashNb?: number;
        updatable?: boolean;
        instance?: BABYLON.LinesMesh;
        useVertexAlpha?: boolean;
        material?: BABYLON.Material;
    } = {
        points: myPoints,
        dashSize: 2,
        gapSize: 1,
        dashNb: 80,
        updatable: true
    }
    
    const lines = BABYLON.MeshBuilder.CreateDashedLines("lines", options);
    lines.color = BABYLON.Color3.Red();


}

// #endregion


// #region 创建line system 线条系统

// 创建简单 Line systme 
const demo11 = (scene:BABYLON.Scene) =>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 50;
    //Array of lines to construct linesystem
	const myLines = [
		[ 	new BABYLON.Vector3(0, 0, 10),
			new BABYLON.Vector3(10, 0, 10)
		],
		[	new BABYLON.Vector3(10, 0, 0),
			new BABYLON.Vector3(10, 10, 0),
			new BABYLON.Vector3(0, 10, 0)
		]
	];

    /**
     * option	value	default value
     * lines	(Vector3[][]) array of lines, each line being an array of successive Vector3 REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line system mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */

	// Create linesystem
	const linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines}); 
	
}

// 创建简单 Line systme  动态更新
const demo12 = (scene:BABYLON.Scene) =>{
    
     const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
     camera.radius = 50;
    //Array of lines to construct linesystem
	const myLines = [
		[ 	new BABYLON.Vector3(0, 0, 10),
			new BABYLON.Vector3(10, 0, 10)
		],
		[	new BABYLON.Vector3(10, 0, 0),
			new BABYLON.Vector3(10, 10, 0),
			new BABYLON.Vector3(0, 10, 0)
		]
	];

    /**
     * option	value	default value
     * lines	(Vector3[][]) array of lines, each line being an array of successive Vector3 REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line system mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */

	// Create linesystem
	const linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines, updatable: true}); 

    // 更新数据
    //Array of lines to update linesystem
	const myLines2 = [
		[	new BABYLON.Vector3(0, 0, 2),
			new BABYLON.Vector3(2, 0, 2)
		],
		[	new BABYLON.Vector3(2, 0, 0),
			new BABYLON.Vector3(2, 2, 0),
			new BABYLON.Vector3(0, 2, 0)
		]
	];
	
	//Update linesystem
    setTimeout(()=>{
        let lines = BABYLON.MeshBuilder.CreateLineSystem("lines", {lines: myLines2, instance: linesystem} );
    },2000)
	
	
	
}


// 创建简单 Line systme  设置颜色
const demo13 = (scene:BABYLON.Scene) =>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 50;
    //Array of lines to construct linesystem
	const myLines = [
		[ 	new BABYLON.Vector3(0, 0, 10),
			new BABYLON.Vector3(10, 0, 10)
		],
		[	new BABYLON.Vector3(10, 0, 0),
			new BABYLON.Vector3(10, 10, 0),
			new BABYLON.Vector3(0, 10, 0)
		]
	];

    /**
     * option	value	default value
     * lines	(Vector3[][]) array of lines, each line being an array of successive Vector3 REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line system mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */

	// Create linesystem
	const linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines}); 
    linesystem.color = new BABYLON.Color3(0, 1, 0);
	
}


// 创建简单 Line systme  不同颜色
const demo14 = (scene:BABYLON.Scene) =>{
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.radius = 50;
    //Array of lines to construct linesystem
	const myLines = [
		[ 	new BABYLON.Vector3(0, 0, 10),
			new BABYLON.Vector3(10, 0, 10)
		],
		[	new BABYLON.Vector3(10, 0, 0),
			new BABYLON.Vector3(10, 10, 0),
			new BABYLON.Vector3(0, 10, 0)
		]
	];

    
    //Array one color per point in the lines system
    const myColors = [
        [   new BABYLON.Color4(0, 1, 1, 1),
            new BABYLON.Color4(1, 0, 0, 1)
        ],
        [   new BABYLON.Color4(0, 1, 0, 1),
            new BABYLON.Color4(0, 0, 1, 1),
            new BABYLON.Color4(1, 1, 0, 1)
        ]
    ]

    /**
     * option	value	default value
     * lines	(Vector3[][]) array of lines, each line being an array of successive Vector3 REQUIRED	
     *  
     * updatable	(boolean) true if the mesh is updatable	false
     * instance	(LineMesh) an instance of a line system mesh to be updated	null
     * colors	(Color4[]) array of Color4, each point color	null
     * useVertexAlpha	(boolean) false if the alpha blending is not required (faster)	true
     */

	// Create linesystem
	const linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines, colors: myColors}); 
    linesystem.color = new BABYLON.Color3(0, 1, 0);
	
}

// #endregion


// #region 创建 GreasedLine 平滑粗线条

// 简单示例
const demo15 = (scene:BABYLON.Scene) =>{

    
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;

    camera.setTarget(new BABYLON.Vector3(0, 7, 0));

    // 简单的线段
    const points1 =
        [
            -1, 10, 0,
            1, 10, 0
        ]
    
    // 创建平滑线条
    const line1 = BABYLON.CreateGreasedLine("line1", { points: points1 })

    //

    // 绘制两条线段，颜色为红色
    const points2 = [
        [
            -1, 9, 0,
            1, 9, 0
        ], [
            2, 9, 0,
            4, 9, 0
        ]]
    /**
     * Creates a GreasedLine mesh
     * @param name name of the mesh
     * @param options options for the mesh
     * @param materialOptions material options for the mesh
     * @param scene scene where the mesh will be created
     * @returns instance of GreasedLineMesh
     */
    const line2 = BABYLON.CreateGreasedLine("line2", { points: points2 }, { color: BABYLON.Color3.Red() })

    //

    // one line with different colors with COLOR_DISTRIBUTION_TYPE_LINE
    // one color per point is required
    // the colors are divided along the line
    const points3 =
        [
            -1, 8, 0,
            0, 8, 0,
            1, 7, 0,
        ]
    const colors3 = [BABYLON.Color3.Green(), BABYLON.Color3.Yellow(), BABYLON.Color3.Purple()]

    // enum GreasedLineMeshColorDistributionType {
    //     /**
    //      * 颜色按 ​​每个线段独立分布​​，线段间的颜色不插值。 
    //      Colors distributed between segments of the line
    //      */
    //     COLOR_DISTRIBUTION_TYPE_SEGMENT = 0,
    //     /**
    //      * 颜色沿 ​整条线平均分布
    //      *Colors distributed along the line ingoring the segments
    //      */
    //     COLOR_DISTRIBUTION_TYPE_LINE = 1
    // }

    // 为每一段设置不同的颜色
    const line3 = BABYLON.CreateGreasedLine("line3",
        { points: points3 },
        { width: 0.2, colors: colors3, useColors: true, colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE })

    // one line with different colors with COLOR_DISTRIBUTION_TYPE_SEGMENT (default value)
    // one color per segment is required
    // the colors are divided between segments
    const colors4 = [BABYLON.Color3.Teal(), BABYLON.Color3.Blue()]
    const points4 =
        [
            2, 8, 0,
            3, 8, 0,
            4, 7, 0
        ]
    const line4 = BABYLON.CreateGreasedLine("line4",
        { points: points4 },
        { width: 0.2, colors: colors4, useColors: true })

    

    // two lines with different colors
    // you have to insert a dummy color between the colors of the lines in the color table 
    // 设置两段的颜色
    const colors5:BABYLON.Color3[] = [BABYLON.Color3.Red(), BABYLON.Color3.Black(), BABYLON.Color3.Blue()]
    const points5 = [
        [
            -1, 6, 0,
            1, 6, 0
        ], [
            2, 6, 0,
            4, 6, 0
        ]]
    const line5 = BABYLON.CreateGreasedLine("line5",
        { points: points5 },
        { colors: colors5, useColors: true })

    //

    // line widths
    // 线条宽度
    const points6 = BABYLON.GreasedLineTools.SegmentizeLineBySegmentCount(BABYLON.GreasedLineTools.ToVector3Array(
        [
           -4, 5, 0,
            4, 5, 0
        ])  as BABYLON.Vector3[], 5)
    const widths6 = [1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1]
    const line6 = BABYLON.CreateGreasedLine("line6",
        { points: points6, widths: widths6 }, { width: 0.2 }) 

//

    // line widths
    // 设置不同宽度的线条
    const points7 = BABYLON.GreasedLineTools.SegmentizeLineBySegmentCount(BABYLON.GreasedLineTools.ToVector3Array(
        [
            -4, 4, 0,
            4, 4, 0
        ]) as BABYLON.Vector3[], 5)
    const widths7 = [1, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 1]
    const line7 = BABYLON.CreateGreasedLine("line7",
        { points: points7, widths: widths7 }, { width: 0.2, color: BABYLON.Color3.Gray() })

}
// 线条的交互
const demo16 = (scene:BABYLON.Scene) =>{
    const size = 1
    // 创建 矩形
    const points = [
        new BABYLON.Vector3(0, 0, -2),
        new BABYLON.Vector3(size, 0, -2),
        new BABYLON.Vector3(size, size, -2),
        new BABYLON.Vector3(0, size, -2),
        new BABYLON.Vector3(0, 0, -2),
    ]

    const line1 = BABYLON.CreateGreasedLine(
        'basic-line-1',
        {
            points: points,
        },
        {
            color: BABYLON.Color3.Blue(),
        },
        scene
    )

    // 修改中心点， 绕Y轴旋转
    const line2 = BABYLON.CreateGreasedLine(
        'basic-line-2',
        {
            points: points.map(p => {
                return new BABYLON.Vector3(p.x - size / 2, p.y - size / 2, p.z)
            })
        },
        {
            color: BABYLON.Color3.Green(),
        },
        scene
    )
    line2.position.y += 2.5

    // 修改位置
    const line3 = BABYLON.CreateGreasedLine(
        'basic-line-3',
        {
            points: points.map(p => {
                return new BABYLON.Vector3(p.x, p.y + 4, p.z)
            })
        },
        {
            color: BABYLON.Color3.Yellow(),
        },
        scene
    )


    // 动画
    let i = 1
    scene.onBeforeRenderObservable.add(() => {
        const animRatio = scene.getAnimationRatio()
        line1.position.x = Math.sin(i / 40)
        line2.rotate(BABYLON.Axis.Z, 0.005 * animRatio)
        line3.scaling.x = Math.sin(i / 40) + 1
        i += 0.04
    })
}

// 通过 floatArrayStride 分段
const demo17 = (scene:BABYLON.Scene) =>{
    // 点数据
    const points = new Float32Array([

        0, 0, -1,
        1, 0, -1,
        1, 1, -1,
        0, 0, -1,

        0, 0, 0,
        1, 0, 0,
        1, 1, 0,
        0, 0, 0,

        0, 0, 1,
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,

    ])

    // 绘制线断
    const line = BABYLON.CreateGreasedLine("floatarray-stride-line", {
        points,
        pointsOptions: {
            // 四个点为一段
            floatArrayStride: 4
        }
    }, {
        // 使用颜色
        useColors: true,
        colors: [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Red(),
            BABYLON.Color3.Red(),
            BABYLON.Color3.Black(),// dummy 跳过的颜色

            BABYLON.Color3.Green(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Black(),// dummy

            BABYLON.Color3.Blue(),
            BABYLON.Color3.Blue(),
            BABYLON.Color3.Blue(),

        ]
    })

}

const demo18 = (scene:BABYLON.Scene) =>{
    
    const points1 = []
    // 每一段的宽度
    const widths = [
         1,  // 左边
         2,  // 右边
         3,  // 左边
         4]  // 右边 
    for (let x = 0; x < 10; x += 0.25) {
        points1.push(new BABYLON.Vector3(x, Math.cos(x / 2) - 2, 0))
    }

    // enum GreasedLineMeshWidthDistribution {
    //     WIDTH_DISTRIBUTION_NONE = 0,
    //     WIDTH_DISTRIBUTION_REPEAT = 1,
    //     WIDTH_DISTRIBUTION_EVEN = 2,
    //     WIDTH_DISTRIBUTION_START = 3,
    //     WIDTH_DISTRIBUTION_END = 4,
    //     WIDTH_DISTRIBUTION_START_END = 5,
    // }

    // 默认 WIDTH_DISTRIBUTION_START
    const line1 = BABYLON.CreateGreasedLine(
        'basic-line-1',
        {
            points: points1,
            widths,
        },
        {
            color: BABYLON.Color3.Red(),
        },
        scene
    )

    //

    const line2 = BABYLON.CreateGreasedLine(
        'basic-line-2',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 2, p.z)),
            widths,
            // 结尾获取宽度
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_END,
        },
        {
            color: BABYLON.Color3.Green(),
        },
        scene
    )

    //

    const line3 = BABYLON.CreateGreasedLine(
        'basic-line-3',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 4, p.z)),
            widths,
          
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_EVEN,
        },
        {
            color: BABYLON.Color3.Blue(),
        },
        scene
    )

    //

    const line4 = BABYLON.CreateGreasedLine(
        'basic-line-4',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 6, p.z)),
            widths,
              // 从两边取值端点，中间部分取最大值
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START_END,
        },
        {
            color: BABYLON.Color3.Yellow(),
        },
        scene
    )

    //

    const line5 = BABYLON.CreateGreasedLine(
        'basic-line-5',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 8, p.z)),
            widths,
            //  重复获取宽度值
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_REPEAT,
        },
        {
            // 洋红色
            color: BABYLON.Color3.Magenta(),
        },
        scene
    )

    //

    // saw
    const line6 = BABYLON.CreateGreasedLine(
        'basic-line-6',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 10, p.z)),
            widths: [1, 1, 16, 1],
            //  重复获取宽度值
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_REPEAT,
        },
        {
            color: BABYLON.Color3.Gray(),
        },
        scene
    )

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1, line2, line3, line4, line5,])
}


// 通过 实例化线段
const demo19= (scene:BABYLON.Scene) =>{

    let instance
    for (let i = 0; i < 200; i++) {
        const points = [];
        const color = BABYLON.Color3.Random()
        const colors = [color, color]
        for (let j = 0; j < 2; j++) {
            const x = BABYLON.Scalar.RandomRange(-5, 5);
            const y = BABYLON.Scalar.RandomRange(-5, 5);
            const z = BABYLON.Scalar.RandomRange(-5, 5)
            points.push(new BABYLON.Vector3(x, y, z));
        }
        const line1 = BABYLON.CreateGreasedLine(
            'instanced-lines',
            {
                points,
                instance,
            },
            {
                colors,
                useColors: true,
            },
            scene
        );
        if (!instance) {
            instance = line1;
        }
    }
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    if (instance) {

        camera.zoomOnFactor = 1.3;
        camera.zoomOn([instance]);

        scene.onBeforeRenderObservable.add(() => {
            const animationRatio = scene.getAnimationRatio()
            instance.rotate(BABYLON.Axis.Y, 0.01 * animationRatio) // all lines are joined into one mesh instance
        })
    }
}


const demo20 = (scene:BABYLON.Scene)=>{
    let instance = undefined;
    const numOfLines = 4096
    const frequency = 5 / numOfLines;
    for (let i = 0; i < numOfLines; i++) {
        const points = [];
        const widths = [];
        const r = Math.floor(Math.sin(frequency * i + 0) * (127) + 128);
        const g = Math.floor(Math.sin(frequency * i + 2) * (127) + 128);
        const b = Math.floor(Math.sin(frequency * i + 4) * (127) + 128);
        const color = new BABYLON.Color3(r, g, b)
        const colors = [color, color]
        for (let j = 0; j < 2; j++) {
            const x = Math.cos(i) * j
            const y = Math.sin(i) * j
            const z = i / (numOfLines / 4)
            points.push(new BABYLON.Vector3(x, y, z));
            widths.push(BABYLON.Scalar.RandomRange(1, 22), BABYLON.Scalar.RandomRange(1, 4))
        }

        const line1 = BABYLON.CreateGreasedLine(
            'instanced-lines',
            {
                points,
                instance,
                lazy: true,
                widths,

            },
            {
                createAndAssignMaterial: true,
                sizeAttenuation: true,
                colors,
                useColors: true,
                width: 1,
            },
            scene
        );

        if (!instance) {
            instance = line1;
        }
    }


    if (instance) {

        // 减少渲染次数
        instance.updateLazy()

        const camera = scene.activeCamera as BABYLON.ArcRotateCamera

        camera.alpha = -0.69;
        camera.beta = 1.16
        camera.radius = 5.9185
        camera.target.x = 0.36
        camera.target.y = -0.33
        camera.target.z = 1.35

        scene.onBeforeRenderObservable.add(() => {
            instance.rotate(BABYLON.Axis.Z, -0.01 * scene.getAnimationRatio())
        })
    }
}


// 设置默认材质
const demo21 = (scene:BABYLON.Scene)=>{
    const points1  =
    [
        [
            -14, 1, 0,
            14, 1, 0,
        ]
    ]

const points2 =
    [
        [
            -14, -1, 0,
            14, -1, 0,
        ]
    ]


//  设置线条默认值
BABYLON.GreasedLineMaterialDefaults.DEFAULT_WIDTH = 1
BABYLON.GreasedLineMaterialDefaults.DEFAULT_WIDTH_ATTENUATED = 20
BABYLON.GreasedLineMaterialDefaults.DEFAULT_COLOR = BABYLON.Color3.Red()

// 创建线条1
const line1 = BABYLON.CreateGreasedLine("line-same-width", {
    points: points1
}, {
    // 透视
    sizeAttenuation: true
})

// 创建线头2
const line2 = BABYLON.CreateGreasedLine("line", {
    points: points2
})
const camera = scene.activeCamera as BABYLON.ArcRotateCamera;
let i = 1
scene.beforeRender = () => {

    camera.radius = (Math.sin(i) + 1) * 10 - 30
    i += 0.001 * scene.deltaTime
}

showAxis(1,scene)
}

// 材质颜色变化
const demo22 = (scene:BABYLON.Scene)=>{
    
    const points1 =
        [
            -5, 6, 0,
            5, 6, 0,
            5, 7, 0,
            5, 12, 0
        ]

    const colors1 =
        [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Blue(),
        ]

    const line1 = BABYLON.CreateGreasedLine("line1",
        { points: points1 },
        {
            materialType: BABYLON.GreasedLineMeshMaterialType.MATERIAL_TYPE_SIMPLE,
            colors: colors1,
            useColors: true,
            // 颜色相乘
            colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY,
        })

    //

    let c = 0
    const color = new BABYLON.Color3()
    scene.onBeforeRenderObservable.add(() => {
        color.r = c
        color.g = c
        color.b = c
        // 线条颜色
        line1!.greasedLineMaterial!.color = color
        c += 0.004 * scene.getAnimationRatio()
        if (c >= 1) {
            c = 0
        }
    })

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1])
}

// 线条颜色
const demo23 = (scene:BABYLON.Scene)=>{
    const points1 = []
    const colors1 = [BABYLON.Color3.Red(), BABYLON.Color3.Green(), BABYLON.Color3.Blue(), BABYLON.Color3.Yellow()]
    for (let x = 0; x < 10; x += 0.25) {
        points1.push(new BABYLON.Vector3(x, Math.cos(x / 2), 0))
    }


    // enum GreasedLineMeshColorDistribution {
    //     COLOR_DISTRIBUTION_NONE = 0,
    //     COLOR_DISTRIBUTION_REPEAT = 1,   // 重复使用四种颜色
    //     COLOR_DISTRIBUTION_EVEN = 2,     // 整段平均划分颜色
    //     COLOR_DISTRIBUTION_START = 3,   // 开始位置，逐段填充颜色，没有颜色返回白色， 到结束为止
    //     COLOR_DISTRIBUTION_END = 4,     // 末尾位置， 逐段填充颜色， 没有颜色返回白色到开始位置
    //     COLOR_DISTRIBUTION_START_END = 5, // 开始与结尾分别旋转颜色， 中间部分用白色
    // }


    const line1 = BABYLON.CreateGreasedLine(
        'basic-line-1',
        {
            points: points1,
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
            // 开始位置，逐段填充颜色，没有颜色返回白色
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_START // Default
        },
        scene
    )

   

    //

    const line2 = BABYLON.CreateGreasedLine(
        'basic-line-2',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 2, p.z)),
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
            // 末尾位置， 逐段填充颜色， 没有颜色返回白色到开始位置
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_END,
        },
        scene
    )

 
    //

    const line3 = BABYLON.CreateGreasedLine(
        'basic-line-3',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 4, p.z)),
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
            // 整段平均划分颜色
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_EVEN
        },
        scene
    )

   
    //
    const line4 = BABYLON.CreateGreasedLine(
        'basic-line-4',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 6, p.z)),
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
             // 开始与结尾分别旋转颜色， 中间部分用白色
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_START_END
        },
        scene
    )


    //
    const line5 = BABYLON.CreateGreasedLine(
        'basic-line-5',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 8, p.z)),
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
            // 重复使用四种颜色
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_REPEAT
        },
        scene
    )

   
    //
    const line6 = BABYLON.CreateGreasedLine(
        'basic-line-6',
        {
            points: points1.map(p => new BABYLON.Vector3(p.x, p.y - 10, p.z)),
        },
        {
            colors: colors1,
            useColors: true,
            width: 0.4,
            // 类似于重复颜色
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_NONE
        },
        scene
    )

    //
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1, line2, line3, line4, line5, line6])
}

// 不同的颜色分部类型
const demo24 = (scene:BABYLON.Scene)=>{
// GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_SEGMENT
    // 1 每段线段及颜色
    const points1 =
        [
            -5, 6, 0,
            5, 6, 0,
            5, 7, 0,
            5, 12, 0
        ]
    const colors1 =
        [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Blue(),
        ]
    const line1 = BABYLON.CreateGreasedLine("line1",
        { points: points1 },
        {
            createAndAssignMaterial: true,
            colors: colors1,
            useColors: true,
            // default value:
            // 默认值
            colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_SEGMENT
        })



    //

    // GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE
    // 1 color per point 
    // 三段，四个颜色
    const points2 =
        [
            -5, 1, 0,
            5, 1, 0,
            5, 2, 0,
            5, 5, 0
        ]
    const colors2 =
        [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Green(),
            BABYLON.Color3.Blue(),
            BABYLON.Color3.Yellow(),
        ]

    const line2 = BABYLON.CreateGreasedLine("line2",
        { points: points2 },
        {
            createAndAssignMaterial: true,
            colors: colors2,
            useColors: true,
            // 按照相同的长度应用
            colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE
        })

    //

    // GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE
    // More colors than points, the colors spreads through the whole line
    // 三段六个颜色
    const points3 =
        [
            -5, -4, 0,
            5, -4, 0,
            5, -3, 0,
            5, 0, 0
        ]
    
    // 红色站1/3 长度， 绿色 1/6 长度， 蓝色 1/3 长度， 黄色 1/6 长度
    const colors3 =
        [
            BABYLON.Color3.Red(),
            BABYLON.Color3.Red(), // added
            BABYLON.Color3.Green(),
            BABYLON.Color3.Blue(),
            BABYLON.Color3.Blue(), // added
            BABYLON.Color3.Yellow(),
        ]

    const line3 = BABYLON.CreateGreasedLine("line3",
        { points: points3 },
        {
            createAndAssignMaterial: true,
            colors: colors3,
            useColors: true,
            colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE
        })


        const camera = scene.activeCamera as BABYLON.ArcRotateCamera
        camera.zoomOnFactor = 1.3
        camera.zoomOn([line1, line2, line3])

}

// 线条颜色使用纹理
const demo25 = (scene:BABYLON.Scene)=>{
    //

    // 创建线条
    const line = BABYLON.CreateGreasedLine(
        'line',
        {
            points: [-6, -4, 0, 6, 4, 0],
        },
        {
            // 颜色相乘
            colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY
        },
        scene,
    )

    // 颜色值
    const textureColors = new Uint8Array([
        0, 240, 232,
        236, 0, 242,
        0, 240, 232,
        0, 37, 245,
    ]);

    // 生成纹理
    const texture = new BABYLON.RawTexture(
        textureColors,
        textureColors.length / 3,
        1,
        BABYLON.Engine.TEXTUREFORMAT_RGB,
        scene,
        false,
        true,
        BABYLON.Engine.TEXTURE_LINEAR_LINEAR
    );
    texture.wrapU = BABYLON.RawTexture.WRAP_ADDRESSMODE;
    // texture.name = ""

    (line!.material as BABYLON.StandardMaterial).emissiveTexture = texture

    //
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.5
    camera.zoomOn([line])

}

// 动画线条纹理
const demo26 = (scene:BABYLON.Scene)=>{
    const points1 = []
    for (let x = 0; x < 10; x += 0.25) {
        points1.push(new BABYLON.Vector3(x, Math.cos(x / 2), 0))
    }
    const textureColors = new Uint8Array([255, 255, 255, 0, 0, 255])
    const texture = new BABYLON.RawTexture(
        textureColors,
        textureColors.length / 3,
        1,
        BABYLON.Engine.TEXTUREFORMAT_RGB,
        scene,
        false,
        true,
        BABYLON.Engine.TEXTURE_NEAREST_NEAREST
    )
    texture.wrapU = BABYLON.RawTexture.WRAP_ADDRESSMODE
    texture.name = 'blue-white-texture'


    const line1 = BABYLON.CreateGreasedLine(
        'line-1',
        {
            points: points1,
        },
        {
            width: 1,
            colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY
        },
        scene
    );
    //

    let material = line1.material as BABYLON.StandardMaterial
   
    material.emissiveTexture = texture
    texture.uScale = 5

    scene.onBeforeRenderObservable.add(() => {
        texture.uOffset += 0.01 * scene.getAnimationRatio()
    })

    //
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1])
}

// 动画线条纹理
const demo27 = (scene:BABYLON.Scene)=>{

    // 创建半径为2 400个顶点的圆数据
    const points1 = BABYLON.GreasedLineTools.GetCircleLinePoints(2, 400)

    // create color gradient
    const colors1:BABYLON.Color3[] = []
    const tmpColor = BABYLON.TmpColors.Color3[0];
    for (let ratio = 0; ratio <= 1; ratio += 0.01) {
        BABYLON.GradientHelper.GetCurrentGradient(ratio,
            [
                new BABYLON.Color3Gradient(0, new BABYLON.Color3(1, 0, 0)),
                new BABYLON.Color3Gradient(1, new BABYLON.Color3(1, 1, 1)),
            ], (currentGradient, nextGradient, scale) => {

                BABYLON.Color3.LerpToRef(
                    (currentGradient as BABYLON.Color3Gradient).color,
                    (nextGradient as BABYLON.Color3Gradient).color,
                    scale, tmpColor)
                colors1.push(tmpColor.clone())
            }
        )
    }

    // draw line
    const line1 = BABYLON.CreateGreasedLine(
        'line-1',
        {
            points: points1,
            updatable: true,
        },
        {
            useColors: true,
            colors: colors1,
            // colorDistributionType: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_START,
            width: 0.1,
            colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_SET
        },
        scene
    )

    // animate the color pointers
    const colorPointers = line1.colorPointers
    const colorsCount = colorPointers.length / 2

    const newColorPointers:number[] = []
    let cnt = 0
    const m = colorsCount - 1
    scene.onBeforeRenderObservable.add(() => {
        newColorPointers.length = 0
        for (let i = 0; i < colorsCount; i++) {
            newColorPointers.push(cnt % m)
            newColorPointers.push(cnt % m)
            cnt += 1
            if (cnt >= colorsCount) {
                cnt = 0
            }
        }
        cnt += 1
        if (cnt == colorsCount) {
            cnt = 0
        }
        line1.colorPointers = newColorPointers
    })

    //

    //
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1])
}

// 颜色采样
const demo28 = (scene:BABYLON.Scene)=>{

    const points1 =
    [
        -5, 6, 0,
        5, 6, 0,
        5, 7, 0,
        5, 12, 0
    ]
const colors1 =
    [
        BABYLON.Color3.Red(),
        BABYLON.Color3.Green(),
        BABYLON.Color3.Blue(),
    ]
const line1 = BABYLON.CreateGreasedLine("line1",
    { points: points1 },
    {
        createAndAssignMaterial: true,
        colors: colors1,
        useColors: true,
        //  线性采样
        colorsSampling: BABYLON.Constants.TEXTURE_LINEAR_LINEAR
    })

//

const points2 =
    [
        -5, 1, 0,
        5, 1, 0,
        5, 2, 0,
        5, 5, 0
    ]

const line2 = BABYLON.CreateGreasedLine("line2",
    { points: points2 },
    {
        createAndAssignMaterial: true,
        colors: colors1,
        useColors: true,
        // 就近采样
        colorsSampling: BABYLON.Constants.TEXTURE_NEAREST_NEAREST
    })

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.3
    camera.zoomOn([line1,line2])

}

// 不同的颜色实例
const demo29 = (scene:BABYLON.Scene)=>{
    // create an empty array
    const colors:BABYLON.Color3[] = []

    const points1 =
        [
            [
                0, -1, 0,
                0, 0, 0,
                0, 1, 0,
                0, 2, 0,
            ],
        ]
    const line = BABYLON.CreateGreasedLine("line", {
        points: points1,
    }, {
        color: BABYLON.Color3.Red(),
        useColors: true,
        colors,
    })

    const points2 =
        [
            [
                4, -1, 0,
                4, 0, 0,
                4, 1, 0,
                4, 2, 0,
            ],
        ]
    // 同一个实例中，增加线条
    BABYLON.CreateGreasedLine("", {
        points: points2,
        instance: line
    }, {
        color: BABYLON.Color3.Gray(),
        useColors: true,
        colors,
    })

    const points3 =
        [
            [
                0, -1, -3,
                0, 0, -3,
                0, 1, -3,
                0, 2, -3,
            ],
            [
                0, -1, -4,
                0, 0, -4,
                0, 1, -4,
                0, 2, -4,
            ],
        ]
    BABYLON.CreateGreasedLine("", {
        points: points3,
        instance: line
    }, {
        color: BABYLON.Color3.Blue(),
        useColors: true,
        colors,
    })
}

// 不同的颜色实例
const demo30 = (scene:BABYLON.Scene)=>{
    const points1 = [
        -5, 8, 0,
        5, 8, 0
    ]
    // useDash: true, dashCount: 4, dashRatio: 0.5,
    const line1 = BABYLON.CreateGreasedLine(
        "line1",
        { points: points1 },
        { useDash: true, dashCount: 4, dashRatio: 0.5, color: BABYLON.Color3.Red() }
    )

    //

    const points2 = [
        -5, 2, 0,
        0, 5, 0,
        5, 2, 0
    ]
    // useDash: true, dashCount: 8, dashRatio: 0.2
    const line2 = BABYLON.CreateGreasedLine(
        "line2",
        { points: points2 },
        { useDash: true, dashCount: 8, dashRatio: 0.2, color: BABYLON.Color3.Green() }
    )

    //

    const points3 = [
        -5, -2, 0,
        0, -2, 0,
        5, -2, 0,
        5, -8, 0
    ]
    const widths = [4, 4, 1, 1, 1, 1, 4, 4]
    const line3 = BABYLON.CreateGreasedLine(
        "line3",
        { points: points3, widths },
        { useDash: true, dashCount: 10, dashRatio: 0.5, color: BABYLON.Color3.Yellow() }
    )

    //

    let dashOffset = 0
    const material2 = line2.greasedLineMaterial as BABYLON.IGreasedLineMaterial
    const material3 = line3.greasedLineMaterial as BABYLON.IGreasedLineMaterial
    scene.onBeforeRenderObservable.add(() => {
        // 虚线动画
        material2.dashOffset = dashOffset
        material3.dashOffset = 1 - dashOffset
        dashOffset += 0.001
    })

}

// 逐步显示出线条
const demo31 = (scene:BABYLON.Scene)=>{

    const line = BABYLON.CreateGreasedLine(
        'line',
        {
            points: [
                -10, 0, 0,
                10, 2, 0
            ],
        },
        {
            // 初始可见为 0 
            visibility: 0
        },
        scene,
    )

        // export interface IGreasedLineMaterial {
        //   /**
        //    * Normalized value of how much of the line will be visible
        //    * 0 - 0% of the line will be visible
        //    * 1 - 100% of the line will be visible
        //    */
        //   visibility: number;

        //   /**
        //    * Line base width. At each point the line width is calculated by widths[pointIndex] * width
        //    */
        //   width: number;

        //   /**
        //    * Turns on/off dash mode
        //    */
        //   useDash: boolean;

        //   /**
        //    * @see GreasedLinePluginMaterial.setDashCount
        //    * Number of dashes in the line.
        //    * Defaults to 1.
        //    */
        //   dashCount: number;

        //   /**
        //    * Dash offset
        //    */
        //   dashOffset: number;

        //   /**
        //    * Length of the dash. 0 to 1. 0.5 means half empty, half drawn.
        //    */
        //   dashRatio: number;

        //   /**
        //    * Whether to use the colors option to colorize the line
        //    */
        //   useColors: boolean;

        //   /**
        //    * The mixing mode of the color paramater. Default value is GreasedLineMeshColorMode.SET. MATERIAL_TYPE_SIMPLE supports only the default value/mode.
        //    * @see GreasedLineMeshColorMode
        //    */
        //   colorMode: GreasedLineMeshColorMode;

        //   /**
        //    * Colors of the line segments.
        //    * Defaults to empty.
        //    */
        //   colors: Nullable<Color3[]>;

        //   /**
        //    * If false then width units = scene units. If true then line will width be reduced.
        //    * Defaults to false.
        //    */
        //   sizeAttenuation: boolean;

        //   /**
        //    * Color of the line. Applies to all line segments.
        //    * Defaults to White.
        //    * MATERIAL_TYPE_STANDARD and MATERIAL_TYPE_PBR material's shaders will get recompiled if there was no color set and you set a color or when there was a color set and you set it to null.
        //    */
        //   color: Nullable<Color3>;

        //   /**
        //    * The method used to distribute the colors along the line.
        //    * You can use segment distribution when each segment will use on color from the color table.
        //    * Or you can use line distribution when the colors are distributed evenly along the line ignoring the segments.
        //    */
        //   colorsDistributionType: GreasedLineMeshColorDistributionType;

        //   /**
        //    * Defaults to engine.getRenderWidth() and engine.getRenderHeight()
        //    * Rendering resolution
        //    */
        //   resolution: Vector2;

        //   /**
        //    * Allows to change the color without marking the material dirty.
        //    * MATERIAL_TYPE_STANDARD and MATERIAL_TYPE_PBR material's shaders will get recompiled if there was no color set and you set a color or when there was a color set and you set it to null. Use the flag to not to recompile immediately.
        //    * @param value the color
        //    * @param doNotMarkDirty the flag
        //    */
        //   setColor(value: Nullable<Color3>, doNotMarkDirty?: boolean): void;

        //   /**
        //    *
        //    * @param colors colors array
        //    * @param lazy if true the colors texture will not be updated
        //    * @param forceNewTexture forces to create a new colors texture
        //    */
        //   setColors(colors: Nullable<Color3[]>, lazy: boolean, forceNewTexture?: boolean): void;

        //   /**
        //    * Creates and sets the colors texture from the colors array which was created in lazy mode
        //    */
        //   updateLazy(): void;
        // }

    let visibility = 0
    scene.onBeforeRenderObservable.add(() => {
        visibility += 0.005 * scene.getAnimationRatio();
        (line.greasedLineMaterial as BABYLON.IGreasedLineMaterial).visibility = visibility
    })

    //
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.zoomOnFactor = 1.5
    camera.zoomOn([line])
}

// offset 线段顶点
const demo32 = (scene:BABYLON.Scene)=>{
    const points1 = []
    const colors1 = [BABYLON.Color3.Red(), BABYLON.Color3.Green(), BABYLON.Color3.Blue()]
    const offsets:number[] = []
    const targetOffsetsY:number[] = []
    const offsetsY:number[] = []

    for (let x = 0; x < 10; x += 0.25) {
        points1.push([new BABYLON.Vector3(x, 0, 0), new BABYLON.Vector3(x, 1, 0)])
        offsets.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        targetOffsetsY.push(0)
        offsetsY.push(0)
    }

    const line1 = BABYLON.CreateGreasedLine(
        'offsets-line-1',
        {
            points: points1,
            // 可变的
            updatable: true,
        },
        {
            colors: colors1,
            useColors: true,
            colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_REPEAT
        },
        scene
    )

    //

    window.setInterval(() => {
        targetOffsetsY.length = 0
        for (let i = 0; i < 10; i += 0.25) {
            const y = BABYLON.Scalar.RandomRange(1, 4)
            targetOffsetsY.push(y)
        }
    }, 1000)

    //

    scene.onBeforeRenderObservable.add(() => {
        offsets.length = 0
        for (let i = 0, j = 0; i < 10; i += 0.25, j++) {
            const y = BABYLON.Scalar.Lerp(offsetsY[j], targetOffsetsY[j], 0.05)
            offsetsY[j] = y
            offsets.push(
                0, 0, 0, // 左下
                0, 0, 0, // 右下
                0, y, 0, // 左上 
                0, y, 0) //右上
        }
        // 修改 offsets
        line1.offsets = offsets
    })

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.target.x = 3
    camera.target.y = 0.96
    camera.target.z = -3
    camera.radius = 16

    camera.alpha = 0.8
    camera.beta = 1.39
}


// offset 线段顶点
const demo33 = (scene:BABYLON.Scene)=>{
    
    // 通过三个点返回曲线
    const arcPoints = BABYLON.Curve3.ArcThru3Points(
        new BABYLON.Vector3(-9, 4, 4.4),
        new BABYLON.Vector3(9.2, 3.5, -9),
        new BABYLON.Vector3(4.7, -4.8, 5.1),
        40,
    ).getPoints()

    const points = []
    const colors = []
    for (let i = 0; i < arcPoints.length - 1; i++) {
        points.push([arcPoints[i], arcPoints[i + 1]])
        colors.push(BABYLON.Color3.Random())
        colors.push(BABYLON.Color3.Random())
    }

    const line = BABYLON.CreateGreasedLine("line", {
        points,
        updatable: true
    }, {
        colors,
        useColors: true
    })

    // make the base arc visible
    const mat2 = line.material!.clone('') 
    const line2 = line.clone() as BABYLON.GreasedLineMesh;
    (line2 as BABYLON.GreasedLineMesh).material = mat2;
    (line2 as BABYLON.GreasedLineMesh).greasedLineMaterial!.useColors = false;

    //
    const offsets = Array(arcPoints.length * 2 * 2 * 3)
    offsets.fill(0)
    let o = 0
    scene.onBeforeRenderObservable.add(() => {
        for (let i = 0; i < arcPoints.length * 2; i++) {
            // each point is made of two vertices
            // each vertex has 3 coordinates (so multiply by * 6 to go to the next pont/pair of vertices)
            offsets[i * 6] = Math.sin(i / 12 + o) // x coordinate vertex 0
            offsets[i * 6 + 3] = Math.sin(i / 12 + o) // x coordinate vertex 1
        }
        // 修改offset
        line.offsets = offsets

        o += 0.01 * scene.getAnimationRatio()
    })

}


// 修改点的位置 
const demo34 = (scene:BABYLON.Scene)=>{
    const sphere = BABYLON.CreateSphere('sphere', { diameter: 4 })
    sphere.setEnabled(false)

    // 通过 mesh 获取点数据
    const points = BABYLON.GreasedLineTools.MeshesToLines([sphere])

    const lines = BABYLON.CreateGreasedLine('', { points, updatable: true }, {
        width: 0.1,
        colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY,
    })

    let positions = lines.getVerticesData(BABYLON.VertexBuffer.PositionKind) as BABYLON.FloatArray;

    var numberOfVertices = positions.length / 3;
    for (var i = 0; i < numberOfVertices; i++) {
        positions[i * 3] *= 1.5;
        positions[i * 3 + 1] *= 3
        positions[i * 3 + 2] *= 2.5;
    }

    // 更新线条的数据
    lines.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);;
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.radius = 16

}

// MeshesToLines
const demo35 = (scene:BABYLON.Scene)=>{
    const mesh = BABYLON.CreateBox("mesh", { size: 10})
    //OmitDuplicatesPredicate(p1: Vector3, p2: Vector3, p3: Vector3, points: Vector3[][]): Vector3[][] | null;
    // 过滤掉路径中重复的顶点
    type  OmitDuplicatesPredicateType = (p1:  BABYLON.Vector3, p2:  BABYLON.Vector3, p3:  BABYLON.Vector3, points:  BABYLON.Vector3[][])=>BABYLON.Vector3[][]
    const lines = BABYLON.GreasedLineTools.MeshesToLines([mesh], BABYLON.GreasedLineTools.OmitDuplicatesPredicate as OmitDuplicatesPredicateType)

    const grl = BABYLON.CreateGreasedLine("lines", {
        points: lines,
    }, {
        sizeAttenuation: true,
        width: 10,
        useDash: true,
        dashCount: 10,
        dashRatio: 0.4,
        colors: [
            BABYLON.Color3.Red(), 
            BABYLON.Color3.White(),
        ],
        useColors: true,
        colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_REPEAT,
        colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE,
        colorsSampling: BABYLON.Texture.LINEAR_LINEAR
    })

    scene.onBeforeRenderObservable.add(() => {
        grl.greasedLineMaterial!.dashOffset += 0.0001 * scene.deltaTime
    })
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.radius = 20
}

// 射线相交
const demo36 = (scene:BABYLON.Scene)=>{


    const points = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 10, 0),
        new BABYLON.Vector3(3, 10, 0),
        new BABYLON.Vector3(3, 0, 0),
        new BABYLON.Vector3(3.2, 0, 0),
        new BABYLON.Vector3(5, 9, -0.4),
    ]
    // 将线条路径按指定段长细分​​，生成更密集的顶点数据。其核心目的是优化线条的动态效果（如动画、渐变）或提高几何精度（如碰撞检测）。
    const subLines1 = BABYLON.GreasedLineTools.SegmentizeLineBySegmentLength(points, 0.6)

    const allPoints = [subLines1, [new BABYLON.Vector3(1, 1, 0), new BABYLON.Vector3(1, 9, 0)]]

    const line1:BABYLON.GreasedLineMesh = BABYLON.CreateGreasedLine('raycast', {
        points: allPoints,
    },
    {
        color: BABYLON.Color3.Red(),
    },
    scene) as BABYLON.GreasedLineMesh 

    // 设置相交的阈值
    line1.intersectionThreshold = 0.7

    // 定义射线
    const origin = new BABYLON.Vector3(-3, 5, 1)
    const direction = new BABYLON.Vector3(1, 0.4, -0.17)

    // 创建一个球
    const marker = BABYLON.MeshBuilder.CreateSphere('origin1', { diameter: 0.2, segments: 8 })
    marker.position = origin

    const material = new BABYLON.StandardMaterial('mat', scene)
    material.emissiveColor = BABYLON.Color3.Blue()
    material.disableLighting = true
    marker.material = material

    const length = undefined
    // 定义射线
    const ray = new BABYLON.Ray(origin, direction, length)
    // 创建显示射线
    BABYLON.RayHelper.CreateAndShow(ray, scene, BABYLON.Color3.White())
    // 射线与线的掉电
    const result = line1.findAllIntersections(ray)

    result?.forEach((r) => {
        //  焦点位置，创建要给小球
        const marker = BABYLON.MeshBuilder.CreateSphere('marker', { diameter: 0.4, segments: 8 })
        marker.position = r.point
        marker.material = material
    })
    const camera = scene.activeCamera as BABYLON.ArcRotateCamera
    camera.target.x = 2.2
    camera.target.y = 5.19
    camera.target.z = 0.26

    camera.alpha = 2.59
    camera.beta = 0.41
    camera.radius = 13.89
}

// 绘制箭头
const demo37 = (scene:BABYLON.Scene)=>{
    const points1 = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(10, 0, 0)];

    const line1 = BABYLON.CreateGreasedLine(
        'lines1',
        {
            points: points1,
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START,
        },
        {
            width:10,
            color: new BABYLON.Color3(1, 0, 0),
            sizeAttenuation:true
        },
        scene
    );

    // the arrow cap to the line instance to join it with the line
    // 创建箭头
    const cap1 = BABYLON.GreasedLineTools.GetArrowCap(
        points1[1],
        BABYLON.Vector3.Right(),
        0.4,
        4, 4
    );
    BABYLON.CreateGreasedLine(
        'lines',
        {
            points: cap1.points,
            widths: cap1.widths,
            widthDistribution: BABYLON.GreasedLineMeshWidthDistribution.WIDTH_DISTRIBUTION_START,
            instance: line1
        },
        null,
        scene
    );

    //

    const line2 = line1.clone()
    line2.scaling = new BABYLON.Vector3(0.7, 0.7, 0.7)


    scene.onBeforeRenderObservable.add(() => {
        line1.rotate(BABYLON.Axis.Z, 0.002 * scene.getAnimationRatio())
        line2.rotate(BABYLON.Axis.Z, 0.001 * scene.getAnimationRatio())
    })
}

// 通过矩阵改变线条
const demo38 = (scene:BABYLON.Scene)=>{
    const size = 1
    const points = [
        new BABYLON.Vector3(0, 0, -2),
        new BABYLON.Vector3(size, 0, -2),
        new BABYLON.Vector3(size, size, -2),
        new BABYLON.Vector3(0, size, -2),
        new BABYLON.Vector3(0, 0, -2),
    ]

    const line1 = BABYLON.CreateGreasedLine(
        'basic-line-1',
        {
            points: points,
        },
        {
            colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY

        },
        scene
    )

    const positions = [0, 1.5, 3];

    const matrixBuffer = new Float32Array(3 * 16);
    positions.forEach((val, index) =>
        BABYLON.Matrix.Translation(0, val, 0).copyToArray(matrixBuffer, index * 16)
    );

    const colors = [
        BABYLON.Color3.Red(),
        BABYLON.Color3.Green(),
        BABYLON.Color3.Blue()
    ];

    const colorBuffer = new Float32Array(3 * 3)
    colors.forEach((val, index) => val.toArray(colorBuffer, index * 3));

    // 设置矩阵 修改实例化的位置与颜色
    line1.thinInstanceSetBuffer('matrix', matrixBuffer, 16);
    line1.thinInstanceSetBuffer('color', colorBuffer, 3);

    const camera = scene.activeCamera as BABYLON.ArcRotateCamera

    camera.zoomOn([line1]);

}

//  创建 GreasedLineRibbon 丝带
const demo39 = (scene:BABYLON.Scene)=>{
     // simple line
     const points1 =
     [
         -1, 10, 0,
         1, 10, 0
     ]

     // 添加ribbonOptions 属性就可以创建丝带
    const line1 = BABYLON.CreateGreasedLine("line1", {
     points: points1,
     ribbonOptions: {

     }
 })

 //

 // two lines with color
 const points2 = [
     [
         -1, 9, 0,
         1, 9, 0
     ], [
         2, 9, 0,
         4, 9, 0
     ]]
 const line2 = BABYLON.CreateGreasedLine("line2", {
     points: points2,
     ribbonOptions: {

     }
 }, { color: BABYLON.Color3.Red() })

 //

 // one line with different colors with COLOR_DISTRIBUTION_TYPE_LINE
 // one color per point is required
 // the colors are divided along the line
 const points3 =
     [
         -1, 8, 0,
         0, 8, 0,
         1, 7, 0,
     ]
 const colors3 = [BABYLON.Color3.Green(), BABYLON.Color3.Yellow(), BABYLON.Color3.Purple()]
 const line3 = BABYLON.CreateGreasedLine("line3",
     {
         points: points3,
         ribbonOptions: {

         }
     },
     { width: 0.2, colors: colors3, useColors: true, colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE })

 //

 // one line with different colors with COLOR_DISTRIBUTION_TYPE_SEGMENT (default value)
 // one color per segment is required
 // the colors are divided between segments
 const colors4 = [BABYLON.Color3.Teal(), BABYLON.Color3.Blue()]
 const points4 =
     [
         2, 8, 0,
         3, 8, 0,
         4, 7, 0
     ]
 const line4 = BABYLON.CreateGreasedLine("line4",
     {
         points: points4,
         ribbonOptions: {

         }
     },
     { width: 0.2, colors: colors4, useColors: true })

 //

 // two lines with different colors
 // you have to insert a dummy color between the colors of the lines in the color table 
 const colors5 = [BABYLON.Color3.Red(), BABYLON.Color3.Black(), BABYLON.Color3.Blue()]
 const points5 = [
     [
         -1, 6, 0,
         1, 6, 0
     ], [
         2, 6, 0,
         4, 6, 0
     ]]
 const line5 = BABYLON.CreateGreasedLine("line5",
     {
         points: points5,
         ribbonOptions: {

         }
     },
     { colors: colors5, useColors: true })

 //

 // line widths
 const points6 = BABYLON.GreasedLineTools.SegmentizeLineBySegmentCount(BABYLON.GreasedLineTools.ToVector3Array(
     [
         -4, 5, 0,
         4, 5, 0
     ]) as BABYLON.Vector3[], 5)
 const widths6 = [1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1]
 const line6 = BABYLON.CreateGreasedLine("line6",
     {
         points: points6,
         ribbonOptions: {

         }, widths: widths6
     }, { width: 0.2 })

 //

 // line widths
 const points7 = BABYLON.GreasedLineTools.SegmentizeLineBySegmentCount(BABYLON.GreasedLineTools.ToVector3Array(
     [
         -4, 4, 0,
         4, 4, 0
     ]) as BABYLON.Vector3[], 5)
 const widths7 = [1, 1, 2, 1, 3, 1, 3, 1, 2, 1, 1, 1]
 const line7 = BABYLON.CreateGreasedLine("line7",
     {
         points: points7,
         ribbonOptions: {

         }, widths: widths7
     }, { width: 0.2, color: BABYLON.Color3.Gray() })
}


// smooth shading 
const demo40 = (scene:BABYLON.Scene)=>{
    
    const points1 = BABYLON.GreasedLineTools.GetCircleLinePoints(6, 36, -2, 6, 2 * Math.PI / 37)
    const points2 = BABYLON.GreasedLineTools.GetCircleLinePoints(6, 36, 2, 6, 2 * Math.PI / 37)

    const points = [
        points1,
        points2
    ]

    const ribbonLine = BABYLON.CreateGreasedLine("ribbon-line-paths", {
        points,
        ribbonOptions: {
            pointsMode: BABYLON.GreasedLineRibbonPointsMode.POINTS_MODE_PATHS,
            closePath: true,
            // 增加平滑
            smoothShading: true,
            // 不进行背面剔除
            facesMode: BABYLON.GreasedLineRibbonFacesMode.FACES_MODE_SINGLE_SIDED_NO_BACKFACE_CULLING
        },
    }, {
        color: BABYLON.Color3.Gray(),
        width: 4,
        colorMode: BABYLON.GreasedLineMeshColorMode.COLOR_MODE_MULTIPLY
    })
}


// #endregion

// #region 创建带状物体

// 创建带状
const demo41 = (scene:BABYLON.Scene)=>{
    //Array of paths to construct ribbon
	const myPaths = [
		[ 	new BABYLON.Vector3(5.0, 0, 0),
			new BABYLON.Vector3(4.5, 1, 0),
			new BABYLON.Vector3(4.0, 2, 0),
			new BABYLON.Vector3(3.5, 3, 0),
			new BABYLON.Vector3(3.0, 4, 0)
		],
		[	new BABYLON.Vector3(0, 0.0, -5),
			new BABYLON.Vector3(0, 0.5, -7),
			new BABYLON.Vector3(0, 1.0, -9),
			new BABYLON.Vector3(0, 1.5, -11),
			new BABYLON.Vector3(0, 2.0, -13)
		],
		[	new BABYLON.Vector3(-5.0, 0, 0),
			new BABYLON.Vector3(-4.5, 1, 0),
			new BABYLON.Vector3(-4.0, 2, 0),
			new BABYLON.Vector3(-3.5, 3, 0),
			new BABYLON.Vector3(-3.0, 4, 0)
		]
		
	];

    /**
     * option	value	default value
     * pathArray	(Vector3[][]) array of array of Vector3, the array of paths REQUIRED	
     *  
     * closeArray	(boolean) to force the ribbon to join its last and first paths	false
     * closePath	(boolean) to force each ribbon path to join its last and first points	false
     * offset	(number) used if the pathArray has one path only	half the path length
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     * instance	(LineMesh) an instance of a ribbon to be updated	null
     * invertUV	(boolean) to swap the U and V coordinates at geometry construction time (texture rotation of 90°)	false
     */
	
	//Create ribbon with updatable parameter set to true for later changes
	let ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", {
        pathArray: myPaths, 
        updatable: true, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
	
    //set new values
    const path0 = [];
    for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
        path0.push(new BABYLON.Vector3(4, 4 * Math.cos(a), 4 * Math.sin(a)));
    }

    const path1 = [];
    for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
        path1.push(new BABYLON.Vector3(0, 4 * Math.cos(a), 2 + 4 * Math.sin(a)));
    }

    const path2 = [];
    for (let a = 0; a <= Math.PI; a += Math.PI / 4) {
        path2.push(new BABYLON.Vector3(-4, 4 * Math.cos(a), 4 * Math.sin(a)));
    }
    
	const myPaths2 = [path0, path1, path2];
    

    ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", {
        pathArray: myPaths2, 
        instance: ribbon, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });

}


// 创建封闭的带状
const demo42 = (scene:BABYLON.Scene)=>{
    
	const path0 = [];
    for (let a = 0; a < Math.PI; a += Math.PI / 8) {
        path0.push(new BABYLON.Vector3(-4, 4 * Math.cos(a), -8 + 4 * Math.sin(a)));
    }

    const path1 = [];
    for (let a = 0; a < Math.PI; a += Math.PI / 8) {
        path1.push(new BABYLON.Vector3(0, 4 * Math.cos(a), 2 + 4 * Math.sin(a)));
    }

    const path2 = [];
    for (let a = 0; a < Math.PI; a += Math.PI / 8) {
        path2.push(new BABYLON.Vector3(3, 4 * Math.cos(a), -8 + 4 * Math.sin(a)));
    }
    
    //Array of paths to construct ribbon
	const myPaths = [path0, path1, path2];
    
	const ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", {
        pathArray: myPaths, 
        closePath: true, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
    
}

// #endregion

// #region 创建管子形状对象

// 创建管子
const demo43 = (scene:BABYLON.Scene)=>{
    	//Array of paths to construct tube
	const myPath = [
        new BABYLON.Vector3(5.0, 0, 0.0),
       new BABYLON.Vector3(0, 1, 0.1),
       new BABYLON.Vector3(-4.0, 6, 0.2)
];

    /**
     * option	value	default value
     * path	(Vector3[]) array of Vector3, the path of the tube REQUIRED	
     *  
     * radius	(number) the radius of the tube	1
     * tessellation	(number) the number of radial segments	64
     * radiusFunction	( function(index, distance) ) a function returning a radius value from (index, distance) parameters	null
     * cap	(number) tube cap : NO_CAP, CAP_START, CAP_END, CAP_ALL	NO_CAP
     * arc	(number) ratio of the tube circumference between 0 and 1	1
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     * instance	(LineMesh) an instance of a tube to be updated	null
     * invertUV	(boolean) to swap the U and V coordinates at geometry construction time (texture rotation of 90°)	false
     */

    const tube = BABYLON.MeshBuilder.CreateTube("tube", {
        path: myPath, 
        radius: 0.5, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

}

// 创建半径变化的管子
const demo44 = (scene:BABYLON.Scene)=>{

    const makeCurve = (range:number, nbSteps:number) => {
        const path = [];
        const stepSize = range / nbSteps;
        for (let i = -range / 2; i < range / 2; i += stepSize ) {
		    path.push( new BABYLON.Vector3(5 * Math.sin(i * nbSteps / 400), 5 * Math.cos(i *nbSteps / 400), 0) );
        }
        return path;
    };

    const curve = makeCurve(40, 100);

    const radiusChange = (index:number, distance:number) => {
        const t = (index / Math.PI * 2) / 8;
        const radius =  Math.sin(t) + index / 25;
        return radius;
    };
	
	const tube = BABYLON.MeshBuilder.CreateTube("tube", {
        path: curve, 
        radiusFunction: radiusChange, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

}

// #endregion


// #region 创建挤出对象

// 创建管子
const demo45 = (scene:BABYLON.Scene)=>{
	//Shape profile in XY plane
	const myShape = [
        new BABYLON.Vector3(0, 5, 0),
       new BABYLON.Vector3(1, 1, 0),
       new BABYLON.Vector3(5, 0, 0),
       new BABYLON.Vector3(1, -1, 0),
       new BABYLON.Vector3(0, -5, 0),
       new BABYLON.Vector3(-1, -1, 0),
       new BABYLON.Vector3(-5, 0, 0),
       new BABYLON.Vector3(-1, 1, 0)
];

myShape.push(myShape[0]);  //close profile

const myPath = [
       new BABYLON.Vector3(0, 1, 0),
       new BABYLON.Vector3(0, 1.5, 2),
       new BABYLON.Vector3(0, 2.25, 4),
       new BABYLON.Vector3(0, 3.37, 6),
       new BABYLON.Vector3(0, 5.06, 8),
       new BABYLON.Vector3(0, 8.32, 10)
];

/**
 * option	value	default value
 * shape	(Vector3[]) array of Vector3, the shape you want to extrude REQUIRED	
 *  
 * path	(Vector3[]) array of Vector3, the extrusion axis REQUIRED	
 *  
 * scale	(number) the value to scale the shape	1
 * rotation	(number) the value to rotate the shape each step along the path	0
 * cap	(number) extrusion cap : NO_CAP, CAP_START, CAP_END, CAP_ALL	NO_CAP
 * closeShape	(boolean) closes the shape, no need to push shape[0] to shape array	false
 * closePath	(boolean) closes the path, no need to push path[0] to path array	false
 * updatable	(boolean) true if the mesh is updatable	false
 * sideOrientation	(number) side orientation	DEFAULTSIDE
 * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
 * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
 * instance	(LineMesh) an instance of an extruded shape to be updated	null
 * invertUV	(boolean) to swap the U and V coordinates at geometry construction time (texture rotation of 90°)	false
 * firstNormal	(Vector3) path normal of first point of path	null
 * adjustFrame	(boolean) apply heuristic to adjust tangents of paths that reverse direction	false
 */
const extrusion = BABYLON.MeshBuilder.ExtrudeShape("star", {
    shape: myShape, 
    path: myPath, 
    sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);

}

// 创建自定义管子
const demo46 = (scene:BABYLON.Scene)=>{
    
	//Shape profile in XY plane
	const myShape = [
        new BABYLON.Vector3(0, 5, 0),
       new BABYLON.Vector3(1, 1, 0),
       new BABYLON.Vector3(5, 0, 0),
       new BABYLON.Vector3(1, -1, 0),
       new BABYLON.Vector3(0, -5, 0),
       new BABYLON.Vector3(-1, -1, 0),
       new BABYLON.Vector3(-5, 0, 0),
       new BABYLON.Vector3(-1, 1, 0)
];

const myPath = [
       new BABYLON.Vector3(0, 0, 0),
       new BABYLON.Vector3(0, 0, 2),
       new BABYLON.Vector3(0, 0, 4),
       new BABYLON.Vector3(0, 0, 6),
       new BABYLON.Vector3(0, 0, 8),
       new BABYLON.Vector3(0, 0, 10)
];

const scaling = (index:number, distance:number) => {
   return 1 / (index + 1);
};

/**
 * 
 * option	value	default value
 * shape	(Vector3[]) array of Vector3, the shape you want to extrude REQUIRED	
 *  
 * path	(Vector3[]) array of Vector3, the extrusion axis REQUIRED	
 *  
 * scaleFunction	( function(i, distance) ) a function returning a scale value from (i, distance) parameters	{return 1;}
 * rotationFunction	( function(i, distance) ) a function returning a rotation value from (i, distance) parameters	{return 0;}
 * closeShape	(boolean) closes the shape, replaces ribbonClosePath	false
 * closePath	(boolean) closes the path, replaces ribbonCloseArray	false
 * ribbonClosePath	(boolean) the underlying ribbon closePath parameter value depreceated	false
 * ribbonCloseArray	(boolean) the underlying ribbon closeArray parameter value depreceated	false
 * cap	(number) extrusion cap : NO_CAP, CAP_START, CAP_END, CAP_ALL	NO_CAP
 * updatable	(boolean) true if the mesh is updatable	false
 * sideOrientation	(number) side orientation	DEFAULTSIDE
 * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
 * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
 * instance	(LineMesh) an instance of an extruded shape to be updated	null
 * invertUV	(boolean) to swap the U and V coordinates at geometry construction time (texture rotation of 90°)	false
 * firstNormal	(Vector3) path normal of first point	null
 * adjustFrame	(boolean) apply heuristic to adjust tangents of paths that reverse direction	false
 */
const extrusion = BABYLON.MeshBuilder.ExtrudeShapeCustom("star", {
    shape: myShape, 
    closeShape: true, 
    path: myPath, 
    // 自定义缩放函数
    scaleFunction: scaling, 
    sideOrientation: BABYLON.Mesh.DOUBLESIDE},
     scene);
       

}


// #endregion


// #region 创建不规则面

const demo47 = (scene:BABYLON.Scene)=>{
	//Polygon shape in XoZ plane
	const shape = [ 
		new BABYLON.Vector3(4, 0, -4), 
        new BABYLON.Vector3(2, 0, 0), 
        new BABYLON.Vector3(5, 0, 2), 
        new BABYLON.Vector3(1, 0, 2), 
        new BABYLON.Vector3(-5, 0, 5), 
        new BABYLON.Vector3(-3, 0, 1), 
        new BABYLON.Vector3(-4, 0, -4), 
        new BABYLON.Vector3(-2, 0, -3), 
        new BABYLON.Vector3(2, 0, -3)
    ];
			  
	//Holes in XoZ plane
	const holes = [];
		holes[0] = [ 
            new BABYLON.Vector3(1, 0, -1),
            new BABYLON.Vector3(1.5, 0, 0),
            new BABYLON.Vector3(1.4, 0, 1),
            new BABYLON.Vector3(0.5, 0, 1.5)
        ];

		holes[1] = [ 
            new BABYLON.Vector3(0, 0, -2),
            new BABYLON.Vector3(0.5, 0, -1),
            new BABYLON.Vector3(0.4, 0, 0),
            new BABYLON.Vector3(-1.5, 0, 0.5)
        ];
	
    /**
     * option	value	default value
     * shape	(Vector3[]) array of Vector3, the shape you want to build REQUIRED	
     *  
     * holes	(Vector3[][]) array of holes, each hole being an array of successive Vector3	[]
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     * frontUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     * backUVs	(Vector4) ONLY WHEN sideOrientation:BABYLON.Mesh.DOUBLESIDE is an option	Vector4(0,0, 1,1)
     */
    const polygon = BABYLON.MeshBuilder.CreatePolygon("polygon", {
        shape:shape, 
        holes:holes, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE 
    },scene,earcut);

}

const demo48 = (scene:BABYLON.Scene)=>{
    //Polygon shape in XZ plane
	const shape = [ 
		new BABYLON.Vector3(4, 0, -4), 
        new BABYLON.Vector3(2, 0, 0), 
        new BABYLON.Vector3(5, 0, 2), 
        new BABYLON.Vector3(1, 0, 2), 
        new BABYLON.Vector3(-5, 0, 5), 
        new BABYLON.Vector3(-3, 0, 1), 
        new BABYLON.Vector3(-4, 0, -4), 
        new BABYLON.Vector3(-2, 0, -3), 
        new BABYLON.Vector3(2, 0, -3)
    ];
			  
	//Holes in XoZ plane
	const holes = [];
		holes[0] = [ 
            new BABYLON.Vector3(1, 0, -1),
            new BABYLON.Vector3(1.5, 0, 0),
            new BABYLON.Vector3(1.4, 0, 1),
            new BABYLON.Vector3(0.5, 0, 1.5)
        ];

		holes[1] = [ 
            new BABYLON.Vector3(0, 0, -2),
            new BABYLON.Vector3(0.5, 0, -1),
            new BABYLON.Vector3(0.4, 0, 0),
            new BABYLON.Vector3(-1.5, 0, 0.5)
        ];
		
    /**
     * option	value	default value
     * shape	(Vector3[]) array of Vector3, the shape you want to turn REQUIRED	
     *  
     * depth	(number) the depth of the extrusion REQUIRED	
     *  
     * faceColors	(Color4[]) array of 3 Color4, one per box face	Color4(1, 1, 1, 1) for each side
     * faceUV	(Vector4[]) array of 3 Vector4, one per box face	UVs(0, 0, 1, 1) for each side
     * wrap	(boolean) maps texture to sides with faceUV[1] when false texture mapped to each individual side, when true wrapped over all sides	false
     * holes	(Vector3[][]) array of holes, each hole being an array of successive Vector3	[]
     * updatable	(boolean) true if the mesh is updatable	false
     * sideOrientation	(number) side orientation	DEFAULTSIDE
     */
    const extrudedPolygon = BABYLON.MeshBuilder.ExtrudePolygon("polygon", {
        shape:shape, 
        holes:holes, 
        depth: 2, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE 
    },scene, earcut);

}

// #endregion

