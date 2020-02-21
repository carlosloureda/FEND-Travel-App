const geonames = require("./geonames");
const fetch = require("node-fetch");

describe("#.dotenv config", () => {
  it(".dotenv file exists", () => {
    const fs = require("fs");
    expect(fs.existsSync("./.env")).toBeTruthy();
  });
  it(".dotenv has GEONAMES_USERNAME", () => {
    expect(process.env.GEONAMES_USERNAME).toBeDefined();
  });
});

describe("#Geonames endpoints", () => {
  it("fetchCoordinates works", async () => {
    const city = "New York";
    let response = await geonames.fetchCoordinates(city);
    expect(response).toBeDefined();
    expect(response.lng).toBeDefined();
    expect(response.lat).toBeDefined();
    expect(response.countryCode).toBeDefined();
    expect(response.countryCode).toEqual("US");
  });
});
