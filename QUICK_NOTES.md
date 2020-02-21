# Project approach

This project I will begin from the "backend" to have everythin ready so I can focus later on the Front-END-Design

## Project Requirements

### Basic

- Location to (city/country)
  - Advanced: Autocomplete location ?
- Departure date
- DarkSky API. Forecast:
  <= 7 days: Current Weather Forecast
  > 7 days: Predicted Forecast
- Save trip

-> Location -> GeonamesAPI (coordinates) -> DarkSky API (forecast)
-> Pixabay API (location/country image)

### Advanted

- Remove trip
- LocalStorage
- End Date of trip
- Multiple locations for a trip
- Hotel info
- Flight info
- Integrate the REST Countries API to pull in data for the country being visited.
- Multilpe days forecast
- Icons on forecast
- Print/PDF
- Packaging list
- Notes ?
- Additional trips:
  - Sort by countdown
  - Expired trips to bottom.

### After graduation

- i18n
- a11y

# Process

## APIs implementation and study

Branch `external-apis`

- Create the server with basic config and runed a basic project

```
node src/server/index.js
```

- [Geonames API](http://www.geonames.org/export/web-services.html)
  - Add .env for the
  - We want to get the latitude, longitude, country.

https://www.geonames.org/export/web-services.html#postalCodeSearch

Search by Location Name (use your username instead of demo):

http://api.geonames.org/postalCodeSearchJSON?placename=raleigh&username=demo

Parameters:

- placename string (postalcode or placename required)
- all fields : placename,postal code, country, admin name (Important:urlencoded utf8)

- Added `jest` package
- Added `node-fetch`
