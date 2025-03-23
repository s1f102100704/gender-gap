import { ReportReasonCode } from "../constants/reportReasons";

export interface Props {
    onClose: () => void;
    onSubmit: (reasonCode: ReportReasonCode, comment?: string) => void;
}

export type Page = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
};