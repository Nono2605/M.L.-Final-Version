import { useState, useEffect } from 'react';
import { FormData, FormStep, StepValidation } from '@/types/form';
import { saveFormData, loadFormData, clearFormData } from '@/lib/form-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Home, Building, Building2, Leaf, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const initialFormData: FormData = {
  projectType: '',
  service: '',
  subServices: [],
  superficie: '',
  nom: '',
  prenom: '',
  rue: '',
  numero: '',
  codePostal: '',
  ville: '',
  email: '',
  telephone: '',
  whatsapp: '',
};

const stepTitles = [
  'Type de projet',
  'Service souhaité',
  'Type d\'intervention',
  'Superficie',
  'Vos coordonnées',
  'Contact',
  'Confirmation'
];

export function StepWizard() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest('POST', '/api/quotes', {
        projectType: data.projectType,
        service: data.service,
        subServices: data.subServices,
        superficie: parseInt(data.superficie),
        nom: data.nom || null,
        prenom: data.prenom || null,
        rue: data.rue || null,
        numero: data.numero || null,
        codePostal: data.codePostal || null,
        ville: data.ville || null,
        adresse: `${data.numero} ${data.rue}, ${data.codePostal} ${data.ville}` || null,
        email: data.email || null,
        telephone: data.telephone || null,
        whatsapp: data.whatsapp || null,
      });
    },
    onSuccess: () => {
      toast({
        title: "Demande envoyée",
        description: "Votre demande de devis a été transmise avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const saved = loadFormData();
    if (saved) {
      setFormData(saved);
    }
  }, []);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step: FormStep): StepValidation => {
    switch (step) {
      case 1:
        return { isValid: !!formData.projectType };
      case 2:
        return { isValid: !!formData.service };
      case 3:
        return { isValid: formData.subServices.length > 0 };
      case 4:
        return { 
          isValid: !!formData.superficie && parseInt(formData.superficie) > 0 
        };
      case 5:
        return { 
          isValid: !!(formData.email || formData.telephone || formData.whatsapp) 
        };
      default:
        return { isValid: true };
    }
  };

  const nextStep = () => {
    const validation = validateStep(currentStep);
    if (!validation.isValid) return;

    if (currentStep === 5) {
      submitQuoteMutation.mutate(formData);
    }

    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    clearFormData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercentage = (currentStep / 6) * 100;
  const canProceed = validateStep(currentStep).isValid;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-swiss-slate">
            Étape {currentStep} sur 6
          </span>
          <span className="text-sm text-swiss-slate">
            {stepTitles[currentStep - 1]}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="animate-fade-in">
        {currentStep === 1 && <StepOne formData={formData} updateFormData={updateFormData} />}
        {currentStep === 2 && <StepTwo formData={formData} updateFormData={updateFormData} />}
        {currentStep === 3 && <StepThree formData={formData} updateFormData={updateFormData} />}
        {currentStep === 4 && <StepFour formData={formData} updateFormData={updateFormData} />}
        {currentStep === 5 && <StepFive formData={formData} updateFormData={updateFormData} />}
        {currentStep === 6 && <StepSix formData={formData} updateFormData={updateFormData} />}
        {currentStep === 7 && <StepSeven formData={formData} onReset={resetForm} />}
      </div>

      {/* Navigation */}
      {currentStep < 7 && (
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'invisible' : ''}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed || submitQuoteMutation.isPending}
            className="bg-swiss-blue hover:bg-blue-800"
          >
            {currentStep === 6 ? (
              submitQuoteMutation.isPending ? 'Envoi...' : 'Envoyer la demande'
            ) : (
              'Suivant'
            )}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}

