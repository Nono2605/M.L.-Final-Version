import { StepWizard } from '@/components/step-wizard';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import { Home, Mail, Phone } from 'lucide-react';
import logoPath from '@assets/Logo_Mahmoud-02.png';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="SuisseToiture Logo" 
                className="h-12 w-auto"
              />
              <div>
                <p className="text-sm text-swiss-slate">
                  Votre expert en nettoyage professionnel à vapeur en Suisse
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-swiss-slate">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +41 XX XXX XX XX
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                contact@suissetoiture.ch
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <StepWizard />
        <ServicesSection />
      </main>

      <Footer />
    </div>
  );
}
