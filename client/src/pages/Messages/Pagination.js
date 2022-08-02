import ReactPaginate from 'react-paginate';
import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.js';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.js';

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
    <div className="px-4 py-4 sm:px-6 lg:px-8 mt-12 mx-auto max-w-7xl flex items-center justify-center absolute left-0 right-0 bottom-0">
      <ReactPaginate
        breakLabel={
          <span className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
        }
        nextLabel={<Next />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel={<Previous />}
        renderOnZeroPageCount={null}
        containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
        // pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
        pageLinkClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-3 sm:px-4 py-2 border text-sm font-medium"
        activeLinkClassName="z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
      />
    </div>
  );
}
