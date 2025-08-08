import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://cmldk.dev',
  output: 'server',
  integrations: [tailwind(), mdx(), sitemap()],
  adapter: netlify(),
});
