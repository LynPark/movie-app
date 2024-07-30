import React from "react";

const SearchBox = (props) => {
  const handleChange = (e) => {
    props.setSearchValue(e.target.value);
  };

  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.searchValue}
        onChange={handleChange}
        placeholder="Search Movie..."
      />
    </div>
  );
};

export default SearchBox;
