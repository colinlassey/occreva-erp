export interface EmailProviderAdapter {
  sendInvoiceEmail(input: {
    to: string;
    subject: string;
    html: string;
    pdfUrl: string;
  }): Promise<{ providerMessageId: string }>;
}
