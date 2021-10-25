import React from "react";

const Pagination = ({handleMore}) => {

  return (
    <div className="pagination">
      <button className="load-more" onClick={handleMore.bind(null)}>Load More</button>
    </div>
  );
};

export default Pagination;
