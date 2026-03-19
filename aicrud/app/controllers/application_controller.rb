class ApplicationController < ActionController::API
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError,      with: :render_forbidden
  rescue_from ActiveRecord::RecordNotFound,    with: :render_not_found

  private

  # Stub: replace with real authentication (e.g., JWT) in production.
  def current_user
    @current_user ||= User.find_by(id: request.headers["X-User-Id"])
  end

  def render_forbidden
    render json: { errors: ["Forbidden"] }, status: :forbidden
  end

  def render_not_found
    render json: { errors: ["Not found"] }, status: :not_found
  end
end
