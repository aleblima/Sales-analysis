package com.alejandro.sales_analysis.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "venda")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idvenda")
    private Integer idSale;

    @ManyToOne
    @JoinColumn(name = "idvendedor")
    private Seller seller;

    @Column(name = "periodo")
    private LocalDate date;

    @Column(name = "total")
    private BigDecimal total;

}
