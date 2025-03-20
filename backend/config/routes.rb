require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create]
      resources :discussion_threads, only: [:index, :show, :create]
      resources :discussion_threads_populartopic, only: [:index]
      resources :discussion_threads_week_populartopic, only: [:index]
      resources :discussion_threads_newtopic, only: [:index]
      resources :discussion_threads_recommendtopic, only: [:index]

      resources :posts, only: [:index, :show, :create], defaults: { format: :json } do
        resources :votes, only: [:create]
        resources :votes_status, only: [:index]
      end
      
      namespace :admin do
        resources :discussion_threads_admintopic, only: [:index]
      end
    end

    post "/login", to: "admins#login"
    get "/admin", to: "admins#show"
  end
end
