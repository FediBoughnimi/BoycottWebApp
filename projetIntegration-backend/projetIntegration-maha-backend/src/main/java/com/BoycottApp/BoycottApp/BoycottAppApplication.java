package com.BoycottApp.BoycottApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BoycottAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoycottAppApplication.class, args);
	}

}
