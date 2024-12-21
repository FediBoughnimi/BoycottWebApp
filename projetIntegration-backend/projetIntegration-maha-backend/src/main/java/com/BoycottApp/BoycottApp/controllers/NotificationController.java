package com.BoycottApp.BoycottApp.controllers;

import com.BoycottApp.BoycottApp.Services.NotificationService;
import com.BoycottApp.BoycottApp.entities.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @PostMapping("users/{userId}")
    public ResponseEntity<Notification> createNotification(@PathVariable Long userId, @RequestBody Notification notification) {
        Notification savedNotification = notificationService.createNotification(userId, notification);

        if (savedNotification != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedNotification);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) {
        List<Notification> notifications = notificationService.getNotificationsByUserId(userId);

        if (notifications.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(notifications);
    }


}
