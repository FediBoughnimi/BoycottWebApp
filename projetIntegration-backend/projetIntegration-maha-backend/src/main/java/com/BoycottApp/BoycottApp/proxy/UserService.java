package com.BoycottApp.BoycottApp.proxy;

import com.BoycottApp.BoycottApp.DTO.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;
@FeignClient(name = "userservice" , path = "/api/user")
public interface UserService {
    @GetMapping(value ="/users/{id}" , produces = "application/json")
    UserDTO getPerson(@PathVariable Long id) ;
}
