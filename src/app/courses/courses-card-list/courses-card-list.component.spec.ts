import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { setupCourses } from "../common/setup-test-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

// Utiles to complete test coverage
describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let el: DebugElement;

  // help to get instance | debug
  let fixture: ComponentFixture<CoursesCardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // Module container of component
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        // Used because compilation is asynchronous
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance; // get instance of component
        el = fixture.debugElement; // Allows to query the DOM
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    // Set data INPUT | we can use function to setup our data ...
    component.courses = setupCourses();
    fixture.detectChanges();
    // console.log(el.nativeElement.outerHTML); | use for debug only
    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could not find card");
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];

    // Bonne pratique declaration same variable in ts
    const card = el.query(By.css(".course-card:first-child")),
      title = card.query(By.css("mat-card-title")),
      image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not find card course");
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
