import type { ReportFormData, ReportResponse, DashboardData } from '@/types/report';

// URL do Cloudflare Worker (proxy de anonimização)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export class ApiClient {
  /**
   * Submeter um novo relato
   */
  static async submitReport(data: ReportFormData): Promise<ReportResponse> {
    const response = await fetch(`${API_URL}/api/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao enviar relato');
    }

    return response.json();
  }

  /**
   * Verificar status de um relato
   */
  static async checkReportStatus(accessCode: string) {
    const response = await fetch(`${API_URL}/api/reports/${accessCode}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao verificar relato');
    }

    return response.json();
  }

  /**
   * Obter estatísticas gerais
   */
  static async getGeneralStats() {
    const response = await fetch(`${API_URL}/api/reports/stats/general`);

    if (!response.ok) {
      throw new Error('Erro ao carregar estatísticas');
    }

    return response.json();
  }

  /**
   * Obter dados do dashboard
   */
  static async getDashboardData(): Promise<DashboardData> {
    const [bySector, byCompanySize, topSymptoms, timeline, topCompanies] = await Promise.all([
      fetch(`${API_URL}/api/dashboard/by-sector`).then(r => r.json()),
      fetch(`${API_URL}/api/dashboard/by-company-size`).then(r => r.json()),
      fetch(`${API_URL}/api/dashboard/top-symptoms`).then(r => r.json()),
      fetch(`${API_URL}/api/dashboard/timeline`).then(r => r.json()),
      fetch(`${API_URL}/api/dashboard/top-companies`).then(r => r.json()),
    ]);

    return {
      bySector: bySector.data,
      byCompanySize: byCompanySize.data,
      topSymptoms: topSymptoms.data,
      timeline: timeline.data,
      topCompanies: topCompanies.data,
    };
  }
}
