import { CardType } from './CardType'

export class Card {
  type: CardType
  isVisible: boolean = false

  constructor(type: CardType) {
    this.type = type
  }

  makeVisible() {
    this.isVisible = true
  }
}
