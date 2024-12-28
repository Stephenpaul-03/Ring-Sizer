import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  Linking,
  StatusBar,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import Svg, { Circle } from "react-native-svg";
import { setBackgroundColorAsync, setButtonStyleAsync } from "expo-navigation-bar";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const App = () => {
  const [sliderValue, setSliderValue] = useState(18.5);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const animatedValue = useRef(new Animated.Value(18.5)).current;
  useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync("#f4f4f4");
      setButtonStyleAsync("dark"); 
    }
  }, []);
  const ringSizes = [
    { us: 3,    uk: "E",    eu: 44, jpn:4,     diameter: 14.0, circumference: 44 },
    { us: 3.25, uk: "F",    eu: 45, jpn:5.25,  diameter: 14.4, circumference: 45 },
    { us: 3.75, uk: "G",    eu: 46, jpn:6,     diameter: 14.7, circumference: 46 },
    { us: 4,    uk: "H",    eu: 47, jpn:7,     diameter: 15.0, circumference: 47 },
    { us: 4.5,  uk: "I",    eu: 48, jpn:8,     diameter: 15.0, circumference: 48 },
    { us: 5,    uk: "I 1/2",eu: 49, jpn:9,     diameter: 15.6, circumference: 49 },
    { us: 5.25, uk: "J",    eu: 50, jpn:10,    diameter: 15.9, circumference: 50 },
    { us: 5.75, uk: "K",    eu: 51, jpn:11,    diameter: 16.2, circumference: 51 },
    { us: 6,    uk: "L",    eu: 52, jpn:12,    diameter: 16.5, circumference: 52 },
    { us: 6.25, uk: "M",    eu: 53, jpn:13,    diameter: 16.9, circumference: 53 },
    { us: 7,    uk: "N",    eu: 54, jpn:14,    diameter: 17.3, circumference: 54 },
    { us: 7.25, uk: "N 1/2",eu: 55, jpn:15,    diameter: 17.5, circumference: 55 },
    { us: 7.5,  uk: "O",    eu: 56, jpn:16,    diameter: 17.8, circumference: 56 },
    { us: 8,    uk: "P",    eu: 57, jpn:16.25, diameter: 18.2, circumference: 57 },
    { us: 8.5,  uk: "Q",    eu: 58, jpn:17,    diameter: 18.6, circumference: 58 },
    { us: 8.75, uk: "R",    eu: 59, jpn:18,    diameter: 18.8, circumference: 59 },
    { us: 9,    uk: "R 1/2",eu: 60, jpn:18.25, diameter: 19.1, circumference: 60 },
    { us: 9.5,  uk: "S",    eu: 61, jpn:19,    diameter: 19.4, circumference: 61 },
    { us: 10,   uk: "T",    eu: 62, jpn:20,    diameter: 19.8, circumference: 62 },
    { us: 10.25,uk: "U",    eu: 63, jpn:21,    diameter: 20.2, circumference: 63 },
    { us: 10.75,uk: "V",    eu: 64, jpn:22,    diameter: 20.6, circumference: 64 },
    { us: 11,   uk: "V 1/2",eu: 65, jpn:23,    diameter: 20.8, circumference: 65 },
    { us: 11.5, uk: "W",    eu: 66, jpn:24,    diameter: 21.0, circumference: 66 },
    { us: 12,   uk: "X",    eu: 67, jpn:25,    diameter: 21.3, circumference: 67 },
    { us: 12.5, uk: "X 1/2",eu: 68, jpn:26,    diameter: 21.8, circumference: 68 },
    { us: 12.75,uk: "Z",    eu: 69, jpn:27,    diameter: 22.1, circumference: 69 },
    { us: 13,   uk: "Z+1",  eu: 70, jpn:28,    diameter: 22.3, circumference: 70 },
    { us: 13.5, uk: "Z+2",  eu: 71, jpn:29,    diameter: 22.6, circumference: 71 },
  ];

  const closestSize = ringSizes.reduce((prev, curr) => {
    return Math.abs(curr.diameter - sliderValue) <
      Math.abs(prev.diameter - sliderValue)
      ? curr
      : prev;
  });

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const incrementValue = () => {
    setSliderValue((prevValue) => Math.min(prevValue + 0.1, 23)); 
  };

  const decrementValue = () => {
    setSliderValue((prevValue) => Math.max(prevValue - 0.1, 14)); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How to Use</Text>
            <Text style={styles.modalText}>1. Place your ring on top of the circle on screen.</Text>
            <Text style={styles.modalText}>2. Increase or decrease the circle size using the buttons and/or slider until the circle matches the ring on top of the screen.</Text>
            <Text style={styles.modalText}>3. Note the details below.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Got It !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.topSection}>
        <Svg height="200" width="200" style={styles.svgContainer}>
          <AnimatedCircle
            cx="100"
            cy="100"
            r={animatedValue.interpolate({
              inputRange: [14, 22.6], 
              outputRange: [30, 80], 
            })}
            stroke="#274060"
            strokeWidth="4"
            fill="none"
          />
        </Svg>
      </View>

      <View style={styles.bottomSection}>
        <Slider
          style={styles.slider}
          minimumValue={14}
          maximumValue={23}
          step={0.1}
          value={sliderValue}
          onValueChange={handleSliderChange}
          thumbTintColor="#274060"
          minimumTrackTintColor="#274060"
          maximumTrackTintColor="grey"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={decrementValue}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={incrementValue}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>Diameter:</Text>
            <Text style={styles.infoValue}>{sliderValue.toFixed(1)} mm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>US Size:</Text>
            <Text style={styles.infoValue}>{closestSize.us}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>UK Size:</Text>
            <Text style={styles.infoValue}>{closestSize.uk}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>EU Size:</Text>
            <Text style={styles.infoValue}>{closestSize.eu}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>JPN Size:</Text>
            <Text style={styles.infoValue}>{closestSize.jpn}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoLabel}>Circumference:</Text>
            <Text style={styles.infoValue}>{closestSize.circumference.toFixed(1)} mm</Text>
          </View>

          <Text style={styles.sourceText}>
            Ring sizes were obtained from{" "}
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL("https://thejewelleryroom.com/pages/size-guide")}
            >
              The Jewellery Room
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f4f4f4",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  svgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
  slider: {
    width: "80%",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#274060",
    padding: 12,
    borderRadius: 50,
    width: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
    textAlign: "left",
  },
  infoValue: {
    fontSize: 16,
    width: "50%",
    textAlign: "right",
  },
  sourceText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#274060",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#274060",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
