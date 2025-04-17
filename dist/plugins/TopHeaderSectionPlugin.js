import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';
import { z } from 'zod';
export const Config = z.object({
    debug: z.boolean().default(false),
    isDevelopment: z.boolean().optional().default(false),
    topLevelSections: z.string().array(),
    siteLogo: z.string().optional(),
    siteTitle: z.string(),
});
class TopHeaderSectionResource {
    compilation;
    options;
    contentType;
    constructor(compilation, options) {
        this.compilation = compilation;
        options.debug = false;
        const valid = Config.safeParse(options);
        if (!valid.success) {
            console.error(`TopHeader cannot parse its options: ${valid.error.message}`, JSON.stringify(options));
        }
        this.options = valid.data;
        this.contentType = 'text/html';
    }
    async shouldIntercept(url, request, response) {
        /*start work around for GetFrontmatter requiring async */
        await new Promise(resolve => setTimeout(resolve, 1));
        /* end workaround */
        const responseContentType = response.headers.get('Content-Type');
        if (responseContentType) {
            return (responseContentType.indexOf(this.contentType) >= 0 && !url.pathname.startsWith('/api/'));
        }
        return false;
    }
    getNavSection = () => {
        return this.options
            ? this.options.topLevelSections.length
                ? this.options.topLevelSections
                    .map(section => {
                    return `
            <div class="navItem">
              <a
                href=${'/' + section.replaceAll(' ', '') + '/'}
                class="spectrum-Link spectrum-Link--primary spectrum-Link--quiet"
              >
                <span class="spectrum-Heading spectrum-Heading--serif spectrum-Heading--sizeXS">${section.replaceAll('_', ' ')}</span>
              </a>
            </div>
          `;
                })
                    .join('')
                : ''
            : '';
    };
    getSvgLogo = (logoPath) => {
        const myLogoURL = new URL(`assets/${logoPath}`, this.compilation.context.userWorkspace);
        if (this.options.debug) {
            console.log(`compilation.context is ${JSON.stringify(this.compilation.context)}`);
            console.log(`myLogoURL is ${myLogoURL}`);
        }
        const myLogoPath = fileURLToPath(myLogoURL);
        if (this.options.debug) {
            console.log(`myLogoPath is ${myLogoPath}`);
        }
        const myLogo = fs.readFileSync(myLogoPath, 'utf-8');
        return `
      <div class=" site-logo spectrum-Heading spectrum-Heading--sizeXXL">
        ${myLogo}
      </div>
    `;
    };
    getImgLogo = (logoPath, altText) => {
        return `
      <img
        alt=${altText}
        src=${logoPath}
      />
    `;
    };
    getSiteTitle = () => {
        const siteTitle = this.options ? this.options.siteTitle : '';
        if (this.options.debug) {
            console.log(`siteTitle is ${siteTitle}`);
        }
        const siteLogo = this.options
            ? this.options.siteLogo
                ? this.options.siteLogo.endsWith('.svg')
                    ? this.getSvgLogo(this.options.siteLogo)
                    : this.getImgLogo(this.options.siteLogo, siteTitle)
                : ''
            : '';
        return `
      <a href='/' class="site-title spectrum-Link spectrum-Link--quiet spectrum-Link--secondary">
        <span class=" site-title spectrum-Heading spectrum-Heading--sizeXS">
          ${siteLogo}
        </span>
      </a>
      <a href='/' class="site-title spectrum-Link spectrum-Link--quiet spectrum-Link--secondary">
        <span class="site-title spectrum-Heading spectrum-Heading--sizeXL">
          ${siteTitle}
        </span>
      </a>
    `;
    };
    getSection = () => {
        return `
      <div class="header">
        <div class="site-title-section">
          ${this.getSiteTitle()}
        </div>
        <div class="nav">
          ${this.getNavSection()}
        </div>
        <div class=" right-group">
          <div class=" social-icons">
            <SocialIcons {...Astro.props} ></SocialIcons>
          </div>
          <theme-select></theme-select>
        </div>
      </div>
    `;
    };
    async intercept(url, request, response) {
        const body = await response.text();
        const topHeaderSection = this.getSection();
        const file = await unified()
            .use(rehypeParse, { fragment: false })
            .use(() => tree => {
            visit(tree, 'element', (node) => {
                if (node.tagName === 'head') {
                    node.children.push({
                        type: 'element',
                        tagName: 'link',
                        properties: {
                            href: '/styles/TopHeader.css',
                            rel: 'stylesheet',
                        },
                        children: [],
                    });
                    node.children.push({
                        type: 'element',
                        tagName: 'link',
                        properties: {
                            href: '/styles/SiteTitle.css',
                            rel: 'stylesheet',
                        },
                        children: [],
                    });
                    node.children.push({
                        type: 'element',
                        tagName: 'script',
                        properties: {
                            src: '/components/ThemeSelector.ts',
                            type: 'module',
                        },
                        children: [],
                    });
                }
            });
            visit(tree, 'element', (node) => {
                if (node.tagName === 'div' &&
                    node.properties.className &&
                    Array.isArray(node.properties.className) &&
                    node.properties.className.includes('topHeader')) {
                    const tempTree = unified().use(rehypeParse, { fragment: true }).parse(topHeaderSection);
                    const en = tempTree.children.filter(child => child.type === 'element');
                    node.children = en;
                }
            });
        })
            .use(rehypeStringify)
            .process(body);
        return new Response(String(file), {
            headers: response.headers,
        });
    }
}
export const TopHeaderSectionPlugin = (options = {}) => {
    return {
        type: 'resource',
        name: 'greenwood-speectrum-theme:TopHeaderSection',
        provider: compilation => new TopHeaderSectionResource(compilation, options),
    };
};
//# sourceMappingURL=TopHeaderSectionPlugin.js.map