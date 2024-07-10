import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    { image: 'assets/Images/download.jpeg', title: 'Sandeep And Samantha ', description: 'Successfully married 9 days ago..' },
    { image: 'assets/Images/images.jpeg', title: 'Rupesh And Anushka', description: 'Successfully married 2 weeks ago..' },
    { image: 'assets/Images/imageR.jpeg', title: 'Srikar and Satwika', description: 'Successfully married 4 weeks ago..' }
  ];

  feedbacks = [
    { name: 'Deepak', message: 'This is the best matrimony site ever!', rating: 5 },
    { name: 'Keerthi', message: 'We found our perfect match here!', rating: 4 },
    { name: 'Parmeshwari', message: 'Highly recommend this site to everyone!', rating: 5 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Function to get filled stars based on rating
  getStarRating(rating: number): number[] {
    return Array(rating).fill(0);
  }

  // Function to get empty stars based on rating
  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
}
