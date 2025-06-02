export interface FormData {
  projectType: 'maison' | 'immeuble' | 'autre' | '';
  service: 'toiture' | 'facade' | 'terrasse' | '';
  subServices: string[];
  superficie: string;
  nom: string;
  prenom: string;
  rue: string;
  numero: string;
  codePostal: string;
  ville: string;
  email: string;
  telephone: string;
  whatsapp: string;
}

export interface StepValidation {
  isValid: boolean;
  errors?: string[];
}

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
