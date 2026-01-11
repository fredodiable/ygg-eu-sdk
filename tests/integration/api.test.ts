import { describe, expect, it } from 'vitest';
import { YggEuClient } from '../../src/index';
import { YggCategory } from '../../src/types';

/**
 * Tests d'intégration réels contre l'API yggapi.eu
 * Ces tests vérifient uniquement les routes publiques ne nécessitant pas de passkey.
 */
describe('YggEuClient Integration', () => {
  const client = new YggEuClient();

  it('devrait récupérer des résultats réels pour une recherche textuelle', async () => {
    const results = await client.torrents.search({
      q: 'Inception',
      per_page: 25,
    });

    expect(Array.isArray(results)).toBe(true);

    if (results.length > 0) {
      const first = results[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(typeof first.category_id).toBe('number');
    }
  });

  it('devrait supporter les filtres TMDB et Saisons', async () => {
    const results = await client.torrents.search({
      tmdb_id: 68421, // Altered Carbon
      type: 'tv',
      season: 1,
      category_id: YggCategory.VIDEOS_SERIE_TV,
    });

    expect(Array.isArray(results)).toBe(true);

    if (results.length > 0) {
      const hasS01 = results.some((r) => r.title.toUpperCase().includes('S01'));
      expect(hasS01).toBe(true);
    }
  });

  it('devrait récupérer les métadonnées complètes via getDetails', async () => {
    const search = await client.torrents.search({ q: 'Inception' });

    if (search.length > 0) {
      const torrentId = search[0].id;
      const details = await client.torrents.getDetails(torrentId);

      expect(details).toHaveProperty('title');
      expect(details).toHaveProperty('description');
      expect(details).toHaveProperty('hash');

      expect(['string', 'object']).toContain(typeof details.description);

      if (details.description != undefined) {
        expect(details.description.length).toBeGreaterThan(0);
      } else {
        expect(details.description).toBeNull();
      }
    }
  });

  it('devrait rejeter proprement pour un torrent inexistant', async () => {
    const fakeId = 999999999;
    await expect(client.torrents.getDetails(fakeId)).rejects.toThrow();
  });
});
