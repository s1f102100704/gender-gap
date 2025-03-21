import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Report } from "../../../../../types/report";
import styles from "./reportedPostDetail.module.css";
import { REPORT_CONTENTS_API_URL } from "../../../../../config";

const ReportedPostDetail = () => {
    const { postId } = useParams();
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${REPORT_CONTENTS_API_URL}/${postId}`);
                setReports(res.data.data);
            } catch (e) {
                console.error("通報内容の取得に失敗", e);
            }
        };
        fetch();
    }, [postId]);

    return (
        <div className={styles.threadContainer}>
            <h2 className={styles.title}>通報詳細</h2>
            <div className={styles.threadHeader}>
                <span className={styles.threadTitleMeta}>理由</span>
                <span className={styles.threadTitleContent}>通報内容</span>
                <span className={styles.threadTitleDate}>通報日時</span>
            </div>

            {reports.map((report, i) => (
                <div key={i} className={styles.threadRow}>
                    <span className={styles.threadMeta}>{report.reason_code}</span>
                    <span className={styles.threadContent}>
                        {report.comment || "（コメントなし）"}
                    </span>
                    <span className={styles.threadDate}>
                        {new Date(report.created_at).toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ReportedPostDetail;
