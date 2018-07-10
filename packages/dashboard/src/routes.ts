type FetchFn = () => any;

export class DynamicRoute {
    routes = new Map<string, FetchFn>();
    mapping = new Map<string, any>();

    add(id: string, fetch: FetchFn) {
        this.routes.set(id, fetch);
    }

    get(id: string, module: string) {
        if (this.mapping.has(id)) {
            return this.mapping.get(id)![module];
        }
    }

    async resolve(id: string, module: string) {
        if (this.mapping.has(id)) {
            return this.mapping.get(id)!;
        }

        if (this.routes.has(id)) {
            const fn = this.routes.get(id)!;
            const exports = await fn();
            this.mapping.set(id, exports);
            return exports[module];
        }
    }
}

const routes = new DynamicRoute();
routes.add("users", () => import("./Dashboard/UsersRoute"));
routes.add("posts", () => import("./Dashboard/PostsRoute"));
routes.add("products", () => import("./Dashboard/ProductsRoute"));
routes.add("orders", () => import("./Dashboard/OrdersRoute"));

export const RouteMapping = routes;
