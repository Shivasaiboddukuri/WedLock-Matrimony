import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UnregisterDialogComponent } from '../unregister-dialog/unregister-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: any;
  emailId: any;

  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.emailId = localStorage.getItem("emailId");
    console.log(this.emailId);

    this.user = {
      userId: '',
      userName: '',
      gender: '',
      dateOfBirth: '',
      motherTongue: '',
      location: '',
      height: '',
      education: '',
      job: '',
      salary: '',
      phoneNumber: '',
      emailId: '',
      password: ''
    };
  }

  ngOnInit() {
    if (this.emailId !== null) {
      console.log(this.emailId);

      this.service.findByEmail(this.emailId).subscribe((userData: any) => {
        this.user = userData;
        console.log(userData);
        console.log(userData.emailId);
      });
    }
  }

  updateUser() {
    this.service.updateUser(this.user).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Details updated!');
    });
  }

  openUnregisterDialog(): void {
    const dialogRef = this.dialog.open(UnregisterDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        this.service.unregisterUser(this.user.userId, reason).subscribe(() => {
          this.toastr.success("You have been unregistered successfully.");
          // Perform any additional actions, such as logging the user out
          this.router.navigate(['/login']);
        }, (error: any) => {
          this.toastr.error("Error unregistering user.");
        });
      }
    });
  }
}
