export const usePostCalculate = () => {
    const positiveVotesCount = (post: { votes: { vote_type: number }[] }): number => {
        return post.votes.filter(vote => vote.vote_type === 1).length;
    };

    const calculateFontSize = (votesCount: number): string => {
        const baseSize = 15; // 最小フォントサイズ
        const maxSize = 32; // 最大フォントサイズ
        const scale = Math.min(votesCount / 30, 1); // 30 いいねで最大値に達するスケール
        return `${baseSize + (maxSize - baseSize) * scale}px`;
    };

    const calculateFontWeight = (votesCount: number): number => {
        const baseWeight = 400; // 最小フォントの太さ
        const maxWeight = 900; // 最大フォントの太さ
        const scale = Math.min(votesCount / 24, 1); // 24 いいねで最大値に達するスケール
        return baseWeight + (maxWeight - baseWeight) * scale;
    };

    return { positiveVotesCount, calculateFontSize, calculateFontWeight };
};