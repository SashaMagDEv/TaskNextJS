import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from '/src/locales/en/common.json';
import translationUk from '/src/locales/uk/common.json';

const resources = {
    en: {
        common: translationEn,
    },
    uk: {
        common: translationUk,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'uk',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
