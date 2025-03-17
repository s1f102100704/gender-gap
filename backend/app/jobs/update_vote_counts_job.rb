class UpdateVoteCountsJob < ApplicationJob
  queue_as :default

  def perform
    Post.find_each do |post|
      upvotes = post.votes.where(vote_type: 1).count
      downvotes = post.votes.where(vote_type: -1).count
      post.votes_status.update(upvotes_count: upvotes, downvotes_count: downvotes)
    end
  end
end