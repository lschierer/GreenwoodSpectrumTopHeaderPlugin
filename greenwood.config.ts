import { greenwoodPluginPostCss } from '@greenwood/plugin-postcss';
import { greenwoodPluginImportRaw } from '@greenwood/plugin-import-raw';

import type { Config } from '@greenwood/cli';

// For local development, import from the TypeScript source
import { TopHeaderSectionPlugin } from './src/plugins/TopHeaderSectionPlugin.ts';

const config: Config = {
  useTsc: true,
  activeContent: true,
  isolation: true,
  optimization: 'default',
  prerender: false,
  staticRouter: false,
  markdown: {
    plugins: ['rehype-autolink-headings', 'remark-alerts', 'remark-gfm', 'remark-rehype'],
  },
  plugins: [
    greenwoodPluginImportRaw(),
    TopHeaderSectionPlugin({
      sitetitle: 'My Site',
      toplevelsections: ['Home', 'About', 'Contact'],
    }),
    greenwoodPluginPostCss({
      extendConfig: true,
    }),
  ],
};

export default config;
