// 片元着色器
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;      // 视窗尺寸
uniform vec2 u_mouse;           // 鼠标坐标
uniform float u_time;           // 时间

// 像素点计算
float plot(float stY, float pct) {
    return smoothstep(pct - 0.02, pct, stY) -
        smoothstep(pct, pct + 0.02, stY);
}

// 正弦函数动画
float sinTweenFunc(float ori, float time) {
    // u_time需要放大一定倍数，否则不容易感知图像变化
    return sin(radians(ori + time * 10.0));
}

// 余弦函数动画
float cosTweenFunc(float ori, float time) {
    // u_time需要放大一定倍数，否则不容易感知图像变化
    return cos(radians(ori + time * 10.0));
}

// 脉冲函数
float impulse(float k, float x) {
    float h = k * x;
    return h * exp(1.0 - h);
}

vec4 test(vec2 fragCoord) {
    vec3 c;
    float len, time = u_time;
    for(int i = 0; i < 3; i++) {
        vec2 uv, p = fragCoord.xy / u_resolution;
        uv = p;
        p -= .5;
        p.x *= u_resolution.x / u_resolution.y;
        time += .07;
        len = length(p);
        uv += p / len * (sin(time) + 1.) * abs(sin(len * 9. - time - time));
        c[i] = .01 / length(mod(uv, 1.) - .5);
    }
    return vec4(c / len, u_time);
}

void main() {
    // vec2 st = gl_FragCoord.xy / u_resolution;
    // vec3 color = vec3(1.0);

    // sin
    // float y = sinTweenFunc(gl_FragCoord.x, u_time);
    // float pct = plot(st.y * 2.0 - 1.0, y * 0.8);

    // 脉冲
    // float y = impulse(12., st.x);
    // float pct = plot(st.y, y);

    // color = (1.0 - pct) * color + pct * vec3(0.0);
    // gl_FragColor = vec4(color, 1.0);

    // 特效演示
    gl_FragColor = test(gl_FragCoord.xy);
}