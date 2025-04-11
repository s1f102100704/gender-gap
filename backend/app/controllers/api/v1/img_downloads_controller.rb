class Api::V1::ImgDownloadsController < ApplicationController
  require 'aws-sdk-s3'

  def presigned_url
    key = params[:key] # S3の画像キー（例：uploads/abc123.jpg）

    cache_key = "image_presigned_url:#{key}"
    url = Rails.cache.read(cache_key)
    if url
      render_json_response({ url: url }, status: :ok)
    else
      ImageProcessingJob.perform_later(key)
      render_json_response({ status: "pending" }, status: :accepted)
    end
  end
end