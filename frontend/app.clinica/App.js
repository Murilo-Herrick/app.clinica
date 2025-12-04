// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas
import Splash from "./src/screens/Splash/Splash";
import MenuScreen from "./src/screens/Menu/MenuScreen";
import MedicosListScreen from "./src/screens/Medico/MedicosListScreen";
import CadastroEdicaoMedicoScreen from "./src/screens/Medico/CadastroEdicaoMedicoScreen";
import PacientesListScreen from "./src/screens/Paciente/PacientesListScreen";
import CadastroEdicaoPacienteScreen from "./src/screens/Paciente/CadastroEdicaoPacienteScreen";
import Consulta from "./src/screens/Consulta/Consulta";

// Serviços
import { listarMedicos } from "./src/services/medicoService";
import { listarPacientes } from "./src/services/pacienteService";

const Stack = createStackNavigator();

function App() {
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [listaMedicos, listaPacientes] = await Promise.all([
          listarMedicos(),
          listarPacientes(),
        ]);
        setMedicos(listaMedicos);
        setPacientes(listaPacientes);
      } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
      }
    };

    carregar();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: "#1A73E8" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: "Menu Principal" }}
        />

        {/* Médicos */}
        <Stack.Screen name="Medicos" options={{ title: "Médicos" }}>
          {(props) => (
            <MedicosListScreen
              {...props}
              medicos={medicos}
              setMedicos={setMedicos}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="MedicoForm"
          options={({ route }) => ({
            title: route?.params?.medico ? "Editar Médico" : "Novo Médico",
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

        {/* Pacientes */}
        <Stack.Screen name="Pacientes" options={{ title: "Pacientes" }}>
          {(props) => (
            <PacientesListScreen
              {...props}
              pacientes={pacientes}
              setPacientes={setPacientes}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="PacienteForm"
          options={({ route }) => ({
            title: route?.params?.paciente ? "Editar Paciente" : "Novo Paciente",
          })}
        >
          {(props) => (
            <CadastroEdicaoPacienteScreen
              {...props}
              pacientes={pacientes}
              setPacientes={setPacientes}
            />
          )}
        </Stack.Screen>

        {/* Consultas */}
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
