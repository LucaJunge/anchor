import "./style.css"
import { DirectionalLight, Vector3 } from "three"
import { App, XRIndicator } from "./src/Entry"
import { AnimationComponent } from "./src/Components/AnimationComponent"
import { MeshComponent } from "./src/Components/MeshComponent"

let app = new App()
app.camera.position.z = 3.5
app.camera.position.y = 0
app.camera.lookAt(new Vector3(0, 0, 0))
app.renderer.setClearColor(0.4, 0.4, 0.4, 0.1)

/* XR Setup */
let xrSession = {
  requiredFeatures: ["local-floor", "hit-test"],
  optionalFeatures: [],
}

app.xr.setXRSessionFeatures("immersive-ar", xrSession)

app.addEventListener("xrstarted", (event) => {
  playerEntity.mesh.data.visible = false
  console.log("XR started")
})

app.addEventListener("xrended", (event) => {
  console.log("XR ended")
})

// Add the xr button to the DOM
let xrStartButton = app.xr.xrButton
document.body.prepend(xrStartButton)

// Add the XRIndicator
let xrIndicator = new XRIndicator()
xrIndicator.mesh.visible = true
app.scene.add(xrIndicator.mesh)

let currentHitTest = null
app.addEventListener("hit-test", (event) => {
  currentHitTest = event.message[0]

  if (currentHitTest) {
    xrIndicator.setPositionToHit(currentHitTest)
  }
})

function onSelect() {
  if (xrIndicator.mesh.visible) {
    xrIndicator.mesh.matrix.decompose(
      playerEntity.mesh.data.scene.position,
      playerEntity.mesh.data.scene.quaternion,
      playerEntity.mesh.data.scene.scale
    )
    xrIndicator.isVisible(false)
  }
}

let controller = app.renderer.xr.getController(0)
controller.addEventListener("select", onSelect)
app.scene.add(controller)

/* XR SETUP END */

// Add light
let dirLight = new DirectionalLight(0xffffff, 1)
dirLight.position.x = -2
dirLight.position.z = -0.2
app.scene.add(dirLight)

// Player entity
let playerEntity = app.world.add({})
app.world.addComponent(playerEntity, "position", { x: 0, y: 0, z: 0 })
app.world.addComponent(playerEntity, "mesh", new MeshComponent())
app.world.addComponent(playerEntity, "animation", new AnimationComponent())

// Add data to the mesh component
await playerEntity.mesh.addMesh("/assets/iris.glb")
//playerEntity.mesh.data.scene.scale.setScalar(0.2)
// add the entity to the miniplex world
//app.world.add(playerEntity)

// add the animation data to the entity
let root = playerEntity.animation.setup(playerEntity)
root.position.y = 1.5
root.scale.setScalar(0.1)
app.scene.add(root)

playerEntity.animation.play("OuterAction")
playerEntity.animation.play("MiddleAction")
playerEntity.animation.play("InnerAction")
playerEntity.animation.play("CoreAction")

/*let toggle = false
setInterval(() => {
  toggle = !toggle
  if (toggle) {
    playerEntity.animation.play('Run')
  } else {
    playerEntity.animation.play('Idle')
  }
}, 1000)*/

app.addEventListener("update", (event) => {
  // ...
})

// Start the game loop
app.start()
