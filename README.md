# SuisseToiture - Application Web

Application de gestion de devis pour services de nettoyage professionnel à vapeur.

## Déploiement Rapide sur Ubuntu 22.04

### Installation des Prérequis

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# PM2
sudo npm install -g pm2
```

### Configuration Base de Données

```bash
sudo -u postgres psql
CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q
```

### Déploiement

```bash
# 1. Copier les fichiers sur le serveur
cd /var/www/suissetoiture

# 2. Installer les dépendances
npm install

# 3. Configurer .env
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Initialiser la base de données
npm run db:push

# 5. Build
npm run build

# 6. Démarrer avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Commandes de Build

```bash
npm install          # Installation des dépendances
npm run build        # Build de production
npm start            # Démarrage production (sans PM2)
npm run db:push      # Sync du schéma de base de données
```

## Documentation Complète

Voir [DEPLOY.md](./DEPLOY.md) pour le guide complet incluant Nginx, SSL, sécurité et sauvegardes.

## Technologies

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Drizzle ORM
- **Deployment**: PM2 + Nginx
