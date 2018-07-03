type DOMLocation = Location;

declare module "@reach/router" {
    type MaybeArray<T> = T | T[];
    type PropsAny = {[key: string]: any};

    interface NavigateOptions {
        replace?: boolean;
        state?: any;
    }

    interface Navigate {
        (uri: string, options?: NavigateOptions): void;
    }

    // Link component

    type LinkProps = {
        to: string;
        replace: boolean;
        state: {[key: string]: any};
    } & React.AnchorHTMLAttributes<{}>;

    export class Link extends React.Component<LinkProps> {
        constructor(props: LinkProps);
    }

    // Location component

    type LocationChildProps<P> = P & {
        location: DOMLocation;
        navigate: Navigate;
    }

    type LocationChildren<P> = (props: LocationChildProps<P>) => React.ReactNode;

    type LocationProps<P = {}> = {
        children: LocationChildren<P>;
    };

    export class Location extends React.Component<LocationProps> {
        constructor(props: LocationProps);
    }

    // Redirect component

    type RedirectProps = {
        from: string;
        to: string;
        noThrow?: boolean;
    }

    export class Redirect extends React.Component<RedirectProps> {
        constructor(props: RedirectProps);
    }

    // Match component

    type MatchChildProps<P> = P & {
        location: DOMLocation;
        match: {
            uri: string;
            path: string;
            params: PropsAny;
        }
    };

    type MatchChildren<P> = (props: MatchChildProps<P>) => React.ReactNode;

    type MatchProps<P = {}> = {
        path: string;
        children: MatchChildren<P>;
    }

    export class Match extends React.Component<MatchProps> {
        constructor(props: MatchProps);
    }

    // Router component

    type RouteProps<P = {}> = P & {uri: string} & ({path: string} | {default?: boolean});
    type RouterProps<P = {}> = {
        basepath?: string;
        primary?: boolean;
        location?: DOMLocation;
        children: MaybeArray<React.ReactElement<RouteProps<P>>>;
    }

    export class Router extends React.Component<RouterProps> {
        constructor(props: RouterProps);
    }

    export const navigate: Navigate;
}