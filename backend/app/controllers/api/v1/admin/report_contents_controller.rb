module Api
  module V1
    module Admin
      class ReportContentsController < ApplicationController
        def show
          reports = ::Report.where(post_id: params[:post_id])
                          .select(:id, :reason_code, :comment, :created_at)
                          .order(created_at: :desc)

          if reports.empty?
            render json: { message: "通報はありません" }, status: :ok
          else
            render json: { data: reports }, status: :ok
          end
        end
      end
    end
  end
end