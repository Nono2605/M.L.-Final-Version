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

# Démarrer avec PM2
if command -v pm2 &> /dev/null; then
    echo "♻️ Démarrage avec PM2..."
    
    # Redémarrer ou démarrer l'application
    pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
    
    # Sauvegarder la configuration PM2
    pm2 save
    
    # Configurer PM2 pour démarrage automatique au boot système
    echo "🔧 Configuration du démarrage automatique..."
    pm2 startup | grep -E "^sudo" | bash || true
    
    # Afficher le statut
    echo ""
    echo "✅ Application déployée et configurée avec PM2"
    echo ""
    pm2 status
    echo ""
    echo "📊 L'application tourne sur http://localhost:5000"
    echo "📝 Logs: pm2 logs suissetoiture"
    echo "🔄 Redémarrer: pm2 restart suissetoiture"
    
else
    echo "⚠️  PM2 n'est pas installé!"
    echo ""
    echo "Pour un démarrage automatique, installez PM2:"
    echo "  sudo npm install -g pm2"
    echo "  ./deploy.sh"
    echo ""
    echo "✅ Build terminé. Démarrage manuel avec: npm start"
fi

echo ""
echo "🎉 Déploiement terminé!"
