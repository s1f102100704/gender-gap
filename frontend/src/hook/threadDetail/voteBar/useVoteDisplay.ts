import { useState } from "react";

interface Props {
  postVotes: (voteType: 1 | -1) => Promise<void>;
  post_id: string;
}
const useVoteDisplay = (props: Props) => {
  const [clickedGoodVotes, setClickedGoodVotes] = useState(false);
  const [clickedBadVotes, setClickedBadVotes] = useState(false);
  const [upvotes, setUpvotes] = useState<{ [key: string]: number }>({});
  const [downvotes, setDownvotes] = useState<{ [key: string]: number }>({});

  const { postVotes, post_id } = props;
  const goodVotes = upvotes[post_id] || 0;
  const badVotes = downvotes[post_id] || 0;
  const totalVotes = goodVotes + badVotes;
  const upvoteRatio = totalVotes > 0 ? (goodVotes / totalVotes) * 100 : 50;
  const downvoteRatio = totalVotes > 0 ? (badVotes / totalVotes) * 100 : 50;

  const updateLocalVotes = (voteType: 1 | -1) => {
    const isUpvote = voteType === 1;
    const isDownvote = voteType === -1;

    // すでに押されていた場合 → 取り消し
    if (isUpvote && clickedGoodVotes) {
      setUpvotes((prev) => ({ ...prev, [post_id]: prev[post_id] - 1 }));
      setClickedGoodVotes(false);
      return;
    }
    if (isDownvote && clickedBadVotes) {
      setDownvotes((prev) => ({ ...prev, [post_id]: prev[post_id] - 1 }));
      setClickedBadVotes(false);
      return;
    }

    // 反対側の投票が押されていた場合 → 取り消し
    if (isUpvote && clickedBadVotes) {
      setDownvotes((prev) => ({ ...prev, [post_id]: prev[post_id] - 1 }));
    }
    if (isDownvote && clickedGoodVotes) {
      setUpvotes((prev) => ({ ...prev, [post_id]: prev[post_id] - 1 }));
    }

    // 新しく投票を追加
    if (isUpvote) {
      setUpvotes((prev) => ({ ...prev, [post_id]: (prev[post_id] || 0) + 1 }));
      setClickedGoodVotes(true);
      setClickedBadVotes(false);
    } else {
      setDownvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) + 1,
      }));
      setClickedGoodVotes(false);
      setClickedBadVotes(true);
    }
  };

  const toggleVote = async (voteType: 1 | -1) => {
    await postVotes(voteType);
    updateLocalVotes(voteType);
  };

  const addVotes = async () => {
    toggleVote(1);
  };

  const removeVotes = async () => {
    toggleVote(-1);
  };

  return {
    addVotes,
    removeVotes,
    setUpvotes,
    setDownvotes,
    goodVotes,
    badVotes,
    upvoteRatio,
    downvoteRatio,
  };
};

export default useVoteDisplay;
