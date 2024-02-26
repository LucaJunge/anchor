import { Color, Mesh, MeshStandardMaterial, TorusGeometry } from 'three'
import { App } from '../Entry'

export class XRIndicator {
  constructor() {
    this.app = new App()
    this.mesh = this.createIndicatorMesh()
  }

  createIndicatorMesh() {
    let geometry = new TorusGeometry(0.1, 0.01, 32, 32).rotateX(-Math.PI / 2)
    let material = new MeshStandardMaterial({ color: 0xffffff, emissive: new Color(0xffffff), emissiveIntensity: 0.4 })
    let mesh = new Mesh(geometry, material)

    // needed for setPositionToHit to not get overwritten
    mesh.matrixAutoUpdate = false
    return mesh
  }

  isVisible(value) {
    this.mesh.visible = value
  }

  setPositionToHit(hit) {
    this.mesh.matrix.fromArray(hit.getPose(this.app.renderer.xr.getReferenceSpace()).transform.matrix)
  }
}
