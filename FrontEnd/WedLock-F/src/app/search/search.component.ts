import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';
  selectedCriteria: string = '';
  searchResults: any[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  searchUsers() {
    if (!this.searchQuery || !this.selectedCriteria) {
      this.toastr.warning('Please enter a search query and select a criteria.');
      return;
    }

    switch (this.selectedCriteria) {
      case 'name':
        this.userService.findByName(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      case 'gender':
        this.userService.findByGender(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      case 'location':
        this.userService.findByLocation(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      case 'education':
        this.userService.findByEducation(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      case 'job':
        this.userService.findByJob(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      case 'motherTongue':
        this.userService.findBymotherTongue(this.searchQuery).subscribe((data: any) => {
          this.handleSearchResults(data);
        });
        break;
      default:
        this.toastr.warning('Invalid search criteria.');
    }
  }

  handleSearchResults(data: any) {
    if (data && data.length > 0) {
      this.searchResults = data;
    } else {
      this.toastr.warning('No results found.');
      this.searchResults = [];
    }
  }

  request(user: any) {
    const requestData = {
      email: user.emailId,
      userName: user.userName,
      requesterName: 'Your Name', // Set the requester's name
      requesterEmail: 'Your Email' // Set the requester's email
    };

    this.http.post('http://localhost:8085/send-request', requestData)
      .subscribe(
        response => {
          this.toastr.success('Request made successfully!');
        },
        error => {
          this.toastr.error('Error sending request.');
        }
      );
  }
}
