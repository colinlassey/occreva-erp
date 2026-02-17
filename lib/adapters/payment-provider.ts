export interface PaymentProviderTransaction {
  id: string;
  amountCents: number;
  occurredAt: Date;
  memo?: string;
}

export interface PaymentProviderAdapter {
  fetchTransactions(startDate: Date, endDate: Date): Promise<PaymentProviderTransaction[]>;
}

export class MercuryAdapter implements PaymentProviderAdapter {
  async fetchTransactions(): Promise<PaymentProviderTransaction[]> {
    return [];
  }
}
