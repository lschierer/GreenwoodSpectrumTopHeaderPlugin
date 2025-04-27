var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import { z } from 'zod';
const Theme = z.union([z.literal('light'), z.literal('dark')]);
export const ThemeSelection = z.union([Theme, z.literal('auto')]);
export const ChangeTheme = (storedTheme) => {
    if (!storedTheme.localeCompare('light') || !storedTheme.localeCompare('dark')) {
        const scale = 'medium';
        document.querySelectorAll('sp-theme').forEach(sptheme => {
            void Promise.all([import(__rewriteRelativeImportExtension(`./theme-${storedTheme}.js`)), import(__rewriteRelativeImportExtension(`./scale-${scale}.js`))]).then(() => {
                sptheme.color = storedTheme;
                sptheme.scale = scale;
            });
        });
        document.querySelectorAll('html').forEach(html => {
            if (!html.classList.contains('spectrum')) {
                html.classList.add('spectrum');
            }
            if (!html.classList.contains(storedTheme)) {
                if (!storedTheme.localeCompare('light')) {
                    html.classList.add('spectrum--light');
                    html.classList.add('light');
                    html.classList.remove('dark');
                    html.classList.remove('spectrum--dark');
                }
                else {
                    html.classList.remove('spectrum--light');
                    html.classList.remove('light');
                    html.classList.add('dark');
                    html.classList.add('spectrum--dark');
                }
            }
            if (!html.classList.contains(scale)) {
                html.classList.add(scale);
            }
            if (!html.classList.contains(`spectrum--${scale}`)) {
                html.classList.add(`spectrum--${scale}`);
            }
            if (!html.classList.contains('spectrum-Typography')) {
                html.classList.add('spectrum-Typography');
            }
        });
    }
    else {
        ChangeTheme('light');
    }
};
export default class ThemeComponent extends HTMLElement {
    storedTheme = 'light';
    ThemeProvider = () => {
        const storedTheme = typeof localStorage !== 'undefined' && localStorage.getItem('hpfansite-theme');
        const theme = storedTheme ||
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
    };
    connectedCallback() {
        this.ThemeProvider();
        ChangeTheme(this.storedTheme);
    }
}
customElements.define('theme-component', ThemeComponent);
//# sourceMappingURL=theme.js.map