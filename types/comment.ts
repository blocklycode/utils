//Types: Comment, Reply

//SUBTYPES
export type EditHistory = {
    id: string;
    date: number;
    content: string;
}

export type Base = {
    id: string;
    created_at: number;
    created_by: string;
    updated_at?: number;
    content: string;
    edit_history: EditHistory[];
    upvotes: string[];
    downvotes: string[];
}



export type Reply = Base;

export type Comment = Base & {
    replies?: Reply[];
}