import "bootstrap/scss/bootstrap.scss";
import "../styles/main.scss";

import { Provider } from "next-auth/client";

// import { Provider } from "react-redux";

import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
