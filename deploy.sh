#!/bin/bash
set -e

echo "🚀 Déploiement de SuisseToiture..."

# Vérifier que .env existe
if [ ! -f .env ]; then
    echo "❌ Fichier .env manquant. Copiez .env.example vers .env et configurez-le."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Initialiser/Mettre à jour la base de données
echo "🗄️ Synchronisation de la base de données..."
npm run db:push

# Build de l'application
echo "🔨 Build de l'application..."
npm run build

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

# Redémarrer avec PM2 si installé
if command -v pm2 &> /dev/null; then
    echo "♻️ Redémarrage avec PM2..."
    pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
    pm2 save
    echo "✅ Application déployée et démarrée avec PM2"
    pm2 status
else
    echo "⚠️ PM2 n'est pas installé. Installation recommandée: sudo npm install -g pm2"
    echo "✅ Build terminé. Démarrez l'application avec: npm start"
fi

echo ""
echo "🎉 Déploiement terminé!"
