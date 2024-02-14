import * as CANNON from "cannon-es"
import { App } from "../Entry"

export class PhysicsComponent {
  constructor(shape = "BOX", config) {
    this.app = new App()
    this.shape = null

    if (shape == "BOX") {
      this.shape = new CANNON.Box(
        new CANNON.Vec3(config.size.x, config.size.y, config.size.z)
      )
    }
    this.body = new CANNON.Body({
      mass: config.mass,
    })
    this.body.addShape(this.shape)
    //this.body.angularVelocity.set(0, 0, 0)
    this.body.angularDamping = 0.9
    this.body.linearDamping = 0.9

    this.app.physics.world.addBody(this.body)
  }

  setShape(shape) {
    if (shape in CANNON.SHAPE_TYPES) {
      let shapeName = this.getShapeName(CANNON.SHAPE_TYPES[shape])
      let desiredShape = new CANNON.Shape()
      return desiredShape
    } else {
      console.warn(`Shape '${shape}' is not a valid shape.`)
    }
  }

  getShapeName(value) {
    return Object.keys(CANNON.SHAPE_TYPES).find(
      (key) => CANNON.SHAPE_TYPES[key] === value
    )
  }
}
