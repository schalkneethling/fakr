import { z } from "zod/v4";

const pathPatternSchema = z.object({
  kind: z.literal(["user", "images"]),
  status: z.literal("invalid").optional(),
  field: z.literal("email").optional(),
});

export type PathPattern = z.infer<typeof pathPatternSchema>;

export const isValidPathPattern = (path: object) => {
  const result = pathPatternSchema.safeParse(path);

  if (!result.success) {
    return result.error.issues;
  }

  return true;
};
