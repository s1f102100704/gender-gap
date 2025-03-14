# db/seeds.rb

# デフォルトで挿入するスレッドタイトル
["First Discussion Thread", "Second Discussion Thread"].each do |title|
    DiscussionThread.find_or_create_by!(thread_title: title)
  end
  
  # スレッドを取得
  thread1 = DiscussionThread.find_by(thread_title: "First Discussion Thread")
  thread2 = DiscussionThread.find_by(thread_title: "Second Discussion Thread")
  
  user1 = User.find_or_create_by!(ip_address: "192.168.1.1")
  user2 = User.find_or_create_by!(ip_address: "192.168.1.2")
  # 投稿データの挿入
  Post.find_or_create_by!(discussion_thread: thread1, user_id:user1.id, gender: 1, content: "This is a post in the first thread.")
  Post.find_or_create_by!(discussion_thread: thread2, user_id:user2.id, gender: 2, content: "This is a post in the second thread.")
  
  # 投稿を取得
  post1 = Post.find_by(content: "This is a post in the first thread.")
  post2 = Post.find_by(content: "This is a post in the second thread.")
  
  # いいねデータの挿入
  Vote.find_or_create_by!(post_id: post1.id, user_id:user1.id, vote_type: 1)  # Good
  Vote.find_or_create_by!(post_id: post1.id, user_id:user2.id, vote_type: -1) #bad
  # スレッド統計データの挿入
  ThreadStat.find_or_create_by!(discussion_thread: thread1, total_likes_m: 1, total_likes_f: 0)
  ThreadStat.find_or_create_by!(discussion_thread: thread2, total_likes_m: 0, total_likes_f: 1)
  