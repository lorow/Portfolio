uniform sampler2D inputBuffer;
uniform vec2 resolution;

vec2 curveRemapUV(vec2 uv){
    vec2 vUV;
    vUV = uv * 2.0 - 1.0;
    vec2 offset = abs(vUV.yx) / vec2(13.0, 13.0);
    vUV = vUV + vUV * offset * offset;
    vUV = vUV * 0.5 + 0.5;
    return vUV;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
    vec2 screenUV  = curveRemapUV(uv);
    vec4 baseColor = texture(inputBuffer, screenUV);
    if (screenUV.x < 0.0 || screenUV.y < 0.0 || screenUV.x > 1.0 || screenUV.y > 1.0){
        outputColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else{
        outputColor = baseColor;
    }
}