class ApplicationController < ActionController::API

  include ActionController::MimeResponds
  helper_method :current_user, :logged_in?

  def authenticate_user_from_key!
    if request.headers['HTTP_X_NAME'] && request.headers['HTTP_X_API_KEY']
      username = request.headers['HTTP_X_NAME'].presence
      user = username && User.find_by(username: username)
      render status: 401, json: { errors: 'You have not provided a correct api key.' } unless user && user.api_key == request.headers['HTTP_X_API_KEY']
    else
      render status: 401, json: { errors: 'You have not provided a correct api key.' }
    end
  end

  def authenticate
    api_key = request.headers['HTTP_X_API_KEY']
    @user = User.find_by api_key: api_key if api_key

    unless @user
      head status: :unauthorized
      false
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user])
  end

  def logged_in?
    current_user != nil
  end

  def params_from(input)
    ActionController::Parameters.new(input)
  end

end
