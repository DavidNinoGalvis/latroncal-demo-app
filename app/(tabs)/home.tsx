import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import RNPickerSelect from "react-native-picker-select";

interface Punto {
  id: number;
  lat: number;
  lng: number;
  sector: string;
  codigo: string;
}

export default function Home() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [canteros, setCanteros] = useState<Punto[]>([]);
  const [sector, setSector] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [ruta, setRuta] = useState<Punto[]>([]);

  const canterosDummy: Punto[] = [
    { id: 1, lat: -2.08, lng: -79.11, sector: "A", codigo: "001" },
    { id: 2, lat: -2.09, lng: -79.12, sector: "A", codigo: "002" },
    { id: 3, lat: -2.1, lng: -79.1, sector: "B", codigo: "003" },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();

    // Cargar canteros (de una API o estáticos por ahora)
    setCanteros(canterosDummy);
  }, []);

  const filtrarCanteros = () => {
    return canteros.filter(
      (p) =>
        (!sector || p.sector === sector) && (!codigo || p.codigo === codigo)
    );
  };

  return (
    <View className="flex-1">
      <View className="p-4 bg-white">
        <Text className="font-bold text-lg mb-2">Filtros</Text>
        <RNPickerSelect
          onValueChange={(val) => setSector(val)}
          items={[
            { label: "Sector A", value: "A" },
            { label: "Sector B", value: "B" },
          ]}
          placeholder={{ label: "Selecciona un Sector", value: null }}
        />
        <RNPickerSelect
          onValueChange={(val) => setCodigo(val)}
          items={[
            { label: "001", value: "001" },
            { label: "002", value: "002" },
          ]}
          placeholder={{ label: "Selecciona un Código", value: null }}
        />
        <View className="flex-row flex-wrap gap-2 mt-4">
          <Pressable
            className="bg-blue-500 px-4 py-2 rounded"
            onPress={() => {}}
          >
            <Text className="text-white">Buscar</Text>
          </Pressable>
          <Pressable
            className="bg-orange-500 px-4 py-2 rounded"
            onPress={() => {
              if (location)
                setRuta([
                  { id: 0, lat: location.latitude, lng: location.longitude },
                ]);
            }}
          >
            <Text className="text-white">Mi Ubicación</Text>
          </Pressable>
          <Pressable
            className="bg-blue-700 px-4 py-2 rounded"
            onPress={() => setRuta(filtrarCanteros())}
          >
            <Text className="text-white">Trazar Ruta</Text>
          </Pressable>
          <Pressable
            className="bg-red-500 px-4 py-2 rounded"
            onPress={() => setRuta([])}
          >
            <Text className="text-white">Borrar Ruta</Text>
          </Pressable>
        </View>
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.latitude ?? -2.08,
          longitude: location?.longitude ?? -79.11,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {filtrarCanteros().map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            title={p.codigo}
          />
        ))}
        {ruta.length > 1 && (
          <Polyline
            coordinates={ruta.map((p) => ({
              latitude: p.lat,
              longitude: p.lng,
            }))}
            strokeColor="#007bff"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
}
