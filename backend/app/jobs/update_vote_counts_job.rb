class UpdateVoteCountsJob < ApplicationJob
  include Sidekiq::Worker

  def perform
    Post.find_each do |post|
      upvotes = post.votes.where(vote_type: 1).count
      downvotes = post.votes.where(vote_type: -1).count
      post.update(upvotes_cache: upvotes, downvotes_cache: downvotes)
    end
  end
end
