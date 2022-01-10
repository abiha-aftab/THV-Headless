import { DEFAULT_LANGUAGE, DEFAULT_REGION, SITE_TITLE_DEFAULT, SITE_TITLE_OTHERS } from './constants'

export const getSelectedLanguage = (state) => {
    const languageFromStore = state.language;
    const languageFromLocalStorage = localStorage.getItem("language");

    let selectedLanguage = DEFAULT_LANGUAGE; // default in case of first time page load. TODO: this has to be moved to constant file
    let selectedRegion = DEFAULT_REGION;

    if (languageFromStore) {
        selectedLanguage = languageFromStore.name.toLowerCase();
        selectedRegion = languageFromStore.region;
    } else if (languageFromLocalStorage) {
        const store = JSON.parse(languageFromLocalStorage);
        selectedLanguage = store.name.toLowerCase();
        selectedRegion = store.region;
    }
    return { name: selectedLanguage, region: selectedRegion === DEFAULT_REGION ? "" : selectedRegion };
};

export const getTitlePart = (language) => {
    if (language === DEFAULT_LANGUAGE) {
        return SITE_TITLE_DEFAULT;
    } else {
        return SITE_TITLE_OTHERS;
    }
};

export const getTitleForGermanyHomePage = (language, pageTitle) => {
    if (language !== DEFAULT_LANGUAGE && pageTitle === "Herzinsuffizienz und TI") {
        return "Herzinsuffizienz und Trikuspidalklappeninsuffizienz";
    } 
    return pageTitle;
};