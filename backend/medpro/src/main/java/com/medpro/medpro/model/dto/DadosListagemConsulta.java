package com.medpro.medpro.model.dto;

import java.time.LocalDateTime;

import com.medpro.medpro.model.entity.Consulta;
import com.medpro.medpro.model.enums.Especialidade;

public record DadosListagemConsulta(
        Long id,
        String medicoNome,
        Especialidade especialidade,
        String pacienteNome,
        LocalDateTime data
) {

    public DadosListagemConsulta(Consulta c) {
        this(
            c.getId(),
            c.getMedico().getNome(),
            c.getMedico().getEspecialidade(),
            c.getPaciente().getNome(),
            c.getData()
        );
    }
}
