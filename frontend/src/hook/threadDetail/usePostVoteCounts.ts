import axios from "axios";
import { useCallback } from "react";

const usePostVoteCounts = (post_id: string) => {
  const postVotes = async (vote_type: 1 | -1) => {
    const votesUrl = `http://localhost:3000/api/v1/posts/${post_id}/votes`;
    try {
      const response = await axios.post(votesUrl, {
        vote: { vote_type: vote_type, post_id: post_id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response:", response);
    } catch (err) {
      console.log(err);
    }
  };

  const getVotes = useCallback(async () => {
    const votesUrl = `http://localhost:3000/api/v1/posts/${post_id}/votes`;
    try {
      const response = await axios.get(votesUrl);
      console.log("response:", response.data.votes);
      return response.data.votes;
    } catch (err) {
      console.log(err);
    }
  }, [post_id]);
  return { postVotes, getVotes };
};

export default usePostVoteCounts;
