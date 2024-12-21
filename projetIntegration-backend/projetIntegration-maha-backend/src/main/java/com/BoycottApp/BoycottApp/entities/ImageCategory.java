package com.BoycottApp.BoycottApp.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ImageCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Lob
    @Column(name = "picByte", columnDefinition = "LONGBLOB")
    byte[] picByte;

    @OneToOne
    @JoinTable(name = "image_category_assotiation")
    private Category category;
}





