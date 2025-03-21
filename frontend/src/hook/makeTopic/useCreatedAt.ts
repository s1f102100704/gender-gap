const useCreatedAt = () => {
  const sinceDate = (createdAt: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);

    if (diffSeconds < 5) return "たった今";
    if (diffSeconds < 60) return `${diffSeconds}秒前`;

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}分前`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}時間前`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}日前`;
  };
  return { sinceDate };
};

export default useCreatedAt;
