import {Input} from "antd";
import {css} from "emotion";
import {observer} from "mobx-react";
import * as React from "react";
import {SearchStore} from "../../stores/SearchStore";
import {RouteComponent} from "../components/RouteComponent";
import {SearchAnywhere} from "./components/SearchAnywhere";

const SearchContainerStyle = css`
    padding: 10px;
    background: #f0f0f0;
    margin-bottom: 10px;
`;

type Props = {search: SearchStore};

@observer
export class Dashboard extends RouteComponent<Props> {
    /**
     * Дополнительная функция обработки вынесена отдельно по двум причинам:
     *
     *  1. Обработчик стора SearchStore принимает чистое значение
     *  2. Создание динамического обработчика в Input будет создавать каждый
     *     раз новую функцию, что будет заставлять компонент Input производить
     *     каждый раз новый render. Собственно, именно потому и не используется
     *     onChange={e => this.props.search.handleUpdate}
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     */
    private handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.search.handleUpdate(e.target.value);
    };

    render() {
        const {value} = this.props.search;

        return <>
            <h2>Search anywhere</h2>

            <div className={SearchContainerStyle}>
                <Input onChange={this.handleSearch} value={value}/>
            </div>

            <SearchAnywhere value={value}/>
        </>
    }
}