package com.alejandro.sales_analysis.controller;

import com.alejandro.sales_analysis.dto.SaleRequestDTO;
import com.alejandro.sales_analysis.dto.SaleResponseDTO;
import com.alejandro.sales_analysis.service.SaleService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
  private final SaleService saleService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SaleResponseDTO create(@RequestBody @Valid SaleRequestDTO request) {
    return saleService.create(request);
  }

  @GetMapping
  public List<SaleResponseDTO> findAll() {
    return saleService.findAll();
  }

  @GetMapping("/seller")
  public List<SaleResponseDTO> findBySeller(@RequestParam Integer idSeller) {
    return saleService.findBySeller(idSeller);
  }

  @GetMapping("/date")
  public List<SaleResponseDTO> findByDateBetween(
      @RequestParam LocalDate dateBefore, @RequestParam LocalDate dateAfter) {
    return saleService.findByDateBetween(dateBefore, dateAfter);
  }

  @GetMapping("/seller-date")
  public List<SaleResponseDTO> findBySellerAndDateBetween(
      @RequestParam Integer idSeller,
      @RequestParam LocalDate dateBefore,
      @RequestParam LocalDate dateAfter) {
    return saleService.findBySellerAndDateBetween(idSeller, dateBefore, dateAfter);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Integer id) {
    saleService.delete(id);
  }
}
