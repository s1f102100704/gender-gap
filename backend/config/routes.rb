Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create]
      resources :discussion_threads, only: [:index, :show, :create]
      resources :posts, only: [:index, :show, :create], defaults: { format: :json } do
        resources :votes, only: [:index, :create, :destroy]
      end
    end
  end
end

# 一覧取得 (index), 詳細取得 (show), 作成 (create) 