package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
		return builder.routes()
				// Direct routes to specific services
				.route(r -> r.path("/api/submissions/**").uri("http://localhost:5000/"))
				.route(r -> r.path("/api/boycott/**").uri("http://localhost:8082/"))
				.route(r -> r.path("/contact/messages/**").uri("http://localhost:3030/"))
				.build();
	}
}
