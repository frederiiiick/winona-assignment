export const fetchDoctors = async (): Promise<Response> => {
  const response = await fetch('/api')

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export const fetchDoctorById = async (id: string): Promise<Response> => {
  const response = await fetch('/api')

  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
  }

  // Get the doctors data and find the one with matching ID
  const doctors = await response.json()
  const foundDoctor = doctors.find((doctor: any) => doctor.id === id)
  
  if (!foundDoctor) {
    throw new Error(`The doctor is away, please try again later.`)
  }

  // Return a mock Response object with the found doctor data
  return new Response(JSON.stringify(foundDoctor), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
