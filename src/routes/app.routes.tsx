import * as React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";
import { SignIn } from "../screens/SignIn";
import { TabTop } from "../screens/TabTop";

export type RootBottomTabParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
  Splash: undefined;
  TabTop: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<RootBottomTabParamList>();

interface AppRoutesProps {}

export const AppRoutes = ({}: AppRoutesProps) => {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="Cadastrar"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 88,
        },
        headerShown: false,
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Splash"
        component={SignIn}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="TabTop"
        component={TabTop}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
