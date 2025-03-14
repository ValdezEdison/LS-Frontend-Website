import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "../../common/SearchInput.module.css";

const SearchInputSkeleton = () => {
  return (
    <div className={styles.searchBar}>
      <Skeleton height={40} width={300} />
   </div>
  );
};

export default SearchInputSkeleton;