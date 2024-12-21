package com.BoycottApp.BoycottApp.Services;

import com.BoycottApp.BoycottApp.entities.Category;
import com.BoycottApp.BoycottApp.entities.Product;
import com.BoycottApp.BoycottApp.repositories.CategoryRepo;
import com.BoycottApp.BoycottApp.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRepo categoryRepository;
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepo.findById(id);
    }
    public List<Product> getProductsByCategoryId(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if (category.isPresent()) {
            return productRepo.findByCategoryId(categoryId);
        }
        throw new RuntimeException("Category not found with id: " + categoryId);
    }


    public Product addProduct(Product product, Long idCategory) {
        Optional<Category> category = categoryRepository.findById(idCategory);
        if (category.isPresent()) {
            product.setCategory(category.get());
            return productRepo.save(product);
        }
        throw new RuntimeException("Category not found with id: " + idCategory);
    }


    public Product updateProduct(Long id, Product updatedProduct, Long idCategory) {
        Optional<Product> existingProduct = productRepo.findById(id);
        if (existingProduct.isPresent()) {
            Product product = existingProduct.get();

            product.setName(updatedProduct.getName());
            product.setBarcode(updatedProduct.getBarcode());
            product.setBrand(updatedProduct.getBrand());
            product.setRaison(updatedProduct.getRaison());
            product.setAlternative(updatedProduct.getAlternative());
            product.setAlternativeSourceLink(updatedProduct.getAlternativeSourceLink());

            Optional<Category> category = categoryRepository.findById(idCategory);
            if (category.isPresent()) {
                product.setCategory(category.get());
            } else {
                throw new RuntimeException("Category not found with id: " + idCategory);
            }

            return productRepo.save(product);
        }
        return null;
    }



    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
}
