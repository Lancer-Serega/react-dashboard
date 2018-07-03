import * as React from "react";

type RouteTypes = {path: string} | {default?: boolean};
type Props<P> = P & {uri?: string} & RouteTypes;

export class RouteComponent<P = {}, S = {}> extends React.Component<Props<P>, S> {

}