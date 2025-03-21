export const REPORT_REASON_OPTIONS = {
    SPAM: "スパム・宣伝目的",
    ABUSE: "暴言や差別的な表現",
    MISINFORMATION: "誤情報・虚偽の内容",
    INAPPROPRIATE: "不適切な内容",
    OTHER: "その他"
} as const;

export type ReportReasonCode = keyof typeof REPORT_REASON_OPTIONS;