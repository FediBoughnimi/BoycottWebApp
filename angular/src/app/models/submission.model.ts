export interface Submission {
  submissionType: string;
  _id?: string;  // Optional because MongoDB generates this on insert
  brandName: string;
  proofURL: string;
  reason: string;  // Optional for boycott
  alternativeBrand: string;  // Optional for alternative
}
