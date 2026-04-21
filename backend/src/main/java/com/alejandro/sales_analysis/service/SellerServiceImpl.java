package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.SellerRequestDTO;
import com.alejandro.sales_analysis.dto.SellerResponseDTO;
import com.alejandro.sales_analysis.entity.Region;
import com.alejandro.sales_analysis.entity.Seller;
import com.alejandro.sales_analysis.repository.RegionRepository;
import com.alejandro.sales_analysis.repository.SellerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
  private final SellerRepository sellerRepository;
  private final RegionRepository regionRepository;

  @Override
  public SellerResponseDTO create(SellerRequestDTO sellerRequestDTO) {
    Seller seller = new Seller();
    Region region = regionRepository.findById(sellerRequestDTO.idregion()).orElseThrow();
    seller.setSellerName(sellerRequestDTO.name());
    seller.setRegion(region);
    seller = sellerRepository.save(seller);
    return new SellerResponseDTO(seller);
  }

  @Override
  public List<SellerResponseDTO> findAll() {
    return sellerRepository.findAll().stream().map(SellerResponseDTO::new).toList();
  }

  @Override
  public void delete(Integer idSeller) {
    sellerRepository.deleteById(idSeller);
  }
}
