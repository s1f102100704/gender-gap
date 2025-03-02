class Post < ApplicationRecord
  belongs_to :discussion_thread

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