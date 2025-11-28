package com.medpro.medpro.service;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medpro.medpro.model.dto.DadosCancelamentoConsulta;
import com.medpro.medpro.model.entity.Consulta;
import com.medpro.medpro.repository.ConsultaRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CancelamentoDeConsultasService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Transactional
    public void cancelar(DadosCancelamentoConsulta dados) {

        Consulta consulta = consultaRepository.findById(dados.idConsulta())
                .orElseThrow(() -> new EntityNotFoundException("Consulta não encontrada"));

        LocalDateTime agora = LocalDateTime.now();
        long horasDeDiferenca = Duration.between(agora, consulta.getData()).toHours();

        if (horasDeDiferenca < 24) {
            throw new IllegalArgumentException("Consulta só pode ser cancelada com pelo menos 24 horas de antecedência.");
        }

        consulta.cancelar(dados.motivo());
    }
}
