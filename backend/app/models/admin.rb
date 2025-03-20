# app/models/admin.rb
class Admin < ApplicationRecord
  has_secure_password
end