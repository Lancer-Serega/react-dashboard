import {observer} from "mobx-react";
import * as React from "react";

type Props = {value?: string};

@observer
export class SearchAnywhere extends React.Component<Props> {
    render() {
        if (!this.props.value) {
            return <p>Type something to search</p>
        }

        return <p>Search doesn't have result for  &laquo;{this.props.value}&raquo;</p>
    }
}