package com.BoycottApp.BoycottApp.repositories;


import com.BoycottApp.BoycottApp.entities.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface ImageProductRepository extends JpaRepository<ImageProduct,Long> {

    Optional<ImageProduct> findByProductId(Long idProduct);
}
