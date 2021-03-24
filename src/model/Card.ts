import { CardType } from './CardType'
import { makeAutoObservable } from 'mobx'
import { Game } from './Game'

export class Card {
  type: CardType
  isVisible: boolean = false
  game: Game

  constructor(type: CardType, game: Game) {
    makeAutoObservable(this, {
      type: false,
      game: false,
    })
    this.type = type
    this.game = game
  }

  makeVisible() {
    this.isVisible = true
    this.game.incrementClicks()
  }
}
