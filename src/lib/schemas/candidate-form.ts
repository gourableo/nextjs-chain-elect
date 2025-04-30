import * as v from "valibot";

// Schema for candidate registration and updates
export const CandidateFormSchema = v.object({
  name: v.pipe(
    v.string("Name must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Name is required"),
    v.minLength(3, "Name must be at least 3 characters"),
    v.maxLength(100, "Name must be less than 100 characters"),
  ),
  age: v.pipe(
    v.number("Age must be a number"),
    v.integer("Age must be a whole number"),
    v.minValue(18, "You must be at least 18 years old"),
    v.maxValue(120, "Age cannot be more than 120"),
  ),
  email: v.pipe(
    v.string("Email must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Email is required"),
    v.email("Please enter a valid email address"),
  ),
  qualifications: v.pipe(
    v.string("Qualifications must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Qualifications are required"),
    v.minLength(10, "Please provide more details about your qualifications"),
    v.maxLength(500, "Qualifications must be less than 500 characters"),
  ),
  manifesto: v.pipe(
    v.string("Manifesto must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Manifesto is required"),
    v.minLength(20, "Your manifesto should be at least 20 characters"),
    v.maxLength(1000, "Manifesto must be less than 1000 characters"),
  ),
});

// Type for the form data
export type CandidateFormValues = v.InferOutput<typeof CandidateFormSchema>;
