uniform sampler2D noiseTexture;
uniform sampler2D inputBuffer;

float rand(float n) {
	return fract(sin(n) * 43758.5453123);
}

float noise(float p) {
	float minimum = floor(p);
	float maximum = fract(p);

	return mix(rand(minimum), rand( minimum + 1.0), maximum);
}

float _customBlockyNoise(vec2 uv, float threshold, float scale, float seed, float slowedDownTime)  {
	float scroll = floor(time + sin(11.0 * slowedDownTime) * sin(slowedDownTime)) * 0.77;
	vec2 noiseUV = uv.yy / scale + sin(scroll);
	float secondNoise = texture(noiseTexture, noiseUV).r;

	float id = floor(secondNoise * 20.0);
	id = noise(id + seed) - 0.5;

	if (abs(id) > threshold){
		id = 0.0;
	}

	return id;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

	float slowedDownTime = time * 0.1 + sin(time);

	float rgbIntensity = 0.1 + 0.1 * sin(slowedDownTime * 3.7);
	float displaceIntensity = 0.1 + 0.3 * pow(sin(slowedDownTime * 1.2), 5.0);
	float interlaceIntensity = 0.01;
	float dropoutIntensity = 0.1;
	vec2 myUv = uv;

	float displace = _customBlockyNoise(myUv + vec2(myUv.y, 0.0), displaceIntensity, 25.0, 66.6, slowedDownTime); // blocks
	displace *= _customBlockyNoise(myUv.yx + vec2(0.0, myUv.x), displaceIntensity, 111.0, 13.7, slowedDownTime);
	myUv.x += displace;

	vec2 offs = 0.1 * vec2(_customBlockyNoise(uv.xy + vec2(myUv.y, 0.0), rgbIntensity, 65.0, 341.0, slowedDownTime), 0.0); // aberration

	float r = texture(inputBuffer, myUv-offs).r;
	float g = texture(inputBuffer, myUv).g;
	float b = texture(inputBuffer, myUv-offs).b;

	float line = fract(myUv.y / 3.0);
	vec3 mask = vec3(3.0, 0.0, 0.0);
	if (line > 0.333)
		mask = vec3(0.0, 3.0, 0.0);
	if (line > 0.666)
		mask = vec3(0.0, 0.0, 3.0);

	float maskNoise = _customBlockyNoise(myUv, interlaceIntensity, 90.0, slowedDownTime, slowedDownTime) * max(displace, offs.x);
	maskNoise = 1.0 - maskNoise; // we reverse the mask noise

	if (maskNoise == 1.0)
		mask = vec3(1.0);

	float dropout = _customBlockyNoise(myUv, dropoutIntensity, 11.0, slowedDownTime, slowedDownTime) * _customBlockyNoise(myUv.yx, dropoutIntensity, 90.0, slowedDownTime, slowedDownTime);
	mask *= (1.0 - 5.0 * dropout);

	outputColor = vec4(mask * vec3(r, g, b), 1.0);
}
