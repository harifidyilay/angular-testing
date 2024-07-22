import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe("Calculator", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    console.log("Calling BeforeEach ... ");
    loggerSpy = jasmine.createSpyObj("LoggerSerice", ["log"]);

    // We can not provide real instance of service itself | else it is an integration Test
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    // To have a singleton object for test ...
    // Use a true instanciation of CalculatorService
    calculator = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {}); // Can produce leak state

  it("should add two numbers", () => {
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should substract two numbers", () => {
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "Error on subtract ...");
  });

  // Disable test : xit.( instead of it.(
  // Focus test : fit.(
});
