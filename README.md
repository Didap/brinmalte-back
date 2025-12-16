# Brinmalte Backend

Backend Strapi CMS per la piattaforma ecommerce Brinmalte.

> **Repository**: [https://github.com/Didap/brinmalte-back.git](https://github.com/Didap/brinmalte-back.git)

## 🚀 Tecnologie

- **Strapi v5.28.0** - Headless CMS
- **PostgreSQL** - Database (produzione)
- **SQLite** - Database (sviluppo locale)
- **TypeScript** - Type safety
- **Node.js 18-22** - Runtime

## 📋 Prerequisiti

- Node.js 18.x - 22.x
- npm o yarn
- PostgreSQL (per produzione) o SQLite (per sviluppo locale)

## 🛠️ Installazione

### Sviluppo Locale

```bash
# Installa le dipendenze
npm install

# Configura le variabili d'ambiente
# Crea un file .env nella root del backend con:
DATABASE_CLIENT=sqlite
NODE_ENV=development

# Avvia Strapi in modalità sviluppo
npm run develop
```

Strapi sarà disponibile su `http://localhost:1337`

### Con PostgreSQL (Locale, Docker - consigliato)

Se vuoi usare PostgreSQL anche in locale (stesso DB engine della produzione), avvialo con Docker:

```bash
# Avvia PostgreSQL con Docker
docker compose up -d

# Configura .env
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=brinmalte
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false
DATABASE_SCHEMA=strapi
```

> Nota: il `docker-compose.yml` crea già lo schema `strapi` e imposta `search_path` per l'utente `strapi`.

## 📦 Comandi Disponibili

```bash
# Sviluppo con hot-reload
npm run develop

# Avvio in modalità produzione
npm run start

# Build dell'admin panel
npm run build

# Deploy
npm run deploy

# Console Strapi
npm run console
```

## 🔐 Variabili d'Ambiente

Crea un file `.env` nella root del backend:

### Sviluppo Locale (SQLite)

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
HOST=0.0.0.0
PORT=1337
APP_KEYS=genera_chiavi_sicure
API_TOKEN_SALT=genera_salt_sicuro
ADMIN_JWT_SECRET=genera_secret_sicuro
TRANSFER_TOKEN_SALT=genera_salt_sicuro
JWT_SECRET=genera_secret_sicuro
```

### Produzione (PostgreSQL)

```env
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:5432/database
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=brinmalte
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
DATABASE_SCHEMA=strapi
HOST=0.0.0.0
APP_KEYS=genera_chiavi_sicure
API_TOKEN_SALT=genera_salt_sicuro
ADMIN_JWT_SECRET=genera_secret_sicuro
TRANSFER_TOKEN_SALT=genera_salt_sicuro
JWT_SECRET=genera_secret_sicuro
```

> Su DigitalOcean App Platform **non** impostare `PORT=1337`: lascia che la piattaforma imposti `PORT` (di solito `8080`) e Strapi lo userà automaticamente.

**⚠️ Importante**: Genera chiavi sicure per produzione usando:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🏗️ Struttura del Progetto

```
backend/
├── config/              # Configurazioni
│   ├── database.ts     # Configurazione database
│   ├── server.ts       # Configurazione server
│   └── api.ts         # Configurazione API
├── src/
│   ├── api/           # API endpoints e Content Types
│   ├── admin/         # Personalizzazioni admin panel
│   └── extensions/    # Estensioni Strapi
├── public/            # File pubblici (uploads, robots.txt)
└── database/          # Migrazioni database
```

## 📝 Content Types

Per far funzionare l'ecommerce, assicurati di avere questi Content Types:

### Product (Collection Type)
- **name** (Text, Required)
- **description** (Rich Text)
- **price** (Number, Decimal, Required)
- **slug** (UID, Required)
- **stock** (Number, Integer, Required, Default: 0)
- **images** (Media, Multiple files)
- **category** (Relation: Many-to-One with Category)

### Category (Collection Type)
- **name** (Text, Required)
- **slug** (UID, Required)
- **description** (Text)

## 🔑 Permessi API

Configura i permessi pubblici per consentire l'accesso alle API:

1. Vai su **Settings → Users & Permissions → Roles → Public**
2. Abilita `find` e `findOne` per:
   - Products
   - Categories

## 🎯 Features

- ✅ Headless CMS con Strapi
- ✅ REST API automatiche
- ✅ Admin panel personalizzabile
- ✅ Media Library per immagini
- ✅ User & Permissions
- ✅ Supporto PostgreSQL e SQLite
- ✅ TypeScript per type safety

## 🌐 URLs

- **Development**: http://localhost:1337
- **Admin Panel**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

## 📚 Risorse

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Strapi API Documentation](https://docs.strapi.io/dev-docs/api/rest)

## 🔒 Sicurezza

- ⚠️ **Mai committare file `.env`** nel repository
- Usa sempre **HTTPS** in produzione
- Genera chiavi sicure per ogni ambiente
- Configura CORS correttamente per il frontend
- Limita i permessi pubblici alle API necessarie
