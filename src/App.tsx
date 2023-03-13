import { FormControl } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IJuzaMeta, IQuranMetaApi } from './app/api/types'

function App() {
  const [response, setResponse] = useState<IQuranMetaApi['data']>()
  const [surahList, setSurahList] = useState<IJuzaMeta['surahs']>()
  const [juza, setJuza] = useState('')
  const [surah, setSurah] = useState('')

  useEffect(() => {
    axios
      .get('http://api.alquran.cloud/v1/meta')
      .then(({ data }) => setResponse(data.data))
    return () => {}
  }, [])

  useEffect(() => {
    if (!juza) return
    axios
      .get(`http://api.alquran.cloud/v1/juz/${juza}/quran-uthmani`)
      .then(({ data }) => setSurahList(data.data.surahs))
  }, [juza])

  return (
    <div className='App flex flex-col'>
      <h1>Please Select the :))</h1>

      <div className='flex flex-row w-full justify-center items-center'>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>Juza</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={age}
            label='Age'
            onChange={(e) => setJuza(e.target.value as string)}
          >
            {response?.juzs?.references?.map((item, idx) => (
              <MenuItem key={idx} value={idx + 1}>
                {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>Hizb</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={age}
            label='Age'
            // onChange={handleChange}
          >
            {response?.hizbQuarters?.references?.map((item, idx) => (
              <MenuItem key={idx} value={idx + 1}>
                {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>Surah</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={age}
            label='Age'
            onChange={(e) => setSurah(e.target.value as string)}
          >
            {surahList &&
              Object.keys(surahList)?.map((num) => (
                <MenuItem key={num} value={num}>
                  {surahList[num].name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>Page</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            // value={age}
            label='Age'
            // onChange={handleChange}
          >
            {response?.juzs?.references?.map((item, idx) => (
              <MenuItem key={idx} value={idx + 1}>
                {idx + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
