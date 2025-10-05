import express from 'express';
import { submitReport, checkReportStatus, getGeneralStats } from '../controllers/reportController.js';
import { reportSubmissionLimiter } from '../middleware/rateLimiter.js';
import { sanitizeMiddleware } from '../middleware/sanitize.js';

const router = express.Router();

/**
 * POST /api/reports
 * Submeter um novo relato anônimo
 */
router.post('/', 
  reportSubmissionLimiter, 
  sanitizeMiddleware, 
  submitReport
);

/**
 * GET /api/reports/:accessCode
 * Verificar status de um relato pelo código de acesso
 */
router.get('/:accessCode', checkReportStatus);

/**
 * GET /api/reports/stats/general
 * Obter estatísticas gerais públicas
 */
router.get('/stats/general', getGeneralStats);

export default router;
