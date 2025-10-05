import ReportModel, { reportSchema } from '../models/report.js';
import { createHash, generateAccessCode } from '../utils/hash.js';
import { sanitizeText, detectRemainingPII } from '../middleware/sanitize.js';

/**
 * Submeter um novo relato anônimo
 */
export async function submitReport(req, res, next) {
  try {
    // Validar dados com Zod
    const validatedData = reportSchema.parse({
      ...req.body,
      accessCode: generateAccessCode(), // Gerar código único
      submittedAt: new Date()
    });

    // Sanitizar texto livre
    if (validatedData.freeText) {
      validatedData.freeText = sanitizeText(validatedData.freeText);
      
      // Verificar se ainda há PII
      if (detectRemainingPII(validatedData.freeText)) {
        return res.status(400).json({
          error: 'O relato contém informações pessoais que não puderam ser removidas automaticamente. Por favor, revise e remova manualmente dados como nomes, documentos ou endereços.'
        });
      }
    }

    // Criar hash da empresa (se fornecida)
    if (validatedData.companyName) {
      validatedData.companyHash = createHash(validatedData.companyName);
      // Remover o nome original (não armazenar em texto claro)
      delete validatedData.companyName;
    }

    // Salvar no banco de dados
    const result = await ReportModel.create(validatedData);

    // Retornar apenas o código de acesso
    res.status(201).json({
      success: true,
      message: 'Relato enviado com sucesso!',
      accessCode: result.accessCode,
      instructions: 'Guarde este código em local seguro. Você poderá usá-lo para verificar se seu relato foi incluído nas estatísticas públicas.'
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Verificar status de um relato pelo código de acesso
 */
export async function checkReportStatus(req, res, next) {
  try {
    const { accessCode } = req.params;

    if (!accessCode) {
      return res.status(400).json({
        error: 'Código de acesso não fornecido'
      });
    }

    const report = await ReportModel.findByAccessCode(accessCode);

    if (!report) {
      return res.status(404).json({
        error: 'Relato não encontrado. Verifique se o código está correto.'
      });
    }

    // Retornar apenas informações não sensíveis
    res.json({
      success: true,
      report: {
        submittedAt: report.submittedAt,
        sector: report.sector,
        status: 'processado',
        message: 'Seu relato foi recebido e está incluído nas estatísticas públicas. Obrigado por contribuir para a transparência!'
      }
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Obter estatísticas gerais (público)
 */
export async function getGeneralStats(req, res, next) {
  try {
    const totalReports = await ReportModel.count();

    res.json({
      success: true,
      stats: {
        totalReports,
        lastUpdated: new Date().toISOString()
      }
    });

  } catch (error) {
    next(error);
  }
}
