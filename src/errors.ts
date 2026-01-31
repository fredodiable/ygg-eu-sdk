export interface YggSdkCause {
  status?: number;
  detail?: Record<string, unknown>;
}

export class YggSdkError extends Error {
  override readonly name = 'YggSdkError';
  declare readonly cause?: YggSdkCause;

  constructor(message?: string, options?: { cause?: YggSdkCause }) {
    super(message, options);
    Object.setPrototypeOf(this, YggSdkError.prototype);
  }
}
