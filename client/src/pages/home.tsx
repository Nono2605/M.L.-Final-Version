import { StepWizard } from '@/components/step-wizard';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import { Home, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';
import logoPath from '@assets/Logo_Mahmoud-02.png';

export default function HomePage() {
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
                  Votre expert en nettoyage professionnel à vapeur en Suisse
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-swiss-slate">
              <a href="tel:+41786903334" className="flex items-center hover:text-swiss-blue transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +41 78 690 33 34
              </a>
              <a href="mailto:info@suissetoiture.ch" className="flex items-center hover:text-swiss-blue transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@suissetoiture.ch
              </a>

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
