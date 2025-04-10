# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_04_06_113833) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "discussion_threads", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "thread_title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_key"
  end

  create_table "posts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "discussion_thread_id", null: false
    t.integer "gender", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.string "image_key"
    t.uuid "reply_to_id"
    t.index ["reply_to_id"], name: "index_posts_on_reply_to_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "recommended_threads", force: :cascade do |t|
    t.uuid "discussion_thread_id", null: false
    t.datetime "recommended_at", precision: nil, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reports", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "post_id", null: false
    t.string "reason_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "comment"
    t.index ["post_id"], name: "index_reports_on_post_id"
  end

  create_table "thread_stats", primary_key: "discussion_thread_id", id: :uuid, default: nil, force: :cascade do |t|
    t.integer "total_likes_m", default: 0, null: false
    t.integer "total_likes_f", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "ip_address", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "gender"
    t.index ["ip_address"], name: "index_users_on_ip_address", unique: true
  end

  create_table "votes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "post_id", null: false
    t.integer "vote_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "user_id", null: false
    t.integer "gender"
    t.index ["post_id", "user_id"], name: "index_votes_on_post_id_and_user_id", unique: true
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "posts", "discussion_threads"
  add_foreign_key "posts", "posts", column: "reply_to_id"
  add_foreign_key "posts", "users"
  add_foreign_key "recommended_threads", "discussion_threads", on_delete: :cascade
  add_foreign_key "reports", "posts"
  add_foreign_key "thread_stats", "discussion_threads", on_delete: :cascade
  add_foreign_key "votes", "posts"
  add_foreign_key "votes", "users"
end
