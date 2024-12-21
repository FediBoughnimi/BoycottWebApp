package com.BoycottApp.BoycottApp.controllers;


import com.BoycottApp.BoycottApp.Services.ImageCategoryService;
import com.BoycottApp.BoycottApp.entities.ImageCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/imageCategory")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ImageCategoryController {
    @Autowired
    ImageCategoryService imageCategoryService;
    @PostMapping("/upload/{idCategory}")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file, @PathVariable Long idCategory) throws IOException {
        return imageCategoryService.uploadImage(file,idCategory);

    }

    @GetMapping("/get/{idCategory}")
    public ResponseEntity<ImageCategory> getImageByUseId(@PathVariable Long idCategory){
        return imageCategoryService.getImageByCategoryId(idCategory);
    }

    @PutMapping("/update/{idCategory}")
    public ResponseEntity<String> updateImage(@RequestParam("imageFile")MultipartFile file,@PathVariable Long idCategory) throws IOException {
        return imageCategoryService.updateImage(file,idCategory);
    }

    @DeleteMapping("/delete/{idCategory}")
    public ResponseEntity<String> deleteImage(@PathVariable Long idCategory){
        return imageCategoryService.deleteImage(idCategory);
    }
}
