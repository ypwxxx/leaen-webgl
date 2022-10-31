// 片元着色器
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;      // 视窗尺寸
uniform vec2 u_mouse;           // 鼠标坐标
uniform float u_time;           // 时间

vec3 hsb2rgb(in vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float circle(in vec2 _st, in float _radius) {
    vec2 dist = _st - vec2(0.5);
    return 1. - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(dist, dist) * 4.0);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    // step样式
    // vec2 p = step(vec2(0.1), 1.0 - st);
    // vec2 t = step(vec2(0.1), st);

    // // 顺滑样式
    // vec2 p = smoothstep(vec2(0.0), vec2(0.1), 1.0 - st);
    // vec2 t = smoothstep(vec2(0.0), vec2(0.1), st);

    // gl_FragColor = vec4(vec3(t.x * t.y * p.x * p.y), 1.0);

    // // circle
    // float pct = step(0.5, distance(st, vec2(0.5)));

    // // circle smoothstep
    // float dis = distance(st, vec2(0.5));
    // float pct = smoothstep(0.49, 0.5, dis);
    // vec3 color = vec3(0.0);

    // color = (1.0 - pct) * hsb2rgb(vec3(st.x, 1.0, st.y)) + pct * vec3(1.0);

    // gl_FragColor = vec4(color, 1.0);

    // // 另一种画圆
    // vec3 color = vec3(circle(st, 0.9));

    // gl_FragColor = vec4(color, 1.0);

    st.x *= u_resolution.x / u_resolution.y;
    float d = 0.0;

  // Remap the space to -1. to 1.
    st = st * 2. - 1.;

  // Make the distance field
    // d = length(abs(st) - .3);
//   d = length( min(abs(st)-.3,0.) );
  d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
    gl_FragColor = vec4(vec3(fract(d * 10.0)), 1.0);

  // Drawing with the distance field
//   gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
//   gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
//   gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}