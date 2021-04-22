// Card size - https://stackoverflow.com/q/29394297/4034572

import { useWindowDimensions } from 'react-native'

const COLUMN_COUNT = 4
export const GAP_SIZE = 16
const VERTICAL_SPACE_ON_LANDSCAPE = 110

export function useCardSize(): { boardSize: number; cardSize: number } {
  const { width, height } = useWindowDimensions()
  const isPortrait = height > width
  const size = isPortrait ? width : height - VERTICAL_SPACE_ON_LANDSCAPE
  // We use COLUMN_COUNT + 1 because there is gap at the left and right of
  // each column, and at the lef and right of the whole board
  return {
    boardSize: size,
    cardSize: (size - GAP_SIZE * (COLUMN_COUNT + 1)) / COLUMN_COUNT,
  }
}
