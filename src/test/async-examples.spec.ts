describe("async Testing Examples", () => {
  it("Asynchrounous test example with jasmine done", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBe(true);
      done();
    }, 1000);
    //expect(true).toBe(true);
  });
});
