export default function Pagination({
  currentPage,
  totalPages,
  loading,
  onPreviousPage,
  onNextPage,
  onPageClick,
}) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={onPreviousPage}
          disabled={currentPage === 1 || loading}
        >
          ← Anterior
        </button>

        <div className="page-numbers">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`page-number ${page === currentPage ? 'active' : ''}`}
              onClick={() => onPageClick(page)}
              disabled={loading}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn"
          onClick={onNextPage}
          disabled={currentPage === totalPages || loading}
        >
          Siguiente →
        </button>
      </div>

      <div className="page-info">
        Página {currentPage} de {totalPages}
      </div>
    </>
  )
}
