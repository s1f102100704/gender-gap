
# デフォルトで挿入するスレッドタイトル（20件生成）
thread_titles = Array.new(20) { |i| "Discussion Thread #{i + 1}" }

threads = thread_titles.map do |title|
  DiscussionThread.find_or_create_by!(thread_title: title)
end

# ユーザーデータを増やす（10ユーザー生成 + 管理ユーザー追加）
users = []
10.times do |i|
  ip_address = "192.168.1.#{i + 1}" # 固定のIPアドレスを使用
  users << User.find_or_create_by!(ip_address: ip_address)
end


# 管理ユーザー（admin@gmail.com）を追加
admin = Admin.find_or_create_by!(email: "admin@gmail.com") do |user|
  user.password_digest = "$2a$12$clh1UWDuf6ExVNudPb.FDOyfV00/OQsArbvtwBFLgLK3toB5BU4Ba"
end

# 投稿データを35件生成
35.times do |i|
  thread = threads.sample
  user = users.sample
  gender = [1, 2].sample

  Post.find_or_create_by!(
    discussion_thread: thread,
    user_id: user.id,
    gender: gender,
    content: "This is post #{i + 1} in #{thread.thread_title}."
  )
end

# 投稿を取得してランダムにいいねを付与（各投稿に最大3つまで）
posts = Post.all
posts.each do |post|
  users.sample(rand(1..3)).each do |user|
    Vote.transaction do
      # テーブルロックを使用して競合を防止
      Vote.lock.where(post_id: post.id, user_id: user.id).first_or_create!(
        post_id: post.id,
        user_id: user.id,
        vote_type: [1, -1].sample # Good or Bad
      )
    end
  end
end

# おすすめスレッドを20件挿入（ランダムに選出）
threads.sample(20).each do |thread|
  RecommendedThread.find_or_create_by!(discussion_thread: thread) do |recommended_thread|
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
    Report.create!(
      post_id: post.id,
      reason_code: reason_code,
      comment: comment
    )
  end
end

puts "✅ Seed data created successfully!" 
