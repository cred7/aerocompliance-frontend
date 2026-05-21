export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header */}
      <div className="h-8 bg-gray-300 w-1/4"></div>
      <div className="h-4 bg-gray-200 w-1/3"></div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-24 bg-gray-200"></div>
            <div className="h-4 bg-gray-200"></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="mt-8 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-50 border border-gray-300 p-4 animate-pulse">
      <div className="h-6 bg-gray-300 w-1/3 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 w-full"></div>
        <div className="h-4 bg-gray-200 w-5/6"></div>
        <div className="h-4 bg-gray-200 w-4/6"></div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-300 animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <th key={i} className="py-3 text-left">
              <div className="h-4 bg-gray-300 w-20"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5].map((row) => (
          <tr key={row} className="border-b border-gray-300 animate-pulse">
            {[1, 2, 3, 4, 5].map((col) => (
              <td key={col} className="py-3">
                <div className="h-4 bg-gray-200 w-24"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function SkeletonDetailPage() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-300 w-1/3"></div>
        <div className="h-4 bg-gray-200 w-1/2"></div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 border border-gray-300 p-4">
            <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 w-2/3"></div>
          </div>
        ))}
      </div>

      {/* Section */}
      <div className="bg-gray-50 border border-gray-300 p-6">
        <div className="h-6 bg-gray-300 w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
