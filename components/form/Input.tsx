import { Box, FormErrorMessage, FormLabel, forwardRef, Input as ChakraInput } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'

interface InputProps {
  label?: string
  placeholder?: string
  errors?: string | FieldErrors
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (event) => void | null
  type?: string
  disabled?: boolean
  id?: string
  className?: string
  name?: string
  register?: any
  validationRules?: any
}

const Input = forwardRef(({ label, placeholder, errors, value, onChange, type, id, className, disabled, name, register, validationRules }: InputProps) => (
  <Box>
    {label ? <FormLabel>{label}</FormLabel> : null}
    {!value ? (
      <ChakraInput {...register(name, validationRules)} type={type} placeholder={placeholder} disabled={disabled} id={id} className={className} />
    ) : (
      <ChakraInput type={type} placeholder={placeholder} disabled={disabled} id={id} className={className} value={value} onChange={onChange} />
    )}
    {errors && <FormErrorMessage>{errors}</FormErrorMessage>}
  </Box>
))

Input.defaultProps = {
  label: '',
  placeholder: '',
  errors: '',
  value: '',
  onChange: null,
  type: 'text',
  disabled: false,
  id: '',
  className: '',
  validationRules: undefined,
}

export default Input
