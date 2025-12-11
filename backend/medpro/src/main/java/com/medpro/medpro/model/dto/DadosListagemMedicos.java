package com.medpro.medpro.model.dto;

import com.medpro.medpro.model.entity.Endereco;
import com.medpro.medpro.model.entity.Medico;
import com.medpro.medpro.model.enums.Especialidade;

public record DadosListagemMedicos(
                Long id,
                String nome,
                String email,
                String crm,
                Especialidade especialidade,
                Endereco endereco) {
        public DadosListagemMedicos(Medico medico) {
                this(medico.getId(), medico.getNome(), medico.getEmail(), medico.getCrm(), medico.getEspecialidade(), medico.getEndereco());
        }

}
