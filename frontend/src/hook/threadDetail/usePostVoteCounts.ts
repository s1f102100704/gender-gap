import axios from "axios";
import { useCallback } from "react";
import { useGenderLogin } from "../gender/useGenderLogin";

const usePostVoteCounts = (post_id: string) => {
  const { getValidGender } = useGenderLogin();
  const postVotes = async (vote_type: 1 | -1) => {
    const votesUrl = `http://localhost:3000/api/v1/posts/${post_id}/votes`;
    try {
      const res = await axios.post(votesUrl, {
        vote: { vote_type: vote_type, post_id: post_id, gender: getValidGender() },
      });
      console.log("susi", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVotes = useCallback(async () => {
    const votesStatusUrl = `http://localhost:3000/api/v1/posts/${post_id}/votes_status`;
    try {
      const response = await axios.get(votesStatusUrl);
      return response.data.votes;
    } catch (err) {
      console.log(err);
    }
  }, [post_id]);
  return { postVotes, getVotes };
};

export default usePostVoteCounts;
