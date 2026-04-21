package com.alejandro.sales_analysis.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public record SaleRequestDTO(
    @NotNull(message = "Seller id cannot be null") Integer idSeller,
    @NotNull(message = "date cannot be null") LocalDate date,
    @NotNull(message = "total cannot be null") BigDecimal total) {}
