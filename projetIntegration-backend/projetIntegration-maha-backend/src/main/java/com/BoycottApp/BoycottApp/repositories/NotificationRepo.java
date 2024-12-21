package com.BoycottApp.BoycottApp.repositories;

import com.BoycottApp.BoycottApp.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
  //  List<Notification> findByUserId(Long userId);

}
