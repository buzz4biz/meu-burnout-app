import crypto from 'crypto';
import bcrypt from 'bcrypt';

/**
 * Cria um hash irreversível de uma string (ex: nome de empresa)
 * Usado para agrupar dados sem revelar a identidade
 */
export function createHash(text) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const salt = process.env.HASH_SALT || 'default-salt-change-this';
  const normalized = text.toLowerCase().trim();
  
  return crypto
    .createHmac('sha256', salt)
    .update(normalized)
    .digest('hex');
}

/**
 * Gera um código de acesso único para o usuário
 * Formato: XXXX-XXXX-XXXX (12 caracteres)
 */
export function generateAccessCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Remove caracteres ambíguos
  let code = '';
  
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) {
      code += '-';
    }
    const randomIndex = crypto.randomInt(0, chars.length);
    code += chars[randomIndex];
  }
  
  return code;
}

/**
 * Valida formato de código de acesso
 */
export function isValidAccessCode(code) {
  const pattern = /^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/;
  return pattern.test(code);
}

/**
 * Cria um hash de senha (para futuras funcionalidades de admin)
 */
export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Verifica senha contra hash
 */
export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
