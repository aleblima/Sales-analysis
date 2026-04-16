package com.alejandro.sales_analysis.repository;

import com.alejandro.sales_analysis.entity.Seller;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Integer> {
    List<Seller> findByRegion_IdRegion(Integer regionIdRegion);
}
