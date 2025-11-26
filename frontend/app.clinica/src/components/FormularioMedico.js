import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ESPECIALIDADES_MEDICAS, UFS_BRASIL, MEDICO_MODELO } from './utils';

const FormularioMedico = ({ medico = null, onCancel, onSubmit }) => {
  const isEditing = medico !== null;
  const titulo = isEditing ? 'Edição de Cadastro Médico' : 'Cadastro de Novo Médico';

  const [formData, setFormData] = useState(medico || MEDICO_MODELO);

  useEffect(() => {
    setFormData(medico || MEDICO_MODELO);
  }, [medico]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.crm || formData.especialidade === ESPECIALIDADES_MEDICAS[0]) {
      Alert.alert('Erro', 'Preencha Nome, CRM e selecione a Especialidade.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData, isEditing);
      Alert.alert(
        'Sucesso',
        isEditing ? 'Dados editados com sucesso!' : 'Cadastro concluído com sucesso!'
      );

      if (!isEditing) {
        setFormData(MEDICO_MODELO);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>

      {/* -------------------- BLOCO PROFISSIONAL -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profissional</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(text) => handleChange('nome', text)}
          placeholder="Nome completo do médico"
        />

        <Text style={styles.label}>CRM</Text>
        <TextInput
          style={styles.input}
          value={formData.crm}
          onChangeText={(text) => handleChange('crm', text)}
          placeholder="Ex: 12345/SP"
          keyboardType="default"
        />

        <Text style={styles.label}>Especialidade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.especialidade}
            onValueChange={(itemValue) => handleChange('especialidade', itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {ESPECIALIDADES_MEDICAS.map((esp, index) => (
              <Picker.Item key={index} label={esp} value={esp} />
            ))}
          </Picker>
        </View>
      </View>

      {/* -------------------- NOVO BLOCO: CONTATOS -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contatos</Text>

        {/* Campo E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo Telefone */}
        <Text style={styles.label}>Telefone ou celular</Text>
        <TextInput
          style={styles.input}
          value={formData.telefone}
          onChangeText={(text) => handleChange('telefone', text)}
          placeholder="Telefone ou celular"
          keyboardType="phone-pad"
        />
      </View>

      {/* -------------------- BLOCO ENDEREÇO PROFISSIONAL -------------------- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço Profissional</Text>

        <Text style={styles.label}>Logradouro</Text>
        <TextInput
          style={styles.input}
          value={formData.logradouro}
          onChangeText={(text) => handleChange('logradouro', text)}
          placeholder="Rua, Avenida, Praça..."
        />

        <View style={styles.row}>
          <View style={[styles.column, { flex: 0.4 }]}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={formData.numero}
              onChangeText={(text) => handleChange('numero', text)}
              placeholder="123"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.column, { flex: 0.6 }]}>
            <Text style={styles.label}>Complemento (Opcional)</Text>
            <TextInput
              style={styles.input}
              value={formData.complemento}
              onChangeText={(text) => handleChange('complemento', text)}
              placeholder="Apto, Sala"
            />
          </View>
        </View>

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          value={formData.cidade}
          onChangeText={(text) => handleChange('cidade', text)}
          placeholder="Nome da Cidade"
        />

        <Text style={styles.label}>UF</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.uf}
            onValueChange={(itemValue) => handleChange('uf', itemValue)}
            style={styles.picker}
            dropdownIconColor="#333"
          >
            {UFS_BRASIL.map((uf, index) => (
              <Picker.Item key={index} label={uf} value={uf} />
            ))}
          </Picker>
        </View>
      </View>

      {/* -------------------- BOTÕES DE AÇÃO -------------------- */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isEditing ? 'Concluir Edição' : 'Concluir Cadastro'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  picker: {
    height: 40,
  },
  actions: {
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormularioMedico;
