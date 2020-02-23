const geonames = require("./geonames");

describe("#.dotenv config", () => {
  it(".dotenv file exists", () => {
    const fs = require("fs");
    expect(fs.existsSync("./.env")).toBeTruthy();
  });
  it(".dotenv has GEONAMES_USERNAME", () => {
    expect(process.env.GEONAMES_USERNAME).toBeDefined();
  });
});

if (parseInt(process.env.RUN_API_TESTS)) {
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
}
