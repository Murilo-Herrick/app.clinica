package com.medpro.medpro.model.dto;

import com.medpro.medpro.model.entity.Endereco;
import com.medpro.medpro.model.entity.Medico;
import com.medpro.medpro.model.enums.Especialidade;

public record DadosDetalhamentoMedico(
        Long id,
        String nome,
        String email,
        String telefone,
        String crm,
        Especialidade especialidade,
        Endereco endereco) {
    public DadosDetalhamentoMedico(Medico medico) {
        this(medico.getId(),
                medico.getNome(),
                medico.getEmail(),
                medico.getTelefone(),
                medico.getCrm(),
                medico.getEspecialidade(),
                medico.getEndereco());
    };
}
