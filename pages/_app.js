import { appWithTranslation } from 'next-i18next';
import '../i18n'; // Важливо переконатися, що налаштування i18n підключені

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
