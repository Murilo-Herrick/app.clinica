// src/screens/Paciente/PacientesListScreen.js
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  Button,
  Alert,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { excluirPaciente } from "../../services/pacienteService";

const IconeLupa = require("../../../assets/lupa.png");
const IconeSeta = require("../../../assets/seta.png");

// Habilita animação no Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Agrupa/filtra pacientes por letra inicial do nome
const groupAndFilterPacientes = (pacientes, searchText) => {
  const textoFiltro = searchText.trim().toLowerCase();

  const filtrados = pacientes
    .filter((paciente) => {
      if (!textoFiltro) return true;
      const alvo = `${paciente.nome ?? ""} ${paciente.cpf ?? ""}`.toLowerCase();
      return alvo.includes(textoFiltro);
    })
    .sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));

  const mapa = {};

  filtrados.forEach((paciente) => {
    const primeiraLetra = (paciente.nome?.[0] || "#").toUpperCase();
    if (!mapa[primeiraLetra]) {
      mapa[primeiraLetra] = [];
    }
    mapa[primeiraLetra].push(paciente);
  });

  return Object.keys(mapa)
    .sort()
    .map((letra) => ({
      title: letra,
      data: mapa[letra],
    }));
};

const PacienteCard = ({ paciente, navigation, onExcluir }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  const endereco = paciente.endereco || {};
  const enderecoResumido = endereco.logradouro
    ? `${endereco.logradouro}, ${endereco.numero || ""} - ${
        endereco.cidade || ""
      }/${endereco.uf || ""}`
    : "Endereço não informado";

  return (
    <View style={cardStyles.card}>
      <TouchableOpacity onPress={toggleExpand} style={cardStyles.mainInfo}>
        <View>
          <Text style={cardStyles.nome}>{paciente.nome}</Text>
          <Text style={cardStyles.cpf}>CPF: {paciente.cpf}</Text>
        </View>
        <Image
          source={IconeSeta}
          style={[
            cardStyles.arrowIcon,
            { transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] },
          ]}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={cardStyles.details}>
          <Text style={cardStyles.detailText}>Email: {paciente.email}</Text>
          <Text style={cardStyles.detailText}>
            Telefone: {paciente.telefone}
          </Text>
          <Text style={cardStyles.detailText}>Endereço: {enderecoResumido}</Text>

          <View style={cardStyles.actionButtons}>
            <Button
              title="Editar"
              onPress={() =>
                navigation.navigate("PacienteForm", { paciente })
              }
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => onExcluir(paciente.id)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const PacientesListScreen = ({ navigation, pacientes, setPacientes }) => {
  const [searchText, setSearchText] = useState("");
  const insets = useSafeAreaInsets();

  const handleExcluirPaciente = async (id) => {
    try {
      await excluirPaciente(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      Alert.alert(
        "Erro",
        "Não foi possível excluir esse paciente. Tente novamente."
      );
    }
  };

  const sections = useMemo(
    () => groupAndFilterPacientes(pacientes, searchText),
    [pacientes, searchText]
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top || 16,
        },
      ]}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar paciente ou CPF"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image source={IconeLupa} style={styles.searchIcon} />
      </View>

      <View style={styles.listWrapper}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PacienteCard
              paciente={item}
              navigation={navigation}
              onExcluir={handleExcluirPaciente}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.sectionContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhum paciente encontrado.
              </Text>
            </View>
          }
        />
      </View>

      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate("PacienteForm")}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingRight: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A5568",
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  sectionContent: {
    paddingBottom: 32,
  },
  emptyContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  fabContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1A73E8",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: {
    fontSize: 28,
    color: "#FFF",
    marginTop: -2,
  },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A202C",
  },
  cpf: {
    fontSize: 14,
    color: "#4A5568",
    marginTop: 2,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: "#4A5568",
  },
  details: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default PacientesListScreen;
