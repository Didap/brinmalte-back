# 🚀 Deploy Backend Brinmalte

Guida per deployare il backend Strapi su DigitalOcean App Platform.

## 📋 Prerequisiti

1. Repository GitHub: [https://github.com/Didap/brinmalte-back.git](https://github.com/Didap/brinmalte-back.git)
2. Account DigitalOcean
3. Database PostgreSQL (gestito da DigitalOcean o esterno)

## 🎯 Deploy su DigitalOcean App Platform

### Step 1: Push del Codice su GitHub

Se non hai ancora pushato il codice:

```bash
cd backend

# Inizializza git (se non già fatto)
git init

# Aggiungi il remote
git remote add origin https://github.com/Didap/brinmalte-back.git

# Aggiungi tutti i file
git add .

# Commit iniziale
git commit -m "Initial commit: Backend Strapi CMS"

# Push su GitHub
git branch -M main
git push -u origin main
```

### Step 2: Genera le Chiavi di Sicurezza

Prima di deployare, genera le chiavi di sicurezza per Strapi:

```bash
# Genera 5 chiavi casuali sicure
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Esegui questo comando 5 volte per ottenere:
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

**⚠️ Salva queste chiavi in un posto sicuro!**

### Step 3: Crea App su DigitalOcean

1. Vai su [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Clicca su **"Create App"**
3. Connetti il repository GitHub `brinmalte-back`
4. Seleziona il branch `main`

### Step 4: Configura il Database PostgreSQL

1. Nella sezione **"Resources"**, clicca **"Add Resource"**
2. Seleziona **"Database"**
3. Scegli **PostgreSQL 16**
4. Nome: `brinmalte-db`
5. Piano: scegli in base alle tue esigenze
   - **Basic**: $15/mese (consigliato per iniziare)
   - **Professional**: $60/mese (per produzione)

### Step 5: Configura il Componente Backend

1. **Source Directory**: `/` (root del repository)
2. **Build Command**: `npm install && npm run build`
3. **Run Command**: `npm start`
4. **HTTP Port**: usa la porta della piattaforma (tipicamente `8080`) e **non** forzare `1337`
5. **Environment Variables**:

   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=${brinmalte-db.DATABASE_URL}
   DATABASE_HOST=${brinmalte-db.HOSTNAME}
   DATABASE_PORT=${brinmalte-db.PORT}
   DATABASE_NAME=${brinmalte-db.DATABASE}
   DATABASE_USERNAME=${brinmalte-db.USERNAME}
   DATABASE_PASSWORD=${brinmalte-db.PASSWORD}
   DATABASE_SSL=true
   DATABASE_SCHEMA=strapi
   HOST=0.0.0.0
   # NON impostare PORT: lo imposta la piattaforma (es. 8080)
   APP_KEYS=<tua_chiave_generata>
   API_TOKEN_SALT=<tua_chiave_generata>
   ADMIN_JWT_SECRET=<tua_chiave_generata>
   TRANSFER_TOKEN_SALT=<tua_chiave_generata>
   JWT_SECRET=<tua_chiave_generata>
   ```

   **Nota**: Le variabili con `${brinmalte-db.*}` vengono automaticamente popolate da DigitalOcean quando colleghi il database.

### Step 6: Configura le Routes

Aggiungi queste routes:
- **Route**: `/api` → Backend Service
- **Route**: `/admin` → Backend Service
- **Route**: `/health` → Backend Service (per health checks)

### Step 7: Deploy

1. Clicca su **"Review"** per verificare la configurazione
2. Clicca su **"Create Resources"**
3. Attendi il completamento del deploy (10-15 minuti)

### Step 8: Configurazione Post-Deploy

1. Accedi all'admin panel: `https://your-app.ondigitalocean.app/admin`
2. Crea il primo utente amministratore
3. Configura i Content Types (Product, Category, ecc.)
4. Configura i permessi pubblici per le API:
   - Settings → Users & Permissions → Roles → Public
   - Abilita `find` e `findOne` per Products e Categories
5. Aggiungi alcuni prodotti di test

### Step 9: Configura CORS per il Frontend

Se il frontend è su un dominio diverso, configura CORS:

1. Vai su Settings → Middlewares
2. Abilita `cors` e configura:
   ```json
   {
     "enabled": true,
     "origin": ["https://your-frontend-domain.com"]
   }
   ```

## 🔧 Variabili d'Ambiente

### Sviluppo Locale

Crea un file `.env` nella root del backend:

```env
NODE_ENV=development
DATABASE_CLIENT=sqlite
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-dev-key
API_TOKEN_SALT=your-dev-salt
ADMIN_JWT_SECRET=your-dev-secret
TRANSFER_TOKEN_SALT=your-dev-salt
JWT_SECRET=your-dev-secret
```

### Produzione

Configura su DigitalOcean App Platform (vedi Step 5).

## 📊 Costi Stimati

- **Database PostgreSQL Basic**: $15/mese
- **Backend Service Basic**: $5/mese
- **Totale**: ~$20/mese

Per produzione, considera:
- **Database Professional**: $60/mese
- **Backend Service Professional**: $12/mese
- **Totale**: ~$72/mese

## 🔐 Sicurezza

1. **Mai committare file `.env`** nel repository
2. Usa sempre **HTTPS** in produzione
3. Genera chiavi sicure diverse per ogni ambiente
4. Limita i permessi pubblici alle API necessarie
5. Configura CORS correttamente
6. Abilita rate limiting se necessario

## 🐛 Troubleshooting

### Build Fallisce

Controlla i logs su DigitalOcean:
1. Vai su App Platform → La tua app → Runtime Logs
2. Verifica errori di build o dipendenze mancanti

### Database non si Connette

1. Verifica che il database sia stato creato
2. Controlla le variabili d'ambiente del database
3. Verifica che `DATABASE_SSL=true` sia impostato
4. Controlla i logs del database su DigitalOcean

### Admin Panel non Carica

1. Verifica che il build sia completato correttamente
2. Controlla i logs per errori
3. Assicurati che tutte le variabili d'ambiente siano configurate

### API non Funzionano

1. Verifica i permessi pubblici in Strapi Admin
2. Controlla che i Content Types siano pubblicati
3. Verifica i logs per errori di autenticazione

### Errori di Migrazione Database

Se hai problemi con le migrazioni:
1. Vai su Settings → Database
2. Verifica lo stato delle migrazioni
3. Se necessario, resetta il database (⚠️ perde tutti i dati)

## 📚 Risorse Utili

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Strapi Environment Variables](https://docs.strapi.io/dev-docs/configurations/environment)
- [PostgreSQL on DigitalOcean](https://docs.digitalocean.com/products/databases/postgresql/)

## 🔄 Aggiornamenti

Per aggiornare il backend dopo modifiche:

```bash
# Nel repository locale
git add .
git commit -m "Update backend"
git push origin main
```

DigitalOcean App Platform eseguirà automaticamente un nuovo deploy.

