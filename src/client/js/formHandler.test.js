import { fetchInfo } from "./formHandler";
import { clearDefaultResolverCache } from "jest-resolve";

const city = "Paris";
const country = "France";
const daysToTrip = 5;

describe("#API call `fetchInfo`", () => {
  it(`It works with Paris, France, this week's time`, async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          new Promise((res, rej) => {
            let response = {
              country_name: country,
              city: city,
              count_down: daysToTrip,
              coordinates: {
                lng: 2.3417,
                lat: 48.8592,
                countryCode: "FR"
              },
              weatherInfo: {
                latitude: 48.8592,
                longitude: 2.3417,
                timezone: "Europe/Paris",
                currently: {
                  time: 1582507633,
                  summary: "Overcast",
                  icon: "cloudy",
                  precipIntensity: 0.0047,
                  precipProbability: 0.15,
                  precipType: "rain",
                  temperature: 54.31,
                  apparentTemperature: 54.31,
                  dewPoint: 50.2,
                  humidity: 0.86,
                  pressure: 1025.7,
                  windSpeed: 8.46,
                  windGust: 21.1,
                  windBearing: 235,
                  cloudCover: 1,
                  uvIndex: 0,
                  visibility: 10,
                  ozone: 331.5
                }
              },
              locationImage: {
                largeImageURL:
                  "https://pixabay.com/get/57e0d74b4e52b108f5d084609629327d1136d7e2524c704c7d2d7ed4904bc65b_1280.jpg",
                webformatURL:
                  "https://pixabay.com/get/57e0d74b4e52b108f5d084609629327d1136d7e2524c704c7d2d7ed4904bc65b_640.jpg",
                imageWidth: 1600,
                imageHeight: 1066,
                previewURL:
                  "https://cdn.pixabay.com/photo/2013/04/11/19/46/louvre-102840_150.jpg",
                pageURL:
                  "https://pixabay.com/photos/louvre-pyramid-paris-tourism-102840/"
              }
            };
            res(response);
          })
      })
    );

    let result = await fetchInfo(city, country, 1582507633);
    expect(result).toBeDefined();
    expect(result.country_name).toBeDefined();
    expect(result.city).toBeDefined();
    expect(result.count_down).toBeDefined();

    expect(result.coordinates).toBeDefined();
    expect(result.weatherInfo).toBeDefined();
    expect(result.locationImage).toBeDefined();

    expect(result.country_name).toEqual(country);
    expect(result.city).toEqual(city);
    expect(result.count_down).toEqual(daysToTrip);
  });
});
