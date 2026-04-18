package com.alejandro.sales_analysis.dto;

import com.alejandro.sales_analysis.entity.Seller;

public record SellerResponseDTO(Integer id, String name, String region) {

    public SellerResponseDTO(Seller seller){ this(seller.getIdSeller(),
            seller.getSellerName(),
            seller.getRegion().getRegionName()); }
}
