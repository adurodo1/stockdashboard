import { memo, useEffect, useRef, useState } from "react";
import { searchCompany } from "../utilities/alphavantageHelpers";
import styles from "./Searchbox.module.css";
import SearchBoxListItem from "./SearchBoxListItem";

const Searchbox = memo(({ symbolapi, selectCompanySymbol }) => {
  //useState
  //console.log("Searchbox  Rendered");
  const [companyName, setCompanyName] = useState("apple");

  const [listitem, setListitem] = useState([]);
  const [isSearboxEmpty, setIsSearchboxEmpty] = useState();

  const searchResultRef = useRef();

  async function onChangeHandler(e) {
    setListitem(() => []);
    let symbolname = e.target.value;

    setIsSearchboxEmpty(false);
    setCompanyName(() => symbolname);
  }

  function onClickHandler() {
    let srchRef = searchResultRef.current;
    setListitem(() => []);
    if (companyName === "") srchRef.className = styles.searchresult;
    srchRef.className += " " + styles.visible;
  }

  async function updateCompanyname(companyName) {
    if (companyName === "") {
      setIsSearchboxEmpty(true);
      return;
    }
    let result = await searchCompany(companyName);
    result.bestMatches.map((element) => {
      setListitem((prev) => [
        ...prev,
        { symbol: element["1. symbol"], name: element["2. name"] },
      ]);
    });
  }

  useEffect(() => {
    updateCompanyname(companyName);
  }, [companyName]);
  return (
    <div className={styles.search} onFocus={(e) => onClickHandler(e)}>
      <input
        type="text"
        placeholder={companyName}
        onChange={(e) => onChangeHandler(e)}
      ></input>
      <div className={styles.searchresult} ref={searchResultRef}>
        {listitem.length !== 0 ? (
          <SearchBoxListItem
            listitem={listitem}
            ref={searchResultRef}
            symbolapi={symbolapi}
            selectCompanySymbol={selectCompanySymbol}
          />
        ) : isSearboxEmpty ? (
          ""
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
});
export default Searchbox;
