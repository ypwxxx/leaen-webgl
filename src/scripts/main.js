"use strict";

//创建着色器方法, 参数: 渲染上下文, 着色器类型, 数据源
let createShader = function(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(success){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};

//创建着色器程序
let createProgram = function(gl, vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(success){
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
};

//设置尺寸
let resize = function(canvas){
    let realToCSSPixels = window.devicePixelRatio;

    let displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
    let displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

    if(canvas.width !== displayWidth ||
        canvas.height !== displayHeight){
        
            canvas.width = displayWidth;
            canvas.height = displayHeight;
    }
};

//随机值
let randomInt = function(range){
    return Math.floor(Math.random() * range);
};

//一个设置矩形的方法
let setRectangle = function(gl, x, y, width, height){
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2]), gl.STATIC_DRAW);
};

//一个设置三角形的方法
let setGeometry = function(gl, ax, ay, bx, by, cx, cy){
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            ax, ay,
            bx, by,
            cx, cy]),
        gl.STATIC_DRAW
    );
};

function main(){

    //获取canvas标签
    // let canvas = document.getElementById("myCanvas");
    const glCanvas = document.querySelector('#glCanvas');
    // glCanvas.width = window.outerWidth;
    // glCanvas.height = window.outerHeight;

    const gl = glCanvas.getContext('webgl');
    if(!gl){
        console.log('Failed to retrieve the gl element');
        return;
    }

    let vertexShaderSource = document.getElementById("2d-vertex-shader").text;
    let fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    let resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    let colorUniformLocation = gl.getUniformLocation(program, 'u_color');
    // let customColorUniformLocation = gl.getUniformLocation(program, 'v_color');

    let positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // let positions = [
    //     10, 20,
    //     80, 20,
    //     10, 30,
    //     10, 30,
    //     80, 20,
    //     80, 30,
    // ];
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    resize(glCanvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset
    );
    
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    let drawScene = function(){
        /** 绘制50个矩形 */
        // for(let i = 0; i < 50; i++){
        //     setRectangle(gl, randomInt(600), randomInt(600), randomInt(600), randomInt(600));
    
        //     gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        //     let primitiveType = gl.TRIANGLES;
        //     offset = 0;
        //     let count = 6;
        //     gl.drawArrays(primitiveType, offset, count);
        // }

        /**绘制一个三角形 */
        setGeometry(gl, randomInt(20), randomInt(500), randomInt(100),
             randomInt(200), randomInt(300), randomInt(100));
        let primitiveType = gl.TRIANGLES;
        offset = 0;
        let count = 3;
        gl.drawArrays(primitiveType, offset, count);
    };

    drawScene();
};

// main();

window.onload = function(e) {
    let body = document.body;
    body.onload = main();
};
// let body = document.body;
// body.onload = main();

