import marriageImage from './assets/marriage-image.jpg.jpeg'
import giftImage from './assets/gift-image.jpg.jpeg'

export type Screen = 'intro' | 'memory' | 'final'

export interface MemoryConfig {
  id: number
  title: string
}

export const TOTAL_MEMORIES = 10

export const MARRIAGE_IMAGE = marriageImage
export const GIFT_IMAGE = giftImage
export const MUSIC_SRC = '/romantic-music.mp3'
