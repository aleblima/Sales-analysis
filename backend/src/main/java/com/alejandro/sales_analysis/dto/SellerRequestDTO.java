package com.alejandro.sales_analysis.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SellerRequestDTO(@NotBlank(message = "Seller name cannot be blank") String name,
                               @NotNull(message = "Region cannot be blank") Integer idregion) {}
