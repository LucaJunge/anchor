import { AnimationMixer, LoopRepeat, Object3D } from 'three'
import { App } from '../Entry'

export class AnimationComponent {
  constructor() {
    this.app = new App()
    this.animationMixer = null
    this.animationClips = []
    this.animationActions = []
    this.previousAction = null
    this.root = null
  }

  setup(entity) {
    this.animationMixer = new AnimationMixer(entity.mesh.data.scene)
    this.addAnimations(entity.mesh.data.animations)
  }

  addAnimations(animationClips) {
    for (let clip of animationClips) {
      this.addAnimation(clip)
    }
  }

  addAnimation(animationClip) {
    let action = this.animationMixer.clipAction(animationClip)

    // ALL registered actions must be set to weight 0 and play
    action.weight = 0
    action.play()

    this.animationActions.push(action)
  }

  // Specify a default idle animation
  setIdleAnimation(optionalName = 'Idle') {
    let desiredIdleAction = this.getAction(optionalName)
    desiredIdleAction.weight = 1
    this.previousAction = desiredIdleAction
  }

  getAction(animationClipName) {
    let action = null

    action = this.animationActions.find((action) => action._clip.name === animationClipName)

    return action
  }

  crossfadeTo(animationTo, duration = 1.0) {
    let desiredAction = this.getAction(animationTo)
    console.log(desiredAction._clip.name)

    this.prepareCrossfade(this.previousAction, desiredAction, duration)
  }

  setWeight(action, weight) {
    action.enabled = true
    action.setEffectiveTimeScale(1)
    action.setEffectiveWeight(weight)
  }

  unPauseAllActions() {
    this.animationActions.forEach(function (action) {
      action.paused = false
    })
  }

  prepareCrossfade(startAction, endAction, defaultDuration = 1.0) {
    this.unPauseAllActions()
    this.executeCrossFade(startAction, endAction, defaultDuration)
  }

  executeCrossFade(startAction, endAction, duration) {
    this.setWeight(endAction, 1)
    endAction.time = 0
    startAction.crossFadeTo(endAction, duration, true)
  }
}
