import { GenderEnum } from "@/types";
import * as v from "valibot";

// Schema for voter registration and updates
export const VoterFormSchema = v.object({
  name: v.pipe(
    v.string("Name must be a string"),
    v.nonEmpty("Full name is required"),
    v.minLength(2, "Name must be at least 2 characters"),
    v.maxLength(100, "Name must be less than 100 characters"),
  ),
  age: v.pipe(
    v.string("Age must be a string"),
    v.nonEmpty("Age is required"),
    v.transform((value) => parseInt(value, 10)),
    v.number("Age must be a number"),
    v.integer("Age must be a whole number"),
    v.minValue(18, "Must be at least 18 years old"),
    v.maxValue(120, "Age cannot be more than 120"),
  ),
  gender: v.pipe(
    v.number("Gender must be selected"),
    v.picklist([GenderEnum.MALE, GenderEnum.FEMALE] as const, "Please select a gender"),
  ),
  presentAddress: v.pipe(
    v.string("Address must be a string"),
    v.nonEmpty("Address is required"),
    v.minLength(5, "Address must be at least 5 characters"),
    v.maxLength(500, "Address must be less than 500 characters"),
  ),
});

// Type for the form data
export type VoterFormValues = v.InferOutput<typeof VoterFormSchema>;
