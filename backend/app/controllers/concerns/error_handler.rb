module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from Pundit::NotAuthorizedError, with: :forbidden
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
  end

  private

  def not_found(e)
    render json: { error: e.message }, status: :not_found
  end

  def forbidden(_e)
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end

  def unprocessable_entity(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
