export const translateErrors = (errors: string | Record<string, string[]>) => {
  if (!errors) return ''

  if (typeof errors === 'string') return errors

  if (!Object.keys(errors)?.length) return ''

  return `${Object.keys(errors)[0]} ${errors[Object.keys(errors)[0]]}`
}
