var json={
    shadow: {
        size: 1024,
        usePercentageCloserFiltering: true,
    },
    materials : [
        {
            id: "floorMaterial",
            name: "地板材质",
            type: 'material',
            ambientPath: "",
            offset: [0,0],
            scale: [16,6],
            diffuse: {      // 漫反射, 漫反射和镜面材料需要创建光源。
                path: "img/material/floor.jpg",
                offset: [0,0],
                scale: [16,6],
            },
            specular:{},    // 高光
            emissive:{},    // 自发光
            ambient:{},    // 环境, 环境颜色需要设置场景的环境颜色，提供环境背景照明
            alpha: 0.9,
        },
        {
            id: "roomMater",
            name: "房间材质",
            type: 'material',
            emissive: {      // 漫反射, 漫反射和镜面材料需要创建光源。
                color: BABYLON.Color3.FromHexString("#16a085"),
            },
            alpha: 0.4,
        }
    ],
    lights: [
        {
            id: "light1",
            name: "半球光",
            type: 'HemisphericLight',
            dir: [0, 1, 0],
            pos: [0,2,0],
            intensity: 0.85,
            shadow: false,
        },
        {
            id: "light2",
            name: "平行光",
            type: 'DirectionalLight',
            dir: [-0.25, -1, 0.25],  // x 对应前后方向; y 对应上下方向; z 对应左右方向
            pos: [25,25,25], // 位置大小对应模糊程度
            intensity: 1,
            shadow: true,
        }
    ],
    objects: [
        // {
        //     id: "floor",
        //     name: '地板',
        //     type: 'box',
        //     width: 26,
        //     height: 14,
        //     depth: 0.2,
        //     op: "+",
        //     pos: [0,0,0],
        //     rot: [0, 0, 0],
        //     style: {
        //         'texture': 'floorMaterial',
        //     },
        //     shadow: true,
        // },
        {
            id: "sphere1",
            name: '球',
            type: 'sphere',
            diameter: 2,  // 直径
            segments: 5,  // 分段数
            pos: [-2, 1.2, 0],
            // style: {
            //     'texture': 'floorMaterial',
            // },
            shadow: true,
        },
        {
            id: "sphere2",
            name: '球',
            type: 'icoSphere',
            radius: 1,  // 半径
            subdivisions: 5,  // 分段数
            pos: [2, 1.2, 0],
            // style: {
            //     'texture': 'floorMaterial',
            // },
            shadow: true,
        },
        {
            id: "box1",
            name: '立方体',
            type: 'box',
            width: 2,   // 对应 x
            height: 2,  // 对应 y
            depth: 2,   // 对应 z
            op: "+",
            pos: [5, 1.2, 5],
            style: {
                'texture': 'roomMater',
            },
            shadow: true,
        },
        {
            id: "wall-east",
            name: '墙-东',
            type: 'box',
            width: 14,
            height: 5,
            depth: 0.2,
            op: "+",
            pos: [12, 2.5, 0],
            rot: [0, 0, 0],
            style: {
                'texture': 'roomMater',
            },
            shadow: true,
        },
        {
            id: "wall-west",
            name: '墙-西',
            type: 'box',
            width: 14,
            height: 5,
            depth: 0.2,
            op: "+",
            pos: [-12, 2.5, 0],
            rot: [0, 0, 0],
            style: {
                'texture': 'floorMaterial',
            },
            shadow: true,
        },
        // {
        //     id: "wall-south",
        //     name: '墙-南',
        //     type: 'box',
        //     width: 0.2,
        //     height: 24,
        //     depth: 5,
        //     op: "+",
        //     pos: [0, 7, 2.5],
        //     rot: [0, 0, Math.PI / 2],
        //     style: {
        //         'texture': 'floorMaterial',
        //     },
        //     shadow: true,
        // },
        // {
        //     id: "wall-north",
        //     name: '墙-北',
        //     type: 'box',
        //     width: 0.2,
        //     height: 24,
        //     depth: 5,
        //     op: "+",
        //     pos: [0, -7, 2.5],
        //     rot: [0, 0, Math.PI / 2],
        //     style: {
        //         'texture': 'floorMaterial',
        //     },
        //     shadow: true,
        // },
        // {
        //     id: "wall-north-window1",
        //     name: '墙-北',
        //     type: 'box',
        //     width: 0.2,
        //     height: 2,
        //     depth: 5,
        //     op: "-",
        //     pos: [0, -7, 2.5],
        //     rot: [0, 0, Math.PI / 2],
        //     style: {
        //         'texture': 'floorMaterial',
        //     },
        //     shadow: true,
        // }
    ],
}