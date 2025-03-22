import axios from "axios";
import { REPORT_REASON_OPTIONS, ReportReasonCode } from "../../constants/reportReasons";
import { POSTS_REPORT_API_URL, REPORT_CONTENTS_API_URL } from "../../config";
import { Report } from "../../types/report";
import { useState } from "react";

export const useReport = () => {
    const [reports, setReports] = useState<Report[]>([]);

    // ✅ 通報送信
    const handleReportSubmit = async (postId: string, reasonCode: ReportReasonCode, comment?: string) => {
        await axios.post(POSTS_REPORT_API_URL, {
            report: {
                post_id: postId,
                reason_code: reasonCode,
                comment: comment || null,
            }
        });

        alert(`通報しました（理由: ${REPORT_REASON_OPTIONS[reasonCode]}${comment ? ` / 詳細: ${comment}` : ""}）`);
    };

    // ✅ 通報一覧取得
    const fetchReports = async (postId: string) => {
        const res = await axios.get(`${REPORT_CONTENTS_API_URL}/${postId}`);
        setReports(res.data.data || []);
    };

    return {
        handleReportSubmit,
        fetchReports,
        reports,
    };
};