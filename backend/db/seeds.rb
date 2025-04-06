# デフォルトで挿入するスレッドタイトル（20件生成）
thread_titles = Array.new(30) { |i| "Discussion Thread #{i + 1}" }

threads = thread_titles.map do |title|
  DiscussionThread.find_or_create_by(thread_title: title)
end

# ユーザーデータを増やす（10ユーザー生成 + 管理ユーザー追加）
users = []
10.times do |i|
  ip_address = "192.168.1.#{i + 1}" # 固定のIPアドレスを使用
  users << User.find_or_create_by(ip_address: ip_address)
end

# 管理ユーザー（admin@gmail.com）を追加
admin = Admin.find_or_create_by(email: "admin@gmail.com") do |user|
  user.password_digest = "$2a$12$clh1UWDuf6ExVNudPb.FDOyfV00/OQsArbvtwBFLgLK3toB5BU4Ba"
end

# 投稿データを50件生成
50.times do |i|
  thread = threads.sample
  user = users.sample
  gender = [1, 2].sample

  Post.find_or_create_by(
    discussion_thread: thread,
    user_id: user.id,
    gender: gender,
    content: "This is post #{i + 1} in #{thread.thread_title}.",
    reply_to_id: nil
  )
end

# 投稿を取得してランダムにいいねを付与（各投稿に1〜300のランダムな数のいいねを付与）
posts = Post.all
posts.each do |post|

  # ランダムな数（1〜300）のいいねを生成
  rand(1..300).times do
    user = users.sample
    gender = [1, 2].sample
    # 重複を防ぐために find_or_create_by を使用
    Vote.find_or_create_by(
      post_id: post.id,
      user_id: user.id
    ) do |vote|
      vote.vote_type = [1, -1].sample # Good or Bad
      vote.gender = gender # いいねに性別を追加
    end
  end
end

# おすすめスレッドを20件挿入（ランダムに選出）
valid_threads = threads.select { |t| t.posts.any? }

valid_threads.sample([valid_threads.size, 20].min).each do |thread|
  RecommendedThread.find_or_create_by(discussion_thread: thread) do |recommended_thread|
    recommended_thread.recommended_at = Time.current
  end
end

# 通報データをランダムに15件生成（重複防止）
report_reason_options = {
  SPAM: "スパム・宣伝目的",
  ABUSE: "暴言や差別的な表現",
  MISINFORMATION: "誤情報・虚偽の内容",
  INAPPROPRIATE: "不適切な内容",
  OTHER: "その他"
}

posts.sample(15).each do |post|
  reason_code = report_reason_options.keys.sample.to_s
  comment = report_reason_options[reason_code.to_sym]

  unless Report.exists?(post_id: post.id)
    Report.create(
      post_id: post.id,
      reason_code: reason_code,
      comment: comment
    )
  end
end

puts "✅ Seed data created successfully"
