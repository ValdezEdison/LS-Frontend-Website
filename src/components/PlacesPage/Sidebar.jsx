import React from "react";
import styles from "./Sidebar.module.css";
import Map from "./Map";
import Filter from "./Filter";
import SidebarSkeleton from "../skeleton/PlacesPage/SidebarSkeleton";

const Sidebar = ({categories, ratings, handleShowMapPopup, state, setState, filterLoading}) => {



  return (
    <aside className={styles.sidebar}>
      <Map onOpenPopup={handleShowMapPopup} />
      {filterLoading ? <SidebarSkeleton /> :
        <Filter categories={categories} ratings={ratings} state={state} setState={setState}/>
      }
    </aside>
  );
};

export default Sidebar;
