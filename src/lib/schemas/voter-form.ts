import * as v from "valibot";
import { Gender } from "@/types";

export const voterFormSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your full name."),
    v.minLength(2, "Name must be at least 2 characters."),
    v.maxLength(100, "Name cannot exceed 100 characters."),
  ),
  age: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your age."),
    v.transform((value) => Number(value)),
    v.number(),
    v.integer("Age must be a whole number."),
    v.min(18, "You must be at least 18 years old to register."),
  ),
  gender: v.pipe(
    v.number(),
    v.custom(
      (value) => value === Gender.Male || value === Gender.Female,
      "Please select a gender.",
    ),
  ),
  presentAddress: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your present address."),
    v.minLength(5, "Address must be at least 5 characters long."),
  ),
});

export type VoterFormSchema = v.Output<typeof voterFormSchema>;
