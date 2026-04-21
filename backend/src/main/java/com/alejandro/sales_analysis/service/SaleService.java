package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.SaleRequestDTO;
import com.alejandro.sales_analysis.dto.SaleResponseDTO;
import java.time.LocalDate;
import java.util.List;

public interface SaleService {

  SaleResponseDTO create(SaleRequestDTO saleRequestDTO);

  List<SaleResponseDTO> findAll();

  void delete(Integer id);

  List<SaleResponseDTO> findBySeller(Integer idSeller);

  List<SaleResponseDTO> findByDateBetween(LocalDate dateBefore, LocalDate dateAfter);

  List<SaleResponseDTO> findBySellerAndDateBetween(
      Integer idSeller, LocalDate dateBefore, LocalDate dateAfter);
}
