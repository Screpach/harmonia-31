import { z } from 'zod';

export const rationalSchema = z.object({
  numerator: z.number().int(),
  denominator: z.number().int().refine((value) => value !== 0, {
    message: 'Rational denominator cannot be zero.',
  }),
});

export const spelledPitchSchema = z.object({
  letter: z.enum(['C', 'D', 'E', 'F', 'G', 'A', 'B']),
  accidental: z.number().int(),
  octave: z.number().int(),
});

export const tuningSchema = z.object({
  referencePitch: spelledPitchSchema,
  referenceFrequency: z.number().positive(),
});

export const scoreEventSchema = z.discriminatedUnion('kind', [
  z.object({
    id: z.string().min(1),
    kind: z.literal('note'),
    voiceId: z.enum(['soprano', 'alto', 'tenor', 'bass']),
    onset: rationalSchema,
    duration: rationalSchema,
    pitch: spelledPitchSchema,
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal('rest'),
    voiceId: z.enum(['soprano', 'alto', 'tenor', 'bass']),
    onset: rationalSchema,
    duration: rationalSchema,
  }),
]);

export const measureSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().nonnegative(),
  events: z.array(scoreEventSchema),
});

export const projectSchema = z.object({
  schemaVersion: z.number().int().nonnegative(),
  id: z.string().min(1),
  title: z.string().min(1),
  tuning: tuningSchema,
  score: z.object({
    tempoBpm: z.number().positive(),
    timeSignature: z.object({
      numerator: z.number().int().positive(),
      denominator: z.number().int().positive(),
    }),
    voices: z.array(z.enum(['soprano', 'alto', 'tenor', 'bass'])).length(4),
    measures: z.array(measureSchema),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ProjectData = z.infer<typeof projectSchema>;

export function validateProjectData(input: unknown): ProjectData {
  return projectSchema.parse(input);
}
