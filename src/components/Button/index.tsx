import { Button as NativeBaseButton, IIconButtonProps, Text } from "native-base"

type Props = IIconButtonProps & {
    title: string;
    variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
    return (
        <NativeBaseButton
            height={14}
            width='full'
            rounded='sm'
            color='white'
            borderColor='green.500'
            borderWidth={variant === 'outline' ? 1 : 0}
            bg={variant === 'outline' ? 'transparent' : 'green.700'}
            _pressed={{ bg: variant === 'outline' ? 'gray.500' : 'green.500' }}
            {...rest}>

            <Text color={variant === 'outline' ? 'green.500' : 'white'}>
                {title}
            </Text>

        </NativeBaseButton>
    )
}