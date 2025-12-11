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

        @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
        public ResponseEntity<ErroResponse> tratarDuplicidade(DataIntegrityViolationException ex,
                        HttpServletRequest request) {

                String mensagem = "Violação de integridade.";

                if (ex.getMessage() != null && ex.getMessage().contains("cpf")) {
                        mensagem = "Já existe um paciente cadastrado com esse CPF.";
                }

                var body = new ErroResponse(
                                LocalDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                "Data Integrity Violation",
                                mensagem,
                                request.getRequestURI());

                return ResponseEntity.badRequest().body(body);
        }

}
