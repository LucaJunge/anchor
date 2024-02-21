import './style.css'
import { DirectionalLight, Vector3 } from 'three'
import { App } from './src/Entry'

let app = new App()
app.camera.position.z = 1
app.camera.position.y = 0.5
app.camera.lookAt(new Vector3(0, 0, 0))

/* XR Setup */
let xrSession = {
  requiredFeatures: ['local-floor', 'hit-test'],
  optionalFeatures: [],
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

app.addEventListener('update', (event) => {
  // ...
})

// Start the game loop
app.start()
