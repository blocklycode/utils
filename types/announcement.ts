//Types: Announcement

import type { Comment } from "./comment";

//ENUMS
export enum AnnouncementType {
    public = "public",
    tester = "tester",
    educator = "educator",
    moderator = "moderator",
    staff = "staff",
}

//SUBTYPES
export type Reaction = {
    emoji: string;
    users: string[];
}



export type Announcement = {
    id: string;
    created_at: number;
    created_by: string;
    updated_at: number;
    updated_by: string;
    type: AnnouncementType;
    title: string;
    body: string;
    comments: Comment[];
    reactions: Reaction[];
    viewed_by: string[];
    isPinned: boolean;
}