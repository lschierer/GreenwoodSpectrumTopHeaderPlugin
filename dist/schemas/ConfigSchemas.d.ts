import { z } from 'zod';
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
export declare const ThemeSelectorOptions: z.ZodObject<{
    debug: z.ZodOptional<z.ZodBoolean>;
    isDevelopment: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodBoolean>>>;
    toplevelsections: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    sitelogo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sitetitle: z.ZodOptional<z.ZodString>;
} & {
    theme: z.ZodUnion<[z.ZodDiscriminatedUnion<"label", [z.ZodObject<{
        label: z.ZodLiteral<"dark">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"dark">;
    }, "strip", z.ZodTypeAny, {
        value: "dark";
        label: "dark";
        selected: boolean;
    }, {
        value: "dark";
        label: "dark";
        selected: boolean;
    }>, z.ZodObject<{
        label: z.ZodLiteral<"light">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"light">;
    }, "strip", z.ZodTypeAny, {
        value: "light";
        label: "light";
        selected: boolean;
    }, {
        value: "light";
        label: "light";
        selected: boolean;
    }>, z.ZodObject<{
        label: z.ZodLiteral<"auto">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"auto">;
    }, "strip", z.ZodTypeAny, {
        value: "auto";
        label: "auto";
        selected: boolean;
    }, {
        value: "auto";
        label: "auto";
        selected: boolean;
    }>]>, z.ZodArray<z.ZodDiscriminatedUnion<"label", [z.ZodObject<{
        label: z.ZodLiteral<"dark">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"dark">;
    }, "strip", z.ZodTypeAny, {
        value: "dark";
        label: "dark";
        selected: boolean;
    }, {
        value: "dark";
        label: "dark";
        selected: boolean;
    }>, z.ZodObject<{
        label: z.ZodLiteral<"light">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"light">;
    }, "strip", z.ZodTypeAny, {
        value: "light";
        label: "light";
        selected: boolean;
    }, {
        value: "light";
        label: "light";
        selected: boolean;
    }>, z.ZodObject<{
        label: z.ZodLiteral<"auto">;
        selected: z.ZodBoolean;
        value: z.ZodLiteral<"auto">;
    }, "strip", z.ZodTypeAny, {
        value: "auto";
        label: "auto";
        selected: boolean;
    }, {
        value: "auto";
        label: "auto";
        selected: boolean;
    }>]>, "many">]>;
}, "strip", z.ZodTypeAny, {
    theme: {
        value: "dark";
        label: "dark";
        selected: boolean;
    } | {
        value: "light";
        label: "light";
        selected: boolean;
    } | {
        value: "auto";
        label: "auto";
        selected: boolean;
    } | ({
        value: "dark";
        label: "dark";
        selected: boolean;
    } | {
        value: "light";
        label: "light";
        selected: boolean;
    } | {
        value: "auto";
        label: "auto";
        selected: boolean;
    })[];
    debug?: boolean | undefined;
    isDevelopment?: boolean | undefined;
    toplevelsections?: string[] | undefined;
    sitelogo?: string | undefined;
    sitetitle?: string | undefined;
}, {
    theme: {
        value: "dark";
        label: "dark";
        selected: boolean;
    } | {
        value: "light";
        label: "light";
        selected: boolean;
    } | {
        value: "auto";
        label: "auto";
        selected: boolean;
    } | ({
        value: "dark";
        label: "dark";
        selected: boolean;
    } | {
        value: "light";
        label: "light";
        selected: boolean;
    } | {
        value: "auto";
        label: "auto";
        selected: boolean;
    })[];
    debug?: boolean | undefined;
    isDevelopment?: boolean | undefined;
    toplevelsections?: string[] | undefined;
    sitelogo?: string | undefined;
    sitetitle?: string | undefined;
}>;
export type ThemeSelectorOptions = z.infer<typeof ThemeSelectorOptions>;
//# sourceMappingURL=ConfigSchemas.d.ts.map