package com.BoycottApp.BoycottApp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ImageProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Lob
    @Column(name = "picByte", columnDefinition = "LONGBLOB")
    byte[] picByte;

    @OneToOne
    @JoinTable(name = "image_product_assotiation")
    private Product product;
}