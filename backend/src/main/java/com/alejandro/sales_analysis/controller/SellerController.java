package com.alejandro.sales_analysis.controller;

import com.alejandro.sales_analysis.dto.SellerRequestDTO;
import com.alejandro.sales_analysis.dto.SellerResponseDTO;
import com.alejandro.sales_analysis.service.SellerService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
public class SellerController {
    private final SellerService sellerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SellerResponseDTO create (@RequestBody @Valid SellerRequestDTO request) {
        return sellerService.create(request);
    }
    
    @GetMapping
    public List<SellerResponseDTO> findAll() { return sellerService.findAll(); }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id){ sellerService.delete(id); }
}
