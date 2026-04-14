package com.alejandro.sales_analysis.controller;

import com.alejandro.sales_analysis.dto.RegionRequestDTO;
import com.alejandro.sales_analysis.dto.RegionResponseDTO;
import com.alejandro.sales_analysis.service.RegionService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class RegionController {
  private final RegionService regionService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public RegionResponseDTO create(@RequestBody @Valid RegionRequestDTO request) {
    return regionService.create(request);
  }

  @GetMapping
  public List<RegionResponseDTO> findAll() {
    return regionService.findAll();
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Integer id) {
    regionService.delete(id);
  }
}
