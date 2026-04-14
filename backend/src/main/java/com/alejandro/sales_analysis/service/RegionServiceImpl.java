package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.RegionRequestDTO;
import com.alejandro.sales_analysis.dto.RegionResponseDTO;
import com.alejandro.sales_analysis.entity.Region;
import com.alejandro.sales_analysis.repository.RegionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService {
  private final RegionRepository regionRepository;

  @Override
  public RegionResponseDTO create(RegionRequestDTO regionRequestDTO) {
    Region region = new Region();
    region.setRegionName(regionRequestDTO.region());
    region = regionRepository.save(region);
    return new RegionResponseDTO(region);
  }

  @Override
  public List<RegionResponseDTO> findAll() {
    return regionRepository.findAll().stream().map(RegionResponseDTO::new).toList();
  }

  @Override
  public void delete(Integer idregion) {
    regionRepository.deleteById(idregion);
  }
}
