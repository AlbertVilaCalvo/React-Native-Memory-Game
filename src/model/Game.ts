import { autorun, makeAutoObservable } from 'mobx'
import { generateInitialCards } from './generateInitialCards'
import { Card } from './Card'
import { CardState } from './CardState'

export class Game {
  cards: Card[] = []
  clicks = 0

  constructor() {
    makeAutoObservable(this, {
      visibleCards: false,
    })
  }

  startGame() {
    console.log('startGame()')
    this.cards = generateInitialCards()
  }

  onClick(card: Card) {
    console.log('onClick() card', card.type)
    if (this.notMatchedCards().length > 0) {
      return
    }
    this.clicks++
    card.state = CardState.Visible
    this.evaluateMatch()
  }

  evaluateMatch() {
    const visibleCards = this.visibleCards()
    console.log('visibleCards.length', visibleCards.length)
    if (visibleCards.length !== 2) {
      return
    }
    if (visibleCards[0].type === visibleCards[1].type) {
      visibleCards[0].state = CardState.Matched
      visibleCards[1].state = CardState.Matched
    } else {
      visibleCards[0].hide()
      visibleCards[1].hide()
    }
  }

  get moves(): number {
    return Math.floor(this.clicks / 2)
  }

  get isCompleted(): boolean {
    return this.cards.every((card) => card.isMatched)
  }

  // helpers

  notMatchedCards(): Card[] {
    return this.cards.filter((card) => card.state === CardState.NotMatched)
  }

  visibleCards(): Card[] {
    return this.cards.filter((card) => card.state === CardState.Visible)
  }
}

export const game = new Game()

autorun(() => {
  if (__DEV__) {
    console.log('autorun game clicks', game.clicks, 'cards', game.cards)
  }
})
