import { AnimationMixer, Object3D } from "three"
import { clone } from "three/addons/utils/SkeletonUtils.js"
import { App } from "../Entry"

export class AnimationComponent {
  constructor() {
    this.app = new App()
    this.animationMixer = null
    this.animationClips = []
    this.animationActions = []
  }

  setup(entity) {
    let root = new Object3D()

    let clonedScene = clone(entity.mesh.data.scene)
    root.add(clonedScene)

    this.animationMixer = new AnimationMixer(clonedScene)
    this.addAnimations(entity.mesh.data.animations)
    return root
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
    let action = this.animationActions.find(
      (action) => action._clip.name === animationClipName
    )
    action.play()
  }
}
