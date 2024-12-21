package com.BoycottApp.BoycottApp.repositories;

import com.BoycottApp.BoycottApp.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepo extends JpaRepository <History, Integer>{
}
