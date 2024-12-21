package com.BoycottApp.BoycottApp.Services;

import com.BoycottApp.BoycottApp.entities.ImageCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageCategoryService {
    ResponseEntity<String> uploadImage(MultipartFile file, Long idCategory) throws IOException;

    ResponseEntity<ImageCategory> getImageByCategoryId(Long idCategory);

    ResponseEntity<String> updateImage(MultipartFile file, Long idCategory) throws IOException;

    ResponseEntity<String> deleteImage(Long idCategory);
}
