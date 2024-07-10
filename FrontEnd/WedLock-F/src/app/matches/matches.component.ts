import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  user: any;
  oppositeGenderUsers: any[];
  gender: any;

  constructor(
    private service: UserService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.gender = localStorage.getItem("gender");
    this.user = {
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
    this.oppositeGenderUsers = [];
  }

  ngOnInit() {
    if (this.gender === "Male") {
      this.service.findFemale().subscribe((oppositeGenderData: any) => {
        this.oppositeGenderUsers = oppositeGenderData;
      });
    } else {
      this.service.findMale().subscribe((oppositeGenderData: any) => {
        this.oppositeGenderUsers = oppositeGenderData;
      });
    }

    // Fetch the current user's details
    this.service.getCurrentUserDetails().subscribe((userData: any) => {
      this.user = userData;
    });
  }

  request(oppositeUser: any) {
    const requestData = {
      email: oppositeUser.emailId,
      userName: oppositeUser.userName,
      requesterName: this.user.userName, // Set the requester's name
      requesterEmail: this.user.emailId // Set the requester's email
    };

    this.http.post('http://localhost:8085/send-request', requestData)
      .subscribe(
        response => {
          this.toastr.success('Request made!');
        },
        error => {
          this.toastr.error('Error sending request');
        }
      );
  }
}
