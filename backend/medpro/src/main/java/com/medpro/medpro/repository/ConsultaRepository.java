package com.medpro.medpro.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medpro.medpro.model.entity.Consulta;
import com.medpro.medpro.model.enums.StatusConsulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    boolean existsByMedicoIdAndData(Long idMedico, LocalDateTime data);

    boolean existsByPacienteIdAndDataBetween(Long idPaciente, LocalDateTime inicio, LocalDateTime fim);

    List<Consulta> findAllByStatus(StatusConsulta status);
}
