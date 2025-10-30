# Guide de Déploiement - SuisseToiture

## Prérequis Ubuntu 22.04

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Installer PM2 (gestionnaire de processus)
sudo npm install -g pm2

# Installer Nginx (optionnel, pour reverse proxy)
sudo apt install -y nginx
```

## Configuration de la Base de Données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE_SECURISE';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q
```

## Déploiement de l'Application

```bash
# 1. Cloner ou transférer le projet
cd /var/www
sudo mkdir -p suissetoiture
sudo chown -R $USER:$USER suissetoiture
cd suissetoiture

# 2. Copier les fichiers du projet (via scp, git, etc.)
# Exemple avec scp:
# scp -r /chemin/local/projet/* user@serveur:/var/www/suissetoiture/

# 3. Installer les dépendances
npm install --production=false

# 4. Configurer les variables d'environnement
cat > .env << EOF
NODE_ENV=production
DATABASE_URL=postgresql://suissetoiture_user:VOTRE_MOT_DE_PASSE_SECURISE@localhost:5432/suissetoiture
PORT=5000
EOF

# 5. Initialiser la base de données
npm run db:push

# 6. Build de l'application
npm run build

# 7. Tester le démarrage
npm start
# Ctrl+C pour arrêter après vérification
```

## Démarrage avec PM2

```bash
# Créer le fichier de configuration PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'suissetoiture',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
EOF

# Démarrer l'application avec PM2
pm2 start ecosystem.config.js

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Exécuter la commande affichée par PM2

# Vérifier le statut
pm2 status
pm2 logs suissetoiture
```

## Configuration Nginx (Reverse Proxy)

```bash
# Créer la configuration Nginx
sudo nano /etc/nginx/sites-available/suissetoiture

# Ajouter cette configuration:
```

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer le site
sudo ln -s /etc/nginx/sites-available/suissetoiture /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Installer SSL avec Let's Encrypt (optionnel mais recommandé)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com
```

## Commandes Utiles

```bash
# Redémarrer l'application
pm2 restart suissetoiture

# Voir les logs
pm2 logs suissetoiture

# Arrêter l'application
pm2 stop suissetoiture

# Mettre à jour l'application
cd /var/www/suissetoiture
git pull  # ou copier les nouveaux fichiers
npm install
npm run build
pm2 restart suissetoiture

# Vérifier l'état de la base de données
sudo -u postgres psql -d suissetoiture -c "SELECT COUNT(*) FROM quotes;"
```

## Sécurité

```bash
# Configurer le pare-feu
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Créer des sauvegardes automatiques de la base de données
sudo nano /etc/cron.daily/backup-suissetoiture

# Ajouter ce script:
#!/bin/bash
pg_dump -U suissetoiture_user suissetoiture > /var/backups/suissetoiture_$(date +%Y%m%d).sql
find /var/backups/suissetoiture_*.sql -mtime +7 -delete

# Rendre le script exécutable
sudo chmod +x /etc/cron.daily/backup-suissetoiture
```

## Résumé des Commandes de Build

```bash
# Installation
npm install

# Build
npm run build

# Démarrage production
npm start

# Ou avec PM2
pm2 start ecosystem.config.js
```

## Structure après Build

```
/var/www/suissetoiture/
├── dist/              # Application compilée
│   ├── index.js      # Serveur backend
│   └── client/       # Frontend compilé
├── node_modules/
├── package.json
├── .env              # Variables d'environnement
└── ecosystem.config.js  # Configuration PM2
```

## Ports

- Application: 5000 (interne)
- Nginx: 80 (HTTP) et 443 (HTTPS)
