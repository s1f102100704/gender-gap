import axios from 'axios'
import { VOTES_API_URL } from '../../config'
import { useState } from 'react'

const usePostVoteCounts = () => {
    const postVotes= (votes_type:1|2) =>{
        const response = axios.post(VOTES_API_URL,votes_type)
    }
  return {postVotes}
}

export default usePostVoteCounts
