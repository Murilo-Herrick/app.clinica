import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

// Para instalar os pacotes react-navigation/native 
// e o pacote react-navigation/stack executar os seguintes comandos
// no diretorio raiz do projeto

// npm install @react-navigation/native
// npm install @react-navigation/native-stack
// npm install @react-navigation/stack

// Importação dos componentes de tela
import Splash from "./src/screens/Splash/Splash.js";
// import Medico from "./src/screens/Medico/Medico.js";
// import Paciente from "./src/screens/Paciente/Paciente.js";
// import Consulta from "./src/screens/Consulta/Consulta.js";
// import FormMedico from "./src/screens/FormMedico/FormMedico.js";
// import FormMedico from "./src/screens/FormMedico/FormMedico.js";

const Stack = createStackNavigator();

export default function App() {

  const [medicos, setMedicos] = useState([
    {
      "id": 1, "nome": "João de Oliveira", "especialidade": "Cardiologista",
      "crm": "12345/SP", "email": "joao@gmail.com", "telefone": "(12) 98765-4321", "endereco": "Rua A, 110"
    },
    {
      "id": 2, "nome": "Maria de Oliveira", "especialidade": "Infectologista",
      "crm": "78345/SP", "email": "maria@gmail.com", "telefone": "(12) 89065-4321", "endereco": "Rua B, 220"
    },
    {
      "id": 3, "nome": "Carlos Pereira", "especialidade": "Dermatologista", "crm": "56473/SP",
      "email": "carlos.pereira@gmail.com", "telefone": "(12) 99876-5432", "endereco": "Avenida das Flores, 315"
    },
    {
      "id": 4, "nome": "Fernanda Souza", "especialidade": "Pediatra", "crm": "23987/SP",
      "email": "fernanda.souza@gmail.com", "telefone": "(12) 91234-5678", "endereco": "Rua das Acácias, 452"
    },
    {
      "id": 5, "nome": "Ricardo Lima", "especialidade": "Ortopedista", "crm": "67542/SP",
      "email": "ricardo.lima@gmail.com", "telefone": "(12) 93456-7890", "endereco": "Travessa das Oliveiras, 78"
    }
  ]);

  const [pacientes, setPacientes] = useState([

  ]);

  const [consultas, setConsultas] = useState([

  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ title: "Menu Principal" }} />
        <Stack.Screen name="Medico" component={Medico} options={{ title: "Medicos" }} />
        <Stack.Screen name="Paciente" component={Paciente} options={{ title: "Pacientes" }} />
        <Stack.Screen name="Consulta" component={Consulta} options={{ title: "Consultas" }} />
        <Stack.Screen name="FormMedico" component={FormMedico} options={{ title: "Gerenciamento Medicos" }} />

        {/* Tela temporaria para funcionalidades nao implementadas */}
        <Stack.Screen
          name="EmConstrucao"
          component={() => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 24 }}>Em Construção</Text>
            </View>
          )}
          options={{ title: "Em Construção" }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
