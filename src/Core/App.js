import {
  AmbientLight,
  Color,
  EventDispatcher,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import CannonDebugger from "cannon-es-debugger"
import { WebXRHandler } from "./WebXR"
import { Loader } from "./Loader"
import { Input } from "./Input"
import { World } from "miniplex"
import { Physics } from "./Physics"

let instance = null

export class App extends EventDispatcher {
  constructor() {
    super()

    if (instance) {
      return instance
    }
    instance = this

    this.world = new World()
    this.physics = new Physics()
    this.canvas = document.querySelector("#app")
    this.canvas.classList.add("app")
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.pixelRatio = Math.max(window.devicePixelRatio, 2)
    this.renderer.xr.enabled = true
    this.renderer.setClearColor(new Color(0.0, 0.0, 0.0))

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

    window.addEventListener("resize", () => {
      this.onResize()
    })
  }

  start() {
    if (this.renderer.xr) {
      this.xr.checkXRSupport()
    }

    this.renderer.setAnimationLoop(() => {
      this.update()
    })
  }

  querySystems() {
    this.meshEntities = this.world.with("mesh").without("physics")
    this.physicsEntities = this.world.with("mesh", "physics")
    //this.movingEntities = this.world.with("position", "velocity")
  }

  update() {
    this.dispatchEvent({ type: "update", message: "update" })

    // Run the simulation every 1 / 60 ms
    this.physics.world.fixedStep()
    this.cannonDebugger.update()

    //this.movementSystem()
    this.physicsSystem()

    //this.inputSystem()

    this.controls.update()

    this.renderer.render(this.scene, this.camera)
  }

  // like this?
  // Or configured via app.input?
  inputSystem() {}

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

  onResize() {
    let width = window.innerWidth
    let height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  addOrbitControls() {
    let controls = new OrbitControls(this.camera, this.renderer.domElement)
    return controls
  }

  addEntity() {
    return this.world.add({})
  }
}
