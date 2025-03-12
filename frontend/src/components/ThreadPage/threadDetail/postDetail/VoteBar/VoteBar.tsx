import  { useState } from 'react'
import styles from "./voteBar.module.css"
interface VoteProps {
    initialUpvotes: number;
    initialDownvotes: number;
  }
const VoteBar = ({ initialUpvotes, initialDownvotes }: VoteProps) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const totalVotes = upvotes + downvotes;
    const upvoteRatio = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 50;
    const downvoteRatio = totalVotes > 0 ? (downvotes / totalVotes) * 100 : 50;
    console.log(upvoteRatio)
    return (
      <div className={styles.voteContainer}>
        <button className={styles.upvoteButton} onClick={() => setUpvotes(upvotes + 1)}>
          +
        </button>
        <div className={styles.voteBarContainer}>
          <div className={styles.voteBar}>
            <div className={styles.upvoteBar} style={{ width: `${upvoteRatio}%` }}></div>
            <div className={styles.downvoteBar} style={{ width: `${downvoteRatio}%` }}></div>
          </div>
        </div>
        <button className={styles.downvoteButton} onClick={() => setDownvotes(downvotes + 1)}>
          -
        </button>
      </div>
    );
}

export default VoteBar
