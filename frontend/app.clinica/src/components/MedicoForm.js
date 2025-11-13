import React, { useState, useEffect, use, useSyncExternalStore } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Value } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';

const especialidades = ['Selecionar...', 'Cardiologia', 'Pediatria', 'Dermatologia', 'Neurologia', 'Oftalmologia', 'Clinica Geral'];

const initialMedicoState = {
    nome: '',
    especialidade: especialidades[0],
    crm: '',
    email: '',
    telefone: '',
    logradouro: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: '',
    cep: ''
};

const MedicoForm = ({ medico, onSave, onCancel, navigation }) => {
    // 1. Inicializa o estado com base no prop 'medico' se null então será inicializado com initialMedicoState
    const [formData, setFormData] = useState(medico || initialMedicoState);

    // 2. Será utilizado para rastrear erros de validação
    const [errors, setErrors] = useState({});

    // 3. Define o titulo do botão em função do modo Cadastro / Alteração
    const isEditing = !!medico;
    const buttonTitle = isEditing ? "Concluir Edição" : "Concluir Cadastro";

    // 4. Campos obrigatorios'
    const requireFields = ['nome', 'especialidade', 'crm', 'email', 'telefone', 'logradouro', 'numero', 'cidade', 'uf', 'cep']

    useEffect(() => { setFormData(medico || initialMedicoState) }, [medico])

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErros(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            })
        }
    };

    // Função de validação
    const validade = () => {
        let valid = true;
        const newErrors = {};

        requireFields.forEach(field => {
            // Verificação de campo vazio ou apenas de espaço em branco
            if (!formData[field] || String(formData[field]).trim() === '') {
                newErrors[field] = 'Campo Obrigatorio!';
                valid = false;
            }
        });
        setErrors(newErrors);
        return valid;
    }

    // Função de submissão do formulário
    const handleSubmit = () => {
        if (validade()) {
            // Supondoque a função lida com a logica de API/Estado
            onSave(formData);
            Alert.alert(
                isEditing ? 'Sucesso' : 'Cadastro concluido',
                isEditing ? 'Dados do Medico atualizados.' : 'Novo medico cadastrado.'
            );
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Por favor, preencha todos os campos.');
        }
    }
}