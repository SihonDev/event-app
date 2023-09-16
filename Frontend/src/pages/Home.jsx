import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material';
import RecommendSlider from '../components/RecommendSlider';
import { getHamlatzot } from '../features/hamlatzot/hamlatzhaSlice';
import Spinner from '../components/Spinner';

function Home() {
  const dispatch = useDispatch()
  const { hamlatzot, isLoading, isError, message } = useSelector(
    (state) => state.hamlatzot
  )

  useEffect(() => {
    dispatch(getHamlatzot())
  }, [isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  console.log('hamlatzot', hamlatzot)

  return (
    <>
      <section className='heading'>
        <p>המלצות והתרשמות מהאתר שלנו:</p>
      </section>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        {hamlatzot.length ? <RecommendSlider data={hamlatzot} /> : <>אין כרגע המלצות</>}
      </Grid>
    </>
  )
}

export default Home
