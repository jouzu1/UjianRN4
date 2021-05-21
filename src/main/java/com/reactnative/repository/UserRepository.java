package com.reactnative.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.reactnative.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
//	@Query(value = "SELECT *\n"
//			+ "from user\n"
//			+ "Where (CASE "
//			+ "WHEN 'name'=:type THEN name LIKE %:value% "
//			+ "WHEN 'phone'=:type THEN phone LIKE %:value% "
//			+ "WHEN 'address'=:type THEN address LIKE %:value% "
//			+ "WHEN 'email'=:type THEN email LIKE %:value% "
//			+ "END)",nativeQuery=true)
	@Query(value = "select * from user where email =:type AND phone=:value",nativeQuery=true)
	List<User> findBySearchBy(@Param("type")String type, @Param("value")String value);
//	List<User> findBySearchBy(@Param("type")String type,@Param("value")String value);
//	User findByName(String name); 
}
