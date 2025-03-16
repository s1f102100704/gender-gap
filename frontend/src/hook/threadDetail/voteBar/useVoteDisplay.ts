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
  const goodVotes = upvotes[post_id];
  const badVotes = downvotes[post_id];
  const totalVotes = goodVotes + badVotes;
  const upvoteRatio = totalVotes > 0 ? (goodVotes / totalVotes) * 100 : 50;
  const downvoteRatio = totalVotes > 0 ? (badVotes / totalVotes) * 100 : 50;
  const addVotes = () => {
    postVotes(1);
    if (clickedGoodVotes) {
      setUpvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) - 1,
      }));

      setClickedGoodVotes(false);
      return;
    }

    if (clickedBadVotes) {
      setDownvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) - 1,
      }));

      setUpvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) + 1,
      }));

      setClickedBadVotes(false);
      setClickedGoodVotes(true);
    } else {
      setUpvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) + 1,
      }));

      setClickedGoodVotes(true);
    }
  };
  const removeVotes = () => {
    postVotes(-1);
    if (clickedBadVotes) {
      setDownvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) - 1,
      }));

      setClickedBadVotes(false);
      return;
    }
    if (clickedGoodVotes) {
      setUpvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) - 1,
      }));

      setDownvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) + 1,
      }));

      setClickedGoodVotes(false);
      setClickedBadVotes(true);
    } else {
      setDownvotes((prev) => ({
        ...prev,
        [post_id]: (prev[post_id] || 0) + 1,
      }));

      setClickedBadVotes(true);
    }
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
