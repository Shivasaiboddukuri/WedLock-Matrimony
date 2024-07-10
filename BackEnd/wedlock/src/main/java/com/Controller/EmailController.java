package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dao.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/send-request")
    public void sendRequest(@RequestBody RequestDto requestDto) {
        emailService.sendRequestEmail(requestDto.getEmail(), requestDto.getUserName(), requestDto.getRequesterName(), requestDto.getRequesterEmail());
    }
}

class RequestDto {
    private String email;
    private String userName;
    private String requesterName; // Added field for requester's name
    private String requesterEmail; // Added field for requester's email

    // Getters and Setters

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public String getRequesterEmail() {
        return requesterEmail;
    }

    public void setRequesterEmail(String requesterEmail) {
        this.requesterEmail = requesterEmail;
    }
}
