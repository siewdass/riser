import { useForm as useform } from 'react-hook-form'

export function useForm( validations ): any {
	const { register, handleSubmit, formState: { errors }, getValues } = useform( )
  
	return [ { register, errors, validations, getValues }, handleSubmit ]
}
