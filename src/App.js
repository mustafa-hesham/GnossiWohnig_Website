import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Pages/Home/Home";
import Infos from "./Pages/Infos/Infos";
import Contact from "./Pages/Contact";
import PricacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";

import "./App.css";
import Footer from "./Footer/Footer";

const theme = {
  colors: {
    primary: "#2e5e70",
    secundary: "#eff0f4",
    third: "#c6dbe3",
    navFontColor: "#d9dadb",
    navDropdownFontColor: "#ffffff",
    navChevronColor: "#ffffff",
    navDropdownBGColor: "#eff0f4",
    burgerFontColor: "#4287a1",
    burgerDropdownFontColor: "#ffffff",
    burgerChevronColor: "#ffffff",
    burgerBGColor: "#000000",
    burgerDropdownBGColor: "#ededed",
    lngFontColor: "#ffffff",
    lngLineFontColor: "#4287a1",
    lngDropdownColor: "#ffffff",
    lngChevronColor: "#ffffff",
    lngDropdownBGColor: "#f9f9f9",
    inputBorderColor: "#c9c9c9",
    grey: "#787878",
    darkgrey: "#424242",
    middlegrey: "#cccccc",
    lightgrey: "#eff0f4",
    white: "#ffffff",
    red: "#f22e2e",
    black: "#353535",
  },
  typography: {
    fontFamiliy: "Helvetica Neue",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.typography.fontFamiliy};
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/contact" component={Contact} />
          <Route path="/infos" component={Infos} />
          <Route path="/privacypolicy" component={PricacyPolicy} />
          <Route path="/termsofservice" component={TermsOfService} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
