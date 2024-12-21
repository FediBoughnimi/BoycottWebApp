package com.BoycottApp.BoycottApp.DTO;

import com.BoycottApp.BoycottApp.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseProductDTO {
    private Long id;
    private String name;
    private Long BarCode;
    private String Brand;
    private String Raison;
    private String alternative;
    private String alternativeSourceLink;
    private Category category;
}
