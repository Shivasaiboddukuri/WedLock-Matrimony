import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class UserService {
  unregister(userId: any, reason: any) {
    throw new Error('Method not implemented.');
  }

  isUserLogged: boolean;
  loginStatus: any;
  user :any;

  constructor(private http: HttpClient) {
    this.loginStatus = new Subject();
  
    this.isUserLogged=false;
    this.user = {
      "userName": "",
      "dateOfBirth": "",
      "gender": "",
      "motherTongue": "",
      "location": "",
      "height": "",
      "education": "",
      "job": "",
      "salary": "",
      "phoneNumber": "",
      "emailId": "",
      "password": "",
      
      
      // "userName": "",
      // "gender": "",
      // "dateOfBirth":"", 
      // "motherTongue": "",
      // "location": "",
      // "height": "",
      // "education": "",
      // "job": "",
      // "salary": "",
      // "phoneNumber": "",
      // "emailId": "",
      // "password": "",
  }

  }

  //Successfully Logged In
  setUserLoggedIn() {
    this.isUserLogged = true;
    this.loginStatus.next(true);
  }
  setUserLogout(){
    this.isUserLogged=false;
  }

  getUserLoggedStatus(){
    return this.isUserLogged;
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }


  
  registerUser(user: any):any {
    return this.http.post('http://localhost:8085/registerUser', user);
  }

  

  getUsers(): any {
    return this.http.get('http://localhost:8085/getUsers');
  }

  login(user:any){
    console.log(user.emailId);
    console.log(user.password);
    return this.http.get("http://localhost:8085/login"+"/"+ user.emailId + "," + user.password).toPromise();
  }

  getUserById(userId:any): any{
    return this.http.get("http://localhost:8085/getUserById"+"/"+ userId);
  }

  findByEmail(emailId :any): any{
    return this.http.get("http://localhost:8085/findByEmail"+"/"+ emailId);
  }


  findByName(userName :any):any{
    console.log(userName);
    return this.http.get("http://localhost:8085/findByName"+"/"+ userName);
  }

  findByGender(gender :any): any{
    return this.http.get("http://localhost:8085/findByGender"+"/"+ gender);
  }

  findByJob(job :any): any{
    return this.http.get("http://localhost:8085/findByJob"+"/"+ job);
  }

  findByEducation(education :any): any{
    return this.http.get("http://localhost:8085/findByEducation"+"/"+ education);
  }

  findByLocation(location :any): any{
    return this.http.get("http://localhost:8085/findByLocation"+"/"+ location);
  }

  findBymotherTongue(motherTongue :any): any{
    return this.http.get("http://localhost:8085/findBymotherTongue"+"/"+ motherTongue);
  }

  findMale()
  {
    return this.http.get('http://localhost:8085/findMale');
  }

  findFemale()
  {
    return this.http.get('http://localhost:8085/findFemale');
  }


  updateUser(user:any)
  {
    return this.http.put('http://localhost:8085/updateUser', user);
  }




  resetpassword(emailid:any,password:any){
    return this.http.put("http://localhost:8085/passwordReset"+emailid+","+ password,null);
  }

  getCurrentUserDetails(): Observable<any> {
    // Assuming there is an endpoint to fetch current user details, adjust the URL accordingly
    return this.http.get<any>('http://localhost:8085/currentUserDetails');
  }

  private baseUrl = 'http://localhost:8085'; // Adjust as necessary

  forgetOtp(emailId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/getEmailOtp`, emailId, { responseType: 'text' });
  }

  otpVerify(emailId: string, otp: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/validateEmailOtp/${emailId}/${otp}`, {});
  }

  
  resetPassword(emailId: string, password: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/passwordReset/${emailId},${password}`, {});
  }
   
  unregisterUser(userId: string, reason: string): Observable<any> {
    return this.http.put(`http://localhost:8085/unregister/${userId}`, { reason });
  }

}

