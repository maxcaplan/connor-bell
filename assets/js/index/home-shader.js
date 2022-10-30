/**
 * Returns the contents of a file from a specified url as plain text
 * @param {string} url - The url of the source file to fetch
 * @returns {Promise<string>}
 */
function getTextFromURL(url) {
  return new Promise((res, rej) => {
    const request = new XMLHttpRequest();
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

/**
 * Renders a shader to the home canvas
 */
async function main() {
  // Init vars
  let animationFrameId
  const targetPos = new THREE.Vector2(0.5, 0.5);
  const vel = new THREE.Vector2(0.0, 0.0);
  const pos = new THREE.Vector2(0.5, 0.5);

  // Create renderer
  const canvas = document.querySelector('#home-shader');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.autoClearColor = false;

  // Create basic scene elements
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

  // Get Shader data
  const vertexShader = `
  #include <common>
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `
  const fragmentShader = await getTextFromURL("/assets/shaders/fractal_low.fsh")

  // Init shader uniforms
  const uniforms = {
    iTime: { type: "f", value: 1.0 },
    mouseN: { type: "v2", value: pos },
    mouse: { type: "v2", value: pos },
    zoom: { type: "f", value: .0 },
    sRatio: { type: "f", value: innerWidth / innerHeight },
    alpha: { type: "f", value: 0.0 }
  };

  // Create shader material
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
  });

  // Create shader object to render in scene
  const obj = new THREE.Mesh(plane, material)
  obj.matrixAutoUpdate = false

  scene.add(obj);

  /** 
   * Sets the renderer size for the current canvas size 
   * @param {number} renderer - the Three JS renderer to resize 
   */
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setPixelRatio()
      renderer.setSize(width, height, false);
    }
    uniforms.sRatio.value = width / height
  }

  /** 
   * Sets the mouse pos uniforms to the current mouse pos 
   * @param {number} x - the x position of the mouse
   * @param {number} y - the y position of the mouse 
   */
  function updateMouseUniforms(x, y) {
    const mouse = new THREE.Vector2(x * 3.14, y * 3.14);
    uniforms.mouse.value = mouse;
    const mouseN = new THREE.Vector2(x * 20.0 - 10.0, y * 30. - 15.);
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

  /** 
   * Creates an intersection observer for a page element 
   * @param {HTMLElement} el - the page element to observe 
   */
  function createObserver(el) {
    let observer = new IntersectionObserver(onIntersectionUpdate)
    observer.observe(el)
  }

  /** 
   * Starts or stops the renderer based on canvas visibility 
   * @param {IntersectionObserverEntry} entries - the page element to observe
   */
  function onIntersectionUpdate(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startRender()
      } else {
        stopRender()
      }
    })
  }

  // document.addEventListener("touchmove", onDocumentTouchmove, { passive: false });

  /** 
   * Main render loop
   * @param {number} time - the timestamp of the current frame in milliseconds
   * @param {number} lastTime - the timestamp of the last frame in milliseconds
   */
  function render(time, lastTime) {
    time *= 0.001;  // convert to seconds

    resizeRendererToDisplaySize(renderer);

    uniforms.iTime.value = time;
    uniforms.alpha.value = Math.min(1.0, time);

    const tmp = targetPos.clone();
    let delta = tmp.sub(pos);
    const length = delta.length();

    delta = delta.normalize();
    const d = time - lastTime;

    pos.setX(pos.x + delta.x * length * d * 5);
    pos.setY(pos.y + delta.y * length * d * 5);
    updateMouseUniforms(pos.x, pos.y);

    renderer.render(scene, camera);

    lastTime = time

    animationFrameId = requestAnimationFrame(t => render(t, lastTime));
  }

  /**
   * Stops the render loop
   */
  function stopRender() {
    cancelAnimationFrame(animationFrameId)
  }

  /**
   * Starts the render loop
   */
  function startRender() {
    requestAnimationFrame(t => render(t, t));
  }

  // Start intersection observer
  createObserver(document.getElementById("home-shader"))
  // Set initial mouse position uniforms
  updateMouseUniforms(pos.x, pos.y);
}

main();