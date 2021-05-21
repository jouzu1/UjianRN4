package com.reactnative.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.reactnative.entity.User;
import com.reactnative.repository.UserRepository;

//@CrossOrigin(origins = "http://localhost:5001")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserRepository userRepo;
	
	
	@GetMapping("")
	public List<User> getAll() {
		return (List<User>) this.userRepo.findAll();
	}
	
	@GetMapping("/searchby/{type}/{value}")
	public List<User> getSearchBy(@PathVariable("type")String type, @PathVariable("value")String value) {
		return userRepo.findBySearchBy(type, value);
	}
	
	
	
	@PostMapping("/add")
//	@RequestMapping(value="/add", method=RequestMethod.POST)
	public String addBuku(@RequestBody User user) {
		this.userRepo.save(user);
		return "Insert berhasil";
	}
}
