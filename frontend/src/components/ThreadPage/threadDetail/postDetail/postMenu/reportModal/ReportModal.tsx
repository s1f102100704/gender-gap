import { useState } from "react";
import styles from "./reportModal.module.css";
import { REPORT_REASON_OPTIONS, ReportReasonCode } from "../../../../../../constants/reportReasons";
import { Props } from "../../../../../../types/menu";


const ReportModal = ({ onClose, onSubmit }: Props) => {
    const [selectedReason, setSelectedReason] = useState<ReportReasonCode | "">("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedReason) {
            alert("通報理由を選択してください");
            return;
        }
        if (selectedReason === "OTHER" && !comment.trim()) {
            alert("詳細を入力してください");
            return;
        }
        if (comment.length > 200) {
            alert("コメントは200文字以内で入力してください");
            return;
        }
        onSubmit(selectedReason, comment.trim() || undefined);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>この投稿を通報する</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.radioGroup}>
                        {Object.entries(REPORT_REASON_OPTIONS).map(([code, label]) => (
                            <label key={code} className={styles.radioWrapper}>
                                <input
                                    type="radio"
                                    name="reason"
                                    value={code}
                                    checked={selectedReason === code}
                                    onChange={() => setSelectedReason(code as ReportReasonCode)}
                                    className={styles.radioInput}
                                />
                                <span className={styles.customRadio} />
                                <span className={styles.radioLabel}>{label}</span>
                            </label>
                        ))}
                    </div>

                    <textarea
                        className={styles.commentInput}
                        placeholder={
                            selectedReason === "OTHER"
                                ? "詳細を入力（200文字以内）*必須"
                                : "詳細を入力（200文字以内）"
                        }
                        maxLength={200}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <div className={styles.actions}>
                        <button type="submit">通報する</button>
                        <button type="button" onClick={onClose}>キャンセル</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;