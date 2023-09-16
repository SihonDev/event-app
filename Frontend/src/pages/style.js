import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 20,
  },
  welcomeContainer: {
    maxWidth: 500,
    alignContent:" space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  gridContainer: {
    alignContent:" space-around",
    paddingTop: 10,
    paddingBottom: 10,
  },
  root: {
    // maxWidth: 400,
    // flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
  },
  img: {
    width: '100%',
  },
}));

export default useStyles