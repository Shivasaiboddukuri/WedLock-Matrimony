import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

function passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')!.value;
  const passwordConfirmation = formGroup.get('passwordConfirmation')!.value;
  return password === passwordConfirmation ? null : { passwordsDoNotMatch: true };
}

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {
  passwordForm: FormGroup;
  emailId: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });

    this.emailId = localStorage.getItem("emailId");
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('password')?.value;
      if (this.emailId) {
        this.service.resetPassword(this.emailId, password).subscribe({
          next: (data: any) => {
            this.toastr.success("Password updated successfully");
          },
          error: (error: any) => {
            this.toastr.error("Error updating password");
            console.error(error);
          }
        });
      } else {
        this.toastr.error("Email ID not found");
      }
    } else {
      // Handle form validation errors
      if (this.passwordForm.hasError('passwordsDoNotMatch')) {
        this.toastr.error("Passwords do not match");
      }
    }
  }
}
