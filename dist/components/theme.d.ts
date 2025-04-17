import { z } from 'zod';
export declare const ThemeSelection: z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"light">, z.ZodLiteral<"dark">]>, z.ZodLiteral<"auto">]>;
type ThemeSelection = z.infer<typeof ThemeSelection>;
export declare const ChangeTheme: (storedTheme: ThemeSelection) => void;
export default class ThemeComponent extends HTMLElement {
    private storedTheme;
    private ThemeProvider;
    connectedCallback(): void;
}
export {};
//# sourceMappingURL=theme.d.ts.map