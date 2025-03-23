export interface Post {
    id: string;
    post_title?: string;
    content: string;
    created_at: string;
    updated_at: string;
    discussion_thread_id: string;
    gender: number;
    user_id: string;
    reports_count?: number;
}

export interface Props {
    postId: string;
}

export type SearchKey = {
    searchText: string;
    setSearchText: (value: string) => void;
    sortKey: string;
    setSortKey: (value: string) => void;
};
