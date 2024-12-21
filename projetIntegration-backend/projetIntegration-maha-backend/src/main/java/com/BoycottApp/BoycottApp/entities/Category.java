package com.BoycottApp.BoycottApp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "category",cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private List<Product> products;

    @JsonIgnore
    @OneToOne(mappedBy = "category",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private ImageCategory imageCategory;
}
