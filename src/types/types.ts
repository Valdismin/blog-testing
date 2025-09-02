export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    website?: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
};

export type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
    priority: number;
    likes: number;
    dislikes: number;
    favorite: boolean;
    likedBy: number[];
    dislikedBy: number[];
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
    clientOnly?: boolean;
};
