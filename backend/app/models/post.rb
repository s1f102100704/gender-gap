class Post < ApplicationRecord
  belongs_to :discussion_thread, foreign_key: "discussion_thread_id"
  has_many :votes, dependent: :destroy
  validates :gender, presence: true
  validates :content, presence: true
  scope :recent, -> {order(created_at: :desc)}
  def self.fetch_recent
    recent
  end

  def self.find_by_id(id)
    find(id)
  end

  def self.build_new(params)
    new(params)
  end
end