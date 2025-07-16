import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (user === "Admin" && pass === "1234") {
      await AsyncStorage.setItem("user", user);
      router.replace("/home");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View className="flex-1 px-6 pt-20 bg-gradient-to-b from-sky-100 to-blue-200">
      {/* Logo animado */}
      <MotiView
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
        className="items-center mb-10"
      >
        <Image
          source={require("@/assets/images/logo-main.png")}
          className="w-45 h-45 mb-4"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-blue-900">Visor Canteros</Text>
      </MotiView>

      {/* Formulario animado */}
      <MotiView
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 300 }}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
      >
        {/* Campo usuario */}
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 space-x-3 mb-6">
          <Ionicons name="person-outline" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 text-base"
            placeholder="Usuario"
            value={user}
            onChangeText={setUser}
          />
        </View>
        {/* Campo contraseña */}
        <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-3 space-x-3 mb-6">
          <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
          <TextInput
            className="flex-1 text-base"
            placeholder="Contraseña"
            secureTextEntry
            value={pass}
            onChangeText={setPass}
          />
        </View>

        {/* Botón */}
        <Pressable
          onPress={handleLogin}
          className="bg-blue-600 rounded-full py-3 items-center active:bg-blue-700"
        >
          <Text className="text-white text-base font-semibold">Ingresar</Text>
        </Pressable>
      </MotiView>
    </View>
  );
}
