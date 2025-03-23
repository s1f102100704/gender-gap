import styles from "./pagination.module.css";
import { Page } from "../../types/menu";

const Pagination = ({ totalPages, currentPage, setCurrentPage }: Page) => {
    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.paginationWrapper}>
            <button onClick={handlePrev} className={styles.navButton}>
                &lt;
            </button>

            {getPageNumbers().map((num) => (
                <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`${styles.pageButton} ${currentPage === num ? styles.activePage : ""}`}
                >
                    {num}
                </button>
            ))}

            <button onClick={handleNext} className={styles.navButton}>
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
