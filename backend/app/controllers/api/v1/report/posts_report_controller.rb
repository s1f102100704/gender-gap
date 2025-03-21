module Api
  module V1
    module Report
      class PostsReportController < ApplicationController
        def create
          report = ::Report.create_by_params(report_params)

          render json: { message: "通報を受け付けました" }, status: :created
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
        end

        private

        def report_params
          params.require(:report).permit(:post_id, :reason_code, :comment)
        end
      end
    end
  end
end