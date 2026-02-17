export type ProviderTransaction = {
  id: string;
  amountCents: number;
  bookedAt: Date;
  memo: string | null;
};

export interface PaymentProviderAdapter {
  getProviderName(): string;
  fetchTransactions(input: { from: Date; to: Date }): Promise<ProviderTransaction[]>;
}

export class MercuryAdapterStub implements PaymentProviderAdapter {
  getProviderName(): string {
    return "mercury";
  }

  async fetchTransactions(): Promise<ProviderTransaction[]> {
    return [];
  }
}
