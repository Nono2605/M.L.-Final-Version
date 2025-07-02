# Guide de Déploiement - SuisseToiture

## Prérequis Techniques

Votre site utilise une architecture moderne qui nécessite :
- **Node.js 18+** (runtime JavaScript)
- **PostgreSQL** (base de données)
- **npm** (gestionnaire de packages)

## Option 1 : Déploiement sur Infomaniak

### Étape 1 : Préparation des fichiers

1. **Télécharger le code source :**
   - Cliquez sur les 3 points (...) en haut à droite de Replit
   - Sélectionnez "Download as ZIP"
   - Extrayez le fichier ZIP sur votre ordinateur

2. **Préparer les variables d'environnement :**
   Créez un fichier `.env` avec :
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   SESSION_SECRET=votre_secret_session_aleatoire_long
   NODE_ENV=production
   ```

### Étape 2 : Configuration Infomaniak

1. **Commandez un hébergement web :**
   - Rendez-vous sur infomaniak.com
   - Choisissez "Hébergement Web" (Advanced ou Pro pour Node.js)
   - Activez l'option "Node.js" lors de la commande

2. **Configuration de la base de données :**
   - Dans votre panel Infomaniak, créez une base PostgreSQL
   - Notez les informations de connexion (host, port, user, password, database)

### Étape 3 : Upload et installation

1. **Upload des fichiers :**
   - Connectez-vous au panel Infomaniak
   - Utilisez le gestionnaire de fichiers ou FTP
   - Uploadez tous les fichiers dans le dossier racine

2. **Installation des dépendances :**
   - Accédez au terminal SSH (disponible dans le panel)
   - Exécutez : `npm install --production`

3. **Configuration de la base de données :**
   - Exécutez : `npm run db:push`
   - Cela créera les tables nécessaires

4. **Build de production :**
   - Exécutez : `npm run build`

### Étape 4 : Configuration du serveur

1. **Point d'entrée :**
   - Configurez le point d'entrée sur `server/index.js`
   - Port : utilisez la variable d'environnement PORT fournie par Infomaniak

2. **Domaine :**
   - Configurez votre domaine (ex: suissetoiture.ch)
   - Activez SSL/TLS automatique

## Option 2 : Hébergeurs alternatifs suisses

### Hostpoint
- Support Node.js natif
- Interface simple en français
- SSL inclus
- Prix : ~20 CHF/mois

### cyon
- Spécialisé pour développeurs
- Support SSH complet
- Très techniques
- Prix : ~15 CHF/mois

### nine.ch
- Cloud suisse
- Très scalable
- Support technique excellent
- Prix : variable selon usage

## Scripts de déploiement automatique

Créez un fichier `package.json` avec ces scripts :

```json
{
  "scripts": {
    "build": "vite build",
    "start": "NODE_ENV=production node server/index.js",
    "deploy": "npm run build && npm run db:push"
  }
}
```

## Configuration recommandée

### Fichier .htaccess (si Apache)
```apache
RewriteEngine On
RewriteRule ^api/(.*)$ /server/index.js [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx (si disponible)
```nginx
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

## Sécurité

1. **Variables d'environnement :**
   - Jamais de secrets dans le code
   - Utilisez le panel hébergeur pour les variables sensibles

2. **SSL/TLS :**
   - Activez HTTPS obligatoire
   - Infomaniak le fournit gratuitement

3. **Sauvegarde :**
   - Configurez les sauvegardes automatiques
   - Exportez régulièrement la base de données

## Support et maintenance

- **Logs :** Consultables dans le panel hébergeur
- **Monitoring :** Infomaniak propose des alertes
- **Mises à jour :** `npm update` puis redéploiement

## Coûts estimés (Infomaniak)

- Hébergement web Advanced : ~15 CHF/mois
- Base de données PostgreSQL : incluse
- Domaine .ch : ~15 CHF/an
- SSL : gratuit
- **Total : ~195 CHF/an**

## Assistance

Si vous rencontrez des difficultés :
1. Documentation Infomaniak très complète
2. Support technique en français
3. Community forums actifs