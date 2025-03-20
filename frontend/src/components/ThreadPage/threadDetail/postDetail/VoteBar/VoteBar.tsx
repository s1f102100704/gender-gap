import { useEffect } from "react";
import styles from "./voteBar.module.css";
import usePostVoteCounts from "../../../../../hook/threadDetail/usePostVoteCounts";
import useVoteDisplay from "../../../../../hook/threadDetail/voteBar/useVoteDisplay";
interface VoteProps {
  post_id: string;
}
const VoteBar = ({ post_id }: VoteProps) => {
  const { postVotes, getVotes } = usePostVoteCounts(post_id);
  const {
    addVotes,
    removeVotes,
    setUpvotes,
    setDownvotes,
    goodVotes,
    badVotes,
    upvoteRatio,
    downvoteRatio,
  } = useVoteDisplay({ postVotes, post_id });
  useEffect(() => {
    const fetchVotes = async () => {
      const votes = await getVotes();
      const goodVotes = votes.good;
      const badVotes = votes.bad;

      setUpvotes({ [post_id]: goodVotes });
      setDownvotes({ [post_id]: badVotes });
    };
    fetchVotes();
  }, [getVotes, post_id, setDownvotes, setUpvotes]);
  return (
    <div className={styles.voteContainer}>
      <button
        className={styles.upvoteButton}
        onClick={() => {
          addVotes();
        }}
      >
        +
      </button>
      <div>{goodVotes}</div>
      <div className={styles.voteBarContainer}>
        <div className={styles.voteBar}>
          <div
            className={styles.upvoteBar}
            style={{ width: `${upvoteRatio}%` }}
          ></div>
          <div
            className={styles.downvoteBar}
            style={{ width: `${downvoteRatio}%` }}
          ></div>
        </div>
      </div>
      <div>{badVotes}</div>
      <button
        className={styles.downvoteButton}
        onClick={() => {
          removeVotes();
        }}
      >
        -
      </button>
    </div>
  );
};

export default VoteBar;
