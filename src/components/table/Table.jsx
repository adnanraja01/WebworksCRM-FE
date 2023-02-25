import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

import styles from "./Table.module.scss";
import pgStyle from "../../UI/PaginationStyle/PaginationStyle.module.scss";

import { FilterDropdown } from "../../UI/FilterDropdown/FilterDropdown";
import { Button } from "../../UI/Button/Button";
import { DateFilter } from "../../UI/DateFilter/DateFilter";

export const Table = ({
  cols = null,
  data = null,
  className,
  header = true,
  heading = "Table",
  headerImg,
  pageCount,
  handlePageChange,
  Pagination = true,
  error,
  isFilter = false,
  isDateFilter = false,
  dropdownFiltertitle,
  dateFilterTitle,
  filterOptions,
  FilterclassName,
  defaultValue,
  handleFilter,
  handleDate,
  clearDate,
  clearFilter,
  selectValue,
}) => {
  return (
    <div>
      <div className={`${styles.table_container} ${className}`}>
        {header && (
          <div className={`${styles.table_heading} `}>
            <div className={"flex items-center gap-3"}>
              <img src={headerImg} alt="header" />
              <h1>{heading}</h1>
            </div>
            {isFilter && (
              <div className={styles.table_filter}>
                <FilterDropdown
                  dropdownFiltertitle={dropdownFiltertitle}
                  filterOptions={filterOptions}
                  defaultValue={defaultValue}
                  className={FilterclassName}
                  handleFilter={handleFilter}
                  selectValue={selectValue}
                />
                <Button
                  className={styles.table_filter_btn}
                  onClick={clearFilter}
                >
                  Reset
                </Button>
              </div>
            )}
            {isDateFilter && (
              <div className={styles.table_filter}>
                <DateFilter
                  dateFilterTitle={dateFilterTitle}
                  handleDate={handleDate}
                />
                <Button className={styles.table_filter_btn} onClick={clearDate}>
                  Reset
                </Button>
              </div>
            )}
          </div>
        )}
        <table>
          <thead className={styles.table_head}>
            <tr>
              {cols &&
                cols.map((headerItem, index) => (
                  <th key={index}>{headerItem.title}</th>
                ))}
            </tr>
          </thead>
          <tbody className={`${styles.table_body}`}>
            {data &&
              data?.map((item, index) => (
                <tr key={index}>
                  {cols.map((col, key) => (
                    <td key={key}>{col.render(item)}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {error && <p className={styles.table_error}>{error}</p>}
      </div>
      {Pagination && (
        <ReactPaginate
          previousLabel={" < "}
          nextLabel={" > "}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={null}
          onPageChange={handlePageChange}
          containerClassName={pgStyle.pagination_container}
          pageClassName={pgStyle.pagination_page}
          pageLinkClassName={pgStyle.pagination_page_link}
          previousClassName={pgStyle.pagination_page}
          previousLinkClassName={pgStyle.pagination_page_link}
          nextClassName={pgStyle.pagination_page}
          nextLinkClassName={pgStyle.pagination_page_link}
          breakClassName={pgStyle.pagination_break}
          breakLinkClassName={pgStyle.pagination_break_link}
          activeClassName={pgStyle.pagination_active}
        />
      )}
    </div>
  );
};
Table.propTypes = {
  cols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
