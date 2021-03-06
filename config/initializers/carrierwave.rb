if Rails.env.test? || Rails.env.cucumber?
  CarrierWave.configure do |config|
    config.storage = :file
    config.enable_processing = false
  end

  # make sure our uploader is auto-loaded
  FileUploader

  # use different dirs when testing
  CarrierWave::Uploader::Base.descendants.each do |klass|
    next if klass.anonymous?
    klass.class_eval do
      def cache_dir
        "#{Rails.root}/spec/support/uploads/tmp"
      end

      def store_dir
        "#{Rails.root}/spec/support/uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
      end
    end
  end
else
  CarrierWave.configure do |config|
    if Rails.env.development?
      config.storage = :file
    else
      config.storage = :fog
      config.fog_credentials = {
          provider: 'AWS', # required
          aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'], # required
          aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'], # required
          region: ENV['FOG_REGION'] # optional, defaults to 'us-east-1'
      }
      config.fog_directory = ENV['S3_BUCKET_NAME'] # required
    end
  end
end
