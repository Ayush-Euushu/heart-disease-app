export interface HeartDiseaseInput {
  age: number;
  sex: string; // 'Male' | 'Female'
  chest_pain_type: string; // 'Typical angina' | 'Atypical angina' | 'Non-anginal pain' | 'Asymptomatic'
  resting_blood_pressure: number; // mm Hg (60 - 250)
  cholestoral: number; // mg/dl (80 - 600)
  fasting_blood_sugar: string; // 'Lower than 120 mg/ml' | 'Greater than 120 mg/ml'
  rest_ecg: string; // 'Normal' | 'ST-T wave abnormality' | 'Left ventricular hypertrophy'
  Max_heart_rate: number; // bpm (60 - 240)
  exercise_induced_angina: string; // 'No' | 'Yes'
  oldpeak: number; // ST depression (0.0 - 8.0)
  slope: string; // 'Upsloping' | 'Flat' | 'Downsloping'
  vessels_colored_by_flourosopy: string; // 'Zero' | 'One' | 'Two' | 'Three' | 'Four'
  thalassemia: string; // 'Normal' | 'Fixed Defect' | 'Reversable Defect' | 'No'
}

export interface PredictionResponse {
  prediction: number; // 0 or 1
  status: 'Healthy' | 'Heart Disease Risk';
  probability: number; // 0.0 to 1.0
  probability_percentage: number; // e.g. 78.4
  healthy_probability_percentage: number;
  risk_level: 'Low' | 'Moderate' | 'High';
  summary: string;
  contributing_factors: string[];
  normalized_features: Record<string, string | number>;
}

export interface PresetProfile {
  name: string;
  description: string;
  data: HeartDiseaseInput;
}
