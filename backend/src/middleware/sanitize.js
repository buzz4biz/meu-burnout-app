/**
 * Middleware para sanitizar texto livre e remover PII (Personally Identifiable Information)
 * Remove: emails, telefones, CPF, endereços, nomes próprios comuns
 */

// Regex patterns para detectar PII
const patterns = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(\+?55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/g,
  cpf: /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g,
  cnpj: /\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}/g,
  cep: /\d{5}-?\d{3}/g,
  url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
  // Padrões de endereço
  address: /\b(rua|avenida|av|travessa|alameda|praça)\s+[a-záàâãéèêíïóôõöúçñ\s]+,?\s*\d+/gi,
};

// Lista de nomes próprios comuns (simplificada - em produção, usar biblioteca de NLP)
const commonNames = [
  'joão', 'maria', 'josé', 'ana', 'pedro', 'paulo', 'carlos', 'lucas', 'juliana',
  'fernanda', 'rafael', 'gabriel', 'mariana', 'rodrigo', 'amanda', 'bruno',
  'carolina', 'felipe', 'camila', 'daniel', 'letícia', 'thiago', 'beatriz'
];

/**
 * Sanitiza texto removendo PII
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let sanitized = text;

  // Remove emails
  sanitized = sanitized.replace(patterns.email, '[EMAIL REMOVIDO]');

  // Remove telefones
  sanitized = sanitized.replace(patterns.phone, '[TELEFONE REMOVIDO]');

  // Remove CPF
  sanitized = sanitized.replace(patterns.cpf, '[CPF REMOVIDO]');

  // Remove CNPJ
  sanitized = sanitized.replace(patterns.cnpj, '[CNPJ REMOVIDO]');

  // Remove CEP
  sanitized = sanitized.replace(patterns.cep, '[CEP REMOVIDO]');

  // Remove URLs
  sanitized = sanitized.replace(patterns.url, '[LINK REMOVIDO]');

  // Remove endereços
  sanitized = sanitized.replace(patterns.address, '[ENDEREÇO REMOVIDO]');

  // Remove nomes próprios comuns (case-insensitive)
  commonNames.forEach(name => {
    const regex = new RegExp(`\\b${name}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '[NOME]');
  });

  return sanitized.trim();
}

/**
 * Middleware Express para sanitizar campos de texto no body
 */
export function sanitizeMiddleware(req, res, next) {
  if (req.body && req.body.freeText) {
    req.body.freeText = sanitizeText(req.body.freeText);
  }

  // Sanitizar outros campos de texto se necessário
  if (req.body && req.body.companyName) {
    // Não sanitizar nome da empresa, mas normalizar
    req.body.companyName = req.body.companyName.trim();
  }

  next();
}

/**
 * Detecta se o texto ainda contém PII após sanitização
 * Retorna true se detectar possível PII não capturada
 */
export function detectRemainingPII(text) {
  if (!text) return false;

  // Detecta sequências longas de números (possível documento)
  const longNumbers = /\d{6,}/g;
  if (longNumbers.test(text)) {
    return true;
  }

  // Detecta padrões de email parcialmente mascarados
  const partialEmail = /@[a-z]/gi;
  if (partialEmail.test(text)) {
    return true;
  }

  return false;
}

export default sanitizeMiddleware;
