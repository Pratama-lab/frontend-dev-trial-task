import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import Loading from "components/Loading";

import { useAuth } from "contexts/authContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "blue",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  profileContainer: {
    textAlign: "center",
    marginTop: "-50px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
    border: "4px solid white",
  },
  section: {
    padding: "50px 20px",
  },
  card: {
    minWidth: 150,
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  cardIcon: {
    fontSize: "30px",
    color: "#6c63ff",
    marginBottom: "10px",
  },
}));

const DashboardPage = () => {
  const [viewLoading, setViewLoading] = React.useState(false);
  const [email, setEmail] = React.useState('n/a');
  const [firstName, setFirstName] = React.useState('n/a');
  const classes = useStyles();
  const auth = useAuth();
  
  React.useEffect(() => {
    setViewLoading(true);
    const user = auth.user;
  
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(json => {
        for (let i = 0; i < json.length; i++) {
          if (user === json[i].username) {
            setEmail(json[i].email);
            setFirstName(json[i].name['firstname'] +' '+ json[i].name['lastname']);
            setViewLoading(false);
          }
        }
      });
  }, [auth]);

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="white">
            Profile
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              onClick={() => auth.logOut()}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <br />

      {/* Profile Section */}
      {viewLoading ? (
        <Loading />
      ) : (
        <Box className={classes.section}>
          <Box className={classes.profileContainer}>
            <Avatar
              src=""
              alt="Profile"
              className={classes.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5" gutterBottom sx={{ textTransform: 'capitalize' }}>
              {firstName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {email}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DashboardPage;