package com.alejandro.sales_analysis.service;

import com.alejandro.sales_analysis.dto.SaleRequestDTO;
import com.alejandro.sales_analysis.dto.SaleResponseDTO;
import com.alejandro.sales_analysis.entity.Sale;
import com.alejandro.sales_analysis.entity.Seller;
import com.alejandro.sales_analysis.repository.SaleRepository;
import com.alejandro.sales_analysis.repository.SellerRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {
  private final SaleRepository saleRepository;
  private final SellerRepository sellerRepository;

  @Override
  public SaleResponseDTO create(SaleRequestDTO saleRequestDTO) {
    Sale sale = new Sale();
    Seller seller = sellerRepository.findById(saleRequestDTO.idSeller()).orElseThrow();
    sale.setSeller(seller);
    sale.setDate(saleRequestDTO.date());
    sale.setTotal(saleRequestDTO.total());
    sale = saleRepository.save(sale);
    return responseDTO(sale);
  }

  @Override
  public List<SaleResponseDTO> findAll() {
    return saleRepository.findAll().stream().map(this::responseDTO).toList();
  }

  @Override
  public void delete(Integer id) {
    saleRepository.deleteById(id);
  }

  @Override
  public List<SaleResponseDTO> findBySeller(Integer idSeller) {
    return saleRepository.findSaleBySeller_IdSeller(idSeller).stream()
        .map(this::responseDTO)
        .toList();
  }

  @Override
  public List<SaleResponseDTO> findByDateBetween(LocalDate dateBefore, LocalDate dateAfter) {
    return saleRepository.findSaleByDateBetween(dateBefore, dateAfter).stream()
        .map(this::responseDTO)
        .toList();
  }

  @Override
  public List<SaleResponseDTO> findBySellerAndDateBetween(
      Integer idSeller, LocalDate dateBefore, LocalDate dateAfter) {
    return saleRepository
        .findSaleBySeller_IdSellerAndDateBetween(idSeller, dateBefore, dateAfter)
        .stream()
        .map(this::responseDTO)
        .toList();
  }

  private String getRegionName(Sale sale) {
    return (sale.getSeller() != null) ? sale.getSeller().getRegion().getRegionName() : "Sem região";
  }

  private String getSellerName(Sale sale) {
    return (sale.getSeller() != null) ? sale.getSeller().getSellerName() : "Sem vendedor";
  }

  private SaleResponseDTO responseDTO(Sale sale) {
    return new SaleResponseDTO(
        sale.getIdSale(),
        sale.getTotal(),
        sale.getDate(),
        getSellerName(sale),
        getRegionName(sale));
  }
}
