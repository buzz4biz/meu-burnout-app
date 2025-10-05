import { getPostgresPool } from '../config/database.js';

/**
 * Obter dados agregados por setor
 */
export async function getDataBySector(req, res, next) {
  try {
    const pool = getPostgresPool();
    
    const result = await pool.query(`
      SELECT 
        sector,
        COUNT(*) as total_reports,
        AVG(work_hours_per_week) as avg_work_hours,
        SUM(CASE WHEN has_overtime THEN 1 ELSE 0 END)::float / COUNT(*) * 100 as overtime_percentage,
        SUM(CASE WHEN has_weekend_work THEN 1 ELSE 0 END)::float / COUNT(*) * 100 as weekend_work_percentage
      FROM aggregated_reports
      GROUP BY sector
      ORDER BY total_reports DESC
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Obter dados agregados por tamanho de empresa
 */
export async function getDataByCompanySize(req, res, next) {
  try {
    const pool = getPostgresPool();
    
    const result = await pool.query(`
      SELECT 
        company_size,
        COUNT(*) as total_reports,
        AVG(work_hours_per_week) as avg_work_hours
      FROM aggregated_reports
      GROUP BY company_size
      ORDER BY 
        CASE company_size
          WHEN '1-50' THEN 1
          WHEN '51-200' THEN 2
          WHEN '201-1000' THEN 3
          WHEN '1000+' THEN 4
        END
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Obter sintomas mais comuns de burnout
 */
export async function getTopSymptoms(req, res, next) {
  try {
    const pool = getPostgresPool();
    
    const result = await pool.query(`
      SELECT 
        symptom,
        COUNT(*) as frequency
      FROM burnout_symptoms
      GROUP BY symptom
      ORDER BY frequency DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Obter timeline de submissões (últimos 30 dias)
 */
export async function getSubmissionTimeline(req, res, next) {
  try {
    const pool = getPostgresPool();
    
    const result = await pool.query(`
      SELECT 
        DATE(submitted_at) as date,
        COUNT(*) as submissions
      FROM aggregated_reports
      WHERE submitted_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(submitted_at)
      ORDER BY date ASC
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Obter dados agregados por empresa (top 20 com mais relatos)
 * Empresas são identificadas apenas por hash
 */
export async function getTopCompanies(req, res, next) {
  try {
    const pool = getPostgresPool();
    
    const result = await pool.query(`
      SELECT 
        company_hash,
        sector,
        COUNT(*) as total_reports,
        AVG(work_hours_per_week) as avg_work_hours
      FROM aggregated_reports
      WHERE company_hash IS NOT NULL
      GROUP BY company_hash, sector
      HAVING COUNT(*) >= 5
      ORDER BY total_reports DESC
      LIMIT 20
    `);

    res.json({
      success: true,
      data: result.rows,
      note: 'Empresas são identificadas por hash para preservar anonimato até massa crítica'
    });

  } catch (error) {
    next(error);
  }
}
