import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRoleComponent } from './header-role.component';

describe('HeaderRoleComponent', () => {
  let component: HeaderRoleComponent;
  let fixture: ComponentFixture<HeaderRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
