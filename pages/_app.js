import "bootstrap/scss/bootstrap.scss";
import "../styles/main.scss";

import { useRouter } from "next/router";

import { Provider } from "next-auth/client";

// import { Provider } from "react-redux";

import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  if (asPath.includes("admin-panel"))
    return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    );
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
