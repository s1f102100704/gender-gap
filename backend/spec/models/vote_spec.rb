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

  it "updates existing vote instead of creating a duplicate" do
    vote1 = Vote.create_or_update_vote(@post, "192.168.1.1", 1)
    vote2 = Vote.create_or_update_vote(@post, "192.168.1.1", -1)

    expect(Vote.where(post_id: @post.id, ip_address: "192.168.1.1").count).to eq(1)
    expect(vote2[:vote].vote_type).to eq(-1) # 更新されたことを確認
  end
end
