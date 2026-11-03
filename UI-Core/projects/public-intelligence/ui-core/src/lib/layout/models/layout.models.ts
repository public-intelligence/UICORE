export interface SidebarMenuItem {
    label: string;
    route?: string;       // For internal Angular routing (routerLink)
    url?: string;         // For external links (href)
    iconPath?: string;    // SVG Path content, e.g. "M9 12h6m-6 4h6..."
    target?: '_blank' | '_self'; // Opens link in new tab if '_blank'
    exactMatch?: boolean; // For routerLinkActiveOptions
    children?: SidebarMenuItem[]; // Nested child items (shown indented, no icons)
}

export interface AppBranding {
    appName: string;
    moduleName: string;
    logoUrl: string;
}

export interface UserProfile {
    name: string;
    role: string;
    avatarUrl?: string; // Optional actual image
}

/** Item for the header profile dropdown menu (e.g. Logout, Login). */
export interface ProfileMenuItem {
    label: string;
    action: string;
    destructive?: boolean;
}
