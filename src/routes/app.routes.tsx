import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { TrainingDetail } from "@screens/TrainingDetail";

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'


type AppRoutes = {
    home: undefined;
    trainingDetail: undefined;
    profile: undefined;
    history: undefined;
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>
const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
    const { sizes, colors } = useTheme()
    const sizeIcon = sizes[6]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingTop: sizes[6],
                paddingBottom: sizes[10]
            }
        }} >
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={sizeIcon} height={sizeIcon} />
                    )
                }}
            />
            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={sizeIcon} height={sizeIcon} />
                    )
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={sizeIcon} height={sizeIcon} />
                    )
                }}
            />
            <Screen
                name="trainingDetail"
                component={TrainingDetail}
                options={{tabBarButton:()=>null}}
            />
        </Navigator>
    )

}