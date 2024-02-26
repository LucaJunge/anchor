<p align='center'>
  <img src='assets/logo_name.png' width='300px'/>
</p>

# About

Anchor is a framework built with [three.js](https://threejs.org) aiming to simplify creating applications.

# Getting Started

```shell
npm install https://github.com/LucaJunge/anchor.git
```

# Basic Example

```js
import { App } from 'anchor'

let app = new App()

/* XR session setup */
let xrSession = {
  requiredFeatures: ['local-floor', 'hit-test'],
  optionalFeatures: [],
}

app.xr.setXRSessionFeatures('immersive-ar', xrSession)

// Specify what happens when the xr session starts
app.addEventListener('xrstarted', (event) => {
  console.log('XR started')
})

// Specify what happens when the xr session ends
app.addEventListener('xrended', (event) => {
  console.log('XR ended')
})

// Add the xr button to the DOM
document.body.prepend(app.xr.xrButton)

// Modify the game loop
app.addEventListener('update', (event) => {
  // ...
})

// Finally, start the game loop
app.start()
```
