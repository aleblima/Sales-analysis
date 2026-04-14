package com.alejandro.sales_analysis.dto;

import jakarta.validation.constraints.NotBlank;

public record RegionRequestDTO(@NotBlank(message = "Region name cannot be blank") String region) {}
