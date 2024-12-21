package com.BoycottApp.BoycottApp.Services;

import com.BoycottApp.BoycottApp.entities.ImageProduct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageProductService {

    ResponseEntity<String> uploadImage(MultipartFile file, Long idProduct) throws IOException;

    ResponseEntity<ImageProduct> getImageByProductyId(Long idProduct);

    ResponseEntity<String> updateImage(MultipartFile file, Long idProduct) throws IOException;

    ResponseEntity<String> deleteImage(Long idProduct);
}
