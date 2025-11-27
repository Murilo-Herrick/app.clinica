// App.js
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas
import Splash from "./src/screens/Splash/Splash";
import MenuScreen from "./src/screens/Menu/MenuScreen";
import MedicosListScreen from "./src/screens/Medico/MedicosListScreen";
import CadastroEdicaoMedicoScreen from "./src/screens/Medico/CadastroEdicaoMedicoScreen";
import Op2Screen from "./src/screens/Paciente/Paciente.js";
import Consulta from "./src/screens/Consulta/Consulta.js";

const Stack = createStackNavigator();

function App() {
  const [medicos, setMedicos] = useState([
    {
      id: 1,
      nome: "João de Oliveira",
      especialidade: "Cardiologista",
      crm: "12345/MG",
      email: "joao@clinica.com",
      telefone: "(31) 98765-4321",
      endereco: "Rua A, 100",
    },
    {
      id: 2,
      nome: "Antônio de Oliveira",
      especialidade: "Pediatra",
      crm: "23456/MG",
      email: "antonio@clinica.com",
      telefone: "(31) 99876-5432",
      endereco: "Av. B, 200",
    },
    {
      id: 3,
      nome: "Maria da Silva",
      especialidade: "Dermatologista",
      crm: "34567/SP",
      email: "maria@clinica.com",
      telefone: "(11) 97654-3210",
      endereco: "Rua C, 300",
    },
    {
      id: 4,
      nome: "Beatriz Souza",
      especialidade: "Ginecologista",
      crm: "45678/RJ",
      email: "beatriz@clinica.com",
      telefone: "(21) 96543-2109",
      endereco: "Av. D, 400",
    },
    {
      id: 5,
      nome: "Carlos Santos",
      especialidade: "Neurologista",
      crm: "56789/BA",
      email: "carlos@clinica.com",
      telefone: "(71) 95432-1098",
      endereco: "Praça E, 500",
    },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ headerShown: false }}
        />

        {/* Lista de médicos */}
        <Stack.Screen name="Medicos">
          {(props) => (
            <MedicosListScreen
              {...props}
              medicos={medicos}
              setMedicos={setMedicos}
            />
          )}
        </Stack.Screen>

        {/* Cadastro / edição de médico */}
        <Stack.Screen
          name="MedicoForm"
          options={({ route }) => ({
            title: route?.params?.medico ? "Editar Perfil" : "Novo Perfil",
          })}
        >
          {(props) => (
            <CadastroEdicaoMedicoScreen
              {...props}
              medicos={medicos}
              setMedicos={setMedicos}
            />
          )}
        </Stack.Screen>

        {/* Placeholders pra Pacientes e Consultas */}
        <Stack.Screen
          name="Pacientes"
          component={Op2Screen}
          options={{ title: "Pacientes" }}
        />
        <Stack.Screen
          name="Consultas"
          component={Consulta}
          options={{ title: "Consultas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
