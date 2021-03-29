import { CardType } from './CardType'
import { CardState } from './CardState'
import { Game } from './Game'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { NO_MATCH_ANIMATION_DURATION } from '../component/CardView'

const BACKGROUND_COLOR_INVISIBLE = '#3d5161'
const BACKGROUND_COLOR_VISIBLE = '#02b3e4'
const BACKGROUND_COLOR_MATCHED = '#02ccba'
const BACKGROUND_COLOR_NOT_MATCHED = 'rgb(233, 93, 93)'

export class Card {
  type: CardType
  state: CardState = CardState.Invisible
  game: Game

  constructor(type: CardType, game: Game) {
    makeObservable(this, {
      state: observable,
      makeVisible: action,
      makeMatched: action,
      hide: action,
    })
    this.type = type
    this.game = game
  }

  onClick() {
    if (this.state === CardState.Invisible) {
      this.game.onClick(this)
    } else {
      console.log('onClick() ignored')
    }
  }

  makeVisible() {
    this.state = CardState.Visible
  }

  makeMatched() {
    this.state = CardState.Matched
  }

  hide() {
    this.state = CardState.NotMatched
    setTimeout(() => {
      runInAction(() => {
        this.state = CardState.Invisible
      })
    }, NO_MATCH_ANIMATION_DURATION)
  }

  matches(card: Card): boolean {
    return card.type === this.type
  }

  get isInvisible(): boolean {
    return this.state === CardState.Invisible
  }

  get isVisible(): boolean {
    return this.state === CardState.Visible
  }

  get isMatched(): boolean {
    return this.state === CardState.Matched
  }

  get isNotMatched(): boolean {
    return this.state === CardState.NotMatched
  }

  get backgroundColor(): string {
    switch (this.state) {
      case CardState.Invisible:
        return BACKGROUND_COLOR_INVISIBLE
      case CardState.Visible:
        return BACKGROUND_COLOR_VISIBLE
      case CardState.Matched:
        return BACKGROUND_COLOR_MATCHED
      case CardState.NotMatched:
        return BACKGROUND_COLOR_NOT_MATCHED
    }
  }
}