function StepOne({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  const selectProjectType = (type: 'maison' | 'immeuble' | 'autre') => {
    updateFormData({ projectType: type });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Choisissez votre type de projet
      </h2>
      <p className="text-lg text-swiss-slate mb-8">
        Sélectionnez le type de bâtiment pour lequel vous souhaitez nos services
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.projectType === 'maison' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectProjectType('maison')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-swiss-blue" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Maison</h3>
            <p className="text-swiss-slate">Maisons individuelles, villas, chalets</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.projectType === 'immeuble' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectProjectType('immeuble')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-swiss-blue" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Immeuble</h3>
            <p className="text-swiss-slate">Immeubles résidentiels, bâtiments commerciaux</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.projectType === 'autre' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectProjectType('autre')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-swiss-blue" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Autre</h3>
            <p className="text-swiss-slate">Hangars, entrepôts, structures diverses</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StepTwo({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  const selectService = (service: 'toiture' | 'facade' | 'terrasse') => {
    updateFormData({ service, subServices: [] });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Choisissez le service souhaité
      </h2>
      <p className="text-lg text-swiss-slate mb-8">
        Quel type de surface souhaitez-vous faire nettoyer ?
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.service === 'toiture' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectService('toiture')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-swiss-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏠 Toiture</h3>
            <p className="text-sm text-swiss-slate">Nettoyage et traitement des toits</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.service === 'facade' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectService('facade')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-swiss-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🏢 Façade</h3>
            <p className="text-sm text-swiss-slate">Nettoyage des murs extérieurs</p>
          </CardContent>
        </Card>
        
        <Card 
          className={`cursor-pointer card-hover border-2 transition-all ${
            formData.service === 'terrasse' 
              ? 'border-swiss-blue bg-blue-50' 
              : 'border-gray-200 hover:border-swiss-blue'
          }`}
          onClick={() => selectService('terrasse')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-swiss-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🌿 Terrasse</h3>
            <p className="text-sm text-swiss-slate">Nettoyage des terrasses et sols</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StepThree({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  const serviceNames = {
    toiture: 'toiture',
    facade: 'façade',
    terrasse: 'terrasse'
  };

  const toggleSubService = (subService: string) => {
    const currentSubServices = formData.subServices;
    const newSubServices = currentSubServices.includes(subService)
      ? currentSubServices.filter(s => s !== subService)
      : [...currentSubServices, subService];
    
    updateFormData({ subServices: newSubServices });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Sélection du service
      </h2>
      <p className="text-lg text-swiss-slate mb-8">
        Choisissez les services souhaités pour votre {serviceNames[formData.service as keyof typeof serviceNames]}
      </p>
      
      <div className="max-w-2xl mx-auto space-y-4">
        <Card className={`border-2 transition-all ${
          formData.subServices.includes('nettoyage') 
            ? 'border-swiss-blue bg-blue-50' 
            : 'border-gray-200'
        }`}>
          <CardContent className="p-4">
            <label className="flex items-center cursor-pointer">
              <Checkbox
                checked={formData.subServices.includes('nettoyage')}
                onCheckedChange={() => toggleSubService('nettoyage')}
                className="mr-4"
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">Nettoyage</h3>
                <p className="text-sm text-swiss-slate">Nettoyage professionnel à vapeur</p>
              </div>
            </label>
          </CardContent>
        </Card>
        
        <Card className={`border-2 transition-all ${
          formData.subServices.includes('traitement') 
            ? 'border-swiss-blue bg-blue-50' 
            : 'border-gray-200'
        }`}>
          <CardContent className="p-4">
            <label className="flex items-center cursor-pointer">
              <Checkbox
                checked={formData.subServices.includes('traitement')}
                onCheckedChange={() => toggleSubService('traitement')}
                className="mr-4"
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">Traitement</h3>
                <p className="text-sm text-swiss-slate">Traitement et protection des surfaces</p>
              </div>
            </label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StepFour({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Détails du projet
      </h2>
      <p className="text-lg text-swiss-slate mb-8">
        Donnez-nous quelques informations sur votre projet
      </p>
      
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          <div>
            <Label htmlFor="superficie" className="text-left block mb-2">
              Superficie en m² <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="superficie"
                type="number"
                value={formData.superficie}
                onChange={(e) => updateFormData({ superficie: e.target.value })}
                placeholder="Ex: 150"
                min="1"
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-swiss-slate">
                m²
              </span>
            </div>
            <p className="text-xs text-swiss-slate mt-1 text-left">
              Superficie approximative de la surface à traiter
            </p>
          </div>
          
          <div>
            <Label htmlFor="adresse" className="text-left block mb-2">
              Adresse (facultatif)
            </Label>
            <Textarea
              id="adresse"
              value={formData.adresse}
              onChange={(e) => updateFormData({ adresse: e.target.value })}
              placeholder="Rue, ville, code postal..."
              rows={3}
            />
            <p className="text-xs text-swiss-slate mt-1 text-left">
              Pour un devis plus précis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StepFive({ formData, updateFormData }: { formData: FormData; updateFormData: (updates: Partial<FormData>) => void }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Informations de contact
      </h2>
      <p className="text-lg text-swiss-slate mb-8">
        Comment souhaitez-vous être contacté ?
      </p>
      
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          <div>
            <Label htmlFor="email" className="text-left block mb-2">
              📧 Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="telephone" className="text-left block mb-2">
              📱 Téléphone
            </Label>
            <Input
              id="telephone"
              type="tel"
              value={formData.telephone}
              onChange={(e) => updateFormData({ telephone: e.target.value })}
              placeholder="+41 XX XXX XX XX"
            />
          </div>
          
          <div>
            <Label htmlFor="whatsapp" className="text-left block mb-2">
              📲 WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => updateFormData({ whatsapp: e.target.value })}
              placeholder="+41 XX XXX XX XX"
            />
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              ℹ️ Au moins un moyen de contact est requis pour recevoir votre devis.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StepSix({ formData, onReset }: { formData: FormData; onReset: () => void }) {
  const serviceNames = {
    toiture: 'Toiture',
    facade: 'Façade',
    terrasse: 'Terrasse'
  };

  const projectNames = {
    maison: 'Maison',
    immeuble: 'Immeuble'
  };

  const subServiceNames = {
    nettoyage: 'Nettoyage',
    traitement: 'Traitement'
  };

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Merci pour votre intérêt !
      </h2>
      <p className="text-xl text-swiss-slate mb-8">
        Nous vous contacterons dans un délai de 24h.
      </p>
      
      <Card className="max-w-2xl mx-auto mb-8">
        <CardContent className="p-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-left">
            Récapitulatif de votre demande :
          </h3>
          <div className="space-y-3 text-left text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Type de projet :</span>
              <span>{projectNames[formData.projectType as keyof typeof projectNames]}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Service :</span>
              <span>{serviceNames[formData.service as keyof typeof serviceNames]}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Interventions :</span>
              <span>
                {formData.subServices.map(s => subServiceNames[s as keyof typeof subServiceNames]).join(', ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Superficie :</span>
              <span>{formData.superficie} m²</span>
            </div>
            {formData.adresse && (
              <div className="flex justify-between">
                <span className="font-medium">Adresse :</span>
                <span className="text-right">{formData.adresse}</span>
              </div>
            )}
            
            {(formData.email || formData.telephone || formData.whatsapp) && (
              <div className="pt-3 border-t border-gray-200">
                <div className="font-medium mb-2">Contact :</div>
                <div className="space-y-1 text-swiss-slate">
                  {formData.email && <div>Email: {formData.email}</div>}
                  {formData.telephone && <div>Téléphone: {formData.telephone}</div>}
                  {formData.whatsapp && <div>WhatsApp: {formData.whatsapp}</div>}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={onReset} className="bg-swiss-blue hover:bg-blue-800">
        Nouvelle demande
      </Button>
    </div>
  );
}
