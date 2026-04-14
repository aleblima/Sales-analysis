package com.alejandro.sales_analysis.dto;

import com.alejandro.sales_analysis.entity.Region;

public record RegionResponseDTO(Integer id, String nome) {

  public RegionResponseDTO(Region region) {
    this(region.getIdRegion(), region.getRegionName());
  }
}
