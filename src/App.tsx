import { FormControl } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import axios from 'axios'
import { useEffect, useState, Fragment } from 'react'
import { IJuzaMeta, IQuranMetaApi } from './app/api/types'

function App() {
  const [response, setResponse] = useState<IQuranMetaApi['data']>()
  const [surahList, setSurahList] = useState<IJuzaMeta['surahs']>()
  const [ayahList, setAyahList] = useState<IJuzaMeta['ayahs']>()
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
      .then(({ data }) => {
        setSurahList(data.data.surahs)
        setAyahList(data.data.ayahs)
      })
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

      <List>
        {surahList &&
          Object.keys(surahList)?.map((num) => (
            <Fragment key={num}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setSurah((prev) => (prev === num ? '' : num))}
                >
                  <ListItemText primary={surahList[num].englishName} />
                </ListItemButton>
              </ListItem>
              <Collapse in={num === surah}>
                <List>
                  {ayahList
                    ?.filter((item) => item.surah.number === +surah)
                    .map((item) => (
                      <ListItemButton key={item.page} dir='rtl'>
                        <ListItemText
                          sx={{ textAlign: 'start' }}
                          dir='rtl'
                          primary={item.numberInSurah + ' - ' + item.text}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </Fragment>
          ))}
      </List>
    </div>
  )
}

export default App
