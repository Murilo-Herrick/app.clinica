alter table pacientes add column ativo tinyint(1) default 1;
update pacientes set ativo = 1 where ativo is null;