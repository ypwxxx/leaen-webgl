
// before class test

let main = function(){
    // 课程1. 获取canvas
    let canvas: HTMLElement | null = document.getElementById('webgl');
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // // 课程1.获取canvas上下文
    // if(canvas instanceof HTMLCanvasElement){
    //     let ctx = canvas.getContext('2d');
    //     if(ctx){
    //         ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    //         ctx.fillRect(120, 10, 150, 150);
    //     }
    // }

    // 课程2. 获取webGL
    let gl = getWebGLContext(canvas, true);
    if(!gl){
        console.log('Failed to get the rnedering for WebGL');
        return;
    }

    // 课程2. 指定gl清空颜色, 并清空
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}