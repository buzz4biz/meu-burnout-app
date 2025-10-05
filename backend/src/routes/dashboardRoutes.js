import express from 'express';
import {
  getDataBySector,
  getDataByCompanySize,
  getTopSymptoms,
  getSubmissionTimeline,
  getTopCompanies
} from '../controllers/dashboardController.js';
import { dashboardLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Aplicar rate limiter a todas as rotas do dashboard
router.use(dashboardLimiter);

/**
 * GET /api/dashboard/by-sector
 * Dados agregados por setor
 */
router.get('/by-sector', getDataBySector);

/**
 * GET /api/dashboard/by-company-size
 * Dados agregados por tamanho de empresa
 */
router.get('/by-company-size', getDataByCompanySize);

/**
 * GET /api/dashboard/top-symptoms
 * Sintomas mais comuns de burnout
 */
router.get('/top-symptoms', getTopSymptoms);

/**
 * GET /api/dashboard/timeline
 * Timeline de submissões (últimos 30 dias)
 */
router.get('/timeline', getSubmissionTimeline);

/**
 * GET /api/dashboard/top-companies
 * Top 20 empresas com mais relatos (identificadas por hash)
 */
router.get('/top-companies', getTopCompanies);

export default router;
