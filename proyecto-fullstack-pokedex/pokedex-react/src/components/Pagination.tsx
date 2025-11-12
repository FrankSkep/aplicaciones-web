interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-4 sm:mt-6 flex-wrap gap-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer text-xs sm:text-sm"
        title="Primera página"
      >
        <span className="text-sm sm:text-lg">≪</span>
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer text-xs sm:text-sm"
      >
        <span className="flex items-center space-x-1">
          <span className="hidden sm:inline">‹</span>
          <span className="hidden sm:inline">Anterior</span>
          <span className="sm:hidden">‹</span>
        </span>
      </button>

      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 3) {
          pageNum = i + 1;
        } else if (currentPage <= 2) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 1) {
          pageNum = totalPages - 2 + i;
        } else {
          pageNum = currentPage - 1 + i;
        }

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer shadow-lg text-xs sm:text-sm ${
              currentPage === pageNum
                ? 'bg-orange-500 text-white'
                : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer text-xs sm:text-sm"
      >
        <span className="flex items-center space-x-1">
          <span className="hidden sm:inline">Siguiente</span>
          <span className="hidden sm:inline">›</span>
          <span className="sm:hidden">›</span>
        </span>
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer text-xs sm:text-sm"
        title="Última página"
      >
        <span className="text-sm sm:text-lg">≫</span>
      </button>
    </div>
  );
}