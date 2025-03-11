class Vote < ApplicationRecord
    belongs_to :post
  
    validates :vote_type, inclusion: { in: [1, -1] }
    validates :post_id, uniqueness: { scope: :ip_address, message: "can only be voted once per IP" }
  
    # 投票を作成または更新
    def self.create_or_update_vote(post, ip_address, vote_type)
      vote = find_or_initialize_by(post_id: post.id, ip_address: ip_address)
  
      if vote.new_record?
        vote.vote_type = vote_type
        return { success: vote.save, vote: vote, errors: vote.errors.full_messages }
      elsif vote.vote_type == vote_type
        return { success: false, message: "Already voted with the same choice" }
      else
        vote.update(vote_type: vote_type)
        return { success: true, vote: vote }
      end
    end
  
    # 投票を削除
    def self.remove_vote(post, ip_address)
      vote = find_by(post_id: post.id, ip_address: ip_address)
      return { success: false, message: "Vote not found" } unless vote
  
      vote.destroy
      { success: true, message: "Vote removed" }
    end
  
    # 投票の集計
    def self.vote_counts(post)
      {
        good: post.votes.where(vote_type: 1).count,
        bad: post.votes.where(vote_type: -1).count
      }
    end
  end