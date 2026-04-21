package com.alejandro.sales_analysis.repository;

import com.alejandro.sales_analysis.entity.Sale;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Integer> {
  List<Sale> findSaleBySeller_IdSeller(Integer idSeller);

  List<Sale> findSaleByDateBetween(LocalDate dateBefore, LocalDate dateAfter);

  List<Sale> findSaleBySeller_IdSellerAndDateBetween(
      Integer IdSeller, LocalDate dateBefore, LocalDate dateAfter);
}
