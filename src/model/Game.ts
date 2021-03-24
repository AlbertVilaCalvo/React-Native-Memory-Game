import { autorun, makeAutoObservable } from 'mobx'
import { generateInitialCards } from './generateInitialCards'
import { Card } from './Card'

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
    card.makeVisible()
    this.evaluateMatch()
  }

  evaluateMatch() {
    const visibleCards = this.visibleCards()
    console.log('visibleCards.length', visibleCards.length)
    if (visibleCards.length !== 2) {
      return
    }
    if (visibleCards[0].matches(visibleCards[1])) {
      visibleCards[0].makeMatched()
      visibleCards[1].makeMatched()
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
    return this.cards.filter((card) => card.isNotMatched)
  }

  visibleCards(): Card[] {
    return this.cards.filter((card) => card.isVisible)
  }
}

export const game = new Game()

autorun(() => {
  if (__DEV__) {
    console.log('autorun game clicks', game.clicks, 'cards', game.cards)
  }
})
