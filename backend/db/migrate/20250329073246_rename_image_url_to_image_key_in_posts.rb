class RenameImageUrlToImageKeyInPosts < ActiveRecord::Migration[7.1]
  def change
    rename_column :posts, :image_url, :image_key
  end
end
