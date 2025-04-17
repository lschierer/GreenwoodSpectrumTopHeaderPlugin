import { z } from 'zod';
import type { ResourcePlugin } from '@greenwood/cli';
export declare const Config: z.ZodObject<{
    debug: z.ZodBoolean;
    isDevelopment: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    topLevelSections: z.ZodArray<z.ZodString, "many">;
    siteLogo: z.ZodOptional<z.ZodString>;
    siteTitle: z.ZodString;
}, "strip", z.ZodTypeAny, {
    debug: boolean;
    isDevelopment: boolean;
    topLevelSections: string[];
    siteTitle: string;
    siteLogo?: string | undefined;
}, {
    debug: boolean;
    topLevelSections: string[];
    siteTitle: string;
    isDevelopment?: boolean | undefined;
    siteLogo?: string | undefined;
}>;
export type Config = z.infer<typeof Config>;
export declare const TopHeaderSectionPlugin: (options?: {}) => ResourcePlugin;
//# sourceMappingURL=TopHeaderSectionPlugin.d.ts.map