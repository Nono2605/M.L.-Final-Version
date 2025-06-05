import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star, Trophy } from 'lucide-react';

export function ServicesSection() {
  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Domaines d'Application
          </h2>
          <p className="text-lg text-swiss-slate">
            SuisseToiture®️ est le choix idéal pour des prestations de nettoyage variées
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
                ✅ Bâtiments & Monuments
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nettoyage de façades pour redonner un coup de neuf
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Réhabilitation de monuments historiques sans altération
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nettoyage des toitures pour prolonger leur durée de vie
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Décapage de peinture sans abîmer les surfaces
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
                ✅ Nettoyage Urbain & Spécialisé
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Suppression des graffitis de manière écologique
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Élimination des chewing-gums incrustés
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Nettoyage urbain efficace sans produits chimiques
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Éradication des algues, mousses et végétations
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
                ✅ Décontamination & Désinfection
              </h3>
              <ul className="space-y-3 text-swiss-slate">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Décontamination des containers industriels
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Désinfection en profondeur pour espaces sains
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Neutralisation des odeurs tenaces
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-swiss-blue rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Retrait des revêtements endommagés
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
