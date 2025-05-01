import { GenderEnum } from "@/types";
import * as v from "valibot";

// Define schema for candidate registration/update form
export const CandidateFormSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(3, "Name must be at least 3 characters"),
    v.maxLength(100, "Name must be less than 100 characters"),
  ),
  age: v.pipe(
    v.number(),
    v.integer("Age must be a whole number"),
    v.minValue(18, "You must be at least 18 years old to be a candidate"),
    v.maxValue(120, "Please enter a valid age"),
  ),
  gender: v.pipe(
    v.picklist([GenderEnum.MALE, GenderEnum.FEMALE] as const, "Please select a gender"),
  ),
  presentAddress: v.pipe(
    v.string(),
    v.minLength(5, "Address must be at least 5 characters"),
    v.maxLength(200, "Address must be less than 200 characters"),
  ),
  email: v.pipe(
    v.string(),
    v.email("Please enter a valid email address"),
    v.maxLength(100, "Email must be less than 100 characters"),
  ),
  qualifications: v.pipe(
    v.string(),
    v.minLength(10, "Qualifications must be at least 10 characters"),
    v.maxLength(1000, "Qualifications must be less than 1000 characters"),
  ),
  manifesto: v.pipe(
    v.string(),
    v.minLength(50, "Manifesto must be at least 50 characters"),
    v.maxLength(2000, "Manifesto must be less than 2000 characters"),
  ),
});

export type CandidateFormValues = v.InferOutput<typeof CandidateFormSchema>;
