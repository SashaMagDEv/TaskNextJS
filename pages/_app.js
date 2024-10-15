import { appWithTranslation } from 'next-i18next';
import '../i18n';

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
