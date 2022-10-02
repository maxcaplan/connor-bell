/**
 * Returns the contents of a file from a specified url as plain text
 * @param {string} url - The url of the source file to fetch
 * @returns {Promise<string>}
 */
function getTextFromURL(url) {
  return new Promise((res, rej) => {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        if (request.status == 200) {
          res(request.responseText)
        }
        else
          rej(request.statusText);
      }
    };
    request.send();
  })
}

async function test() {
  let text = await getTextFromURL("/assets/shaders/fractal_low.fsh")
  console.log(text)
}

const vertexShader = `
#include <common>
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

/**
 * Renders a shader to the home canvas
 */
async function main() {
  var targetPos = new THREE.Vector2(0.5, 0.5);
  var vel = new THREE.Vector2(0.0, 0.0);
  var pos = new THREE.Vector2(0.5, 0.5);

  const canvas = document.querySelector('#home-shader');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneBufferGeometry(2, 2);

  const fragmentShader = await getTextFromURL("/assets/shaders/fractal_low.fsh")
  var uniforms = {
    iTime: { type: "f", value: 1.0 },
    mouseN: { type: "v2", value: pos },
    mouse: { type: "v2", value: pos },
    zoom: { type: "f", value: .0 },
    sRatio: { type: "f", value: innerWidth / innerHeight },
    alpha: { type: "f", value: 0.0 }
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    uniforms.sRatio.value = width / height
    return needResize;
  }

  function updateMouseUniforms(x, y) {
    var mouse = new THREE.Vector2(x * 3.14, y * 3.14);
    uniforms.mouse.value = mouse;
    var mouseN = new THREE.Vector2(x * 20.0 - 10.0, y * 30. - 15.);
    uniforms.mouseN.value = mouseN;
  }

  document.onmousemove = function (e) {
    targetPos.x = (e.pageX / canvas.clientWidth);
    targetPos.y = (e.pageY / canvas.clientHeight);
  }

  function onDocumentTouchmove(e) {
    e.preventDefault();
    e.stopPropagation();
    targetPos.x = (e.targetTouches[0].pageX / width),
      targetPos.y = (e.targetTouches[0].pageY / height);

  }

  // document.addEventListener("touchmove", onDocumentTouchmove, { passive: false });

  updateMouseUniforms(pos.x, pos.y);

  function render(time, lastTime) {
    time *= 0.001;  // convert to seconds

    resizeRendererToDisplaySize(renderer);

    uniforms.iTime.value = time;
    uniforms.alpha.value = Math.min(1.0, time);

    var tmp = targetPos.clone();
    var delta = tmp.sub(pos);
    var length = delta.length();

    delta = delta.normalize();
    var d = time - lastTime;

    pos.setX(pos.x + delta.x * length * d * 5);
    pos.setY(pos.y + delta.y * length * d * 5);
    updateMouseUniforms(pos.x, pos.y);

    renderer.render(scene, camera);

    lastTime = time

    requestAnimationFrame(t => render(t, lastTime));
  }

  requestAnimationFrame(t => render(t, t));
}

main();