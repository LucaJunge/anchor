import * as CANNON from "cannon-es"

export class Physics {
  constructor() {
    this.world = this.initCannon()
    this.MAX_VELOCITY = 4
  }

  initCannon() {
    let world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 20
    return world
  }
}
