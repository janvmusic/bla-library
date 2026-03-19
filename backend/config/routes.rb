Rails.application.routes.draw do
  devise_for :users,
             path: "api/v1/auth",
             controllers: { sessions: "api/v1/auth/sessions" },
             defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :books
      resources :book_reservations
      get "dashboard/librarian/stats", to: "librarian_dashboard#stats"
      get "dashboard/member/stats", to: "member_dashboard#stats"
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
