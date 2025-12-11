package com.medpro.medpro.model.dto;

import com.medpro.medpro.model.entity.Endereco;
import com.medpro.medpro.model.entity.Paciente;

public record DadosListagemPacientes(
        Long id,
        String nome,
        String email,
        String telefone,
        String cpf,
        Endereco endereco
) {
    public DadosListagemPacientes(Paciente paciente) {
        this(
            paciente.getId(),
            paciente.getNome(),
            paciente.getEmail(),
            paciente.getTelefone(),
            paciente.getCpf(),
            paciente.getEndereco()
        );
    }
}
