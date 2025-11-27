import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  ESPECIALIDADES_MEDICAS,
  UFS_BRASIL,
  MEDICO_MODELO,
} from './utils';

const FormularioMedico = ({ medico = null, onCancel, onSubmit }) => {
  const isEditing = medico !== null;
  const titulo = isEditing ? 'Editar Perfil' : 'Novo Perfil';

  const [formData, setFormData] = useState(medico || MEDICO_MODELO);

  useEffect(() => {
    setFormData(medico || MEDICO_MODELO);
  }, [medico]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.nome ||
      !formData.crm ||
      formData.especialidade === ESPECIALIDADES_MEDICAS[0]
    ) {
      Alert.alert('Erro', 'Preencha Nome, CRM e selecione a Especialidade.');
      return;
    }

    if (onSubmit) {
      onSubmit(formData, isEditing);
      Alert.alert(
        'Sucesso',
        isEditing
          ? 'Dados editados com sucesso!'
          : 'Cadastro concluído com sucesso!'
      );

      if (!isEditing) {
        setFormData(MEDICO_MODELO);
      }
    }
  };

  return (
    <View style={styles.screen}>
      {/* “Faixa” superior, como se fosse o cabeçalho da tela do PDF */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>{titulo}</Text>
        <Text style={styles.headerSubtitle}>
          {isEditing
            ? 'Atualize os dados do profissional'
            : 'Preencha os dados para cadastrar um novo médico'}
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* -------------------- BLOCO PROFISSIONAL -------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Profissional</Text>
          </View>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(text) => handleChange('nome', text)}
            placeholder="Nome completo do médico"
            placeholderTextColor="#B0B0B0"
          />

          <View style={styles.row}>
            <View style={[styles.column, { flex: 0.5 }]}>
              <Text style={styles.label}>CRM</Text>
              <TextInput
                style={styles.input}
                value={formData.crm}
                onChangeText={(text) => handleChange('crm', text)}
                placeholder="Ex: 12345/SP"
                placeholderTextColor="#B0B0B0"
              />
            </View>

            <View style={[styles.column, { flex: 0.5 }]}>
              <Text style={styles.label}>Especialidade</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.especialidade}
                  onValueChange={(itemValue) =>
                    handleChange('especialidade', itemValue)
                  }
                  style={styles.picker}
                  dropdownIconColor="#007AFF"
                >
                  {ESPECIALIDADES_MEDICAS.map((esp, index) => (
                    <Picker.Item key={index} label={esp} value={esp} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* -------------------- BLOCO: CONTATOS -------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Contatos</Text>
          </View>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholder="E-mail profissional"
            placeholderTextColor="#B0B0B0"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Telefone / celular</Text>
          <TextInput
            style={styles.input}
            value={formData.telefone}
            onChangeText={(text) => handleChange('telefone', text)}
            placeholder="(00) 00000-0000"
            placeholderTextColor="#B0B0B0"
            keyboardType="phone-pad"
          />
        </View>

        {/* -------------------- BLOCO ENDEREÇO PROFISSIONAL -------------------- */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Endereço profissional</Text>
          </View>

          <Text style={styles.label}>Logradouro</Text>
          <TextInput
            style={styles.input}
            value={formData.logradouro}
            onChangeText={(text) => handleChange('logradouro', text)}
            placeholder="Rua, Avenida, Praça..."
            placeholderTextColor="#B0B0B0"
          />

          <View style={styles.row}>
            <View style={[styles.column, { flex: 0.4 }]}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                value={formData.numero}
                onChangeText={(text) => handleChange('numero', text)}
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
                onChangeText={(text) => handleChange('complemento', text)}
                placeholder="Sala, bloco, apto (opcional)"
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
                onChangeText={(text) => handleChange('cidade', text)}
                placeholder="Nome da cidade"
                placeholderTextColor="#B0B0B0"
              />
            </View>

            <View style={[styles.column, { flex: 0.4 }]}>
              <Text style={styles.label}>UF</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.uf}
                  onValueChange={(itemValue) => handleChange('uf', itemValue)}
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
        </View>

        {/* -------------------- BOTÕES DE AÇÃO -------------------- */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.primaryButtonText}>
              {isEditing ? 'Concluir edição' : 'Concluir cadastro'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onCancel}
          >
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E9EEF5', // fundo levemente acinzentado (bem app de clínica)
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerCard: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#E3F0FF',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#DDE3EC',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionAccent: {
    width: 4,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C7A89',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    height: 50,
    borderColor: '#CCD4E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F7F9FC',
    fontSize: 14,
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
    borderColor: '#CCD4E0',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F7F9FC',
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
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCD4E0',
  },
  secondaryButtonText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default FormularioMedico;
