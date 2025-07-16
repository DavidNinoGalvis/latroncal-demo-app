import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-sky-100 to-blue-200 px-6">
      <Text className="text-4xl font-extrabold text-blue-800 mb-4">
        ¡Bienvenido! 👋
      </Text>
      <Text className="text-lg text-blue-700 mb-12 text-center">
        Has iniciado sesión correctamente.
      </Text>

      <Pressable
        onPress={logout}
        className="bg-red-500 px-6 py-3 rounded-full shadow-md active:bg-red-600"
      >
        <Text className="text-white text-base font-medium">Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
