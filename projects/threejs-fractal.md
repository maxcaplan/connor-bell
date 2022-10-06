---
layout: default
title: Animation
---

<style>

.title {
    left: 0;
    line-height: 5rem;
    position: absolute;
    text-align: center;
    top: 35%;
    width: 100%;
    letter-spacing: 0.0px;
    word-spacing: -1px;
   -webkit-text-stroke-width: 2px;
   -webkit-text-stroke-color: black;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
}
.title h2 {
    font-size:5rem;
    font-weight: 420;
}

.title h4 {
    font-size:3rem;
    font-weight: 400;
}

@media only screen and (max-width: 600px) {
  .title {
    line-height: 4.5rem;
      top: 25%;

    }
}

@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

canvas {
    position: absolute;
    width: 80%;
    height:100px;
    z-index: -100;
}
</style>

<script id="vert" type="x-shader/x-vertex">
    #include <common>
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
</script>

<script id="default-frag" type="x-shader/x-fragment">
varying vec2 vUv;
void main () {
    gl_FragColor = vec4(.05);
}
</script>

<script src="{{absolute_url}}/js/three.js"></script>
<script src="{{absolute_url}}/js/ShaderLoader.js"></script>
<canvas id="canvasID"></canvas>
<script>

var scene = new THREE.Scene();
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
var container = document.getElementById("canvasID");
var clock = new THREE.Clock();
    clock.start();
var shaderloader = new ShaderLoader();
var renderer = new THREE.WebGLRenderer({canvas:container});
var targetPos = new THREE.Vector2(0.5, 0.5);
var vel = new THREE.Vector2(0.0, 0.0);
var pos = new THREE.Vector2(0.5, 0.5);

renderer.setPixelRatio( window.devicePixelRatio*0.5);
renderer.setSize( innerWidth, innerHeight);
renderer.setClearColor (0x000000, 1);
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

var uniforms =  {
	iTime: { type:"f", value: 1.0 },
    mouseN : { type:"v2", value: pos},
    mouse : { type:"v2", value: pos},
    zoom : { type:"f", value : .0 },
    sRatio : { type:"f", value : innerWidth/innerHeight },
    alpha : { type:"f", value : 0.0 }
};

var lowMaterial = new THREE.ShaderMaterial({
    uniforms : uniforms,
    vertexShader: document.querySelector( '#vert' ).textContent.trim(),
    fragmentShader: document.querySelector( '#default-frag' ).textContent.trim()
});

shaderloader.loadAndSet("{{absolute_url}}/assets/shaders/fractal_low.fsh",
                        lowMaterial,
                        "fragmentShader");

var postPlane = new THREE.PlaneBufferGeometry( 2, 2 );
postQuad = new THREE.Mesh( postPlane, lowMaterial );
scene.add(postQuad);
updateMouseUniforms(pos.x, pos.y);

function updateMouseUniforms(x,y)
{
    var mouse = new THREE.Vector2(x*3.14, y*3.14 );
    uniforms.mouse.value = mouse;
    var mouseN = new THREE.Vector2(x*20.0-10.0, y*30. - 15. );
    uniforms.mouseN.value = mouseN;
}

document.onmousemove = function(e){
    targetPos.x = (e.pageX/width);
    targetPos.y = (e.pageY/height);
}

var lastTime = 0.0;

function render() {
    var elapsed = clock.getElapsedTime();
    uniforms.iTime.value = elapsed*0.1;
    uniforms.alpha.value = Math.min(1.0,elapsed);

    var tmp = targetPos.clone();

    var delta = tmp.sub(pos);
    var length = delta.length();

    delta = delta.normalize();
    var d = elapsed - lastTime;

    pos.setX(pos.x + delta.x * length * d * 5);
    pos.setY(pos.y + delta.y * length * d * 5);    
    updateMouseUniforms(pos.x, pos.y);
    requestAnimationFrame( render );
    renderer.render( scene, camera );
    lastTime = elapsed;
}

document.addEventListener("touchmove", onDocumentTouchmove, false);

function onDocumentTouchmove( event ) {
    event.preventDefault();
    event.stopPropagation();
    targetPos.x = (event.targetTouches[ 0 ].pageX/width),
    targetPos.y = (event.targetTouches[ 0 ].pageY/height);

}

function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;
    uniforms.sRatio.value = aspect;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

render();
</script>
