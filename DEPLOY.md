# Guide de Déploiement - SuisseToiture

## 🚀 Déploiement Rapide (Script Automatique)

```bash
# 1. Installation des prérequis
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib
sudo npm install -g pm2

# 2. Configuration base de données
sudo -u postgres psql
CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q

# 3. Transférer les fichiers sur le serveur
cd /var/www/suissetoiture
# (Copier les fichiers ici via scp, rsync ou git)

# 4. Configuration
cp .env.example .env
nano .env  # Éditer DATABASE_URL avec vos valeurs

# 5. Déploiement automatique
chmod +x deploy.sh
./deploy.sh

# ✅ L'application démarre automatiquement au boot !
```

---

## 📋 Configuration Détaillée

### 1. Prérequis Ubuntu 22.04

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Installer PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Installer PM2 (gestionnaire de processus avec auto-start)
sudo npm install -g pm2

# Installer Nginx (pour exposer votre domaine)
sudo apt install -y nginx
```

### 2. Configuration de la Base de Données

```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE_SECURISE';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q
```

### 3. Transfert des Fichiers

```bash
# Créer le répertoire
sudo mkdir -p /var/www/suissetoiture
sudo chown -R $USER:$USER /var/www/suissetoiture
cd /var/www/suissetoiture

# Option A: Transfert SSH depuis votre machine locale
scp -r /chemin/local/projet/* user@IP_SERVEUR:/var/www/suissetoiture/

# Option B: Git clone
git clone https://github.com/votre-repo/suissetoiture.git .
```

### 4. Configuration de l'Application

```bash
# Copier et éditer .env
cp .env.example .env
nano .env
```

Contenu du fichier `.env` :
```env
NODE_ENV=production
DATABASE_URL=postgresql://suissetoiture_user:VOTRE_MOT_DE_PASSE@localhost:5432/suissetoiture
PORT=5000
```

### 5. Build et Démarrage

```bash
# Option A: Script automatique (RECOMMANDÉ)
chmod +x deploy.sh
./deploy.sh

# Option B: Manuel
npm install
npm run db:push
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Le script `deploy.sh` configure automatiquement :
- ✅ Installation des dépendances
- ✅ Synchronisation de la base de données
- ✅ Build de l'application
- ✅ Démarrage avec PM2
- ✅ **Configuration du démarrage automatique au boot**

---

## 🌐 Configuration Nginx + Domaine

### Créer la Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/suissetoiture
```

Ajouter cette configuration :

```nginx
server {
    listen 80;
    server_name votre-domaine.ch www.votre-domaine.ch;

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

### Activer le Site

```bash
# Activer la configuration
sudo ln -s /etc/nginx/sites-available/suissetoiture /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### Configurer SSL (HTTPS)

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat SSL (gratuit)
sudo certbot --nginx -d votre-domaine.ch -d www.votre-domaine.ch

# Renouvellement automatique déjà configuré par Certbot
```

---

## 🔗 Pointer votre Domaine vers l'Instance

### Chez votre Registrar DNS (Infomaniak, OVH, etc.)

Créer les enregistrements DNS suivants :

| Type  | Nom | Valeur          | TTL  |
|-------|-----|-----------------|------|
| A     | @   | IP_DE_VOTRE_VM  | 3600 |
| A     | www | IP_DE_VOTRE_VM  | 3600 |

**Exemple avec Infomaniak :**
1. Aller dans Gestion DNS de votre domaine
2. Ajouter un enregistrement A : `@` → `51.83.45.123`
3. Ajouter un enregistrement A : `www` → `51.83.45.123`
4. Attendre 5-10 minutes pour la propagation DNS

**Vérifier la propagation :**
```bash
# Sur votre machine locale
nslookup votre-domaine.ch
ping votre-domaine.ch
```

---

## 🛡️ Sécurité

### Configurer le Pare-feu

```bash
# Autoriser les ports nécessaires
sudo ufw allow 22     # SSH
sudo ufw allow 80     # HTTP
sudo ufw allow 443    # HTTPS
sudo ufw enable
```

### Sauvegardes Automatiques

```bash
# Créer le script de sauvegarde
sudo nano /etc/cron.daily/backup-suissetoiture
```

Contenu du script :
```bash
#!/bin/bash
BACKUP_DIR=/var/backups/suissetoiture
mkdir -p $BACKUP_DIR
pg_dump -U suissetoiture_user suissetoiture > $BACKUP_DIR/db_$(date +%Y%m%d).sql
find $BACKUP_DIR/db_*.sql -mtime +7 -delete
```

Rendre exécutable :
```bash
sudo chmod +x /etc/cron.daily/backup-suissetoiture
```

---

## 📊 Commandes Utiles

### Gestion PM2

```bash
# Voir le statut
pm2 status

# Voir les logs en temps réel
pm2 logs suissetoiture

# Redémarrer l'application
pm2 restart suissetoiture

# Arrêter l'application
pm2 stop suissetoiture

# Supprimer l'application de PM2
pm2 delete suissetoiture
```

### Mise à Jour de l'Application

```bash
cd /var/www/suissetoiture

# Récupérer les nouvelles versions
git pull  # ou transférer les fichiers

# Redéployer
./deploy.sh

# L'application redémarre automatiquement
```

### Vérifier que l'Application Tourne

```bash
# Via PM2
pm2 status

# Via curl
curl http://localhost:5000

# Via navigateur
# http://IP_DE_VOTRE_SERVEUR:5000
```

### Base de Données

```bash
# Se connecter
sudo -u postgres psql -d suissetoiture

# Lister les devis
SELECT * FROM quotes;

# Compter les devis
SELECT COUNT(*) FROM quotes;

# Quitter
\q
```

---

## 🔧 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
pm2 logs suissetoiture

# Vérifier que le build existe
ls -la dist/

# Rebuild
npm run build
pm2 restart suissetoiture
```

### Problème de connexion à la base de données

```bash
# Vérifier que PostgreSQL tourne
sudo systemctl status postgresql

# Tester la connexion
psql -U suissetoiture_user -d suissetoiture -h localhost

# Vérifier .env
cat .env | grep DATABASE_URL
```

### Nginx ne se connecte pas à l'app

```bash
# Vérifier que l'app tourne sur le bon port
pm2 status

# Tester en local
curl http://localhost:5000

# Vérifier la config Nginx
sudo nginx -t

# Voir les logs Nginx
sudo tail -f /var/log/nginx/error.log
```

---

## 📦 Structure Finale

```
/var/www/suissetoiture/
├── dist/                  # Application compilée (après build)
│   ├── index.js          # Serveur backend
│   └── client/           # Frontend compilé
├── logs/                  # Logs PM2
│   ├── out.log
│   └── err.log
├── node_modules/
├── server/                # Code source backend
├── client/                # Code source frontend
├── shared/                # Types partagés
├── .env                   # Variables d'environnement
├── ecosystem.config.js    # Configuration PM2
├── deploy.sh              # Script de déploiement
└── package.json
```

---

## ✅ Checklist de Déploiement

- [ ] Node.js 20.x installé
- [ ] PostgreSQL installé et configuré
- [ ] PM2 installé globalement
- [ ] Base de données créée
- [ ] Fichiers transférés sur le serveur
- [ ] Fichier `.env` configuré
- [ ] Script `deploy.sh` exécuté
- [ ] Application accessible sur `http://localhost:5000`
- [ ] Nginx installé et configuré
- [ ] DNS pointant vers l'IP du serveur
- [ ] SSL configuré (Certbot)
- [ ] Pare-feu configuré
- [ ] Sauvegardes automatiques configurées
- [ ] Application accessible via `https://votre-domaine.ch` ✨

---

## 🎯 Résumé des Ports

- **Application (interne)** : Port 5000
- **Nginx (HTTP)** : Port 80
- **Nginx (HTTPS)** : Port 443
- **PostgreSQL** : Port 5432 (localhost uniquement)

L'application tourne sur le port 5000 en local, et Nginx fait le reverse proxy pour exposer votre domaine sur les ports 80 (HTTP) et 443 (HTTPS).
