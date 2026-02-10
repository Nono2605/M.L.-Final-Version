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













🚀 Procédure de Déploiement - SuisseToiture
🧩 1. Connexion SSH depuis ton PC
Depuis PowerShell ou VS Code Terminal, exécute :
ssh -i "C:\Users\Arnau\OneDrive\Bureau\website\WebsiteBuilder\test.pem" ubuntu@IP_DE_TON_SERVEUR


🔁 Exemple :
ssh -i "C:\Users\Arnau\OneDrive\Bureau\website\WebsiteBuilder\test.pem" ubuntu@83.228.225.129


🧱 2. Installation des dépendances sur le serveur
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs postgresql postgresql-contrib nginx
sudo npm install -g pm2


🗄️ 3. Configuration PostgreSQL

sudo -u postgres psql

CREATE DATABASE suissetoiture;
CREATE USER suissetoiture_user WITH PASSWORD 'ton_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE suissetoiture TO suissetoiture_user;
\q


📁 4. Transfert du projet depuis ton PC
Depuis ton dossier local :
C:\Users\Arnau\OneDrive\Bureau\Mahmoud\SuisseToiturech
Exécute :
scp -r * ubuntu@IP_DE_TON_SERVEUR:/var/www/suissetoiture/


⚙️ 5. Configuration de l’application
Sur le serveur :
cd /var/www/suissetoiture
cp .env.example .env
nano .env

Exemple de contenu .env :
NODE_ENV=production
DATABASE_URL=postgresql://suissetoiture_user:ton_mot_de_passe@localhost:5432/suissetoiture
PORT=5000


🏗️ 6. Build et lancement
npm install
npm run db:push
npm run build
pm2 start dist/index.js --name suissetoiture
pm2 save
pm2 startup


🌐 7. Configuration Nginx
Créer le fichier :
sudo nano /etc/nginx/sites-available/suissetoiture

Coller :
server {
    listen 80;
    server_name suissetoiture.ch www.suissetoiture.ch;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name suissetoiture.ch www.suissetoiture.ch;

    ssl_certificate /etc/letsencrypt/live/www.suissetoiture.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.suissetoiture.ch/privkey.pem;

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

Activer :
sudo ln -s /etc/nginx/sites-available/suissetoiture /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx


🔒 8. SSL (Certbot)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d suissetoiture.ch -d www.suissetoiture.ch


🌍 9. DNS
Chez ton registrar (ex. Infomaniak) :
TypeNomValeur (IP)TTLA@IP_DE_TON_SERVEUR3600AwwwIP_DE_TON_SERVEUR3600

🧾 10. Vérifications finales
# Vérifier que l’app tourne
pm2 status

# Vérifier le backend
curl http://localhost:5000

# Vérifier la config Nginx
sudo nginx -t

# Vérifier le domaine
curl -I https://www.suissetoiture.ch


✅ Si tout est bon, ton site sera accessible sur :
https://www.suissetoiture.ch


Souhaites-tu que je te fasse une version ultra-courte “résumé en 10 lignes” à coller dans ton README pour usage rapide ?