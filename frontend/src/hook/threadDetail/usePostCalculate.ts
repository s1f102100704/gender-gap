import { ThreadsPosts } from "../../types/post";

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

    // 性別に応じた文字色を取得（濃さを調整）
    const getTextColor = (post: ThreadsPosts): string => {
        const totalVotes = post.votes.length;

        const matchingVotes = post.votes.filter(
            (vote) => vote.gender === post.gender
        ).length;

        const intensity = totalVotes > 0 ? Math.max(matchingVotes / totalVotes, 0.5) : 0.2;

        const baseColor = post.gender === 1 ? "0, 0, 255" : "255, 0, 0";
        return `rgba(${baseColor}, ${intensity})`;
    };

    return { positiveVotesCount, calculateFontSize, calculateFontWeight, getTextColor };
};