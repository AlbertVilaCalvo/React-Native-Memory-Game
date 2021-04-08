import { useWindowDimensions } from 'react-native'

export function useIsPortrait(): boolean {
  const { width, height } = useWindowDimensions()
  return height > width
}
