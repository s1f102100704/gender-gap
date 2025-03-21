import { ReportReasonCode } from "../constants/reportReasons";

export interface Props {
    onClose: () => void;
    onSubmit: (reasonCode: ReportReasonCode, comment?: string) => void;
}