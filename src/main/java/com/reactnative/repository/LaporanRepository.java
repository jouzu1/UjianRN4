package com.reactnative.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reactnative.entity.Laporan;

public interface LaporanRepository extends JpaRepository<Laporan, Long> {

}
