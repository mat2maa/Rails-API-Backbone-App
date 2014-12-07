# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick

  def extension_white_list
    %w(jpg jpeg gif png bmp tif tiff)
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  process :store_dimensions

  private

  def store_dimensions
    if file && model
      model.avatar_width, model.avatar_height = ::MiniMagick::Image.open(file.file)[:dimensions]
    end
  end

end
