package com.reactnative.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reactnative.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
