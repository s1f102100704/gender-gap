class Vote < ApplicationRecord
    belongs_to :post
    belongs_to :user
    validates :vote_type, inclusion: { in: [1, -1] }
    validates :post_id, uniqueness: { scope: :user_id, message: "can only be voted once per IP" }
  
  def self.create_or_update_vote(post, user_id, vote_type)
    vote = find_by(post_id: post.id, user_id: user_id)
    vote_type = vote_type.to_i
    
    if vote.nil?
      vote = Vote.new(post_id: post.id, user_id: user_id, vote_type: vote_type)
      success = vote.save
      status = success ? :created : :unprocessable_entity
    elsif vote.vote_type == vote_type
      remove_vote(post,user_id)
    else
      Rails.logger.debug "判定: #{vote_type == vote.vote_type}"
      Rails.logger.debug "今回のタイプ: #{vote_type} (class: #{vote_type.class})"
      Rails.logger.debug "元のタイプ: #{vote.vote_type} (class: #{vote.vote_type.class})"

      success = vote.update(vote_type: vote_type)
      status = :ok
    end

    return { success: success, vote: vote, errors: vote.errors.full_messages, status: status }
  end

  def self.remove_vote(post, user_id)
    vote = find_by(post_id: post.id, user_id: user_id)
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