import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  forwardRef,
} from "react";
import { useTheme } from "styled-components";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  findNodeHandle,
  Text,
  View,
  Dimensions,
  FlatList,
  Animated,
  Image,
  Modal,
} from "react-native";

import { Container } from "./styles";

const images = {
  man: "https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  women:
    "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  kids: "https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  skullcandy:
    "https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  help: "https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
};

interface DataProps {
  key: string;
  title: string;
  image: string;
  ref: any;
}

const itemMap = images as Record<string, any>;
const data: DataProps[] = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: itemMap[i],
  ref: createRef(),
}));
const { width, height } = Dimensions.get("screen");

interface TabProps {
  item: DataProps;
  ref: any;
}
const Tab = forwardRef(({ item }: TabProps, ref) => {
  return (
    <View ref={ref as React.LegacyRef<View>}>
      <Text
        style={{
          color: "white",
          fontSize: 84 / data.length,
          fontWeight: "800",
          textTransform: "uppercase",
        }}
      >
        {item.title}
      </Text>
    </View>
  );
});

interface IndicatorProps {
  scrollX: Animated.Value;
  measures: MeasureProps[];
}

function Indicator({ measures, scrollX }: IndicatorProps) {
  const inputRange = data.map((_, i) => i * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 4,
        width: indicatorWidth,
        backgroundColor: "orange",
        left: 0,
        bottom: -8,
        transform: [{ translateX }],
      }}
    />
  );
}

function IndicatorFlex() {
  return (
    <View
      style={{
        position: "absolute",
        height: 4,
        width: width,
        backgroundColor: "transparent",
        left: 0,
        bottom: -8,
      }}
    />
  );
}

interface TabsProps {
  scrollX: Animated.Value;
  data: DataProps[];
}

interface MeasureProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Tabs({ scrollX, data }: TabsProps) {
  const [measures, setMeasures] = useState<MeasureProps[]>([]);

  const containerRef = useRef(null);

  useEffect(() => {
    let m: MeasureProps[] = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, []);

  return (
    <View style={{ position: "absolute", top: 50 }}>
      <View
        ref={containerRef}
        style={{ flexDirection: "row", justifyContent: "space-evenly", width }}
      >
        {data.map((item) => {
          return <Tab key={item.key} item={item} ref={item.ref} />;
        })}
      </View>

      <IndicatorFlex />
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
}

export function TabTop() {
  const scrolX = useRef(new Animated.Value(0)).current;

  const theme = useTheme();

  return (
    <Container>
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => String(item.key)}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrolX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ flex: 1, resizeMode: "cover" }}
                />

                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: "rgba(0,0,0,0.3)" },
                  ]}
                />
              </View>
            );
          }}
        />

        <Tabs scrollX={scrolX} data={data} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
