import { defineConfig } from 'astro/config'
import {storyblok} from '@storyblok/astro'
import basicSsl from '@vitejs/plugin-basic-ssl'
import netlify from '@astrojs/netlify';

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
        header: 'storyblok/Header',
        hero: 'storyblok/Hero',
        about_me_section: 'storyblok/AboutMe',
        word_experience_section: 'storyblok/WorkExperience',
      },
    }),
  ],

  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },

  adapter: netlify(),
})
