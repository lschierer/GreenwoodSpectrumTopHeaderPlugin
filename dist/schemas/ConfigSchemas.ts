import { z } from 'zod';

export const Config = z.object({
  debug: z.boolean(),
  isDevelopment: z.boolean().optional().default(false),
  toplevelsections: z.string().array(),
  sitelogo: z.string().optional(),
  sitetitle: z.string(),
});
export type Config = z.infer<typeof Config>;

const ThemeOptions = z.discriminatedUnion('label', [
  z.object({
    label: z.literal('dark'),
    selected: z.boolean(),
    value: z.literal('dark'),
  }),
  z.object({
    label: z.literal('light'),
    selected: z.boolean(),
    value: z.literal('light'),
  }),
  z.object({
    label: z.literal('auto'),
    selected: z.boolean(),
    value: z.literal('auto'),
  }),
]);
type ThemeOptions = z.infer<typeof ThemeOptions>;

export const ThemeSelectorOptions = Config.partial().extend({
  theme: z.union([ThemeOptions, ThemeOptions.array()]),
});
export type ThemeSelectorOptions = z.infer<typeof ThemeSelectorOptions>;
