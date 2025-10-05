export interface ReportFormData {
  sector: string;
  companySize: '1-50' | '51-200' | '201-1000' | '1000+';
  position: string;
  workHoursPerWeek: number;
  hasOvertime: boolean;
  hasWeekendWork: boolean;
  burnoutSymptoms: string[];
  companyName?: string;
  state?: string;
  city?: string;
  freeText?: string;
}

export interface ReportResponse {
  success: boolean;
  message: string;
  accessCode: string;
  instructions: string;
}

export interface DashboardData {
  bySector: SectorData[];
  byCompanySize: CompanySizeData[];
  topSymptoms: SymptomData[];
  timeline: TimelineData[];
  topCompanies: CompanyData[];
}

export interface SectorData {
  sector: string;
  total_reports: number;
  avg_work_hours: number;
  overtime_percentage: number;
  weekend_work_percentage: number;
}

export interface CompanySizeData {
  company_size: string;
  total_reports: number;
  avg_work_hours: number;
}

export interface SymptomData {
  symptom: string;
  frequency: number;
}

export interface TimelineData {
  date: string;
  submissions: number;
}

export interface CompanyData {
  company_hash: string;
  sector: string;
  total_reports: number;
  avg_work_hours: number;
}
