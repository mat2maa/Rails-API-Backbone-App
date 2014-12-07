class Api::V1::UsersController < ApplicationController

  # before_action :authenticate_user_from_key!, only: [:index]

  # type: "GET"
  # url: "/api/v1/users"
  # headers: { 'x-username': "", 'x-api-key': "" }
  def index
    @users = User.all
    render json: {
        users: @users
    }
  end

  # type: "POST",
  # url: "/api/v1/users",
  # data: { email: "", password: "", password_confirmation: "", first_name: "", last_name: "", date_of_birth: "", avatar: "", contact: {}, social: {} }
  def create
    parameters = params_from(user: User.params(params))

    # Validation goes here as none for request format
    if request.format != :json && request.session['format'] != :json
      render status: :not_acceptable,
             json: {
                 message: 'The request must be of json format.'
             }
      return
    end

    puts parameters

    @user = User.new parameters.require(:user).permit!

    if @user.save
      render status: :ok,
             json: {
                 user: @user.to_api_json
             }
    else
      render status: :bad_request,
             json: {
                 errors: @user.errors
             }
    end
  end

end
