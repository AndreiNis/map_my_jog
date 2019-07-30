class Api::UsersController < ApplicationController
    def show
        @user = User.find(params[:id])
        render :show
    end

    def create
        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :email)
    end
end