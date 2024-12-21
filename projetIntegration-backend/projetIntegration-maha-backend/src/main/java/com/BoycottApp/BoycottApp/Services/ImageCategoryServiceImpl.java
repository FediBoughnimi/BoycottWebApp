package com.BoycottApp.BoycottApp.Services;

import com.BoycottApp.BoycottApp.entities.Category;
import com.BoycottApp.BoycottApp.entities.ImageCategory;
import com.BoycottApp.BoycottApp.repositories.CategoryRepo;
import com.BoycottApp.BoycottApp.repositories.ImageCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class ImageCategoryServiceImpl implements ImageCategoryService{

    @Autowired
    CategoryRepo categoryRepo;

    @Autowired
    ImageCategoryRepository imageCategoryRepository;

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file, Long idCategory) throws IOException {
        Optional<Category> category=categoryRepo.findById(idCategory);
        if(category.isPresent()){
            if(category.get().getImageCategory()!=null){
                return ResponseEntity.badRequest().body("user has already image ");
            }
            ImageCategory image =new ImageCategory();
            image.setName(file.getOriginalFilename());
            image.setPicByte(compressBytes(file.getBytes()));
            image.setCategory(category.get());
            imageCategoryRepository.save(image);
            return ResponseEntity.ok("Image ("+image.getName()+" ) added user : "+image.getCategory().getName());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<ImageCategory> getImageByCategoryId(Long idCategory) {
        Optional<ImageCategory> image = imageCategoryRepository.findByCategoryId(idCategory);
        if(image.isPresent()){
            ImageCategory img=image.get();
            img.setPicByte(decompressBytes(img.getPicByte()));
            return ResponseEntity.ok(img);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> updateImage(MultipartFile file, Long idCategory) throws IOException {
        Optional<Category> user=categoryRepo.findById(idCategory);
        if (user.isPresent()){
            if (user.get().getImageCategory()==null){
                return ResponseEntity.badRequest().body("user hasn't image ");
            }
            Category user1=user.get();
            ImageCategory image = user1.getImageCategory();
            image.setName(file.getOriginalFilename());
            image.setPicByte(compressBytes(file.getBytes()));
            imageCategoryRepository.save(image);
            return ResponseEntity.ok("image updated");

        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> deleteImage(Long idCategory) {
        Optional<Category> user=categoryRepo.findById(idCategory);
        if(user.isPresent()){
            ImageCategory img=user.get().getImageCategory();
            if(img!=null){
                imageCategoryRepository.delete(img);
                return ResponseEntity.ok("image deleted !");
            }
        }
        return null;
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}
