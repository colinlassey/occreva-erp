export interface StorageAdapter {
  putObject(input: {
    key: string;
    contentType: string;
    body: Buffer;
  }): Promise<{ url: string }>;
}
