import './style.css'
import { DirectionalLight, Vector3 } from 'three'
import { App, XRIndicator, createButton } from './src/Entry'
import { AnimationComponent } from './src/Components/AnimationComponent'
import { MeshComponent } from './src/Components/MeshComponent'

let app = new App()
app.camera.position.z = 3.5
app.camera.position.y = 0
app.camera.lookAt(new Vector3(0, 0, 0))
app.renderer.setClearColor(0.4, 0.4, 0.4, 0.1)

/* XR Setup */
let xrSession = {
  requiredFeatures: ['local-floor', 'hit-test'],
  optionalFeatures: [],
}

app.xr.setXRSessionFeatures('immersive-ar', xrSession)

app.addEventListener('xrstarted', (event) => {
  playerEntity.mesh.data.visible = false
  console.log('XR started')
})

app.addEventListener('xrended', (event) => {
  console.log('XR ended')
})

// Add the xr button to the DOM
let xrStartButton = app.xr.xrButton
document.body.prepend(xrStartButton)

// Add the XRIndicator
let xrIndicator = new XRIndicator()
xrIndicator.mesh.visible = true
app.scene.add(xrIndicator.mesh)

let currentHitTest = null
app.addEventListener('hit-test', (event) => {
  currentHitTest = event.message[0]

  if (currentHitTest) {
    xrIndicator.setPositionToHit(currentHitTest)
  }
})

function onSelect() {
  if (xrIndicator.mesh.visible) {
    xrIndicator.mesh.matrix.decompose(playerEntity.mesh.data.scene.position, playerEntity.mesh.data.scene.quaternion, playerEntity.mesh.data.scene.scale)
    xrIndicator.isVisible(false)
  }
}

let controller = app.renderer.xr.getController(0)
controller.addEventListener('select', onSelect)
app.scene.add(controller)

/* XR SETUP END */

// Add light
let dirLight = new DirectionalLight(0xffffff, 1)
dirLight.position.x = -2
dirLight.position.z = -0.2
app.scene.add(dirLight)

// Player entity
let playerEntity = app.world.add({})
app.world.addComponent(playerEntity, 'position', { x: 0, y: 0, z: 0 })
app.world.addComponent(playerEntity, 'mesh', new MeshComponent())
app.world.addComponent(playerEntity, 'animation', new AnimationComponent())

// Add data to the mesh component
await playerEntity.mesh.addMesh('/assets/mesh.gltf')

if (playerEntity.animation) {
  // add the animation data to the entity
  playerEntity.animation.setup(playerEntity)
  playerEntity.animation.setIdleAnimation('Idle')

  let buttonActive = false
  let button = createButton('play-button', 'Play')
  button.style.top = '70px'
  document.body.prepend(button)
  button.addEventListener('click', () => {
    if (!buttonActive) {
      playerEntity.animation.crossfadeTo('Run', 0.3)
    } else {
      playerEntity.animation.crossfadeTo('Idle', 0.3)
    }

    buttonActive = !buttonActive
  })
}

app.scene.add(playerEntity.mesh.data.scene)

app.input.register('w', () => {
  playerEntity.position.x += 0.1
})

app.addEventListener('update', (event) => {
  // ...
})

// Start the game loop
app.start()
