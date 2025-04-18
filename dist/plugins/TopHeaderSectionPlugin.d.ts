import { z } from 'zod';
import type { ResourcePlugin } from '@greenwood/cli';
export declare const Config: z.ZodObject<{
    debug: z.ZodBoolean;
    isDevelopment: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    toplevelsections: z.ZodArray<z.ZodString, "many">;
    sitelogo: z.ZodOptional<z.ZodString>;
    sitetitle: z.ZodString;
}, "strip", z.ZodTypeAny, {
    debug: boolean;
    isDevelopment: boolean;
    toplevelsections: string[];
    sitetitle: string;
    sitelogo?: string | undefined;
}, {
    debug: boolean;
    toplevelsections: string[];
    sitetitle: string;
    isDevelopment?: boolean | undefined;
    sitelogo?: string | undefined;
}>;
export type Config = z.infer<typeof Config>;
export declare const TopHeaderSectionPlugin: (options?: {}) => ResourcePlugin;
//# sourceMappingURL=TopHeaderSectionPlugin.d.ts.map