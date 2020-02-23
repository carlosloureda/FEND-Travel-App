const countries = require("../api/countries");

describe("#Countries API", () => {
  it("Works for spain", () => {
    let country_code = countries.getCountryCode("spain");
    expect(country_code).toEqual("ES");
  });

  it("Works for SPAIN", () => {
    let country_code = countries.getCountryCode("SPAIN");
    expect(country_code).toEqual("ES");
  });

  it("Works for Spain", () => {
    let country_code = countries.getCountryCode("Spain");
    expect(country_code).toEqual("ES");
  });

  it("Works for France", () => {
    let country_code = countries.getCountryCode("France");
    expect(country_code).toEqual("FR");
  });
});
