class User < ActiveRecord::Base

  has_secure_password

  has_one :portfolio

  validates :username, :presence => true, :uniqueness => true, :length => { :in => 3..20 }
  validates_presence_of :password, on: :create
  validates_length_of :password, :in => 6..20, on: :create
  validates_presence_of :password_confirmation, on: :create
  validates_length_of :password_confirmation, :in => 6..20, on: :create
  validates_presence_of :first_name, :last_name, :date_of_birth

  before_save :ensure_api_key
  before_save :update_image_attributes

  def ensure_api_key
    if api_key.blank?
      self.api_key = generate_api_key
    end
  end

  def custom_valid_password?(password)
    return false if encrypted_password.blank?
    bcrypt   = ::BCrypt::Password.new(encrypted_password)
    password = ::BCrypt::Engine.hash_secret("#{password}#{self.class.pepper}", bcrypt.salt)
    Devise.secure_compare(password, encrypted_password)
  end

  store_accessor :contact, :address_line_1, :address_line_2, :town, :postcode, :telephone_number, :mobile_number, :email, :work_email
  store_accessor :social, :facebook, :twitter, :linkedin

  mount_uploader :avatar, AvatarUploader

  # Params hash from request
  def self.params(params)
    params = params.deep_stringify_keys
    user = {}
    user[:username] = params['username']
    user[:password] = params['password']
    user[:password_confirmation] = params['password_confirmation']
    user[:first_name] = params['first_name']
    user[:last_name] = params['last_name']
    user[:date_of_birth] = params['date_of_birth']
    user[:avatar] = params['avatar']
    user[:contact] = {}
    user[:contact][:address_line_1] = params['address_line_1']
    user[:contact][:address_line_2] = params['address_line_2']
    user[:contact][:town] = params['town']
    user[:contact][:postcode] = params['postcode']
    user[:contact][:telephone_number] = params['telephone_number']
    user[:contact][:mobile_number] = params['mobile_number']
    user[:contact][:email] = params['email']
    user[:contact][:work_email] = params['work_email']
    user[:social] = {}
    user[:social][:facebook] = params['facebook']
    user[:social][:twitter] = params['twitter']
    user[:social][:linkedin] = params['linkedin']
    user.delete_blank
  end

  def to_api_json
    {
        id: id,
        api_key: api_key,
        username: username,
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        avatar: avatar.url,
        avatar_file_size: avatar_file_size,
        avatar_content_type: avatar_content_type,
        avatar_width: avatar_width,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        town: town,
        postcode: postcode,
        telephone_number: telephone_number,
        email: email,
        work_email: work_email,
        facebook: facebook,
        twitter: twitter,
        linkedin: linkedin
    }
  end

  private

  def generate_api_key
    loop do
      token = SecureRandom.base64.tr('+/=', 'Qrt')
      break token unless User.exists?(api_key: token)
    end
  end

  def update_image_attributes
    if avatar.present? && avatar_changed?
      self.avatar_content_type = avatar.file.content_type
      self.avatar_file_size = avatar.file.size
    end
  end

end
