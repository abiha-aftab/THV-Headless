export default function getTranslationByKey(key, translations) {
    const translation = translations.find(translation => translation.key === key);
    return JSON.parse(translation.value);
};  