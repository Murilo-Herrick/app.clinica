package com.medpro.medpro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medpro.medpro.model.dto.DadosAgendamentoConsulta;
import com.medpro.medpro.model.dto.DadosCancelamentoConsulta;
import com.medpro.medpro.model.dto.DadosDetalhamentoConsulta;
import com.medpro.medpro.service.AgendamentoDeConsultasService;
import com.medpro.medpro.service.CancelamentoDeConsultasService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("consultas")
public class ConsultaController {

    @Autowired
    private AgendamentoDeConsultasService agendamentoService;

    @Autowired
    private CancelamentoDeConsultasService cancelamentoService;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoConsulta> agendar(@RequestBody @Valid DadosAgendamentoConsulta dados) {
        var dto = agendamentoService.agendar(dados);
        return ResponseEntity.status(201).body(dto);
    }

    @PostMapping("/cancelar")
    @Transactional
    public ResponseEntity<Void> cancelar(@RequestBody @Valid DadosCancelamentoConsulta dados) {
        cancelamentoService.cancelar(dados);
        return ResponseEntity.noContent().build();
    }
}
