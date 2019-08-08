class Api::RoutesController < ApplicationController
    before_action :require_logged_in

    def index
        @routes = Route.all
    end

    def show
        @route = Route.find(params[:id])
    end

    def create 
        @route = Route.new(route_params)
        @route.user_id = current_user.id

        if @route.save
            render :show
        else
            render json: @route.errors.full_messages, status: 422
        end
    end

    def edit 
        @route = Route.find(params[:id])
        render json: `/api/routes/#{@route.id}/edit`
    end

    def destroy
        @route = Route.find(params[:id])
        @route.delete
        render :show
    end

    private

    def route_params
        params.require(:route).permit(:distance, :name, :polyline, :user_id)
    end
end