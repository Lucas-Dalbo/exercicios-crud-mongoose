import { z } from 'zod';

/*
sem usar Zod ficaria assim:

interface ILens {
  degree: number,
  antiGlare: boolean,
  blueLightFilter: boolean,
}

export default ILens;
*/

const lensZodSchema = z.object({
  degree: z.number(),
  antiGlare: z.boolean(),
  blueLightFilter: z.boolean(),
});

// Explicitando a validação, Zod não valida em TS
type ILens = z.infer<typeof lensZodSchema>;

export default ILens;
export { lensZodSchema };