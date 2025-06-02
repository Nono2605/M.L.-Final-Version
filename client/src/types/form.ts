export interface FormData {
  projectType: 'maison' | 'immeuble' | '';
  service: 'toiture' | 'facade' | 'terrasse' | '';
  subServices: string[];
  superficie: string;
  adresse: string;
  email: string;
  telephone: string;
  whatsapp: string;
}

export interface StepValidation {
  isValid: boolean;
  errors?: string[];
}

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6;
