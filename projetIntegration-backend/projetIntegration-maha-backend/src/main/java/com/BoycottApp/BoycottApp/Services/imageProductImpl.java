package com.BoycottApp.BoycottApp.Services;

import com.BoycottApp.BoycottApp.entities.Category;
import com.BoycottApp.BoycottApp.entities.ImageCategory;
import com.BoycottApp.BoycottApp.entities.ImageProduct;
import com.BoycottApp.BoycottApp.entities.Product;
import com.BoycottApp.BoycottApp.repositories.ImageCategoryRepository;
import com.BoycottApp.BoycottApp.repositories.ImageProductRepository;
import com.BoycottApp.BoycottApp.repositories.ProductRepo;
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
public class imageProductImpl implements ImageProductService {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    ImageProductRepository imageProductRepository;

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file, Long idProduct) throws IOException {
        Optional<Product> product=productRepo.findById(idProduct);
        if(product.isPresent()){
            if(product.get().getImageProduct()!=null){
                return ResponseEntity.badRequest().body("user has already image ");
            }
            ImageProduct image =new ImageProduct();
            image.setName(file.getOriginalFilename());
            image.setPicByte(compressBytes(file.getBytes()));
            image.setProduct(product.get());
            imageProductRepository.save(image);
            return ResponseEntity.ok("Image ("+image.getName()+" ) added user : "+image.getProduct().getName());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<ImageProduct> getImageByProductyId(Long idProduct) {
        Optional<ImageProduct> image = imageProductRepository.findByProductId(idProduct);
        if(image.isPresent()){
            ImageProduct img=image.get();
            img.setPicByte(decompressBytes(img.getPicByte()));
            return ResponseEntity.ok(img);
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    @Override
    public ResponseEntity<String> updateImage(MultipartFile file, Long idProduct) throws IOException {
        Optional<Product> product=productRepo.findById(idProduct);
        if (product.isPresent()){
            if (product.get().getImageProduct()==null){
                return ResponseEntity.badRequest().body("user hasn't image ");
            }
            Product p=product.get();
            ImageProduct image = p.getImageProduct();
            image.setName(file.getOriginalFilename());
            image.setPicByte(compressBytes(file.getBytes()));
            imageProductRepository.save(image);
            return ResponseEntity.ok("image updated");

        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<String> deleteImage(Long idProduct) {
        Optional<Product> product=productRepo.findById(idProduct);
        if(product.isPresent()){
            ImageProduct img=product.get().getImageProduct();
            if(img!=null){
                imageProductRepository.delete(img);
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
