# Safkapaikat

Tämä sovellus hakee ja näyttää viisi ruokapaikkaa käyttäjän nykyisen sijainnin perusteella käyttäen Foursquaren API:a.

## Ominaisuudet

- Hakee käyttäjän nykyisen sijainnin.
- Näyttää viisi ruokapaikkaa Foursquaren API:n avulla.
- Antaa mahdollisuuden määrittää hakuetäisyyden.

## Asennus

1. Kloonaa repositorio:
  ```bash
  git clone https://github.com/Jtauri/Safkapaikat.git
  cd safkapaikat
  ```

2. Asenna riippuvuudet:
  ```bash
  npm install
  ```

3. Lisää Foursquaren API-avain config.js tiedostoon:
  ```bash
  export const APIKEY = 'api_avain_tähän'
  ```

5. Käynnistä Expo-kehityspalvelin:
  ```bash
  npx expo start
  ```
## Käyttö

1. Sovellus pyytää sijaintilupaa käynnistyessään.
2. Syötä haluamasi hakuetäisyys metreinä.
3. Paina "Get Restaurants" hakeaksesi ja näyttääksesi ruokapaikat lähelläsi.
