import { useEffect, useRef, useState } from "react";
import styles from "./postMenu.module.css";
import ReportModal from "../postMenu/reportModal/ReportModal";
import { useReport } from "../../../../../hook/report/useReport";
import { ReportReasonCode } from "../../../../../constants/reportReasons";
import { Link } from "react-router-dom";
import { ThreadsPosts } from "../../../../../types/post";
import { Thread } from "../../../../../types/thread";
interface Props {
  post: ThreadsPosts;
  index: number;
  thread: Thread;
}

const PostMenu = ({ post, index, thread }: Props) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { handleReportSubmit } = useReport();

  const handleSubmit = async (
    reasonCode: ReportReasonCode,
    comment?: string
  ) => {
    await handleReportSubmit(post.id, reasonCode, comment);
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
      <button className={styles.menuButton} onClick={() => setOpen(!open)}>
        ︙
      </button>
      {open && (
        <div className={styles.dropdown}>
          <Link
            key={post.id}
            to={`/post/reply/${post.id}`}
            state={{ post, index, thread }}
          >
            <button className={styles.replyButton}>↩️返信する</button>
          </Link>
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
