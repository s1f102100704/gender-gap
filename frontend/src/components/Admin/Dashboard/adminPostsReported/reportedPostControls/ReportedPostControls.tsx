import { FC } from "react";
import styles from "./reportedPostControls.module.css";
import { SearchKey } from "../../../../../types/post";


const ReportedPostControls: FC<SearchKey> = ({ searchText, setSearchText, sortKey, setSortKey }) => {
  return (
    <div className={styles.controlPanel}>
      <input
        type="text"
        placeholder="投稿内容で検索"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={styles.searchInput}
      />

      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className={styles.sortSelect}
      >
        <option value="">並び替え</option>
        <option value="reports">通報数（多い順）</option>
        <option value="date">作成日（新しい順）</option>
      </select>
    </div>
  );
};

export default ReportedPostControls;