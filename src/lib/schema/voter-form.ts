import { z } from "zod";

export const voterFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 years old to register." })
    .max(150, { message: "Age must be less than 150." }),
  gender: z.enum(["0", "1"], {
    errorMap: () => ({ message: "Please select your gender." }),
  }),
  presentAddress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .max(500, { message: "Address must be less than 500 characters." }),
});

export type VoterFormValues = z.infer<typeof voterFormSchema>;
