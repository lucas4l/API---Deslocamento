const convertToYYYYMMDD = (dateString: string): string => {
  const [dia, mes, ano] = dateString.split('/')
  const formattedDate = new Date(Number(ano), Number(mes) - 1, Number(dia))
  const formattedISOString = formattedDate.toISOString()
  const formattedYYYYMMDD = formattedISOString.substring(0, 10)

  return formattedYYYYMMDD
}

const convertToDDMMYYYY = (dateString: string): string => {
  const dateObj = new Date(dateString)
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${day}/${month}/${year}`
}

export { convertToYYYYMMDD, convertToDDMMYYYY }
