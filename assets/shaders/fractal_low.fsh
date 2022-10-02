#include <common>
varying vec2 vUv;
uniform float iTime;
uniform vec2 mouse;
uniform vec2 mouseN;
uniform float zoom;
uniform float sRatio;
uniform float alpha;

#define MAXDIST 150.

struct Ray {
	vec3 ro;
    vec3 rd;
};

void pR(inout vec2 p, float a) {
	p = cos(a)*p + sin(a)*vec2(p.y, -p.x);
}

float fractal(vec3 p)
{
    float scale = 1.3;
    const int iterations = 7;
	float l = length(p);
    
    vec2 rotationAnimAmp = vec2(0.05,0.05);
	
    vec3 juliaOffset = vec3(-4.,-1.5,-.5);
  	float c = 1e20;
  
    for (int i=0; i<iterations; i++) {
		p = abs(p);

        vec2 rotationPhase = vec2(mouse.x + l*rotationAnimAmp.x * sin(iTime+l*0.1),mouse.y + l*rotationAnimAmp.y * cos(iTime+l*0.1));

        // scale and offset the position
		p = p*scale + juliaOffset;
        
        // Rotate the position
        pR(p.xz,rotationPhase.x);
		pR(p.yz,rotationPhase.y);		
        l=length(p);

	}
	return l*pow(scale, -float(iterations))-.25;
}

float map(vec3 pos) {
    return fractal(pos);
}

float march(Ray ray) 
{
    const int steps = 5;
    const float prec = 0.185;
    float res = 0.;
    
    for (int i = 0; i < steps; i++) 
    {        
        float s = map(ray.ro + ray.rd * res);
        
        if (res > MAXDIST || s < prec) 
        {
        	break;    
        }
        
        res += s;
        
    }
   
    return res;
}

vec3 calcNormal(vec3 pos) 
{
	const vec3 eps = vec3(.25, 0.0, 0.0);
                          
    return normalize(
        vec3(map(pos + eps) - map(pos - eps),
             map(pos + eps.yxz) - map(pos - eps.yxz),
             map(pos + eps.yzx) - map(pos - eps.yzx) ) 
    );
}

vec3 render(Ray ray) 
{
    vec3 col = vec3(0.05);
	float res = march(ray);
   
    vec3 p = ray.ro+res*ray.rd;
    vec3 normal = calcNormal(p);
    col = (normal)*0.5+0.5;
    
	col = vec3(1.+(dot(ray.rd,normal)))*col;  
    col = mix(col, vec3(0.05), clamp((res*res)/550., 0., 1.));
   	return col;
}
mat3 camera(in vec3 ro, in vec3 rd) 
{
	vec3 forward = normalize(rd - ro);
    vec3 worldUp = vec3(0., 1., 0.0);
    vec3 x = normalize(cross(forward, worldUp));
    vec3 y = normalize(cross(x, forward));
    return mat3(x, y, forward);
}

void main() {
	vec2 uv = vUv;
    uv = uv * 2.0 - 1.0;
    uv.x *= sRatio;
    
    vec3 camPos = vec3(mouseN.x, mouseN.y, 12.5 + zoom);
    vec3 camDir = vec3(.0, .0, -1. );
    mat3 cam = camera(camPos, camDir);
    
    vec3 rayDir = cam * normalize( vec3(uv, 1.) );
    
    Ray ray = Ray(camPos, rayDir);
    ray.ro = camPos;
    ray.rd = rayDir;
    
    gl_FragColor.xyz = mix(vec3(0.),render(ray), alpha);
    gl_FragColor.w = 1.0;
}