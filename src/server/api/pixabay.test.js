const pixabay = require("./pixabay");

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
