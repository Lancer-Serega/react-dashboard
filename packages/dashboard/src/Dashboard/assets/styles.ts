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
`;
