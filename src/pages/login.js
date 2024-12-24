import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from 'contexts/authContext';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function LoginPage() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const auth = useAuth();

  const handleClickShowPassword = async () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = async (event) => {
    event.preventDefault();
  };

  const validateInputs = () => {
    const email = document.getElementById('email');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (emailError === false) {
      setIsLoading(true);
      fetch('https://fakestoreapi.com/users')
        .then(res => res.json())
        .then(json => {
          for (let i = 0; i < json.length; i++) {
            if (input.email === json[i].email) {
              if (input.email !== "" && input.password !== "") {
                auth.loginAction({
                  username: json[i].username,
                  password: input.password,
                });
                setIsLoading(false);
                return;
              }
              setIsLoading(false);
              alert("pleae provide a valid input");
            }
          }
        });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid
      container
      component='main'
      sx={{
        height: '100vh',
        fontFamily: 'Poppins',
        justifyContent: 'center',
      }}
    >
      {auth.error === true ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={auth.error}
          autoHideDuration={5000}
          onClose={auth.handleCloseError}
        >
          <Alert variant='filled' severity='error'>
            Email or Password is incorrect.
          </Alert>
        </Snackbar>
      ) : null}
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitEvent}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
              sx={{ mt: 2, borderRadius: '8px' }}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <OutlinedInput
              required
              id='password'
              name='password'
              type={values.showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete='current-password'
              placeholder='Enter 6 character or more'
              sx={{ mt: 2, borderRadius: '8px' }}
              onChange={handleInput}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ height: '50px' }}
            onClick={validateInputs}
          >
            {auth.isLoading || isLoading ? (
              <CircularProgress size={30} thickness={3} color='white' />
            ) : (
              'Sign in'
            )}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}