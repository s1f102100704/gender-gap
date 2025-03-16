import  { useState } from 'react'
import styles from "./voteBar.module.css"
import usePostVoteCounts from '../../../../../hook/threadDetail/usePostVoteCounts';
interface VoteProps {
    initialUpvotes: number;
    initialDownvotes: number;
    post_id:string;
  }
const VoteBar = ({ initialUpvotes, initialDownvotes,post_id }: VoteProps) => {
    const {postVotes} = usePostVoteCounts();
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const totalVotes = upvotes + downvotes;
    const upvoteRatio = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 50;
    const downvoteRatio = totalVotes > 0 ? (downvotes / totalVotes) * 100 : 50;

    return (
      <div className={styles.voteContainer}>
        <button className={styles.upvoteButton} onClick={() => postVotes(1,post_id)}>
          +
        </button>
        <div className={styles.voteBarContainer}>
          <div className={styles.voteBar}>
            <div className={styles.upvoteBar} style={{ width: `${upvoteRatio}%` }}></div>
            <div className={styles.downvoteBar} style={{ width: `${downvoteRatio}%` }}></div>
          </div>
        </div>
        <button className={styles.downvoteButton} onClick={() => postVotes(2,post_id)}>
          -
        </button>
      </div>
    );
}

export default VoteBar
