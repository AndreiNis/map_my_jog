class CommentsController < ApplicationController
    before_action :require_logged_in

    def index
        @comments = Comments.all
    end

    def show
        @comment = Comment.find(params[:id])
    end

    def create
        @comment = Comments.new(comment_params)
        @comment.user_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.error.full_messages, status: 401
        end
    end

    def edit
        @comment = Comment.find(params[:id])
        render json: `/api/routes/#{@comment.id}/edit`
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.delete
        render :index
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :user_id, :route_id)
    end
end
