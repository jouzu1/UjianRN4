package com.reactnative.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactnative.entity.Laporan;
import com.reactnative.entity.User;
import com.reactnative.repository.LaporanRepository;

@RestController
@RequestMapping("/laporan")
public class LaporanController {
	@Autowired
	LaporanRepository laporanRepo;
	
	
	@GetMapping("")
	public List<Laporan> getAll() {
		return (List<Laporan>) this.laporanRepo.findAll();
	}
	
	@PostMapping("/add")
	public String addLaporan(@RequestBody Laporan laporan) {
		this.laporanRepo.save(laporan);
		return "Insert berhasil";
	}
}
