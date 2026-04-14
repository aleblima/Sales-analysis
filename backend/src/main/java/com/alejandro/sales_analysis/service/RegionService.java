package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.RegionRequestDTO;
import com.alejandro.sales_analysis.dto.RegionResponseDTO;
import java.util.List;

public interface RegionService {
  RegionResponseDTO create(RegionRequestDTO regionRequestDTO);

  List<RegionResponseDTO> findAll();

  void delete(Integer idregion);
}
