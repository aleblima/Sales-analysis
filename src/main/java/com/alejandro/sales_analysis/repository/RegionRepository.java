package com.alejandro.sales_analysis.repository;

import com.alejandro.sales_analysis.entity.Region;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<Region, Integer> {
  Optional<Region> findByRegionNameIgnoreCase(String regionName);
}
