import { forwardRef } from "react";
import styles from "./Searchbox.module.css";
const SearchBoxListItem = forwardRef(
  ({ listitem, symbolapi, selectCompanySymbol }, ref) => {
    return (
      <ul data-testid="searchlistitems">
        {listitem.map((e, key) => (
          <li
            onClick={(e) => selectCompanySymbol(e, ref, styles)}
            key={key}
            title={e.symbol}
          >
            <span className={styles.symbol} title={e.symbol}>
              {" "}
              {e.symbol}{" "}
            </span>{" "}
            <span className={styles.companyname} title={e.symbol}>
              {e.name}
            </span>
          </li>
        ))}
      </ul>
    );
  }
);

export default SearchBoxListItem;
