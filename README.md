# SuisseToiture - Application Web

Application professionnelle de gestion de devis pour services de nettoyage à vapeur (façades, toitures, terrasses).

## 🚀 Déploiement sur Ubuntu 22.04

### Installation Rapide

```bash
# 1. Prérequis
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib
sudo npm install -g pm2

# 2. Base de données
sudo -u postgres psql
CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q

# 3. Configuration
cd /var/www/suissetoiture
cp .env.example .env
nano .env  # Éditer DATABASE_URL

# 4. Déploiement automatique
chmod +x deploy.sh
./deploy.sh
```

✅ **L'application démarre automatiquement au boot du serveur**

---

## 🌐 Exposer votre Domaine

### 1. Installer Nginx

```bash
sudo apt install -y nginx
```

### 2. Configurer le Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/suissetoiture
```

```nginx
server {
    listen 80;
    server_name votre-domaine.ch www.votre-domaine.ch;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/suissetoiture /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Configurer SSL (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.ch -d www.votre-domaine.ch
```

### 4. Pointer votre DNS

Chez votre registrar (Infomaniak, OVH, etc.), créer :

| Type | Nom | Valeur              |
|------|-----|---------------------|
| A    | @   | IP_DE_VOTRE_SERVEUR |
| A    | www | IP_DE_VOTRE_SERVEUR |

---

## 📋 Commandes Principales

```bash
pm2 status               # État de l'application
pm2 logs suissetoiture   # Voir les logs
pm2 restart suissetoiture # Redémarrer
./deploy.sh              # Redéployer après modification
```

---

## 📖 Documentation Complète

Voir **[DEPLOY.md](./DEPLOY.md)** pour :
- Guide détaillé de déploiement
- Configuration Nginx avancée
- Sécurité et pare-feu
- Sauvegardes automatiques
- Dépannage

---

## 🛠️ Technologies

- **Frontend** : React + Vite + TailwindCSS + shadcn/ui
- **Backend** : Node.js + Express
- **Base de données** : PostgreSQL + Drizzle ORM
- **Déploiement** : PM2 + Nginx + Let's Encrypt SSL
- **Serveur** : Ubuntu 22.04 LTS

---

## 📞 Fonctionnalités

✅ Formulaire de demande de devis  
✅ Liens cliquables (email, téléphone, WhatsApp)  
✅ Pages légales (Mentions légales, Politique de confidentialité)  
✅ Responsive (mobile, tablette, desktop)  
✅ Base de données PostgreSQL  
✅ Démarrage automatique au boot (PM2)  
✅ Prêt pour SSL/HTTPS
