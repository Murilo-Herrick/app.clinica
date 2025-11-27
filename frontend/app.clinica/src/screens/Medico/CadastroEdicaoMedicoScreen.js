import React from 'react';
import { View } from 'react-native';
import FormularioMedico from '../../components/FormularioMedico';

const CadastroEdicaoMedicoScreen = ({ route, navigation, medicos, setMedicos }) => {
  const medico = route?.params?.medico ?? null;

  const handleSubmit = (dados, isEditing) => {
    if (isEditing && medico) {
      // Atualiza médico existente
      setMedicos((prev) =>
        prev.map((m) => (m.id === medico.id ? { ...m, ...dados } : m))
      );
    } else {
      // Cria novo médico
      const novoId =
        medicos.length > 0 ? Math.max(...medicos.map((m) => m.id)) + 1 : 1;

      setMedicos((prev) => [...prev, { ...dados, id: novoId }]);
    }

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

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
