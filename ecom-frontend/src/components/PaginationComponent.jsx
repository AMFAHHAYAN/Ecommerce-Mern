import React from 'react';

const PaginationComponent = ({ currentPage, totalPage, handleChangePage }) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPage <= 5) {
      // Show all pages if total pages are less than or equal to 5
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, and some intermediate pages
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPage - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPage ) pages.push('...');
      pages.push(totalPage);
    }
    return pages;
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="product__pagination">
          {generatePageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={index}>...</span>
            ) : (
              <a
                key={page}
                href="#"
                className={page === currentPage ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangePage(page);
                }}
              >
                {page}
              </a>
            )
          )}
          {/* Add the "Next >" link */}
          {currentPage < totalPage && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChangePage(currentPage + 1);
              }}
            >
              Next &gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
