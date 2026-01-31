import { YggSdkError } from './errors.js';
import {
  ClientConfig,
  SearchParams,
  TorrentDetails,
  TorrentResult,
} from './types.js';

export class YggEuClient {
  private readonly baseUrl: string;
  private readonly passkey?: string;
  private readonly timeout: number;

  constructor(config: ClientConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://yggapi.eu';
    this.passkey = config.passkey;
    this.timeout = config.timeout || 10000;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    const headers = {
      Accept: 'application/json',
      'User-Agent': `${SDK_NAME}/${SDK_VERSION}`,
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        throw new YggSdkError(
          `YggApi ${response.status}: ${response.statusText}`,
          {
            cause: { status: response.status, detail },
          }
        );
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      clearTimeout(timer);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }

      throw new YggSdkError('An unknown error occurred', {
        cause: {
          detail: { originalError: String(error) },
        },
      });
    }
  }

  public torrents = {
    search: (params: SearchParams): Promise<TorrentResult[]> => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined) query.append(key, val.toString());
      });
      return this.request<TorrentResult[]>(`/torrents?${query.toString()}`);
    },

    getDetails: (id: number): Promise<TorrentDetails> => {
      return this.request<TorrentDetails>(`/torrent/${id}`);
    },

    download: async (id: number): Promise<ArrayBuffer> => {
      if (!this.passkey)
        throw new YggSdkError('Passkey is required for download');

      const response = await fetch(
        `${this.baseUrl}/torrent/${id}/download?passkey=${this.passkey}`,
        {
          headers: { 'User-Agent': `${SDK_NAME}/${SDK_VERSION}` },
        }
      );

      if (!response.ok)
        throw new YggSdkError(`Download failed: ${response.statusText}`);
      return await response.arrayBuffer();
    },
  };
}
