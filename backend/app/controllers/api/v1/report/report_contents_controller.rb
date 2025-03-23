module Api
  module V1
    module Report
      class ReportContentsController < ApplicationController
        def show
          reports = ::Report.for_post(params[:post_id])
          render_json_response(reports)
        end
      end
    end
  end
end