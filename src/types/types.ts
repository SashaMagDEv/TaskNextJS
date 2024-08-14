export interface News {
    id: number;
    title: string;
    thumbnail: string;
    date: string;
    short_description: string;
    likes: number;
    category_id: string;
}

export interface Category {
    id: number;
    name: string;
}
