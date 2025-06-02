import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star, Trophy } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Services de SuisseToiture®️
          </h2>
          <p className="text-lg text-swiss-slate">
            Découvrez notre expertise en nettoyage professionnel à vapeur
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Notre expertise */}
          <Card className="bg-swiss-light border-0">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ✅ Notre expertise
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nettoyage de façades, toitures, monuments historiques
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Élimination de graffitis, nettoyage urbain, décontamination
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nettoyage de terrasses, balcons et surfaces extérieures
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Nos avantages */}
          <Card className="bg-swiss-light border-0">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-swiss-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ✅ Nos avantages
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Techniciens certifiés (8 ans d'expérience)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Aucun produit chimique
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Faible consommation d'eau (-80%)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Traitement doux, non abrasif pour tous matériaux
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Bénéfices */}
          <Card className="bg-swiss-light border-0">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ✅ Bénéfices
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Prolonge la durée de vie de vos bâtiments
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Préserve l'esthétique et la valeur
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Valorise votre image professionnelle
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
