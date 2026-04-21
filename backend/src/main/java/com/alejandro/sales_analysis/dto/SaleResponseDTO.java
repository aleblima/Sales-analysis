package com.alejandro.sales_analysis.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SaleResponseDTO(
    Integer id, BigDecimal total, LocalDate date, String seller, String region) {}
