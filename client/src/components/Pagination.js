import ReactPaginate from 'react-paginate';
import ChevronLeftIcon from '../assets/icons/ChevronLeftIcon.js';
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.js';

const Previous = () => (
  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
    <ChevronLeftIcon className="h-5 w-5" />
  </button>
);

const Next = () => (
  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
    <ChevronRightIcon className="h-5 w-5" />
  </button>
);

export default function Pagination({ handlePageClick, totalPages }) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
      <ReactPaginate
        breakLabel={
          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
        }
        nextLabel={<Next />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel={<Previous />}
        renderOnZeroPageCount={null}
        containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
      />
    </div>
  );
}

/* 
<section className="bg-slate-100 mx-auto">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </section>

*/

/* <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * 10 - 9}</span> to{' '}
            <span className="font-medium">{page * 10}</span> of{' '}
            <span className="font-medium">{totalMessages}</span> messages
          </p>
        </div>
        <ReactPaginate
          breakLabel={
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
          }
          nextLabel={<Next />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel={<Previous />}
          renderOnZeroPageCount={null}
          containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
        />
      </div> */
