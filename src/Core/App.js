import { AmbientLight, Color, EventDispatcher, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { Timer } from 'three/addons/misc/Timer.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import CannonDebugger from 'cannon-es-debugger'
import { WebXRHandler } from './WebXR'
import { Loader } from './Loader'
import { Input } from './Input'
import { World } from 'miniplex'
import { Physics } from './Physics'

let instance = null

export class App extends EventDispatcher {
  constructor() {
    super()

    if (instance) {
      return instance
    }
    instance = this

    this.world = new World() // miniplex ECS world
    this.physics = new Physics() // CannonJS physics world
    this.canvas = document.querySelector('#app')
    this.canvas.classList.add('app')
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    this.timer = new Timer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.pixelRatio = Math.max(window.devicePixelRatio, 2)
    this.renderer.xr.enabled = true
    this.renderer.setClearColor(new Color(0.0, 0.0, 0.0), 0.0) // initialize with a transparent background

    // Components
    this.xr = new WebXRHandler()
    this.loader = new Loader()
    this.input = new Input()
    this.controls = this.addOrbitControls()
    this.cannonDebugger = new CannonDebugger(this.scene, this.physics.world)

    this.querySystems()

    /* Default Lighting */
    let ambientLight = new AmbientLight(0xffffff, 1)
    this.scene.add(ambientLight)

    window.addEventListener('resize', () => {
      this.onResize()
    })
  }

  /** Start the App instance and animation loop and check for XR support */
  start() {
    if (this.renderer.xr) {
      this.xr.checkXRSupport()
    }

    this.renderer.setAnimationLoop((timestamp, frame) => {
      this.update(timestamp, frame)
    })
  }

  /** Compile a list of all the necessary systems from miniplex */
  querySystems() {
    this.meshEntities = this.world.with('mesh').without('physics')
    this.physicsEntities = this.world.with('mesh', 'physics')
    this.animationEntities = this.world.with('animation')
    //this.movingEntities = this.world.with("position", "velocity")
  }

  /** Advance the instance game loop and systems */
  update(timestamp, frame) {
    this.dispatchEvent({ type: 'update', message: 'update' })

    this.timer.update(timestamp)
    const delta = this.timer.getDelta()

    if (frame) {
      this.xr.update(timestamp, frame)
    }

    // Run the simulation every 1 / 60 ms
    this.physics.world.fixedStep()
    this.cannonDebugger.update()

    //this.movementSystem()
    this.physicsSystem()
    this.animationSystem(delta)

    //this.inputSystem()

    this.controls.update()

    this.renderer.render(this.scene, this.camera)
  }

  /** TODO: Create Systems as separate files in src/Systems/  */
  /** Get access to the input system */
  inputSystem() {}

  /** Update the physics system */
  physicsSystem() {
    for (const { mesh, physics } of this.physicsEntities) {
      // Copy physics position into mesh position
      mesh.position.copy(physics.body.position)
      mesh.quaternion.copy(physics.body.quaternion)
    }
  }

  // Maybe pull the systems out of App.js
  movementSystem() {
    for (const { mesh, velocity } of this.meshEntities) {
      mesh.position.x += velocity.x
      mesh.position.y += velocity.y
      mesh.position.z += velocity.z
    }
  }

  animationSystem(delta) {
    for (const { animation } of this.animationEntities) {
      animation.animationMixer.update(delta)
    }
  }

  onResize() {
    let width = window.innerWidth
    let height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  /** Dispose an app instance and free the memory */
  dispose() {
    // dispose the renderer
    this.renderer.dispose()

    // traverse the scene and delete geometry, textures and materials
    this.scene.traverse((object3d) => {
      if (!object3d.isMesh) {
        return // only handle meshes
      }

      // free geometry data
      object3d.geometry.dispose()

      // check if the object hast one or more materials
      if (object3d.material.isMaterial) {
        // dispose material
        object3d.material.dispose()
      } else {
        for (const material of object3d.material) {
          // dispose the material
          object3d.material.dispose()

          // find associated textures via 'minFilter' and also dispose them
          for (const key of Object.keys(material)) {
            const possibleTexture = material[key]

            if (possibleTexture && typeof possibleTexture === 'object' && 'minFilter' in possibleTexture) {
              possibleTexture.dispose
            }
          }
        }
      }
    })

    // dispose the WebXR system
    this.xr.dispose()

    // remove the DOM annotations from the page
    //this.annotationSystem.dispose()

    // delete the instance
    instance = null
  }

  /** Add OrbitControls to the scene */
  addOrbitControls() {
    let controls = new OrbitControls(this.camera, this.renderer.domElement)
    return controls
  }
}
