import { Gender, GenderEnum, VoterContractParams } from "@/types";
import { dateToEpoch, epochToDateString, isAtLeast18YearsOld } from "../utils/date-conversions";
import * as v from "valibot";

// Schema for voter registration and updates
export const VoterFormSchema = v.object({
  name: v.pipe(
    v.string("Name must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Full name is required"),
    v.minLength(2, "Name must be at least 2 characters"),
    v.maxLength(100, "Name must be less than 100 characters"),
  ),
  dateOfBirth: v.pipe(
    v.string("Date of birth is required"),
    v.minLength(1, "Date of birth is required"),
    v.custom((val) => isAtLeast18YearsOld(val), "You must be at least 18 years old to register"),
  ),
  gender: v.pipe(
    v.picklist([GenderEnum.MALE, GenderEnum.FEMALE] as const, "Please select a gender"),
  ),
  presentAddress: v.pipe(
    v.string("Address must be a string"),
    v.transform((val) => val.trim()), // Trim whitespace
    v.nonEmpty("Address is required"),
    v.minLength(5, "Address must be at least 5 characters"),
    v.maxLength(500, "Address must be less than 500 characters"),
  ),
});

// Type for the form data
export type VoterFormValues = v.InferOutput<typeof VoterFormSchema>;

/**
 * Converts a VoterFormValues object to a VoterContractParams object by converting dateOfBirth to dateOfBirthEpoch
 */
export function voterFormToContractParams(formValues: VoterFormValues): VoterContractParams {
  return {
    name: formValues.name,
    dateOfBirthEpoch: dateToEpoch(formValues.dateOfBirth),
    gender: formValues.gender,
    presentAddress: formValues.presentAddress,
  };
}

/**
 * Converts VoterDetails from the contract to form values for the UI
 * @param contractData The voter details from the contract
 * @returns Form values suitable for the UI form
 */
export function contractDataToVoterForm(contractData: {
  name: string;
  dateOfBirthEpoch: bigint;
  gender: number;
  presentAddress: string;
}): VoterFormValues {
  return {
    name: contractData.name,
    dateOfBirth: epochToDateString(contractData.dateOfBirthEpoch),
    gender: contractData.gender as Gender,
    presentAddress: contractData.presentAddress,
  };
}
