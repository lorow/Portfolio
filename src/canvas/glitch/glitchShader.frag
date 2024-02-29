// void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
//     outputColor = vec4(inputColor.r * sin(time), inputColor.g * sin(time), inputColor.b  * sin(time), inputColor.a);
// }

uniform sampler2D noiseTexture;

float rand(float n) {
	return fract(sin(n) * 43758.5453123);
}

float noise(float p) {
	float minimum = floor(p);
	float maximum = fract(p);

	return mix(rand(minimum), rand( minimum + 1.0), maximum);
}

float blockyNoise(vec2 uv, float threshold, float scale, float seed)  {
	float scroll = floor(time + sin(11.0 * time) * sin(time)) * 0.77;
	vec2 noiseUV = uv.yy / scale + scroll;
	float secondNoise = texture2D(noiseTexture, noiseUV).r;

	float id = floor(secondNoise * 20.0);
	id = noise(id + seed) - 0.5;

	if (abs(id) > threshold){
		id = 0.0;
	}

	return id;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	float rgbIntensity = 0.1 + 0.1 * sin(time * 3.7);
	float displaceIntensity = 0.2 + 0.3 * pow(sin(time * 1.2), 5.0);
	float interlaceIntensity = 0.01;
	float dropoutIntensity = 0.1;
	vec2 modifiableUV = uv;

	float displace = blockyNoise(modifiableUV + vec2(modifiableUV.y, 0.0), displaceIntensity, 25.0, 66.6); // blocks
	modifiableUV.x += displace;

	vec2 offs = 0.1 * vec2(blockyNoise(uv.xy + vec2(modifiableUV.y, 0.0), rgbIntensity, 65.0, 341.0), 0.0); // aberration

	float r = texture2D(inputColor, modifiableUV-offs).r;
	float g = texture2D(inputColor, modifiableUV).g;
	float b = texture2D(inputColor, modifiableUV-offs).b;

	float line = fract(modifiableUV.y / 3.0);
	vec3 mask = vec3(3.0, 0.0, 0.0);
	if (line > 0.333)
		mask = vec3(0.0, 3.0, 0.0);
	if (line > 0.666)
		mask = vec3(0.0, 0.0, 3.0);

	float maskNoise = blockyNoise(modifiableUV, interlaceIntensity, 90, time) * max(displace, offs.x);
	maskNoise = 1.0 - maskNoise; // we reverse the mask noise

	if (maskNoise == 1.0)
		mask = vec3(1.0);

	float dropout = blockyNoise(modifiableUV, dropoutIntensity, 11.0, time) * blockyNoise(modifiableUV.yx, dropoutIntensity, 90, time);
	mask *= (1.0 - 5.0 * dropout);

	outputColor = vec4(mask * vec3(r, g, b), 1.0);
}
