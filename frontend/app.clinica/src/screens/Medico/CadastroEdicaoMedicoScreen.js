// src/screens/Medico/CadastroEdicaoMedicoScreen.js
import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import FormularioMedico from "../../components/FormularioMedico";
import {
  cadastrarMedico,
  atualizarMedico,
  detalharMedico,
} from "../../services/medicoService";

const CadastroEdicaoMedicoScreen = ({
  route,
  navigation,
  medicos,
  setMedicos,
}) => {
  const medicoBasico = route?.params?.medico ?? null;

  const [medico, setMedico] = useState(medicoBasico);
  const [loading, setLoading] = useState(false);

  // Quando for edição, carrega dados completos se não tiver telefone
  useEffect(() => {
    const carregarDetalhes = async () => {
      if (medicoBasico?.id && !medicoBasico.telefone) {
        try {
          setLoading(true);
          const detalhes = await detalharMedico(medicoBasico.id);
          setMedico(detalhes);
        } catch (error) {
          console.log("Erro ao carregar detalhes do médico:", error);
          Alert.alert(
            "Erro",
            "Não foi possível carregar os dados completos do médico."
          );
        } finally {
          setLoading(false);
        }
      }
    };

    carregarDetalhes();
  }, [medicoBasico]);

  const handleSubmit = async (formData, isEditing) => {
    try {
      const cepLimpo = formData.cep ? formData.cep.replace(/\D/g, "") : "";

      const payloadCadastro = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        crm: formData.crm,
        especialidade: formData.especialidade,
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

      if (isEditing && medico?.id) {
        const telefoneForm = (formData.telefone ?? "").trim();
        const telefoneOriginal = (medico?.telefone ?? "").trim();
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
          (medico?.endereco?.complemento ?? "").trim();
        const complementoFinal =
          complementoForm || complementoOriginal || "Sem complemento";

        const enderecoPreenchido =
          formData.logradouro &&
          formData.bairro &&
          cepLimpoUpdate &&
          formData.cidade &&
          formData.uf;

        const payloadAtualizacao = {
          id: medico.id,
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

        console.log("🔵 Payload ATUALIZAR médico:", payloadAtualizacao);

        const response = await atualizarMedico(payloadAtualizacao);

        setMedicos((lista) =>
          lista.map((m) => (m.id === response.id ? response : m))
        );
      } else {
        console.log("🟢 Payload CADASTRAR médico:", payloadCadastro);

        const response = await cadastrarMedico(payloadCadastro);
        setMedicos((lista) => [...lista, response]);
      }

      navigation.goBack();
    } catch (error) {
      console.log("❌ ERRO AO SALVAR MÉDICO");
      console.log("STATUS:", error.response?.status);
      console.log("DATA BACKEND:", error.response?.data);
      console.log("REQUEST URL:", error.config?.url);

      Alert.alert(
        "Erro",
        "Não foi possível salvar o médico. Verifique os dados e tente novamente."
      );
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading && !medico) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FormularioMedico
        medico={medico}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default CadastroEdicaoMedicoScreen;
