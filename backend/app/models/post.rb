class Post < ApplicationRecord
  belongs_to :discussion_thread, foreign_key: "discussion_thread_id"
  has_many :votes, dependent: :destroy 
  has_many :reports, dependent: :destroy
  has_one :votes_status, foreign_key: :post_id
  validates :gender, presence: true
  validates :content, presence: true
  scope :recent, -> {order(created_at: :desc)}
  def self.fetch_recent
    recent
  end

  def self.find_by_id(id)
    find(id)
  end

  def self.build_new(params,user_id)
    new(params.merge(user_id: user_id))
  end

  def self.reported
    PostsQuery.new.reported
  end
end