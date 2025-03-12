class Vote < ApplicationRecord
    belongs_to :post
  
    validates :vote_type, inclusion: { in: [1, -1] }
    validates :post_id, uniqueness: { scope: :ip_address, message: "can only be voted once per IP" }
  
    # 投票を作成または更新
def self.create_or_update_vote(post, ip_address, vote_type)
  vote = find_by(post_id: post.id, ip_address: ip_address)
  vote_type = vote_type.to_i
  if vote.nil?
    # 新規作成
    vote = Vote.new(post_id: post.id, ip_address: ip_address, vote_type: vote_type)
    success = vote.save
    status = success ? :created : :unprocessable_entity
  elsif vote.vote_type == vote_type
    # 同じ投票をした場合
    return { success: false, message: "Already voted with the same choice", status: :unprocessable_entity }
  else
    # 投票を変更
    Rails.logger.debug "判定: #{vote_type == vote.vote_type}"
Rails.logger.debug "今回のタイプ: #{vote_type} (class: #{vote_type.class})"
Rails.logger.debug "元のタイプ: #{vote.vote_type} (class: #{vote.vote_type.class})"

    success = vote.update(vote_type: vote_type)
    status = :ok
  end

  return { success: success, vote: vote, errors: vote.errors.full_messages, status: status }
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