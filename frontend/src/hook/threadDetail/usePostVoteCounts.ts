import axios from 'axios'

const usePostVoteCounts = () => {
    const postVotes= (vote_type:1|2, post_id:string) =>{
      const votesUrl = `http://localhost:3000/api/v1/posts/${post_id}/votes`
      try{
        const response = axios.post(votesUrl,{vote:{vote_type:vote_type,post_id:post_id}})
        console.log("response:",response)
      }catch(err){
        console.log(err)
      }
     
      
    }
  return {postVotes}
}

export default usePostVoteCounts
