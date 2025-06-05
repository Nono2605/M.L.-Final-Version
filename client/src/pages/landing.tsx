import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import { Home, Mail, Phone, ArrowRight, CheckCircle, Star, Award, Thermometer, Leaf, Shield } from 'lucide-react';
import { Link } from 'wouter';
import logoPath from '@assets/Logo_Mahmoud-02.png';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="/">
                <img 
                  src={logoPath} 
                  alt="SuisseToiture Logo" 
                  className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </a>
              <div>
                <p className="text-sm text-swiss-slate">
                  Nettoyage écologique à vapeur
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-swiss-slate">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +41 78 690 33 34
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@suissetoiture.ch
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('https://www.drone-malin.com/medias/images/inspection-toiture-par-drone-de-batiments-industriels.jpg')`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Nettoyage professionnel
              <span className="block text-swiss-blue">à vapeur en Suisse</span>
            </h1>
            <p className="text-xl text-swiss-slate mb-8 max-w-3xl mx-auto">
              Révolutionnez le nettoyage avec notre technologie vapeur mobile combinant haute pression 
              et chaleur intense jusqu'à 150°C. Solution 100% écologique sans produits chimiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/devis">
                <Button size="lg" className="bg-swiss-blue hover:bg-blue-800 text-lg px-8 py-4">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-swiss-slate">
                ✓ Devis gratuit en 24h • ✓ Sans engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              La Révolution du Nettoyage à la Vapeur
            </h2>
            <p className="text-lg text-swiss-slate">
              Technologie mobile combinant haute pression et chaleur intense pour un nettoyage optimal
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Thermometer className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Haute Performance</h3>
                <p className="text-swiss-slate">
                  Vapeur jusqu'à 150°C et pression ajustable jusqu'à 270 bars 
                  pour déloger les saletés les plus tenaces.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">100% Écologique</h3>
                <p className="text-swiss-slate">
                  Méthode révolutionnaire sans produits chimiques, 
                  respectueuse des surfaces et de l'environnement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-swiss-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Surfaces Préservées</h3>
                <p className="text-swiss-slate">
                  Nettoyage en profondeur sans risque de dégradation, 
                  adapté aux surfaces délicates et résistantes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-swiss-blue">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à redonner éclat à vos surfaces ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Obtenez votre devis personnalisé en moins de 5 minutes
          </p>
          <Link href="/devis">
            <Button size="lg" variant="secondary" className="text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
              <span className="block sm:inline">Commencer ma demande de devis</span>
              <ArrowRight className="w-5 h-5 ml-2 flex-shrink-0" />
            </Button>
          </Link>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-blue-100 text-sm">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Processus simple et rapide
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Réponse garantie en 24h
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Devis gratuit et sans engagement
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Une question ? Contactez-nous
          </h2>
          <p className="text-lg text-swiss-slate mb-8">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-swiss-blue mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
                <p className="text-swiss-slate">+41 78 690 33 34</p>
                <p className="text-sm text-swiss-slate mt-1">Lun-Ven 8h-18h</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-swiss-blue mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-swiss-slate">info@suissetoiture.ch</p>
                <p className="text-sm text-swiss-slate mt-1">Réponse sous 24h</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <svg className="w-8 h-8 text-swiss-blue mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.088z"/>
                </svg>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-swiss-slate">Message instantané</p>
                <p className="text-sm text-swiss-slate mt-1">Réponse rapide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}