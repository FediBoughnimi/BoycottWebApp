package com.BoycottApp.BoycottApp.repositories;

import com.BoycottApp.BoycottApp.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {
}
