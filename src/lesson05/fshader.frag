// 片元着色器
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;      // 视窗尺寸
uniform vec2 u_mouse;           // 鼠标坐标
uniform float u_time;           // 时间

// 切割方块
vec2 spliceTile(vec2 st, float zoom) {
    st *= zoom;
    return fract(st);
}

// 2d旋转
vec2 rotate2D(vec2 st, float angle) {
    st -= 0.5;
    st = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * st;
    st += 0.5;
    return st;
}

// 绘制box
float box(vec2 _st, vec2 _size, float _smoothEdges) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 aa = vec2(_smoothEdges * 0.5);
    vec2 uv = smoothstep(_size, _size + aa, _st);
    uv *= smoothstep(_size, _size + aa, vec2(1.0) - _st);
    return uv.x * uv.y;
}

// 画一个九宫格
float draw01(vec2 st) {
    return (smoothstep(0.0, 0.01, st.x) + smoothstep(1.0, 0.99, st.x) +
        smoothstep(0.0, 0.01, st.y) + smoothstep(1.0, 0.99, st.y)) * 0.25;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    st = spliceTile(st, 4.0);

    st = rotate2D(st, PI * 0.25);

    color = vec3(vec3(box(st, vec2(0.7), 0.01)));

    // color = vec3(draw01(st));
    gl_FragColor = vec4(color, 1.0);
}