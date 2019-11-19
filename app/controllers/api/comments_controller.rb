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
        
        if @comment.save
            render :show
        else
            render json: @comment.error.full_messages, status: 401
        end
    end

    def update
        @comment = Comment.find(params:id)

        if @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
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
