package com.BoycottApp.BoycottApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private Long barcode; // Code-barres unique

    private String brand;

    private String raison;

    private String alternative;

    private String alternativeSourceLink;

    @ManyToOne
    @JoinColumn(name = "category_id") // Pour spécifier le nom de la colonne FK
    private Category category;

    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private ImageProduct imageProduct;
}
