package com.medpro.medpro.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medpro.medpro.model.entity.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    Page<Medico> findAllByAtivoTrue(Pageable paginacao);

    @Query(value = """
            select m.*
            from medicos m
            where m.ativo = 1
              and m.especialidade = :especialidade
              and m.id not in (
                   select c.medico_id from consultas c where c.data = :data
              )
            order by rand()
            limit 1
            """, nativeQuery = true)
    Medico escolherMedicoAleatorioLivreNaData(
            @Param("especialidade") String especialidade,
            @Param("data") LocalDateTime data);
}
