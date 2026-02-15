export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at?: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    image_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    is_active: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    parent?: Category | null;
    children?: Category[];
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    meta_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featured_image: string | null;
    featured_image_alt: string | null;
    status: 'draft' | 'published' | 'scheduled';
    is_featured: boolean;
    published_at: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    created_at: string;
    updated_at: string;
    author?: User;
    category?: Category;
    tags?: Tag[];
}

export interface PaginatedCollection<T> {
    data: T[];
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface FlashMessages {
    success?: string;
    error?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: FlashMessages;
};
