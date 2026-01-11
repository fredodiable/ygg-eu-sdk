# Ygg-EU SDK

[![npm version](https://img.shields.io/npm/v/ygg-eu-sdk.svg)](https://www.npmjs.com/package/ygg-eu-sdk)
[![Build Status](https://github.com/fredodiable/ygg-eu-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/fredodiable/ygg-eu-sdk/actions)
[![Dependencies](https://img.shields.io/badge/dependencies-0-success)](https://www.npmjs.com/package/ygg-eu-sdk)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Un SDK TypeScript pour l'API non officielle [yggapi.eu](https://yggapi.eu/).

## ✨ Points forts

- 🪶 **Ultra léger** : Empreinte minimale sur votre projet.
- 🛡️ **Zéro Dépendance** : Utilise l'API `fetch` native.
- 💪 **Type-Safe** : Développé en TypeScript pour une autocomplétion parfaite.
- 🧪 **Fiable** : Couverture complète par tests unitaires et d'intégration.

## 🚀 Installation

```bash
npm install ygg-eu-sdk
```

## 📖 Exemples d'utilisation

### Initialisation

#### En TypeScript (ESM)

```typescript
import { YggEuClient } from 'ygg-eu-sdk';

const client = new YggEuClient({
  //Paramètres optionnels
  passkey: 'VOTRE_PASSKEY', // Requis uniquement pour le téléchargement
  timeout: 5000, // Délai d'expiration en ms (par défaut 10s)
});
```

#### En JavaScript (CommonJS)

```javascript
const { YggEuClient } = require('ygg-eu-sdk');

const client = new YggEuClient({
  // ...
});
```

### 🔍 Rechercher un torrent

#### Recherche minimal

```typescript
const results = await client.torrents.search({
  q: 'Inception',
});
```

#### Recherche détaillée

```typescript
import { YggCategory } from 'ygg-eu-sdk';

const results = await client.torrents.search({
  q: 'Altered Carbon',
  category_id: YggCategory.VIDEOS_SERIE_TV,
  season: 1,
  per_page: 25,
});
```

### 📝 Obtenir les détails

```typescript
const details = await client.torrents.getDetail(123);
console.log(details.title);
```

### ⬇️ Télécharger un fichier .torrent

```typescript
import { writeFileSync } from 'fs';

const torrentBuffer = await client.torrents.download(123);
writeFileSync('test.torrent', Buffer.from(torrentBuffer));
```

## ⚖️ Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, de le modifier et de le distribuer, même à des fins commerciales. Voir le fichier [LICENSE](https://github.com/fredodiable/ygg-eu-sdk/blob/main/LICENSE) pour plus de détails.
