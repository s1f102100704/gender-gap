import axios from "axios";
import { REPORT_REASON_OPTIONS, ReportReasonCode } from "../../constants/reportReasons";
import { POSTS_REPORT_API_URL } from "../../config";

export const useReport = () => {
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

    return { handleReportSubmit };
};