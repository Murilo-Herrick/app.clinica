create table consultas (
    id bigint not null auto_increment,
    medico_id bigint not null,
    paciente_id bigint not null,
    data datetime not null,
    status varchar(20) not null,
    motivo_cancelamento varchar(255),

    primary key(id),

    constraint fk_consultas_medico foreign key (medico_id) references medicos(id),
    constraint fk_consultas_paciente foreign key (paciente_id) references pacientes(id)
);