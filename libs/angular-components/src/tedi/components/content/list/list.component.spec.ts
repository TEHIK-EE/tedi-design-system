import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { ListComponent } from "./list.component";
import { ListItemComponent } from "./list-item.component";

@Component({
  template: `
    <tedi-list [class]="listClass" [element]="element" [style]="style">
      <tedi-list-item [class]="itemClass1">Item 1</tedi-list-item>
      <tedi-list-item [class]="itemClass2">Item 2</tedi-list-item>
      <tedi-list-item>Item 3</tedi-list-item>
    </tedi-list>
  `,
})
class HostListComponent {
  listClass: string | undefined = undefined;
  element: "ul" | "ol" = "ul";
  style: "styled" | "none" = "styled";
  itemClass1: string | undefined = undefined;
  itemClass2: string | undefined = undefined;
}

describe("List Components", () => {
  let hostComponent: HostListComponent;
  let hostFixture: ComponentFixture<HostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, ListItemComponent, HostListComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostListComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe("ListComponent", () => {
    it("should create component", () => {
      expect(hostComponent).toBeTruthy();
    });

    it("should render the list with default props", () => {
      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      expect(listElement).toBeTruthy();
      expect(listElement.nativeElement.tagName.toLowerCase()).toBe("ul");

      const listItems = listElement.queryAll(By.css(".tedi-list__item"));
      expect(listItems.length).toBe(3);
      expect(listItems[0].nativeElement.textContent.trim()).toBe("Item 1");
    });

    it("should apply the correct classes with default settings", () => {
      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      const classString = listElement.nativeElement.className;

      expect(classString).toContain("tedi-list");
      expect(classString).toContain("tedi-list--unordered");
      expect(classString).toContain("tedi-list--style-styled");
      expect(classString).not.toContain("tedi-list--ordered");
      expect(classString).not.toContain("tedi-list--style-none");
    });

    it("should apply custom class", () => {
      hostComponent.listClass = "test-class";
      hostFixture.detectChanges();

      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      expect(
        listElement.nativeElement.classList.contains("test-class"),
      ).toBeTruthy();
    });

    it("should render as ordered list when element is 'ol'", () => {
      hostComponent.element = "ol";
      hostFixture.detectChanges();

      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      expect(listElement.nativeElement.tagName.toLowerCase()).toBe("ol");
      expect(
        listElement.nativeElement.classList.contains("tedi-list--ordered"),
      ).toBeTruthy();
      expect(
        listElement.nativeElement.classList.contains("tedi-list--unordered"),
      ).toBeFalsy();
    });

    it("should apply different list styles", () => {
      const styles: ["styled", "none"] = ["styled", "none"];

      for (const style of styles) {
        hostComponent.style = style;
        hostFixture.detectChanges();

        const listElement = hostFixture.debugElement.query(
          By.css(".tedi-list"),
        );
        expect(
          listElement.nativeElement.classList.contains(
            `tedi-list--style-${style}`,
          ),
        ).toBeTruthy();
      }
    });

    it("should handle undefined values for class", () => {
      hostComponent.listClass = undefined;
      hostFixture.detectChanges();

      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      expect(listElement).toBeTruthy();
      expect(listElement.nativeElement.classList.toString()).not.toContain(
        "undefined",
      );
    });

    it("should combine all class names correctly", () => {
      hostComponent.listClass = "custom-class";
      hostComponent.element = "ol";
      hostComponent.style = "none";
      hostFixture.detectChanges();

      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      const classList = listElement.nativeElement.className.split(" ");

      expect(classList).toContain("tedi-list");
      expect(classList).toContain("tedi-list--ordered");
      expect(classList).toContain("tedi-list--style-none");
      expect(classList).toContain("custom-class");
    });
  });

  describe("ListItemComponent", () => {
    it("should create list item components", () => {
      const listItems = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      );
      expect(listItems.length).toBe(3);
    });

    it("should render list items with correct content", () => {
      const listItems = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      );
      expect(listItems[0].nativeElement.textContent.trim()).toBe("Item 1");
      expect(listItems[1].nativeElement.textContent.trim()).toBe("Item 2");
      expect(listItems[2].nativeElement.textContent.trim()).toBe("Item 3");
    });

    it("should apply the correct base class to list items", () => {
      const listItems = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      );

      listItems.forEach((item) => {
        expect(
          item.nativeElement.classList.contains("tedi-list__item"),
        ).toBeTruthy();
      });
    });

    it("should apply custom classes to list items", () => {
      hostComponent.itemClass1 = "custom-item-class-1";
      hostComponent.itemClass2 = "custom-item-class-2";
      hostFixture.detectChanges();

      const listItems = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      );

      expect(
        listItems[0].nativeElement.classList.contains("custom-item-class-1"),
      ).toBeTruthy();
      expect(
        listItems[1].nativeElement.classList.contains("custom-item-class-2"),
      ).toBeTruthy();
      expect(
        listItems[2].nativeElement.classList.contains("custom-item-class-1"),
      ).toBeFalsy();
      expect(
        listItems[2].nativeElement.classList.contains("custom-item-class-2"),
      ).toBeFalsy();
    });

    it("should handle undefined values for class in list items", () => {
      hostComponent.itemClass1 = undefined;
      hostFixture.detectChanges();

      const listItems = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      );
      expect(listItems[0].nativeElement.classList.toString()).not.toContain(
        "undefined",
      );
    });

    it("should combine base and custom classes correctly", () => {
      hostComponent.itemClass1 = "test-item-class";
      hostFixture.detectChanges();

      const firstItem = hostFixture.debugElement.queryAll(
        By.css(".tedi-list__item"),
      )[0];
      const classList = firstItem.nativeElement.className.split(" ");

      expect(classList).toContain("tedi-list__item");
      expect(classList).toContain("test-item-class");
    });
  });

  describe("List and ListItem integration", () => {
    it("should properly nest list items inside the list", () => {
      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      const listItems = listElement.queryAll(By.css(".tedi-list__item"));

      expect(listItems.length).toBe(3);
    });

    it("should update list items when list element type changes", () => {
      hostComponent.element = "ol";
      hostFixture.detectChanges();

      const listElement = hostFixture.debugElement.query(By.css(".tedi-list"));
      expect(listElement.nativeElement.tagName.toLowerCase()).toBe("ol");

      const listItems = listElement.queryAll(By.css(".tedi-list__item"));
      expect(listItems.length).toBe(3);
    });
  });
});
