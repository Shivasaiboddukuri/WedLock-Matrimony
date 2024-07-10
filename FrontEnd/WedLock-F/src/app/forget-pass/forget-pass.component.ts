import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {
  emailId: string = '';
  Otp: string = '';
  otp: any;
  verify: any;

  constructor(private router: Router, private service: UserService, private toaster: ToastrService) { }

  forgetOtp(emailId: string) {
    this.service.forgetOtp(emailId).subscribe((data: any) => {
      this.otp = data;
      if (this.otp) {
        this.toaster.success("OTP sent");
      } else {
        this.toaster.error("Wrong email ID");
      }
    });
  }

  forgetpass(emailId: string, otp: string) {
    localStorage.setItem("emailId", emailId);
    this.service.otpVerify(emailId, otp).subscribe((data: any) => {
      this.verify = data;
      if (this.verify.message === "OTP Verified") {
        this.router.navigate(['resetpassword']);
      } else {
        this.toaster.error("Wrong OTP");
      }
    });
  }
}
