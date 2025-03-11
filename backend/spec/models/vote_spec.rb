require 'rails_helper'

RSpec.describe Vote, type: :model do
  before do
    @thread = DiscussionThread.create!(thread_title: "Test thread")
    @post = Post.create!(content: "Test post", discussion_thread_id: @thread.id, gender: 1)
  end

  it "is valid with vote_type of 1 (good)" do
    vote = Vote.new(post: @post, ip_address: "192.168.1.1", vote_type: 1)
    expect(vote).to be_valid
  end

  it "is valid with vote_type of -1 (bad)" do
    vote = Vote.new(post: @post, ip_address: "192.168.1.1", vote_type: -1)
    expect(vote).to be_valid
  end

  it "is invalid with vote_type other than 1 or -1" do
    vote = Vote.new(post: @post, ip_address: "192.168.1.1", vote_type: 2)
    expect(vote).not_to be_valid
  end

  it "does not allow duplicate votes from the same IP on the same post" do
    Vote.create!(post: @post, ip_address: "192.168.1.1", vote_type: 1)
    duplicate_vote = Vote.new(post: @post, ip_address: "192.168.1.1", vote_type: -1)

    expect(duplicate_vote).not_to be_valid
  end
end
