export type ServiceType = 'Trade License' | 'E-Passport' | 'TIN Certificate' | 'Other';

export interface EligibilityInputs {
  serviceType: string;
  userAge: number;
  monthlyIncome?: number;
  residencyStatus: string;
}

export interface EligibilityResult {
  status: 'Eligible' | 'Not Eligible' | 'Partially Eligible';
  documents: string[];
  processingTime: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
  eligibilityResult?: EligibilityResult; // If the model called checkEligibilityRule, we attach it here
}

export interface EligibilityRequest {
  messages: {
    role: 'user' | 'model';
    content: string;
  }[];
}

export interface EligibilityResponse {
  content: string;
  eligibilityResult?: EligibilityResult;
}
