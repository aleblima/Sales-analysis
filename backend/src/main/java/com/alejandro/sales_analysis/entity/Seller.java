package com.alejandro.sales_analysis.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vendedor")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idvendedor")
    private Integer idSeller;

    @Column(name = "nomevendedor")
    private String sellerName;

    @ManyToOne
    @JoinColumn(name = "idregiao")
    private Region region;
}
