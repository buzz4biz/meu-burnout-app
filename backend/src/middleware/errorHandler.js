/**
 * Middleware global de tratamento de erros
 */
export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Erro de validação do Zod
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Erro de CORS
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'Acesso negado por CORS'
    });
  }

  // Erro de conexão com banco de dados
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(503).json({
      error: 'Erro no banco de dados. Tente novamente mais tarde.'
    });
  }

  // Erro genérico
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Erro interno do servidor' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
