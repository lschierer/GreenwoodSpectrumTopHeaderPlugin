import { ChangeTheme, ThemeSelection } from './theme.ts';

import { type ThemeSelectorOptions } from '../schemas/ConfigSchemas.ts';

export default class ThemeSelector extends HTMLElement {
  private options: ThemeSelectorOptions = {
    debug: false,
    theme: [
      {
        label: 'dark',
        selected: false,
        value: 'dark',
      },
      {
        label: 'light',
        selected: false,
        value: 'light',
      },
      {
        label: 'auto',
        selected: true,
        value: 'auto',
      },
    ],
  };
  protected ThemeChangedCallback = (e: Event) => {
    const target = (e as CustomEvent).target as HTMLSelectElement | null;
    if (target) {
      const value = target.value;
      if (this.options.debug) {
        console.log(`ThemeChangedCallback detects value ${value}`);
      }
      if (value) {
        const valid = ThemeSelection.safeParse(value);
        if (valid.success) {
          ChangeTheme(valid.data);
        } else {
          if (this.options.debug) {
            console.log(`error getting value in ThemeChangedCallback`, valid.error.message);
          }
        }
      }
    }
  };

  connectedCallback() {
    for (const attr of this.attributes) {
      if (this.options.debug) {
        console.log(JSON.stringify(attr));
      }
    }
    this.innerHTML = `
     <select
        class="spectrum-Picker spectrum-Picker--sizeM"
        id="theme-selector"
        label={Astro.locals.t('themeSelect.accessibleLabel')}
        value="auto"
        width="6.25em"
     >
       ${
         Array.isArray(this.options.theme) &&
         this.options.theme
           .map(option => {
             return `
            <option
              value=${option.value}
              ${option.selected ? 'selected' : ''}
              class="spectrum-Menu-item" >
                ${option.label}
            </option>
         `;
           })
           .join('')
       }
     </select>
    `;
    const select = this.querySelector('#theme-selector');
    if (select) {
      select.addEventListener('change', this.ThemeChangedCallback);
    } else {
      if (this.options.debug) {
        console.log(`cannot find select in template`);
      }
    }
  }
}
customElements.define('theme-select', ThemeSelector);
