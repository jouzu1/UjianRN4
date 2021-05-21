package com.reactnative;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.reactnative.entity.Laporan;
import com.reactnative.repository.LaporanRepository;
import com.reactnative.repository.UserRepository;

@SpringBootApplication
public class BackendRnApplication implements CommandLineRunner{
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	LaporanRepository laporanRepo;

	public static void main(String[] args) {
		SpringApplication.run(BackendRnApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
//			User user = new User();
//			user.setName("Jouzu");
//			user.setEmail("jouzu1@gmail.com");
//			user.setPhone("123");
//			user.setAddress("Jalan Jalan");
//			this.userRepo.save(user);
		
//		Laporan laporan = new Laporan();
//		laporan.setName("w");
//		laporan.setKejadian("test");
//		laporan.setAlamat("w");
//		laporan.setKeterangan("2");
//		laporan.setGambar("w");
//		this.laporanRepo.save(laporan);
	}

}
