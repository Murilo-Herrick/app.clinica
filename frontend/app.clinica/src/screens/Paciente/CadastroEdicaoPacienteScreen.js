// src/screens/Paciente/CadastroEdicaoPacienteScreen.js
import React from "react";
import { View, Alert } from "react-native";
import FormularioPaciente from "../../components/FormularioPaciente";
import {
  cadastrarPaciente,
  atualizarPaciente,
} from "../../services/pacienteService";

const CadastroEdicaoPacienteScreen = ({
  route,
  navigation,
  pacientes,
  setPacientes,
}) => {
  const paciente = route?.params?.paciente ?? null;

  const handleSubmit = async (formData, isEditing) => {
    try {
      const payloadBase = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: {
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          cep: formData.cep,
          cidade: formData.cidade,
          uf: formData.uf,
          numero: formData.numero,
          complemento: formData.complemento,
        },
      };

      if (isEditing && paciente?.id) {
        const response = await atualizarPaciente({
          id: paciente.id,
          ...payloadBase,
        });

        setPacientes((lista) =>
          lista.map((p) => (p.id === response.id ? response : p))
        );
      } else {
        const response = await cadastrarPaciente(payloadBase);
        setPacientes((lista) => [...lista, response]);
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erro",
        "Não foi possível salvar o paciente. Verifique os dados e tente novamente."
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <FormularioPaciente
        paciente={paciente}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default CadastroEdicaoPacienteScreen;
