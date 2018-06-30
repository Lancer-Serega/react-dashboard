import * as React from "react";
import {navigate} from "@reach/router";

export const Link: React.StatelessComponent<{to: string}> = (props) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(props.to);
    };

    return <a href={props.to} onClick={handleClick}>{props.children}</a>
};
