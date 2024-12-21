package com.BoycottApp.BoycottApp.repositories;

import com.BoycottApp.BoycottApp.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository <Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
}
