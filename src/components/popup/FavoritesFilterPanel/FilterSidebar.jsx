import React from "react";
import styles from "./FilterSidebar.module.css";
import { Search, SearchBlack } from "../../common/Images";

function FilterSidebar({ onClose }) {
  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Filtros favoritos</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <i className={styles.popupcloseIcon} />
          </button>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.title}>Destino</h3>
          <div className={styles.searchInput}>
            {/* <i className={styles.searchIcon} /> */}
            <img src={SearchBlack}/>
            <input type="text" placeholder="Busca tu destino" />
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.title}>Tipo</h3>
          <div className={styles.radioGroup}>
          <div className={styles.typesRadiowrapper}>
              <label class="radioContainer">
                <input type="radio" id="type" name="type" value="Lugares" />
                <span class="checkmark"></span>
              </label>
              <span>Eventos</span>
            </div>
            <div className={styles.typesRadiowrapper}>
              <label class="radioContainer">
                <input type="radio" id="type" name="type" value="Lugares" />
                <span class="checkmark"></span>
              </label>
              <span>Lugares</span>
            </div>
            <div className={styles.typesRadiowrapper}>
              <label class="radioContainer">
                <input type="radio" id="type" name="type" value="Lugares" />
                <span class="checkmark"></span>
              </label>
              <span>Todo</span>
            </div>
            {/* <label className={styles.radioLabel}>
              <input type="radio" name="type" /> */}
              
            {/* </label> */}
            {/* <label className={styles.radioLabel}>
              <input type="radio" name="type" />
              <span>Todo</span>
            </label> */}
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.title}>Búsqueda</h3>
           <div className={styles.dropdown}>
            <div className={styles.filterBlock}>
              <div className={styles.filterHeader}>
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>
                    Selecciona una búsqueda
                  </div>
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                  className={styles.dropdownIcon}
                  alt="Toggle Dropdown"
                />
              </div>
            </div>

           
              {/* <div className={styles.filterContent}>
                    <ul className={styles.filterChecklist}>
                        <li>
                          test11
                        </li>
                    </ul> 
              </div> */}
            
          </div>
        </div>
        <div className={styles.filterSection}>
          <h3 className={styles.title}>Subcategoría</h3>
           <div className={`${styles.dropdown} ${styles.disabled}`}>
            <div className={styles.filterBlock}>
              <div className={`${styles.filterHeader} ${ styles.open}`}>
                <div className={styles.filterHeaderContent}>
                  <div className={styles.filterTitle}>
                  Selecciona una categoría
                  </div>
                </div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/3a5ff2c7562e4764a5a85cb40d9ea963/b177707cf3dcb933dc1e6538151f45728e247ea5114b8d8a465e0c87724ee044?apiKey=3a5ff2c7562e4764a5a85cb40d9ea963&"
                  className={styles.dropdownIcon}
                  alt="Toggle Dropdown"
                />
              </div>
            </div>
            <div className={styles.filterContent}>                    
              <ul className={styles.filterChecklist}>
                  <li>test11</li>
                  <li>test21</li>
                  <li>test11</li>
                  <li>test21</li>
              </ul> 
            </div>
            
          </div>
        </div>
        <div className={styles.applyButtonWrapper}>
          <button className={styles.applyButton}>Aplicar</button>
        </div>
        
      </div>
    </div>
  );
}

export default FilterSidebar;
