import { CardType } from './CardType'
import { CardState } from './CardState'
import { Game } from './Game'
import { makeAutoObservable, runInAction } from 'mobx'

const BACKGROUND_COLOR_INVISIBLE = '#3d5161'
const BACKGROUND_COLOR_VISIBLE = '#02b3e4'
const BACKGROUND_COLOR_MATCHED = '#02ccba'
const BACKGROUND_COLOR_NOT_MATCHED = 'rgb(233, 93, 93)'

export class Card {
  type: CardType
  state: CardState = CardState.Invisible
  game: Game

  constructor(type: CardType, game: Game) {
    makeAutoObservable(this, {
      type: false,
      game: false,
      backgroundColor: false,
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
    }, 1000)
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
