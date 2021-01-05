import "bootstrap/scss/bootstrap.scss";
import "../styles/globals.scss";

// import { Provider } from "react-redux";

import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
