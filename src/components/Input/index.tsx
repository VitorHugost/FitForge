import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type InputProps = IInputProps & {
    errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
    const invalid = !!errorMessage || isInvalid
    return (
        <FormControl isInvalid={invalid} mb={4}>

            <NativeBaseInput
                px={4}
                h={14}

                bg={'gray.700'}
                borderWidth={0}
                fontSize={'md'}
                color={'white'}
                borderRadius={4}
                fontFamily={'body'}
                isInvalid={invalid}
                _invalid={{
                    borderWidth:1,
                    borderColor:"red.500"
                }}
                placeholderTextColor={'gray.300'}
                _focus={{
                    bg: 'gray.700',
                    borderWidth: '1',
                    borderColor: 'green.500'
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{color:'red.500'}}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )

}


