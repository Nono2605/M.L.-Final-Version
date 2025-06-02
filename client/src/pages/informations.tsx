import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, User } from 'lucide-react';
import { Link } from 'wouter';

export default function InformationsPage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img 
                src="/attached_assets/Logo_Mahmoud-02.png" 
                alt="SuisseToiture"
                className="h-12 cursor-pointer"
              />
            </Link>
            <Link href="/">
              <Button variant="outline">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Informations sur SuisseToiture®️
          </h1>
          <p className="text-lg text-swiss-slate">
            Découvrez notre entreprise spécialisée dans le nettoyage professionnel à vapeur
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Informations de contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-swiss-blue" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-swiss-slate" />
                <span>+41 78 690 33 34</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-swiss-slate" />
                <span>info@suissetoiture.ch</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-swiss-slate mt-1" />
                <span>Service dans toute la Suisse</span>
              </div>
            </CardContent>
          </Card>

          {/* Horaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-swiss-blue" />
                Horaires d'intervention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>9h00 - 17h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Sur demande</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* À propos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-swiss-blue" />
                À propos de SuisseToiture®️
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-swiss-slate">
                SuisseToiture®️ est une entreprise spécialisée dans le nettoyage professionnel à vapeur, 
                active sur tout le territoire suisse. Avec 8 ans d'expérience dans le domaine, nous proposons 
                des solutions écologiques et efficaces pour l'entretien de vos bâtiments.
              </p>
              <p className="text-swiss-slate">
                Notre approche respectueuse de l'environnement utilise uniquement la vapeur d'eau, 
                sans aucun produit chimique, garantissant un nettoyage en profondeur tout en préservant 
                vos surfaces et l'environnement.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Nos domaines d'expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-swiss-light rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Toitures</h3>
                  <p className="text-sm text-swiss-slate">
                    Nettoyage et entretien de tous types de toitures
                  </p>
                </div>
                <div className="text-center p-4 bg-swiss-light rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Façades</h3>
                  <p className="text-sm text-swiss-slate">
                    Ravalement et nettoyage de façades
                  </p>
                </div>
                <div className="text-center p-4 bg-swiss-light rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Terrasses</h3>
                  <p className="text-sm text-swiss-slate">
                    Nettoyage de terrasses et surfaces extérieures
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/devis">
            <Button size="lg" className="bg-swiss-blue hover:bg-blue-800">
              Demander un devis gratuit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}