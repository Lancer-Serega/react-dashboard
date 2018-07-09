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

.list-product .price {
    text-align: right;
}

.list-product .status {
    border-radius: 3px;
}

[class^=color-status-] {
    padding: 5px;
    border-radius: 3px;
}

.color-status-active {
    background-color: #04e4048a;
}

.color-status-hidden {
    background-color: #94968f99;
}

.color-status-disabled {
    background-color: #ff08028a;
}


`;
