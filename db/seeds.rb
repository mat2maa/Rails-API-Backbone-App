def create_user
  user = User.find_or_create_by!(username: Rails.application.secrets.username) do |user|
    user.password = Rails.application.secrets.password
    user.password_confirmation = Rails.application.secrets.password
    user.first_name = Rails.application.secrets.first_name
    user.last_name = Rails.application.secrets.last_name
    user.date_of_birth = Rails.application.secrets.date_of_birth
  end
  puts "Created user #{user.first_name} #{user.last_name}"
  user
end
create_user
