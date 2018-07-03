import {observer} from "mobx-react";
import * as React from "react";
import {SearchStore} from "../../stores/SearchStore";
import {css} from "emotion";

type Props = {
    search: SearchStore;
}

const ContainerStyles = css`
    margin: 0 20px;
`;

@observer
export class HeaderMenu extends React.Component<Props> {
    render() {
        return <div className={ContainerStyles}>
            {this.props.search.is && <span>Search for &laquo;{this.props.search.value}&raquo;</span>}
        </div>
    }
}