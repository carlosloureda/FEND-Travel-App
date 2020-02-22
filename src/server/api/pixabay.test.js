const pixabay = require("./pixabay");
// const dates = require("../utils/dates.js");

describe("#.dotenv config", () => {
  it(".dotenv file exists", () => {
    const fs = require("fs");
    expect(fs.existsSync("./.env")).toBeTruthy();
  });
  it(".dotenv has PIXABAY_API_KEY", () => {
    expect(process.env.PIXABAY_API_KEY).toBeDefined();
  });
});

if (parseInt(process.env.RUN_API_TESTS)) {
  describe("#Pixabay endpoints", () => {
    it("fetchLocationImage works", async () => {
      // Coordinates for Madrid
      // const lat = "-3.70256423950195";
      // const lng = "40.4165020941502";
      let response = await pixabay.fetchLocationImage("Paris");

      expect(response).toBeDefined();
      expect(response.largeImageURL).toBeDefined();
      expect(response.webformatURL).toBeDefined();
      expect(response.imageWidth).toBeDefined();
      expect(response.imageHeight).toBeDefined();
      expect(response.previewURL).toBeDefined();
      expect(response.pageURL).toBeDefined();
    });
  });
}
