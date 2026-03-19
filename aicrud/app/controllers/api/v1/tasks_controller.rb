module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_user
      before_action :set_task, only: [:update, :destroy]

      # GET /api/v1/users/:user_id/tasks
      def index
        @tasks = policy_scope(Task).where(user: @user)
        render json: TaskBlueprint.render(@tasks), status: :ok
      end

      # POST /api/v1/users/:user_id/tasks
      def create
        @task = @user.tasks.build(task_params)
        authorize @task

        if @task.save
          render json: TaskBlueprint.render(@task), status: :created
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH /api/v1/users/:user_id/tasks/:id
      def update
        if @task.update(task_params)
          render json: TaskBlueprint.render(@task), status: :ok
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/users/:user_id/tasks/:id
      # Soft delete: marks the task as :done instead of destroying it.
      def destroy
        @task.done!
        render json: TaskBlueprint.render(@task), status: :ok
      end

      private

      def set_user
        @user = User.find(params[:user_id])
      end

      def set_task
        @task = @user.tasks.find(params[:id])
        authorize @task
      end

      def task_params
        params.require(:task).permit(:title, :description, :status, :due_date)
      end
    end
  end
end
