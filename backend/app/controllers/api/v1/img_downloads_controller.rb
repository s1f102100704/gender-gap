class Api::V1::ImgDownloadsController < ApplicationController
  require 'aws-sdk-s3'

  def presigned_url
    key = params[:key] # S3の画像キー（例：uploads/abc123.jpg）

    s3 = Aws::S3::Resource.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )
    bucket = s3.bucket(ENV['AWS_BUCKET_NAME'])

    url = bucket.object(key).presigned_url(:get, expires_in: 300) # 5分間だけ有効

    render_json_response({ url: url }, status: :ok)
  end
end