package com.alejandro.sales_analysis.dto;

import com.alejandro.sales_analysis.entity.Sale;
import java.math.BigDecimal;
import java.time.LocalDate;

public record SaleResponseDTO(
    Integer id, BigDecimal total, LocalDate date, String seller, String region) {

  public SaleResponseDTO(Sale sale) {
    this(
        sale.getIdSale(),
        sale.getTotal(),
        sale.getDate(),
        sale.getSellerName(),
        sale.getRegionName());
  }
}
