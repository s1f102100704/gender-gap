class Api::V1::UploadsController < ApplicationController
  require 'aws-sdk-s3'

  def presigned_url
    s3 = Aws::S3::Resource.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )

    bucket = s3.bucket(ENV['AWS_BUCKET_NAME'])

    # ファイル名を UUID でユニークに（拡張子はクライアント側と合わせる）
    key = "uploads/#{SecureRandom.uuid}.jpg"

    # Presigned URL 発行（PUTメソッドで5分間有効）
    url = bucket.object(key).presigned_url(:put, expires_in: 300)

    render_json_response({ url: url, key: key },status: :ok)
  end
end
