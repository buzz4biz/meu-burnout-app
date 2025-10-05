'use client'

interface BarChartProps {
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  title: string
  valueLabel?: string
  height?: number
}

export default function BarChart({ 
  data, 
  title, 
  valueLabel = 'Valor',
  height = 300 
}: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 text-center py-8">Sem dados disponíveis</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const getBarHeight = (value: number) => {
    return (value / maxValue) * 100
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{
                  width: `${getBarHeight(item.value)}%`,
                  backgroundColor: item.color || '#dc2626',
                  minWidth: item.value > 0 ? '20px' : '0'
                }}
              >
                {item.value > 0 && (
                  <span className="text-xs text-white font-bold">
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
