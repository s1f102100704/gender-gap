class ThreadStat < ApplicationRecord
  belongs_to :discussion_thread, dependent: :destroy
end