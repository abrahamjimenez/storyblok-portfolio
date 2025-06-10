import { defineConfig } from 'astro/config'
import {storyblok} from '@storyblok/astro'
import { loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import netlify from '@astrojs/netlify';
const env = loadEnv('', process.cwd(), 'STORYBLOK')
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    storyblok({
      accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
      apiOptions: {
        region: '',
      },
      bridge: {
        customParent: 'https://app.storyblok.com',
      },
      components: {
        page: 'storyblok/Page',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        teaser: 'storyblok/Teaser',
        header: 'storyblok/Header',
      },
    }),
  ],

  vite: {
    plugins: [basicSsl(), tailwindcss()],
    server: {
      https: true,
    },
  },

  adapter: netlify(),
})
