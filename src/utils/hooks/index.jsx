import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context'

export function useFetch(url) {
  const [data, setData] = useState({})

  const [isLoading, setLoading] = useState(true)

  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    setLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(url)

        const data = await response.json()

        setData(data)
      } catch (err) {
        console.log(err)

        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { isLoading, data, error }
}

export function useTheme() {
  const { toggleTheme, theme } = useContext(ThemeContext)
  return { toggleTheme, theme }
}
