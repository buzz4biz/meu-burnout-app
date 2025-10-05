import { getMongoDb } from '../config/database.js';
import { z } from 'zod';

// Validation schema
export const reportSchema = z.object({
  // Dados estruturados
  sector: z.string().min(1, 'Setor é obrigatório'),
  companySize: z.enum(['1-50', '51-200', '201-1000', '1000+']),
  position: z.string().min(1, 'Cargo é obrigatório'),
  workHoursPerWeek: z.number().min(1).max(168),
  hasOvertime: z.boolean(),
  hasWeekendWork: z.boolean(),
  burnoutSymptoms: z.array(z.string()).min(1, 'Selecione pelo menos um sintoma'),
  
  // Dados opcionais
  companyName: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  
  // Relato livre (será sanitizado)
  freeText: z.string().max(5000, 'Relato muito longo (máximo 5000 caracteres)').optional(),
  
  // Metadados (gerados pelo sistema)
  submittedAt: z.date().default(() => new Date()),
  accessCode: z.string(),
  companyHash: z.string().optional(),
});

export class ReportModel {
  constructor() {
    this.collectionName = 'reports';
  }

  async getCollection() {
    const db = getMongoDb();
    return db.collection(this.collectionName);
  }

  async create(reportData) {
    try {
      const collection = await this.getCollection();
      const result = await collection.insertOne({
        ...reportData,
        submittedAt: new Date(),
        _version: 1
      });

      return {
        success: true,
        id: result.insertedId,
        accessCode: reportData.accessCode
      };
    } catch (error) {
      console.error('Error creating report:', error);
      throw new Error('Failed to save report');
    }
  }

  async findByAccessCode(accessCode) {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({ accessCode });
    } catch (error) {
      console.error('Error finding report:', error);
      return null;
    }
  }

  async count(filter = {}) {
    try {
      const collection = await this.getCollection();
      return await collection.countDocuments(filter);
    } catch (error) {
      console.error('Error counting reports:', error);
      return 0;
    }
  }

  // Método para agregação (usado pelo script de agregação)
  async aggregate(pipeline) {
    try {
      const collection = await this.getCollection();
      return await collection.aggregate(pipeline).toArray();
    } catch (error) {
      console.error('Error aggregating reports:', error);
      throw error;
    }
  }
}

export default new ReportModel();
