package com.medpro.medpro.infra.exception;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class TratadorDeErros {

    record ErroResponse(
            LocalDateTime timestamp,
            int status,
            String error,
            String message,
            String path) {
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErroResponse> tratar404(EntityNotFoundException ex, HttpServletRequest request) {
        var body = new ErroResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErroResponse> tratar400(IllegalArgumentException ex, HttpServletRequest request) {
        var body = new ErroResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Bad Request",
                ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> tratarValidacao(MethodArgumentNotValidException ex, HttpServletRequest req) {

        var erros = ex.getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .toList();

        return ResponseEntity.badRequest().body(
                Map.of(
                        "status", 400,
                        "error", "Validation Error",
                        "messages", erros,
                        "path", req.getRequestURI()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErroResponse> tratarDuplicidade(DataIntegrityViolationException ex,
            HttpServletRequest request) {

        String mensagem = "Violação de integridade de dados.";

        // Pega a root cause do banco (MySQL / Hibernate)
        String detalhe = null;
        if (ex.getRootCause() != null && ex.getRootCause().getMessage() != null) {
            detalhe = ex.getRootCause().getMessage().toLowerCase();
        } else if (ex.getMessage() != null) {
            detalhe = ex.getMessage().toLowerCase();
        }

        if (detalhe != null) {
            // MEDICOS
            if (detalhe.contains("medico") || detalhe.contains("medicos")) {

                if (detalhe.contains("crm")) {
                    mensagem = "Já existe um médico cadastrado com esse CRM.";
                } else if (detalhe.contains("email")) {
                    mensagem = "Já existe um médico cadastrado com esse e-mail.";
                } else if (detalhe.contains("telefone") || detalhe.contains("fone") || detalhe.contains("phone")) {
                    mensagem = "Já existe um médico cadastrado com esse telefone.";
                }

            // PACIENTES
            } else if (detalhe.contains("paciente") || detalhe.contains("pacientes")) {

                if (detalhe.contains("cpf")) {
                    mensagem = "Já existe um paciente cadastrado com esse CPF.";
                } else if (detalhe.contains("email")) {
                    mensagem = "Já existe um paciente cadastrado com esse e-mail.";
                } else if (detalhe.contains("telefone") || detalhe.contains("fone") || detalhe.contains("phone")) {
                    mensagem = "Já existe um paciente cadastrado com esse telefone.";
                }
            }

            // fallback: se usar nomes de constraints do tipo UK_medicos_crm, UK_pacientes_email etc.
            if (mensagem.equals("Violação de integridade de dados.")) {
                if (detalhe.contains("uk") && detalhe.contains("crm")) {
                    mensagem = "CRM já cadastrado.";
                } else if (detalhe.contains("uk") && detalhe.contains("cpf")) {
                    mensagem = "CPF já cadastrado.";
                } else if (detalhe.contains("uk") && detalhe.contains("email")) {
                    mensagem = "E-mail já cadastrado.";
                } else if (detalhe.contains("uk") && (detalhe.contains("tel") || detalhe.contains("fone"))) {
                    mensagem = "Telefone já cadastrado.";
                }
            }
        }

        var body = new ErroResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Data Integrity Violation",
                mensagem,
                request.getRequestURI());

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErroResponse> tratar500(Exception ex, HttpServletRequest request) {
        var body = new ErroResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

}
