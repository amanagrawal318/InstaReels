import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
import { TextField,Grid,Button,Paper,Card,CardContent,CardActions,Container,CardMedia,Typography,makeStyles} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import logo from '../logo.png';
import { Link } from "react-router-dom";
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleFileSubmit = (event) => {
    let fileObject = event.target.files[0];
    setProfileImage(fileObject);
  };

  const handleSignUp = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;
      //   you are signed up
      const uploadPhotoObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/image.jpg`)
        .put(profileImage);
        console.log(uploadPhotoObject);
      uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
      // to track the progress of the upload
      function fun1(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      // if indicates a error !!
      function fun2(error) {
        console.log(error);
      }
      // it indicates success of the upload !!
      async function fun3() {
        let profileImageUrl =
          await uploadPhotoObject.snapshot.ref.getDownloadURL();
        // db me collection => document => {username , email , profileImageUrl};
        firebaseDB.collection("users").doc(uid).set({
          email: email,
          userId: uid,
          username: username,
          profileImageUrl: profileImageUrl,
          postsCreated:[]
        });
        props.history.push("/");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
      <div>
        <Container>
          <Grid container spacing={3} style={{justifyContent:"space-around",margin:"5px"}}>
           
            <Grid item sm={3}>
              <Card variant="outlined" >
                <CardMedia image={logo} style={{ height: "5rem", backgroundSize: "contain" }}>
                </CardMedia>
                <Typography style={{ textAlign: "center" }}>
                   Sign up to see photos and videos from your friends
                 </Typography>
                <CardContent >
                  <TextField label="Username"  variant="outlined" value={username} size="small" 
                  onChange={(e) => setUsername(e.target.value)} style={{    margin: "5px",
                    width: "100%",
                    padding: "2px"}} >
                  </TextField>
                  <TextField label="Email" type="email" variant="outlined" value={email} size="small" 
                  onChange={(e) => setEmail(e.target.value)} style={{    margin: "5px",
                  width: "100%",
                  padding: "2px"}}>
                  </TextField>
                  <TextField label="Password" type="password" variant="outlined" value={password} size="small" 
                  onChange={(e) => setPassword(e.target.value)} style={{    margin: "5px",
                  width: "100%",
                  padding: "2px"}}>
                  </TextField>
                </CardContent>
               
             {/* <Button  variant="contained" color="secondary"  >
                      
              <input type="file" onChange={handleFileSubmit} style={{display:"none"}} />
              upload profile pic
  </Button>*/}
              

              <input type="file" accept="image/*" id="contained-button-file"   onChange={handleFileSubmit} style={{ display: 'none' }}/>
      <label htmlFor="contained-button-file">
        <Button variant="outline" fullWidth="true" size="large" color="secondary" component="span" startIcon={<CloudUploadIcon></CloudUploadIcon>} style={{    margin: "5px",
                    width: "95%",
                    left: "8px",
                    border:"2px solid #d63031",
                    color:"#d63031",
                    fontWeight:"500"
                    }}>
          Upload Profile Image
        </Button>
      </label>
                <CardActions>
                  <Button variant="contained" color="primary" onClick={handleSignUp} style={{width:"100%",left:"4px"}}>
                   Signup
                  </Button>
                </CardActions>
              
              </Card>
              <Card variant="outlined" style={{margin:"5px"}}>
                <Typography style={{ textAlign: "center" }}>
                   Have an Account ? 
                  <Button variant="contained" color="primary">
                    <Link style={{ color: "white",textDecoration: "none" }} to="/login">Login</Link>
                  </Button>
                </Typography>

             </Card>
            </Grid>
 
          </Grid>
         
        </Container>
      






     {/* <h1>Signup Page</h1>
      <div>
        <div>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileSubmit(e);
            }}
          ></input>
        </div>
      </div>
      <button onClick={handleSignUp}>SignUp</button>
      <h2 style={{ color: "red" }}>{message}</h2>{" "}*/}
  </div>
  );
};

export default Signup;