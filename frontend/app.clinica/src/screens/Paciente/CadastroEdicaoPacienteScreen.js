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
      // CEP: remove máscara, deixa só dígitos
      const cepLimpo = formData.cep ? formData.cep.replace(/\D/g, "") : "";

      if (cepLimpo && cepLimpo.length !== 8) {
        Alert.alert("Erro", "CEP deve ter 8 dígitos.");
        return;
      }

      // Payload completo (para CADASTRO) -> DadosCadastroPaciente
      const payloadCadastro = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: {
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          cep: cepLimpo,
          cidade: formData.cidade,
          uf: formData.uf,
          numero: formData.numero,
          complemento: formData.complemento,
        },
      };

      if (isEditing && paciente?.id) {
        // ATUALIZAÇÃO -> DadosAtualizacaoPaciente { id, nome?, telefone?, endereco? }

        // garante telefone não vazio (usa o antigo se o usuário apagar)
        const telefoneForm = (formData.telefone ?? "").trim();
        const telefoneOriginal = (paciente?.telefone ?? "").trim();
        const telefoneFinal = telefoneForm || telefoneOriginal;

        if (!telefoneFinal) {
          Alert.alert("Erro", "Telefone não pode estar em branco.");
          return;
        }

        const cepLimpoUpdate = formData.cep
          ? formData.cep.replace(/\D/g, "")
          : "";

        const complementoForm = (formData.complemento ?? "").trim();
        const complementoOriginal =
          (paciente?.endereco?.complemento ?? "").trim();
        const complementoFinal =
          complementoForm || complementoOriginal || "Sem complemento";

        // Só envia endereco se tiver pelo menos os campos obrigatórios preenchidos
        const enderecoPreenchido =
          formData.logradouro &&
          formData.bairro &&
          cepLimpoUpdate &&
          formData.cidade &&
          formData.uf;

        const payloadAtualizacao = {
          id: paciente.id,
          nome: formData.nome,
          telefone: telefoneFinal,
        };

        if (enderecoPreenchido) {
          payloadAtualizacao.endereco = {
            logradouro: formData.logradouro,
            bairro: formData.bairro,
            cep: cepLimpoUpdate,
            cidade: formData.cidade,
            uf: formData.uf,
            numero: formData.numero,
            complemento: complementoFinal,
          };
        }

        console.log(
          "🔵 Payload ATUALIZAR paciente:",
          JSON.stringify(payloadAtualizacao, null, 2)
        );

        const response = await atualizarPaciente(payloadAtualizacao);

        setPacientes((lista) =>
          lista.map((p) => (p.id === response.id ? response : p))
        );
      } else {
        console.log(
          "🟢 Payload CADASTRAR paciente:",
          JSON.stringify(payloadCadastro, null, 2)
        );

        const response = await cadastrarPaciente(payloadCadastro);
        setPacientes((lista) => [...lista, response]);
      }

      navigation.goBack();
    } catch (error) {
      console.log("❌ ERRO AO SALVAR PACIENTE", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA BACKEND:", error.response?.data);
      console.log("REQUEST URL:", error.config?.url);

      const backendMessage =
        error.response?.data?.message ||
        (Array.isArray(error.response?.data?.messages)
          ? error.response.data.messages.join("\n")
          : null);

      Alert.alert(
        "Erro",
        backendMessage ||
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
