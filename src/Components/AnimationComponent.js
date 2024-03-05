import { AnimationMixer, Object3D } from 'three'
import { clone } from 'three/addons/utils/SkeletonUtils.js'
import { App } from '../Entry'

export class AnimationComponent {
  constructor() {
    this.app = new App()
    this.animationMixer = null
    this.animationClips = []
    this.animationActions = []
    this.root = null
  }

  setup(entity) {
    //this.root = new Object3D()

    // Do we need to clone this?
    //let clonedScene = clone(entity.mesh.data.scene)
    //this.root.add(clonedScene)

    this.animationMixer = new AnimationMixer(entity.mesh.data.scene)
    this.addAnimations(entity.mesh.data.animations)
    //return root
  }

  addAnimations(animationClips) {
    for (let clip of animationClips) {
      this.addAnimation(clip)
    }
  }

  addAnimation(animationClip) {
    let action = this.animationMixer.clipAction(animationClip)
    this.animationActions.push(action)
  }

  play(animationClipName) {
    let action = this.animationActions.find((action) => action._clip.name === animationClipName)
    if (action) {
      action.play()
    } else {
      throw new Error($`No action with the name ${animationClipName} found.`)
    }
  }
}
