//Types: User

//ENUMS
export enum UserThemeSetting {
    light = 'light',
    dark = 'dark',
    sync = 'sync',
    amoled = 'amoled',
    classic = 'classic',
    high_contrast = 'high_contrast'
}
export enum UserControlsSetting {
    buttons = 'buttons',
    commands = 'commands'
}
export enum UserNotificationType {
    account_update = 'account_update',
    account_update_profile = 'account_update_profile',
    account_login = 'account_login',
    account_inactive = 'account_inactive',
    application_status = 'application_status',
    friend_req_receive = 'friend_req_receive',
    friend_req_accepted = 'friend_req_accepted',
    friend_req_denied = 'friend_req_denied',
    feedback_comments = 'feedback_comments',
    feedback_upvotes = 'feedback_upvotes',
    feedback_downvotes = 'feedback_downvotes',
    project_shared = 'project_shared',
    project_activity = 'project_activity',
    template_reviewed = 'template_reviewed',
    template_issues = 'template_issues',
    developer_team_invites = 'developer_team_invites',
    developer_team_updates = 'developer_team_updates',
    developer_team_owner = 'developer_team_owner',
    developer_blocklet_invites = 'developer_blocklet_invites',
    developer_blocklet_updates = 'developer_blocklet_updates',
    developer_blocklet_owner = 'developer_blocklet_owner',
    blockly_update = 'blockly_update',
    blockly_newsletter = 'blockly_newsletter'
}
export enum UserSessionActivityType {
    created = "created",
    revoked = "revoked",
    expired = "expired",
    removed = "removed",
    create_team = "create_team",
    update_team = "update_team",
    delete_team = "delete_team",
    create_appeal = "create_appeal",
    update_appeal = "update_appeal",
    delete_appeal = "delete_appeal",
    create_lesson = "create_lesson",
    update_lesson = "update_lesson",
    delete_lesson = "delete_lesson",
    update_session = "update_session",
    revoke_session = "revoke_session",
    delete_session = "delete_session",
    update_account = "update_account",
    create_project = "create_project",
    update_project = "update_project",
    delete_project = "delete_project",
    create_template = "create_template",
    update_template = "update_template",
    delete_template = "delete_template",
    create_blocklet = "create_blocklet",
    update_blocklet = "update_blocklet",
    delete_blocklet = "delete_blocklet",
    create_mfa = "create_mfa",
    update_mfa = "update_mfa",
    delete_mfa = "delete_mfa",
    create_experiment = "create_experiment",
    update_experiment = "update_experiment",
    delete_experiment = "delete_experiment",
    create_position = "create_position",
    update_position = "update_position",
    delete_position = "delete_position",
    create_application = "create_application",
    update_application = "update_application",
    delete_application = "delete_application",
    create_support_post = "create_support_post",
    update_support_post = "update_support_post",
    delete_support_post = "delete_support_post",
    create_feedback_post = "create_feedback_post",
    update_feedback_post = "update_feedback_post",
    delete_feedback_post = "delete_feedback_post",
    create_support_ticket = "create_support_ticket",
    update_support_ticket = "update_support_ticket",
    delete_support_ticket = "delete_support_ticket",
    create_template_review = "create_template_review",
    update_template_review = "update_template_review",
    delete_template_review = "delete_template_review",
    create_support_article = "create_support_article",
    update_support_article = "update_support_article",
    delete_support_article = "delete_support_article",
    create_feedback_comment = "create_feedback_comment",
    update_feedback_comment = "update_feedback_comment",
    delete_feedback_comment = "delete_feedback_comment",
    create_experiment_account = "create_experiment_account",
    update_experiment_account = "update_experiment_account",
    delete_experiment_account = "delete_experiment_account",
    create_template_review_reply = "create_template_review_reply",
    update_template_review_reply = "update_template_review_reply",
    delete_template_review_reply = "delete_template_review_reply",
    create_backup_codes = "create_backup_codes",
    update_backup_codes = "update_backup_codes",
    delete_backup_codes = "delete_backup_codes",
}
export enum UserBadge {
    bug_hunter = "bug_hunter",
    supporter_0 = "supporter_tier_0",
    supporter_1 = "supporter_tier_1",
    supporter_2 = "supporter_tier_2",
    supporter_3 = "supporter_tier_3",
    supporter_4 = "supporter_tier_4",
    supporter_5 = "supporter_tier_5",
}
export enum UserAchievement {
    join_the_community = "join_the_community",
    forums = "forums",
    help = "help",
    twitter = "twitter",
    hero = "hero",
    early_supporter = "early_supporter",
    event_participant = "event_participant",
    contributor = "contributor",
    bug_squasher = "bug_squasher",
    experimenter = "experimenter",
}


//SUBTYPES
export type UserBackupCode = {
    code: string;
    used: boolean;
}

export type UserEmailVerification = {
    address?: string;
    token: string;
    code: string;
}
export type UserPhoneVerification = {
    phone?: string;
    code: string;
}

