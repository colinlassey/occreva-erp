export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProviderAdapter {
  sendEmail(payload: EmailPayload): Promise<void>;
}
