import rateLimit from 'express-rate-limit';

/**
 * Rate limiter para submissão de relatos
 * Previne spam e ataques DDoS
 */
export const reportSubmissionLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10, // 10 submissões por IP
  message: {
    error: 'Muitas submissões deste IP. Por favor, aguarde alguns minutos antes de tentar novamente.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Função para extrair IP (considerando proxies)
  keyGenerator: (req) => {
    return req.ip || 
           req.headers['x-forwarded-for']?.split(',')[0] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress;
  },
  // Não aplicar rate limit para health checks
  skip: (req) => req.path === '/health'
});

/**
 * Rate limiter mais permissivo para leitura de dados (dashboard)
 */
export const dashboardLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 60, // 60 requests por minuto
  message: {
    error: 'Muitas requisições. Por favor, aguarde um momento.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter estrito para endpoints administrativos
 */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Apenas 5 tentativas
  message: {
    error: 'Muitas tentativas de acesso administrativo. Conta temporariamente bloqueada.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
