export interface SubmissionJobPayload {
  schemaVersion: number; // schema payload version tracking
  submissionId: string;
  userId: string;
  problemId: string;
  languageId: string;
  sourceCode: string;
  requestId?: string;
  correlationId?: string;
}
