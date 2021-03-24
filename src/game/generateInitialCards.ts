import { CardType } from './CardType'
import { Card } from './Card'
import { game } from './Game'

const cardTypes: CardType[] = []
for (const cardType in CardType) {
  // https://stackoverflow.com/a/58509049/4034572
  const aCardType: CardType = CardType[cardType as keyof typeof CardType]
  cardTypes.push(aCardType)
  cardTypes.push(aCardType)
}

// https://stackoverflow.com/a/12646864/4034572
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function generateInitialCards(): Card[] {
  const cards: Card[] = cardTypes.map((cardType) => new Card(cardType, game))
  return shuffleArray(cards)
}
