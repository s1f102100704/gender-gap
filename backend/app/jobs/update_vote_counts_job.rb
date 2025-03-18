class UpdateVoteCountsJob < ApplicationJob
  queue_as :default

  def perform
    Post.includes(:votes_status).find_each do |post| # N+1 を防ぐ
      next unless post.votes_status # 存在しない場合はスキップ

      goodvotes = post.votes.where(vote_type: 1).count
      badvotes = post.votes.where(vote_type: -1).count

      post.votes_status.update(goodvotes_count: goodvotes, badvotes_count: badvotes)
    end
  end
end