import { Input as NativeBaseInput,IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
    return (
        <NativeBaseInput
            mb={4}
            px={4}
            h={14}
            
            bg={'gray.700'}
            borderWidth={0}
            fontSize={'md'}
            color={'white'}
            borderRadius={4}
            fontFamily={'body'}
            placeholderTextColor={'gray.300'}
            _focus={{
                bg:'gray.700',
                borderWidth:'1',
                borderColor:'green.500'
            }}
            {...rest}
        />
    )

}


