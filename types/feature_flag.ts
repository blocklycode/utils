//Types: FeatureFlag

import type { User } from "./user";

//ChatGPT wrote this one
type FeatureFlagAvailabilityField<T> = {
    [K in keyof T]?: T[K] extends object ? FeatureFlagAvailabilityField<T[K]> : T[K] | boolean;
};


export type FeatureFlagAvailability = boolean | {
    percentage?: number;
    fields?: FeatureFlagAvailabilityField<User>;
}[];

export type FeatureFlag = {
    id: string;
    created_at: number;
    created_by: string;
    availability: FeatureFlagAvailability;
}