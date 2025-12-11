package com.medpro.medpro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medpro.medpro.model.dto.DadosAgendamentoConsulta;
import com.medpro.medpro.model.dto.DadosCancelamentoConsulta;
import com.medpro.medpro.model.dto.DadosDetalhamentoConsulta;
import com.medpro.medpro.model.dto.DadosListagemConsulta;
import com.medpro.medpro.model.enums.StatusConsulta;
import com.medpro.medpro.repository.ConsultaRepository;
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
    private ConsultaRepository consultaRepository;

    @Autowired
    private CancelamentoDeConsultasService cancelamentoService;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoConsulta> agendar(@RequestBody @Valid DadosAgendamentoConsulta dados) {
        var dto = agendamentoService.agendar(dados);
        return ResponseEntity.status(201).body(dto);
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemConsulta>> listar() {

        var consultas = consultaRepository.findAllByStatus(StatusConsulta.AGENDADA)
                .stream()
                .map(DadosListagemConsulta::new)
                .toList();

        return ResponseEntity.ok(consultas);
    }

    @PostMapping("/cancelar")
    @Transactional
    public ResponseEntity<Void> cancelar(@RequestBody @Valid DadosCancelamentoConsulta dados) {
        cancelamentoService.cancelar(dados);
        return ResponseEntity.noContent().build();
    }
}
