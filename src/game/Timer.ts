import { action, makeObservable, observable, runInAction } from 'mobx'

export class Timer {
  seconds = 0
  intervalId: NodeJS.Timeout | null = null

  constructor() {
    makeObservable(this, {
      seconds: observable,
      reset: action,
    })
  }

  start() {
    this.intervalId = setInterval(() => {
      runInAction(() => {
        this.seconds++
      })
    }, 1000)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    this.intervalId = null
  }

  reset() {
    this.stop()
    this.seconds = 0
  }

  get isStarted(): boolean {
    return this.intervalId !== null
  }
}
