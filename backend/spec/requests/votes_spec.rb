require "rails_helper"

RSpec.describe "Votes API" , type: :request do
    before do
        @thread = DiscussionThread.create!(thread_title: "Test thread")
        @post = Post.create!(content: "Test post", discussion_thread_id:@thread.id, gender: 1)
        @vote = Vote.create!(vote_type: 1,post_id: @post.id,ip_address:"192.168.1.1")
    end

    describe "POST api/v1/posts/:post_id/votes" do
        it "allows voting(good)" do 
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: 1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
      
            expect(response).to have_http_status(:created)
            expect(JSON.parse(response.body)["status"]).to eq("success")
        end
        it "allows voting(bad)" do
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: -1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
            expect(response).to have_http_status(:created)
            expect(JSON.parse(response.body)["status"]).to eq("success")
        end
    end

    describe "GET api/v1/posts/:post_id/votes" do
        it "get vote" do
            get "/api/v1/posts/#{@post.id}/votes"
            expect(response).to have_http_status(:ok)
            expect(JSON.parse(response.body)["status"]).to eq("success")
        end
    end

    describe "DELETE GET api/v1/posts/:post_id/votes" do
        it "delete vote" do
            delete "/api/v1/posts/#{@post.id}/votes/#{@vote.id}", headers:{"REMOTE_ADDR" => "192.168.1.1"} 
            expect(response).to have_http_status(:ok)
            expect(JSON.parse(response.body)["status"]).to eq("success")
        end
    end
end