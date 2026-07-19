export interface SubmissionJobPayload {
  schemaVersion: number; // schema payload version tracking
  submissionId: string;
  userId: string;
  problemId: string;
  languageId: string;
  judge0LanguageId: number;
  sourceCode: string;
  requestId?: string;
  correlationId?: string;
}
