# db/seeds.rb

# デフォルトで挿入するスレッドタイトル
["First Discussion Thread", "Second Discussion Thread"].each do |title|
    DiscussionThread.find_or_create_by!(title: title)
  end
  
  # スレッドを取得
  thread1 = DiscussionThread.find_by(title: "First Discussion Thread")
  thread2 = DiscussionThread.find_by(title: "Second Discussion Thread")
  
  # 投稿データの挿入
  Post.find_or_create_by!(discussion_thread: thread1, gender: 1, content: "This is a post in the first thread.")
  Post.find_or_create_by!(discussion_thread: thread2, gender: 2, content: "This is a post in the second thread.")
  
  # 投稿を取得
  post1 = Post.find_by(content: "This is a post in the first thread.")
  post2 = Post.find_by(content: "This is a post in the second thread.")
  
  # いいねデータの挿入
  Like.find_or_create_by!(post: post1, gender: 1)
  Like.find_or_create_by!(post: post2, gender: 2)
  
  # スレッド統計データの挿入
  ThreadStat.find_or_create_by!(discussion_thread: thread1, total_likes_m: 1, total_likes_f: 0)
  ThreadStat.find_or_create_by!(discussion_thread: thread2, total_likes_m: 0, total_likes_f: 1)
  