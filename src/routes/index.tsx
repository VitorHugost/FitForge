import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { UseAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';

export function Routes() {

    const { colors } = useTheme()
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700]
    const { user, isLoadingUserData } = UseAuth()

    if(isLoadingUserData) return <Loading/>

    return (
        <Box flex={1} bg={colors.gray[700]}>
            <NavigationContainer theme={theme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}