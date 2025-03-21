import { useEffect, useRef, useState } from "react";
import styles from "./postMenu.module.css";
import ReportModal from "../postMenu/reportModal/ReportModal";
import { useReport } from "../../../../../hook/report/useReport";
import { ReportReasonCode } from "../../../../../constants/reportReasons";
interface Props {
    postId: string;
}

const PostMenu = ({ postId }: Props) => {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { handleReportSubmit } = useReport();

    const handleSubmit = async (reasonCode: ReportReasonCode, comment?: string) => {
        await handleReportSubmit(postId, reasonCode, comment);
        setShowModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.menuButton} onClick={() => setOpen(!open)}>︙</button>
            {open && (
                <div className={styles.dropdown}>
                    <button
                        className={styles.reportButton}
                        onClick={() => setShowModal(true)}
                    >
                        🚨 通報する
                    </button>
                </div>
            )}
            {showModal && (
                <ReportModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default PostMenu;
