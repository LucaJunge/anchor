import { EventDispatcher } from 'three'
import { App } from './App'

export class Input extends EventDispatcher {
  constructor() {
    super()

    this.app = new App()
  }

  register(key, command) {
    // check if command is in commands...
    document.addEventListener('keydown', (event) => {
      if (event.key == key) {
        command()
      }
    })
  }
}
