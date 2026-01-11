import { beforeEach, describe, expect, it } from 'vitest';
import { YggEuClient } from '../../src/index.js';
import { YggCategory } from '../../src/types.js';
import { fetchMock } from '../setup.unit.js';

describe('YggEuClient - Tests Unitaires (Mocks)', () => {
  let client: YggEuClient;

  beforeEach(() => {
    client = new YggEuClient({ passkey: 'test_passkey' });
    fetchMock.mockClear();
  });

  describe('Méthode search()', () => {
    it("devrait appeler l'API avec les bons paramètres de recherche", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [{ id: 1, name: 'Inception' }],
      } as Response);

      const results = await client.torrents.search({
        q: 'Inception',
        category_id: YggCategory.VIDEOS_FILM,
      });

      const [calledUrl] = fetchMock.mock.calls[0];
      const url = new URL(calledUrl);

      expect(url.pathname).toBe('/torrents');
      expect(url.searchParams.get('q')).toBe('Inception');
      expect(url.searchParams.get('category_id')).toBe(
        YggCategory.VIDEOS_FILM.toString()
      );

      expect(results).toHaveLength(1);
    });
  });

  describe('Méthode getDetails()', () => {
    it("devrait récupérer les détails d'un torrent spécifique", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: 123, hash: 'HASH123' }),
      } as Response);

      const torrentId = 123;
      await client.torrents.getDetails(torrentId);

      const [calledUrl] = fetchMock.mock.calls[0];
      const url = new URL(calledUrl);

      expect(url.pathname).toBe(`/torrent/${torrentId}`);
    });

    it("devrait lever une erreur avec cause si le torrent n'existe pas", async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Torrent introuvable' }),
      } as Response);

      try {
        await client.torrents.getDetails(999);
        expect.fail('La méthode aurait dû rejeter');
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toContain('YggApi 404');
        }
      }
    });
  });

  describe('Méthode download()', () => {
    it('devrait retourner un ArrayBuffer lors du téléchargement', async () => {
      const mockBuffer = new ArrayBuffer(16);
      fetchMock.mockResolvedValueOnce({
        ok: true,
        status: 200,
        arrayBuffer: async () => mockBuffer,
      } as Response);

      const torrentId = 123;
      const buffer = await client.torrents.download(torrentId);

      const [calledUrl] = fetchMock.mock.calls[0];
      const url = new URL(calledUrl);

      expect(url.pathname).toBe(`/torrent/${torrentId}/download`);
      expect(url.searchParams.get('passkey')).toBe('test_passkey');
      expect(buffer.byteLength).toBe(16);
    });

    it('devrait rejeter si le passkey est manquant', async () => {
      const anonymousClient = new YggEuClient();
      await expect(anonymousClient.torrents.download(123)).rejects.toThrow(
        'Passkey is required for download'
      );
    });
  });

  describe('Gestion du Timeout et Erreurs Réseau', () => {
    it('devrait transformer un AbortError en message "Request timeout"', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';
      fetchMock.mockRejectedValueOnce(abortError);

      try {
        await client.torrents.search({ q: 'test' });
        expect.fail("Le timeout n'a pas été déclenché");
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe('Request timeout');
        }
      }
    });

    it('devrait propager les erreurs inconnues proprement', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network Down'));
      await expect(client.torrents.getDetails(1)).rejects.toThrow(
        'Network Down'
      );
    });
  });
});
