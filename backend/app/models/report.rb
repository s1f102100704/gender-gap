class Report < ApplicationRecord
  belongs_to :post

  VALID_REASON_CODES = %w[SPAM ABUSE MISINFORMATION INAPPROPRIATE OTHER].freeze

  validates :reason_code, presence: true, inclusion: { in: VALID_REASON_CODES }

  def self.create_by_params(params)
    report = new(params)
    report.save!
    report
  end
end