import ReactPaginate from 'react-paginate';

function Pagination({ activePage, pageCount, setActivePage }) {
  return (
    <ReactPaginate
      initialPage={activePage}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={5}
      pageCount={pageCount}
      disableInitialCallback
      className="react-paginate"
      onPageChange={({ selected }) => setActivePage(selected)}
    />
  );
}

export default Pagination;
