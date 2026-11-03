import { Injectable, signal, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppBranding, UserProfile, SidebarMenuItem, ProfileMenuItem } from '../models/layout.models';

export interface Breadcrumb {
    label: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    isSidebarCollapsed = signal(false);
    pageTitle = signal('Dashboard');
    breadcrumbs = signal<Breadcrumb[]>([]);

    branding = signal<AppBranding>({ appName: 'App Name', moduleName: 'Module', logoUrl: '' });
    userProfile = signal<UserProfile | null>(null);
    menuItems = signal<SidebarMenuItem[]>([]);

    /** Controls whether the header notification bell is shown. Set via the AdminLayout
     *  `showNotifications` input or directly. Default: visible. */
    showNotifications = signal(true);

    /** Items for the header profile dropdown (e.g. Logout, Login). App sets these and subscribes to profileMenuAction$. */
    profileMenuItems = signal<ProfileMenuItem[]>([]);
    /** Emits when user chooses an action from the profile menu (action string from the selected item). */
    private profileMenuActionSource = new Subject<string>();
    profileMenuAction$ = this.profileMenuActionSource.asObservable();

    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const root = this.activatedRoute.root;
            const breadcrumbs = this.createBreadcrumbs(root);

            // Limit to last 3 levels
            const limitedBreadcrumbs = breadcrumbs.slice(-3);
            this.breadcrumbs.set(limitedBreadcrumbs);

            // Update title from the last breadcrumb or default
            if (limitedBreadcrumbs.length > 0) {
                this.pageTitle.set(limitedBreadcrumbs[limitedBreadcrumbs.length - 1].label);
            } else {
                this.pageTitle.set('Dashboard');
            }
        });
    }

    toggleSidebar() {
        this.isSidebarCollapsed.update(v => !v);
    }

    /** Call when user selects an item from the profile dropdown. */
    emitProfileMenuAction(action: string) {
        this.profileMenuActionSource.next(action);
    }

    setPageTitle(title: string) {
        this.pageTitle.set(title);
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data['title'];
            if (label) {
                // Deduplicate items with same URL (e.g. empty path children)
                const last = breadcrumbs[breadcrumbs.length - 1];
                if (last && last.url === url) {
                    last.label = label; // Update with more specific child label
                } else {
                    breadcrumbs.push({ label, url });
                }
            }

            return this.createBreadcrumbs(child, url, breadcrumbs);
        }
        return breadcrumbs;
    }
}
