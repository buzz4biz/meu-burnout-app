interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start">
        <span className="text-2xl mr-3">⚠️</span>
        <div className="flex-1">
          <h3 className="text-red-800 font-bold mb-2">Erro</h3>
          <p className="text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
