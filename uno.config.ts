import type { Theme } from '@unocss/preset-mini'
import { defineConfig, presetUno } from 'unocss'
import { unoShortcuts } from './src/unoShortcuts'
import { unoTheme } from './src/unoTheme'

export default defineConfig({
  content: {
    pipeline: {
      include: ['./**/*.{js,jsx,ts,tsx}'],
    },
  },
  presets: [presetUno()],
  shortcuts: [unoShortcuts],
  theme: unoTheme as Theme,
})
