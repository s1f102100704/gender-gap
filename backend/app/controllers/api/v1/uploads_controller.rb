class Api::V1::UploadsController < ApplicationController
  require 'aws-sdk-s3'

  def presigned_url
    content_type = params[:content_type] || 'image/jpeg'
    s3 = Aws::S3::Resource.new(
      region: ENV['AWS_REGION'],
      access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
    )

    bucket = s3.bucket(ENV['AWS_BUCKET_NAME'])

    ext = Rack::Mime::MIME_TYPES.invert[content_type] || ".jpg"
    key = "uploads/#{SecureRandom.uuid}#{ext}"

    # Presigned URL 発行（PUTメソッドで5分間有効）
    url = bucket.object(key).presigned_url(:put, {
      content_type: content_type,
      acl: 'private', 
      expires_in: 86400
    })

    render_json_response({ url: url, key: key },status: :ok)
  end
end
