// src/components/FormularioPaciente.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const UFS_BRASIL = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const PACIENTE_MODELO = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  logradouro: "",
  numero: "",
  complemento: "",
  cidade: "",
  uf: "SP",
  bairro: "",
  cep: "",
};

const FormularioPaciente = ({ paciente = null, onSubmit, onCancel }) => {
  const isEditing = paciente !== null;
  const titulo = isEditing ? "Editar Paciente" : "Novo Paciente";

  const [formData, setFormData] = useState(PACIENTE_MODELO);

  useEffect(() => {
    if (paciente) {
      const end = paciente.endereco || {};
      setFormData({
        nome: paciente.nome || "",
        email: paciente.email || "",
        telefone: paciente.telefone || "",
        cpf: paciente.cpf || "",
        logradouro: end.logradouro || "",
        numero: end.numero || "",
        complemento: end.complemento || "",
        cidade: end.cidade || "",
        uf: end.uf || "SP",
        bairro: end.bairro || "",
        cep: end.cep || "",
      });
    } else {
      setFormData(PACIENTE_MODELO);
    }
  }, [paciente]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.cpf) {
      Alert.alert("Erro", "Preencha pelo menos Nome e CPF.");
      return;
    }

    const dados = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      cpf: formData.cpf,
      endereco: {
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento,
        cidade: formData.cidade,
        uf: formData.uf,
        bairro: formData.bairro,
        cep: formData.cep,
      },
    };

    if (onSubmit) {
      onSubmit(dados, isEditing);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.screen}>
        {/* Cabeçalho igual ao do médico */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{titulo}</Text>
          <Text style={styles.headerSubtitle}>
            {isEditing
              ? "Atualize os dados do paciente"
              : "Preencha os dados para cadastrar um novo paciente"}
          </Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* -------------------- BLOCO DADOS DO PACIENTE -------------------- */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Dados do Paciente</Text>
            </View>

            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={formData.nome}
              onChangeText={(text) => handleChange("nome", text)}
              placeholder="Nome completo do paciente"
              placeholderTextColor="#B0B0B0"
            />

            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              value={formData.cpf}
              onChangeText={(text) => handleChange("cpf", text)}
              placeholder="Somente números"
              placeholderTextColor="#B0B0B0"
              keyboardType="numeric"
            />
          </View>

          {/* -------------------- BLOCO CONTATOS -------------------- */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Contatos</Text>
            </View>

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="E-mail do paciente"
              placeholderTextColor="#B0B0B0"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Telefone / celular</Text>
            <TextInput
              style={styles.input}
              value={formData.telefone}
              onChangeText={(text) => handleChange("telefone", text)}
              placeholder="(00) 00000-0000"
              placeholderTextColor="#B0B0B0"
              keyboardType="phone-pad"
            />
          </View>

          {/* -------------------- BLOCO ENDEREÇO -------------------- */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Endereço</Text>
            </View>

            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              value={formData.logradouro}
              onChangeText={(text) => handleChange("logradouro", text)}
              placeholder="Rua, Avenida, Praça..."
              placeholderTextColor="#B0B0B0"
            />

            <View style={styles.row}>
              <View style={[styles.column, { flex: 0.4 }]}>
                <Text style={styles.label}>Número</Text>
                <TextInput
                  style={styles.input}
                  value={formData.numero}
                  onChangeText={(text) => handleChange("numero", text)}
                  placeholder="123"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.column, { flex: 0.6 }]}>
                <Text style={styles.label}>Complemento</Text>
                <TextInput
                  style={styles.input}
                  value={formData.complemento}
                  onChangeText={(text) => handleChange("complemento", text)}
                  placeholder="Casa, apto, bloco..."
                  placeholderTextColor="#B0B0B0"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { flex: 0.6 }]}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cidade}
                  onChangeText={(text) => handleChange("cidade", text)}
                  placeholder="Nome da cidade"
                  placeholderTextColor="#B0B0B0"
                />
              </View>

              <View style={[styles.column, { flex: 0.4 }]}>
                <Text style={styles.label}>UF</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.uf}
                    onValueChange={(itemValue) =>
                      handleChange("uf", itemValue)
                    }
                    style={styles.picker}
                    dropdownIconColor="#007AFF"
                  >
                    {UFS_BRASIL.map((uf, index) => (
                      <Picker.Item key={index} label={uf} value={uf} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, { flex: 0.5 }]}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                  style={styles.input}
                  value={formData.bairro}
                  onChangeText={(text) => handleChange("bairro", text)}
                  placeholder="Bairro"
                  placeholderTextColor="#B0B0B0"
                />
              </View>

              <View style={[styles.column, { flex: 0.5 }]}>
                <Text style={styles.label}>CEP</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cep}
                  onChangeText={(text) => handleChange("cep", text)}
                  placeholder="Somente números"
                  placeholderTextColor="#B0B0B0"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* -------------------- BOTÕES DE AÇÃO -------------------- */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>
                {isEditing ? "Concluir edição" : "Concluir cadastro"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={onCancel}>
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

// --- ESTILOS (copiados/adaptados do FormularioMedico) ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E9EEF5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerCard: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#E3F0FF",
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#DDE3EC",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionAccent: {
    width: 4,
    height: 18,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6C7A89",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderColor: "#CCD4E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F7F9FC",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  column: {
    flex: 1,
  },
  pickerContainer: {
    borderColor: "#CCD4E0",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F7F9FC",
  },
  picker: {
    height: 50,
  },
  actions: {
    marginTop: 24,
    marginBottom: 16,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    elevation: 2,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCD4E0",
  },
  secondaryButtonText: {
    color: "#555",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default FormularioPaciente;
