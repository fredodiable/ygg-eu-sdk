/**
 * Catégories officielles YGG
 */
export enum YggCategory {
  ALL = 0,

  AUDIO = 2139,
  AUDIO_KARAOKE = 2147,
  AUDIO_MUSIQUE = 2148,
  AUDIO_SAMPLES = 2149,
  AUDIO_PODCAST_RADIO = 2150,

  EBOOK = 2140,
  EBOOK_AUDIO = 2151,
  EBOOK_BD = 2152,
  EBOOK_COMICS = 2153,
  EBOOK_LIVRES = 2154,
  EBOOK_MANGA = 2155,
  EBOOK_PRESSE = 2156,

  JEUX_VIDEO = 2142,
  JEUX_LINUX = 2159,
  JEUX_MACOS = 2160,
  JEUX_WINDOWS = 2161,
  JEUX_NINTENDO = 2163,
  JEUX_SONY = 2164,
  JEUX_SMARTPHONE = 2165,
  JEUX_TABLETTE = 2166,
  JEUX_AUTRE = 2167,

  APPLICATIONS = 2144,
  APPLICATIONS_LINUX = 2168,
  APPLICATIONS_MACOS = 2169,
  APPLICATIONS_WINDOWS = 2170,
  APPLICATIONS_SMARTPHONE = 2171,
  APPLICATIONS_TABLETTE = 2172,
  APPLICATIONS_FORMATION = 2177,

  VIDEOS = 2145,
  VIDEOS_ANIMATION = 2178,
  VIDEOS_ANIMATION_SERIE = 2179,
  VIDEOS_CONCERT = 2180,
  VIDEOS_DOCUMENTAIRE = 2181,
  VIDEOS_EMISSION_TV = 2182,
  VIDEOS_FILM = 2183,
  VIDEOS_SERIE_TV = 2184,
  VIDEOS_SPECTACLE = 2185,
  VIDEOS_SPORT = 2186,
  VIDEOS_CLIP_VIDEO = 2187,

  GPS = 2143,
  GPS_APPLICATIONS = 2173,
  GPS_CARTES = 2174,
  GPS_DIVERS = 2175,

  IMPRIMANTE_3D = 2200,
  IMPRIMANTE_3D_OBJETS = 2201,
  IMPRIMANTE_3D_PERSONNAGES = 2202,

  NULLED = 2210,
  NULLED_WORDPRESS = 2211,
  NULLED_SCRIPTS_PHP_CMS = 2212,
  NULLED_MOBILE = 2213,
  NULLED_DIVERS = 2214,
}

export interface SearchParams {
  page?: number;
  q?: string;
  category_id?: YggCategory | number;
  order_by?: 'uploaded_at' | 'seeders' | 'downloads';
  per_page?: 25 | 50 | 100;
  season?: number;
  episode?: number;
  type?: 'movie' | 'tv';
  tmdb_id?: number;
}

export interface TorrentResult {
  id: number;
  title: string;
  seeders: number;
  leechers: number;
  downloads: number | undefined;
  size: number;
  category_id: number;
  uploaded_at: string;
  link: string;
}

export interface TorrentDetails extends TorrentResult {
  description: string | undefined;
  hash: string | undefined;
  updated_at: string;
  type: string | undefined;
  tmdb_id: number | undefined;
}

export interface ClientConfig {
  passkey?: string;
  baseUrl?: string;
  timeout?: number;
}
