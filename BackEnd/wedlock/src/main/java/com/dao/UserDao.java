package com.dao;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.model.User;
import com.model.UserOtp;

@Service
@CrossOrigin(origins = "http://localhost:4200")
public class UserDao {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	private UserOtp userOtp = new UserOtp();
	
	private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
	
	public User registerUser(User user){
		String bCryptpw = bCrypt.encode(user.getPassword());
		user.setPassword(bCryptpw);
		return userRepository.save(user);
	}
	
	public User login(String emailId, String password){
		User user = userRepository.findByEmailId(emailId);
		if(user != null && bCrypt.matches(password, user.getPassword())){
			return user;
		}
		return null;
	}
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public User getUserById(int userId){
		return userRepository.findById(userId).orElse(null);
	}
	
	public User findByEmail(String emailId){
		return userRepository.findByEmailId(emailId);
	}
	
	public User findByName(String userName){
		return userRepository.findByUserName(userName);
	}
	
	public List<User> findByGender(String gender) {
        return userRepository.findByGender(gender);
    }
	
	public List<User> findByLocation(String location){
		return userRepository.findByLocation(location);
	}
	
	public List<User> findByMotherTongue(String motherTongue){
		return userRepository.findByMotherTongue(motherTongue);
	}
	
	public List<User> findByJob(String job){
		return userRepository.findByJob(job);
	}
	
	public List<User> findByEducation(String education){
		return userRepository.findByEducation(education);
	}
	
	public void updateUser(User user) {
		userRepository.save(user);
	}
	
	public void deleteUserById(int userId) {
		userRepository.deleteById(userId);
	}

	public List<User> findMatches(){
		return userRepository.findAll();
	}
	
	public List<User> findMale(){
		return userRepository.findMale();
	}
	
	public List<User> findFemale(){
		return userRepository.findFemale();
	}
	
	public boolean generateOTP(String emailId) {
		User user = userRepository.findByEmailId(emailId);
		if(user != null){
			Random random = new Random();
			int otp = 100000 + random.nextInt(900000);			
			LocalDateTime time = LocalDateTime.now().plusMinutes(2);
			
			userOtp.setEmailOtp(otp);
			userOtp.setEmailOtpExpiryTime(time);
			
			SimpleMailMessage msg = new SimpleMailMessage();
			msg.setTo(emailId);
			msg.setSubject("One Time Password");
			msg.setText("Your OTP is: " + otp);
			
			javaMailSender.send(msg);
			return true;
		}
		return false;
	}
	
	public boolean validateEmailOtp(String emailId, int otp) {
		User user = userRepository.findByEmailId(emailId);
		if(user != null) {
			if(userOtp.getEmailOtp() == otp && userOtp.getEmailOtpExpiryTime().isAfter(LocalDateTime.now())) {
				userOtp.setEmailOtp(0);
				userOtp.setEmailOtpExpiryTime(null);
				return true;
			}
		}
		return false;
	}

	public User userUpdate(String emailId, String password){
		User user = userRepository.findByEmailId(emailId);
		user.setPassword(bCrypt.encode(password));
		return userRepository.save(user);
	}

	public void unregisterUser(String emailId, String reason) {
		User user = userRepository.findByEmailId(emailId);
		if (user != null) {
			user.setUnregisterReason(reason);
			user.setActive(false);
			userRepository.save(user);
		}
	}
}
