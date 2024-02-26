import { BufferGeometry, EventDispatcher, Line, Vector3 } from 'three'
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js'
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory'
import { XRPlanes } from 'three/addons/webxr/XRPlanes'
import { App } from './App'

export class WebXRHandler extends EventDispatcher {
  constructor() {
    super()

    this.app = new App()
    this.xrMode = 'inline'
    this.xrSessionFeatures = {
      requiredFeatures: ['local-floor'],
      optionalFeatures: [],
    }
    this.xrSession = null
    this.xrButton = this.createXRButton()
    this.controllers = this.setupControllers()
    this.xrPlanes = new XRPlanes(this.app.renderer)
    this.hitTestSourceRequested = false
    this.hitTestSource = null
    this.hitTestResults = null
  }

  setXRSessionFeatures(mode = 'inline', features = {}) {
    this.xrMode = mode
    this.xrSessionFeatures = features
  }

  checkXRSupport() {
    // First check: The API is there
    if ('xr' in navigator) {
      // Second check: The session mode is supported
      navigator.xr.isSessionSupported(this.xrMode).then((isSupported) => {
        if (isSupported) {
          this.app.dispatchEvent({
            type: 'xrsupported',
            message: {
              isSupported: true,
            },
          })
        } else {
          this.app.dispatchEvent({
            type: 'xrsupported',
            message: {
              isSupported: false,
              reason: `The session mode '${this.xrMode}' is not supported on this device`,
            },
          })
        }
      })
    } else {
      // XR not in navigator
      this.app.dispatchEvent({
        type: 'xrsupported',
        message: {
          isSupported: false,
          reason: 'The WebXR API does not exist in navigator',
        },
      })
    }
  }

  onSessionEnded = () => {
    this.xrSession.removeEventListener('end', this.onSessionEnded)

    this.xrSession = null

    this.app.dispatchEvent({ type: 'xrended', message: 'xrended' })
  }

  onSessionStarted = async (session) => {
    session.addEventListener('end', this.onSessionEnded)

    await this.app.renderer.xr.setSession(session)

    this.xrSession = session

    this.app.dispatchEvent({ type: 'xrstarted', message: 'xrstarted' })
  }

  createXRButton() {
    let button = document.createElement('button')
    button.classList.add('xr-button')
    button.id = 'start-xr-button'
    button.disabled = true
    button.innerText = 'XR not available'

    this.app.addEventListener('xrsupported', (event) => {
      if (event.message.isSupported) {
        //Enable the XR button
        button.innerText = 'Start XR'
        button.disabled = false

        // Add the event listener
        button.addEventListener('click', () => {
          this.startXR()
        })
      }
    })

    return button
  }

  setupControllers() {
    let controllerModelFactory = new XRControllerModelFactory()
    let handModelFactory = new XRHandModelFactory()

    let controllers = []

    for (let i = 0; i < 2; i++) {
      let controllerDevice = this.app.renderer.xr.getController(i)
      controllers.push(controllerDevice)

      let handDevice = this.app.renderer.xr.getHand(i)
      handDevice.add(handModelFactory.createHandModel(handDevice, 'mesh'))
      this.app.scene.add(handDevice)

      // Add raycast lines to controllers
      let geometry = new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(0, 0, -1)])

      let line = new Line(geometry)
      line.name = 'line'
      line.scale.z = 3
      controllerDevice.add(line.clone())

      // Add the corresponding grip space for correct mesh placement
      let controllerGrip = this.app.renderer.xr.getControllerGrip(i)
      controllerGrip.add(controllerModelFactory.createControllerModel(controllerGrip))

      this.app.scene.add(controllerDevice)
      this.app.scene.add(controllerGrip)
    }

    return controllers
  }

  async startXR() {
    if (this.xrSession !== null) {
      console.log('There is already an active XR session. Exiting...')
      this.xrSession.end()
    }

    try {
      let requestedSession = await navigator.xr.requestSession(this.xrMode, this.xrSessionFeatures)

      this.onSessionStarted(requestedSession)
    } catch (error) {
      console.error(error)
    }
  }

  update(timestamp, frame) {
    // TODO: Check if hit-test is in xrSessionFeatures and only activate then
    //const referenceSpace = this.app.renderer.xr.getReferenceSpace()

    // NOTE: The if(frame) condition is in @App.js#update and not here
    const session = this.app.renderer.xr.getSession()

    // request a hit test source once and keep it
    if (this.hitTestSourceRequested === false) {
      session.requestReferenceSpace('viewer').then((_referenceSpace) => {
        session.requestHitTestSource({ space: _referenceSpace }).then((source) => {
          this.hitTestSource = source
        })
      })

      // remove the hit test source when the session ends
      session.addEventListener('end', () => {
        this.hitTestSourceRequested = false
        this.hitTestSource = null
      })

      // we requested a hit test source, don't try again
      this.hitTestSourceRequested = true
    }

    // if we have a defined hit test source
    if (this.hitTestSource) {
      console.log(this.hitTestSource)
      let hitTestResults = frame.getHitTestResults(this.hitTestSource)

      if (hitTestResults.length) {
        //const firstHit = hitTestResults[0]
        this.app.dispatchEvent({ type: 'hit-test', message: hitTestResults })
      } else {
        // dispatch an empty array
        this.app.dispatchEvent({ type: 'hit-test', message: [] })
      }
    }
  }

  /* TODO: Activate the domOverlay if it isn't already, see https://github.com/mrdoob/three.js/blob/f3f058609ce1bda89858e277cc82640e12e6d389/examples/jsm/webxr/ARButton.js#L7 */
  addBackButton(elementRoot) {
    let button = document.createElement('button')
    button.innerText = 'CLOSE AR'
    button.addEventListener('click', () => {
      if (this.xrSession) {
        this.xrSession.end()
      }
    })
    button.classList.add('xr-button')
    elementRoot.appendChild(button)
  }

  /** Dispose the WebXR Handler */
  dispose() {
    const session = this.app.renderer.xr.getSession()

    if (session) {
      session.end()
    }
  }
}
