import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
  position: relative;
  min-height: 100%;
}

body {
  background-color: #fafbff;
  min-height: 100%;
  height: auto;
  color: #5f6368;
  line-height: 24px;

  font-family: 'Open Sans', sans-serif;

}

  body,
  button,
  input,
  textarea {
    font-weight: 400;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #0081c5;
    cursor: pointer;

    &:hover {
      color: #0071b1;
      text-decoration: none;
    }
  }

  h1, h2, h3, h4 {
    font-weight: 900;
  }

  h1, h2 {
    font-size: 32px;
    line-height: 1em;
  }

  h3,
  h4 {
    font-size: 22px;
    line-height: 1em;
  }

  p {
    margin: 15px 0px;
  }

  li {
    list-style: none;
  }

  ul {
    padding: 0px;
  }

`

export default GlobalStyle
