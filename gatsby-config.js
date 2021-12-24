require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('dotenv').config()
module.exports = {
  siteMetadata: {
    title: `Treating HF`,
    description: `Patienten mit Herzinsuffizienz können eine Trikuspidalinsuffizienz erleiden. Durch dieses klinische Problem werden die Anzahl an Hospitalisierungen infolge einer Herzinsuffizienz sowie das Sterblichkeitsrisiko erhöht, während die Lebensqualität der Patienten abnimmt. Durch eine frühe Diagnose der Trikuspidalinsuffizienz und eine optimale Behandlung kann das Überleben der Patienten verbessert werden.`,
    titleTemplate: `%s | Treating HF`,
    url: `https://treating-hf-valves.com/`,
    twitterUsername: `@EdwardsLifesci`,
    image: `/treatinghf-twitter.png`,
    trustArc: `https://consent.trustarc.com/notice?domain=edwards_ccpa.com&c=teconsent&js=nj&noticeType=bb&gtm=1`
  },
  plugins: [
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        projectId: process.env.GATSBY_KONTENT_PROJECT_ID,
        languageCodenames: process.env.GATSBY_KONTENT_LANGUAGE_CODENAMES.split(
            ','
        ).map((lang) => lang.trim()),
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
