export interface StorageUploadInput {
  key: string;
  body: Buffer;
  contentType: string;
}

export interface StorageAdapter {
  upload(input: StorageUploadInput): Promise<{ key: string; url: string }>;
}
