import {injectGlobal} from "emotion";

injectGlobal`
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}

.logo {
    cursor: pointer;
    text-align: center;
    padding: 10px;
}

.logo a {
    color: white;
}

.form-inputs > div {
    margin: 25px 5px;   
}

.form-inputs > div input,
.form-inputs > div select {
    margin-left: 15px;
    min-width: 600px; 
    max-width: 60%;
}

.table td {
    font-size: 12px;
    word-break: normal !important;
}

.table .price {
    text-align: right;
}

.table [class^=color-status-] {
    padding: 3px 5px;
    border-radius: 3px;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
    white-space: nowrap;
    color: #fff;
    font-weight: lighter;
}

.table .color-status-active {
    background-image: linear-gradient(to bottom,#05df15,#008c06);
}

.table .color-status-hidden {
    background-image: linear-gradient(to bottom,#e8e8e8,#b5b5b5);
}

.table .color-status-disabled {
    background-image: linear-gradient(to bottom,#ff8b62,#fb4100);
}

.table .color-status-processed {
    background-image: linear-gradient(to bottom,#05df15,#008c06);
}

.table .color-status-completed {
    background-image: linear-gradient(to bottom,#badf89,#8bca39);
}

.table .color-status-open {
    background-image: linear-gradient(to bottom,#ffba6f,#ff8908);
}

.table .color-status-failed {
    background-image: linear-gradient(to bottom,#ff8b62,#fb4100);
}

.table .color-status-declined {
    background-image: linear-gradient(to bottom,#c8bfbf,#fbea00);
}

.table .color-status-canceled {
    background-image: linear-gradient(to bottom,#e8e8e8,#b5b5b5);
}

.table .color-status-backordered {
    background-image: linear-gradient(to bottom,#71c8f9,#10a1f5);
}

.table .color-status-awaiting-call {
    background-image: linear-gradient(to bottom,#e1725c,#b63a21);
}

.table .color-status-shipped {
    background-image: linear-gradient(to bottom,#badf89,#8bca39);
}

.table .color-status-created {
    background-image: linear-gradient(to bottom,#05df15,#008c06);
}
`;
