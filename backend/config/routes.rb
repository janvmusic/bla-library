Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :books
      resources :book_reservations
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
