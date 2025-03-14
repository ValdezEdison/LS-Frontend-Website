import React from "react";
import styles from "./Sidebar.module.css";
import Map from "./Map";
import Filter from "./Filter";

const Sidebar = ({categories, ratings, handleShowMapPopup, state, setState}) => {



  return (
    <aside className={styles.sidebar}>
      <Map onOpenPopup={handleShowMapPopup} />
      <Filter categories={categories} ratings={ratings} state={state} setState={setState}/>
    </aside>
  );
};

export default Sidebar;
