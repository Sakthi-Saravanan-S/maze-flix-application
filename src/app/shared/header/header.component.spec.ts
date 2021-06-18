import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [HeaderComponent],
      providers: [FormBuilder, { provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data to a form', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.setFormValue('Breaking');
    const formValue = component.showSearchForm.controls.showName.value;
    expect(formValue).toBe('Breaking');
  });

  it('should trigger when show name is changed', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.showSearchForm.controls.showName.markAsTouched();
    component.onShowNameChange();
    expect(component.isFormHasError).toBe(false);
  });
  it('should not trigger when show name is changed', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.showSearchForm.controls.showName.markAsUntouched();
    component.onShowNameChange();
    expect(component.isFormHasError).toBe(false);
  });

  it('should validate while submitting - success', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    spyOn(component.onShowSearched, 'emit');
    component.showSearchForm = component._formBuilder.group({
      showName: new FormControl('Breaking', Validators.required),
    });
    component.onSubmit();
    expect(component.onShowSearched.emit).toHaveBeenCalled();
  });

  it('should validate while submitting - failure', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.showSearchForm = component._formBuilder.group({
      showName: new FormControl('', Validators.required),
    });
    component.onSubmit();
    expect(component.isFormHasError).toBe(true);
  });

  it(`should navigate to landing page`, () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.onMazeLogoClick();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
