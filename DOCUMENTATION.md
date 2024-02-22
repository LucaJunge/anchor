# Basic Application Setup

To create a new Anchor Application, first set up a new project with Vite e.g:

```shell
npm create vite@latest
```

Give the project a name and change into the directory of your project.  
You need to install `three` as a dependency as well.

```shell
npm install three https://github.com/LucaJunge/anchor.git
```

Replace the contents of your `main.js` file with the following to get started:

```js
import "./style.css"
import { App, createCube } from "anchor"

// Create a new Anchor instance
let app = new App()
app.camera.position.z = 3
app.camera.position.y = 0.5
app.camera.lookAt(new Vector3(0, 0, 0))

// Add light
let dirLight = new DirectionalLight(0xffffff, 1)
dirLight.position.x = -2
dirLight.position.z = -0.2
app.scene.add(dirLight)

// Add a cube
let cube = createCube()
cube.matrixAutoUpdate = false
app.scene.add(cube)

// Update something on every frame
app.addEventListener("update", (event) => {
  //console.log(event)
  // ...
})

// Start the game loop
app.start()
```

# Hit-Test

To do a hit-test with the environment in an `immersive-ar` session:

```js
// ...

let reticle = new Mesh(
  new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
  new MeshBasicMaterial()
)
reticle.matrixAutoUpdate = false // important, otherwise the position does not get applied to the matrix later

// Add the reticle to the scene
app.scene.add(reticle)

// listen to the xr hit-test event
app.addEventListener("hit-test", (event) => {
  let hitTestResults = event.message

  // if we have found a hit
  if (hitTestResults.length) {
    // get the nearest hit
    let hit = hitTestResults[0]

    let referenceSpace = app.renderer.xr.getReferenceSpace()

    // move the reticle to the position of the hit, according to your reference space
    reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix)
  }
})
```
