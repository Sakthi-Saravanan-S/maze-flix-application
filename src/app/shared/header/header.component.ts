import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() onShowSearched: EventEmitter<string> = new EventEmitter();
  showSearchForm: FormGroup;
  isFormHasError: boolean = false;
  constructor(private _formBuilder: FormBuilder, private _router: Router) {}
  ngOnInit(): void {
    this.showSearchForm = this._formBuilder.group({
      showName: new FormControl('', Validators.required),
    });
  }
  onMazeLogoClick(): void {
    this._router.navigate(['']);
  }
  onShowNameChange(): void {
    this.isFormHasError = false;
  }
  onSubmit(): void {
    if (this.showSearchForm.valid) {
      this.isFormHasError = false;
      const showName = this.showSearchForm.getRawValue().showName;
      this._router.navigateByUrl('/show-details', {
        state: { showName: showName },
      });
      this.onShowSearched.emit(showName);
    } else {
      this.isFormHasError = true;
    }
  }
}