export type UserSessionLocation = {
    city: string;
    region: string;
    region_code: string;
    country_name: string;
    country_code: string;
    continent_name: string;
    continent_code: string;
    latitude: number;
    longitude: number;
}
export type UserSessionDevice = {
    ip: string;
    os: string;
    browser: string;
    device: string;
}
export type UserSessionActivityChange = {
    key: string;
    old?: string;
    new?: string;
}
export type UserSessionActivity = {
    id: string;
    type: UserSessionActivityType;
    changes: [];
    details: {
        [key: string]: any;
    };
    date: number;
}
export type UserSession = {
    id: string;
    token: string;
    created_at: number;
    expires_at: number;
    type: "password";
    //If the user has verified MFA yet
    authorized: boolean;
    active: boolean;
    device: UserSessionDevice;
    location: UserSessionLocation;
    name: string;
    activity: UserSessionActivity[];
}

export type UserBan = {
    banned: boolean;
    duration?: number;
    end_date?: number;
    reason?: string;
    appealable?: boolean;
    has_appealed?: boolean;
    appeal_denied?: boolean;
}
export type UserWarning = {
    id: string;
    created_at: number;
    created_by: string;
    action_id: string;
    reason: string;
}

export type UserNotificationSetting = {
    email: boolean;
    in_app: boolean;
}
export type UserNotificationSettings = {
    [key in UserNotificationType]: boolean;
}
export type UserEmailUnsubscribeToken = {
    type: UserNotificationType;
    token: string;
}
export type UserNotification = {
    id: string;
    created_at: number;
    read: boolean;
    type: string;
    title: string;
    //Short description shown in notification list
    description: string;
    //Long description shown on the notification page
    details: string;
    url?: string;
}

export type UserBadgeDisplay = {
    owner: boolean;
    staff: boolean;
    partner: boolean;
    moderator: boolean;
    support: boolean;
    educator: boolean;
    tester: boolean;
}

export type UserAnimationSetting = {
    avatars: boolean;
    popups: boolean;
    loaders: boolean;
    hover: boolean;
    other: boolean;
}


export type User = {
    created_at: number;
    username: string;

    email?: string;
    email_verified: boolean;
    email_verification?: UserEmailVerification;
    email_unsubscribe_tokens?: UserEmailUnsubscribeToken[];

    phone?: string;
    phone_verified?: boolean;
    phone_verification?: UserPhoneVerification;

    sessions: UserSession[];
    password?: string;
    password_reset_token?: string;
    mfa_app_enabled?: boolean;
    mfa_app_secret_key?: string;
    mfa_sms_enabled?: boolean;
    mfa_sms_code?: string;
    mfa_backup_codes?: UserBackupCode[];

    ban?: UserBan;
    warnings: UserWarning[];

    disable_account_action_id?: string;
    delete_account_action_id?: string;
    enable_account_code?: string;
    restore_account_code?: string;

    applied_positions?: string[];
    has_applied_for_partner?: boolean;
    has_applied_for_moderator?: boolean;
    has_applied_for_support?: boolean;
    has_applied_for_educator?: boolean;
    has_applied_for_tester?: boolean;

    notifications: UserNotification[];
    pinned_projects?: string[];
    
    staff_portal_user_search_history?: string[];
    viewed_templates?: string[];
    viewed_feedback_posts?: string[];
    viewed_lessons?: string[];
    viewed_docs?: string[];
    viewed_support_articles?: string[];
    viewed_support_posts?: string[];
    viewed_announcements?: string[];
    
    enabled_experiments?: string[];
    developer_mode?: boolean;
    
    //USER FLAGS
    isStaff: boolean;
    isPartner: boolean;
    isModerator: boolean;
    isTester: boolean;
    isEducator: boolean;
    isSupport: boolean;

    isOwner: boolean;
    isManagement: boolean;
    isManager: boolean;
    isDeveloper: boolean;
    isCommunity: boolean;
    isDesigner: boolean;
    isMarketing: boolean;

    isSystem: boolean;
    isBrandAccount: boolean;
    isRetiredStaff: boolean;
    isRetiredMod: boolean;
    isProtected: boolean;

    isScammer: boolean;
    isPotentialScammer: boolean;
    isDangerous: boolean;
    isBanned: boolean;
    isDisabled: boolean;
    isDeleted: boolean;
    isDisabledByStaff: boolean;
    isDeletedByStaff: boolean;

    displayed_badges?: UserBadgeDisplay;

    //PROFILE STUFF
    badges: string[];
    achievements: string[];
    display_name?: string;
    avatar?: string;
    about?: string;
    pronouns?: string;
    twitter?: Object;
    discord?: string;
    github?: string;
    website?: string;
    job_title?: string;
    //PRIVACY STUFF
    blocked?: string[];
    friends?: string[];
    friends_incoming?: string[];
    friends_outgoing?: string[];
    
    blocked_can_see_public_projects?: boolean;
    blocked_can_see_profile?: boolean;
    //APPERANCE STUFF
    website_theme: UserThemeSetting;
    accent_theme?: number;
    lab_theme: UserThemeSetting;
    lab_controls: UserControlsSetting;
    high_contrast?: boolean;
    text_scale?: number;
    animations?: UserAnimationSetting;
    language?: string;

    //NOTIFICATIONS
    notification_settings?: UserNotificationSettings;
}