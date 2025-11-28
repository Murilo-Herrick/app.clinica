package com.medpro.medpro.service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medpro.medpro.model.dto.DadosAgendamentoConsulta;
import com.medpro.medpro.model.dto.DadosDetalhamentoConsulta;
import com.medpro.medpro.model.entity.Consulta;
import com.medpro.medpro.model.entity.Medico;
import com.medpro.medpro.model.entity.Paciente;
import com.medpro.medpro.model.enums.Especialidade;
import com.medpro.medpro.repository.ConsultaRepository;
import com.medpro.medpro.repository.MedicoRepository;
import com.medpro.medpro.repository.PacienteRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class AgendamentoDeConsultasService {

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ConsultaRepository consultaRepository;

    @Transactional
    public DadosDetalhamentoConsulta agendar(DadosAgendamentoConsulta dados) {

        Paciente paciente = pacienteRepository.findById(dados.idPaciente())
                .orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado"));

        if (Boolean.FALSE.equals(paciente.getAtivo())) {
            throw new IllegalArgumentException("Paciente inativo.");
        }

        LocalDateTime dataConsulta = dados.data();

        // domingo não
        if (dataConsulta.getDayOfWeek() == DayOfWeek.SUNDAY) {
            throw new IllegalArgumentException("Consultas não podem ser marcadas aos domingos.");
        }

        // horario permitido: 07:00 às 19:00
        LocalTime horario = dataConsulta.toLocalTime();
        var abertura = LocalTime.of(7, 0);
        var fechamento = LocalTime.of(19, 0);

        if (horario.isBefore(abertura) || horario.isAfter(fechamento)) {
            throw new IllegalArgumentException("Horário fora do expediente (07:00 às 19:00).");
        }

        // antecedencia minima de 30 minutos
        LocalDateTime agora = LocalDateTime.now();
        long minutosAteConsulta = Duration.between(agora, dataConsulta).toMinutes();

        if (minutosAteConsulta < 30) {
            throw new IllegalArgumentException("Consulta deve ser agendada com pelo menos 30 minutos de antecedência.");
        }

        // paciente não pode ter outra consulta no dia
        LocalDateTime inicioDia = dataConsulta.toLocalDate().atStartOfDay();
        LocalDateTime fimDia = dataConsulta.toLocalDate().atTime(23, 59, 59);

        boolean pacienteTemConsultaNoDia = consultaRepository.existsByPacienteIdAndDataBetween(
                paciente.getId(), inicioDia, fimDia);

        if (pacienteTemConsultaNoDia) {
            throw new IllegalArgumentException("Paciente já possui consulta neste dia.");
        }

        Medico medico = escolherMedico(dados.idMedico(), dados.especialidade(), dataConsulta);

        if (Boolean.FALSE.equals(medico.getAtivo())) {
            throw new IllegalArgumentException("Médico inativo.");
        }

        // medico não pode ter outra consulta nesse horario (backup da regra, caso mude a query)
        boolean medicoOcupado = consultaRepository.existsByMedicoIdAndData(medico.getId(), dataConsulta);
        if (medicoOcupado) {
            throw new IllegalArgumentException("Médico já possui consulta neste horário.");
        }

        Consulta consulta = new Consulta(medico, paciente, dataConsulta);
        consultaRepository.save(consulta);

        return new DadosDetalhamentoConsulta(consulta);
    }

    private Medico escolherMedico(Long idMedico, Especialidade especialidade, LocalDateTime dataConsulta) {

        // fluxo 1: veio id do medico -> usa ele
        if (idMedico != null) {
            return medicoRepository.findById(idMedico)
                    .orElseThrow(() -> new EntityNotFoundException("Médico não encontrado"));
        }

        // fluxo 2: não veio medico, mas veio especialidade -> escolher automatico
        if (especialidade == null) {
            throw new IllegalArgumentException("Informe o id do médico ou a especialidade.");
        }

        Medico medico = medicoRepository.escolherMedicoAleatorioLivreNaData(
                especialidade.name(),
                dataConsulta
        );

        if (medico == null) {
            throw new IllegalArgumentException("Não há médicos disponíveis para esta especialidade neste horário.");
        }

        return medico;
    }
}
