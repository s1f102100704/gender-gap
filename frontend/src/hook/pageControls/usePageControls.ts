// usePageControls.ts
import { useState, useEffect } from "react";

export const usePageControls = <T>(items: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // ページを初期化したいタイミングで使えるように
  const resetPage = () => setCurrentPage(1);

  // ページ番号をボタン用に配列で返す
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
    pageNumbers,
    resetPage,
  };
};
