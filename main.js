import './style.css'
import { BoxGeometry, DirectionalLight, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { App } from './src/Entry'
import { createCube, createRandomObjects } from './src/Entry'
import { createCapsule } from './src/Utils/PrimitiveMeshes'
import { PhysicsComponent } from './src/Components/PhysicsComponent'
import * as CANNON from 'cannon-es'

let app = new App()
app.camera.position.z = 1
app.camera.position.y = 0.5
app.camera.lookAt(new Vector3(0, 0, 0))
let speed = 0.005

/* XR Setup */
let xrSession = {
  requiredFeatures: ['local-floor', 'plane-detection'],
  optionalFeatures: ['hand-tracking', 'bounded-floor'],
}

app.xr.setXRSessionFeatures('immersive-ar', xrSession)

app.addEventListener('xrstarted', (event) => {
  console.log('XR started')
})

app.addEventListener('xrended', (event) => {
  console.log('XR ended')
})

// Add the xr button to the DOM
document.body.prepend(app.xr.xrButton)

/* XR SETUP END */

// Add light
let dirLight = new DirectionalLight(0xffffff, 1)
dirLight.position.x = -2
dirLight.position.z = -0.2
app.scene.add(dirLight)

// Add a listener for one of the controllers
let gamepad = null
app.xr.controllers[0].addEventListener('connected', (event) => {
  gamepad = event.data.gamepad
})

let wPressed = false

document.addEventListener('keydown', (event) => {
  if (event.key == 'w') {
    wPressed = true
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key == 'w') {
    wPressed = false
  }
})

// How to get input from a controller?
// let leftController = app.input.register(app.xr.controllers[0], "UP")
// leftController.onUpdate((event) => {...})
// let wPressed = app.input.register("w", "UP")

// Player
let player = app.addEntity()
app.world.addComponent(player, 'position', { x: 0, y: 0, z: 0 })
app.world.addComponent(player, 'velocity', { x: 0, y: 0, z: 0 })
app.world.addComponent(
  player,
  'physics',
  new PhysicsComponent('BOX', {
    size: { x: 0.05, y: 0.04, z: 0.05 },
    mass: 0.4,
  })
)

// Floor
let floor = app.addEntity()
app.world.addComponent(floor, 'position', { x: 0, y: 0, z: 0 })
app.world.addComponent(floor, 'velocity', { x: 0, y: 0, z: 0 })
app.world.addComponent(floor, 'mesh', new Mesh(new BoxGeometry(2, 0.001, 2), new MeshStandardMaterial({ color: 0xfefefe })))

app.world.addComponent(
  floor,
  'physics',
  new PhysicsComponent('BOX', {
    mass: 0.0,
    position: { x: 0, y: -3, z: 0 },
    angularDamping: 0,
    size: { x: 1, y: 0.05, z: 1 },
  })
)
app.scene.add(floor.mesh)

app.addEventListener('update', (event) => {
  /*if (gamepad) {
    player.velocity.y = gamepad.axes[2] * speed
    player.velocity.z = gamepad.axes[3] * speed
  }*/

  if (wPressed) {
    player.physics.body.applyImpulse(new CANNON.Vec3(0, 0.1, 0))
  }

  if (gamepad) {
    player.physics.body.applyImpulse(new CANNON.Vec3(0, 0.1 * -gamepad.axes[3], 0))
  }
})

// Start the game loop
app.start()
