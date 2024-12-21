package com.BoycottApp.BoycottApp.DTO;

import com.BoycottApp.BoycottApp.entities.Category;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private Long barCode;
    private String brand;
    private String raison;
    private String Alternative;
    private String AlternativeSourceLink;
    private Category category;
}
