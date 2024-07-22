import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe("async Testing Examples", () => {
  it("Asynchrounous test example with jasmine done", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBe(true);
      done();
    }, 1000);
  });

  it("Asynchrounous test example - setTimeout()", fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      // console.log("running assertions");
      test = true;
      // expect(test).toBeTruthy();
    }, 1000);

    flush(); // Run also all async operation before it is executed ...

    //tick(1000); // Control evolution  time to run in zone only ...

    expect(test).toBeTruthy();
  }));

  it("Asynchrounous test example - plain Promise", fakeAsync(() => {
    let test = false;

    console.log("Create block successfully ... ");

    Promise.resolve().then(() => {
      console.log("Promise evaluate successfully ... ");
      test = true;
    });

    flushMicrotasks();

    console.log("Running assertions susccessfully");
    expect(test).toBeTruthy();
  }));

  it("Asynchrounous test example - Promise + setTimeout() ", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);
    tick(500);

    expect(counter).toBe(10);
    tick(500);

    expect(counter).toBe(11);
  }));
});
