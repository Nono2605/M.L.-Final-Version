import { StepWizard } from '@/components/step-wizard';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import { Home, Mail, Phone } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-swiss-blue rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SuisseToiture®️</h1>
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
              <a 
                href="/admin" 
                className="text-xs bg-swiss-blue text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-colors"
              >
                Admin
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
