class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :api_key
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.hstore :contact
      t.hstore :social
      t.string :avatar
      t.string :avatar_content_type
      t.string :avatar_file_size
      t.string :avatar_width
      t.string :avatar_height

      t.timestamps
    end
  end
end
