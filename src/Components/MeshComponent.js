import { App } from '../Entry'

export class MeshComponent {
  constructor() {
    this.app = new App()
    this.data = null
  }

  async addMesh(file) {
    let mesh = await this.app.loader.load(file)
    this.data = mesh
    return mesh
  }
}
