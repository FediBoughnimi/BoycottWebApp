package com.BoycottApp.BoycottApp.repositories;

import com.BoycottApp.BoycottApp.entities.ImageCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageCategoryRepository extends JpaRepository<ImageCategory,Long>{
    Optional<ImageCategory> findByCategoryId(Long idCategory);
}

