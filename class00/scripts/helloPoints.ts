// Hello Points

// 顶点着色器程序
let VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize; \n' +
    'void main() {\n' + 
    ' gl_Position = a_Position; \n' + 
    ' gl_PointSize = a_PointSize;\n' + 
    '}\n';

// 片元着色器程序
let FSHADER_SOURCE = 
    'precision mediump float;\n' +
    'uniform vec4 u_PointColor;\n' +
    'void main() {\n' + 
    ' gl_FragColor = u_PointColor;\n' +
    '}\n';

let g_points: any[] = [];      // 存储已经获取到的点坐标
let g_colors: any[] = [];      // 存储点的颜色

function main(){
    let canvas = document.getElementById('webgl');
    let gl = getWebGLContext(canvas, true);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return;
    }

    // 获取attribute变量存储位置
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    let u_PointColor = gl.getUniformLocation(gl.program, 'u_PointColor');

    if(a_Position < 0){
        console.log('Failed to get the strorage location of a_Position');
    }

    if(canvas !== null){
        let canDraw = false;

        // 注册鼠标点击事件
        canvas.onmousedown = function(ev){
            console.log('鼠标按下');
            canDraw = true;
        };
        canvas.onmousemove = function(ev){
            console.log('鼠标移动');
            if(!canDraw) return;
            drawing(ev, gl, canvas, a_Position, u_PointColor);
        };
        canvas.onmouseup = function(ev){
            console.log('鼠标放开');
            canDraw = false;
        };
        document.onkeydown = function(ev){
            console.log(`按键按下: code: ${ev.code}, key: ${ev.key}, keyCode: ${ev.keyCode}`);
            let code = ev.keyCode;
            if(code === 32){
                console.log('清空屏幕');
                g_points = [];
                g_colors = [];
                gl.clear(gl.COLOR_BUFFER_BIT);
                canDraw = false;
            }
        }
    }

    gl.vertexAttrib1f(a_PointSize, 5.0);
    gl.clearColor(0.78, 0.68, 0.53, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

function drawing(ev: MouseEvent, gl: any, canvas: HTMLElement | null, a_Position: any, u_PointColor: any){
    if(canvas === null) return;
    let x = ev.clientX;
    let y = ev.clientY;
    let rect  = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push({x: x, y: y});
    let color = {
        r: Math.abs(x),
        g: Math.abs(y),
        b: Math.abs(x - y),
        a: Math.abs(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))),
    }
    g_colors.push(color);
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;
    for(let i = 0; i < len; i++){
        let pos = g_points[i];
        let rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position, pos.x, pos.y, 0.0);
        gl.uniform4f(u_PointColor, rgba.r, rgba.g, rgba.b, rgba.a);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
};