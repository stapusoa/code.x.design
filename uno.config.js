import { presetMini } from 'unocss';
import { defineConfig, presetUno, presetAttributify } from 'unocss';
import { presetTypography } from '@unocss/preset-typography';
import { presetWebFonts } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { unoTheme } from './src/unoTheme';
export default defineConfig({
    presets: [
        presetAttributify(),
        presetUno(),
        presetTypography(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: ['Roboto', 'Archivo Narrow', 'Inter'],
                mono: ['Fira Code', 'Fira Mono:400,700'],
            },
        }),
        presetMini(),
        presetIcons({
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            }
        }),
    ],
    theme: unoTheme
});
