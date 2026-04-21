package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.SellerRequestDTO;
import com.alejandro.sales_analysis.dto.SellerResponseDTO;
import java.util.List;

public interface SellerService {
    SellerResponseDTO create(SellerRequestDTO sellerRequestDTO);

    List<SellerResponseDTO> findAll();

    void delete(Integer idSeller);
}
