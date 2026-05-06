import { z } from 'zod';

export const inversionSchema = z.object({
  inversion: z.enum(['root', 'first', 'second', 'third']),
  bassToneIndex: z.number().int().nonnegative(),
});

export const chordKindSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    intervalSteps31: z.array(z.number().int().nonnegative()).min(2),
    inversions: z.array(inversionSchema).min(1),
    aliases: z.array(z.string().min(1)),
    provenance: z.object({
      source: z.enum(['synthetic-development-only', 'awaiting-private-rule-pack', 'external']),
      datasetId: z.string().min(1).optional(),
    }),
  })
  .superRefine((value, ctx) => {
    value.inversions.forEach((inversion, index) => {
      if (inversion.bassToneIndex >= value.intervalSteps31.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['inversions', index, 'bassToneIndex'],
          message: 'bassToneIndex must reference a valid chord tone index.',
        });
      }
    });
  });

export const chordKindSetSchema = z.array(chordKindSchema).min(1);

export type ChordKindData = z.infer<typeof chordKindSchema>;

export function validateChordKinds(input: unknown): ChordKindData[] {
  return chordKindSetSchema.parse(input);
}
