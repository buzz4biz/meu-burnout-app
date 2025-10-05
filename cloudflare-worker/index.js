/**
 * Cloudflare Worker - Proxy de Anonimização
 * 
 * Este worker atua como proxy entre o frontend e o backend,
 * removendo TODOS os metadados de identificação antes de enviar ao backend.
 * 
 * Remove:
 * - IP do cliente
 * - User-Agent
 * - Referrer
 * - Cookies
 * - Qualquer header de identificação
 */

// URL do backend (configure no wrangler.toml)
const BACKEND_URL = 'https://your-backend-api.com';

export default {
  async fetch(request, env) {
    // Permitir apenas POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      // Ler o body da requisição
      const body = await request.json();

      // Criar nova requisição para o backend SEM metadados de identificação
      const anonymizedRequest = new Request(`${BACKEND_URL}/api/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // NÃO incluir: IP, User-Agent, Referrer, Cookies, etc.
          // Apenas headers essenciais para a API funcionar
        },
        body: JSON.stringify(body)
      });

      // Enviar ao backend
      const response = await fetch(anonymizedRequest);
      const responseData = await response.json();

      // Retornar resposta ao cliente
      return new Response(JSON.stringify(responseData), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Ajustar em produção
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });

    } catch (error) {
      console.error('Proxy error:', error);
      
      return new Response(JSON.stringify({ 
        error: 'Erro ao processar requisição' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
