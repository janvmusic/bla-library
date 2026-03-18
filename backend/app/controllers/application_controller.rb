class ApplicationController < ActionController::API
  include Pundit::Authorization
  include ErrorHandler

  before_action :authenticate_user!
end
