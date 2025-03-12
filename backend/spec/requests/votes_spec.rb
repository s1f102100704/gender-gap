require "rails_helper"

RSpec.describe "Votes API" , type: :request do
    before do
        Vote.destroy_all 
        @thread = DiscussionThread.create!(thread_title: "Test thread")
        @post = Post.create!(content: "Test post", discussion_thread_id:@thread.id, gender: 1)
        @vote = Vote.create!(vote_type: 1,post_id: @post.id,ip_address:"192.168.1.3")
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
        it "prevents duplicate voting with the same choice" do
            # 初回投票（成功）
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: 1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
            expect(response).to have_http_status(:created)
            existing_vote = Vote.find_by(post_id: @post.id, ip_address: "192.168.1.1")

            # 同じ投票を試みる（失敗するはず）
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: 1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
            expect(response).to have_http_status(:unprocessable_entity)
            expect(JSON.parse(response.body)["message"]).to eq("Already voted with the same choice")
        end
          
        it "allows changing the vote" do
            # 初回投票
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: 1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
            expect(response).to have_http_status(:created)
          
            # 違う投票に変更
            post "/api/v1/posts/#{@post.id}/votes", params: { vote: { vote_type: -1 } }, headers: { "HTTP_X_FORWARDED_FOR" => "192.168.1.1" }
            expect(response).to have_http_status(:ok)
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
            delete "/api/v1/posts/#{@post.id}/votes/#{@vote.id}", headers:{"REMOTE_ADDR" => "192.168.1.3"} 
            expect(response).to have_http_status(:ok)
            expect(JSON.parse(response.body)["status"]).to eq("success")
        end
        it "does not allow deletion from a different IP address" do
            delete "/api/v1/posts/#{@post.id}/votes/#{@vote.id}", headers: { "REMOTE_ADDR" => "192.168.1.2" }
            expect(response).to have_http_status(:not_found) # または :forbidden にする
        end
    end
end