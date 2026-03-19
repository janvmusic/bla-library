Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [] do
        resources :tasks, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
