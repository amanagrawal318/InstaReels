import React from 'react';
import { firebaseDB, timeStamp} from '../config/firebase';
import { Card,CardHeader,CardActions,CardContent,CardMedia,Button,makeStyles,Typography,TextField,Avatar,Container} from '@material-ui/core';
import { useState } from 'react';
import { useEffect ,useContext} from 'react';
import { ReactDOM } from 'react';
import {AuthContext} from "../context/AuthProvider";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
const VideoPost = (props) => {
    let [user,setUser] =useState(null);
    let [comment,setComment] =useState("");
    let [commentList,setCommentList]=useState([]);  //{ comment , profilepicurl}
    let {currentUser} =useContext(AuthContext);
    let [likesCount,setLikesCount]= useState(null)
    let [isLiked,setIsLiked] = useState(false);
    const useStyles = makeStyles({
        videoContainerSize: {
          height: "50%",
        },
      });
      let classes = useStyles();

      const addCommentToCommentList = async (e)=>{
        let profilePic;
        // when commenting user and post author user is same
        if(currentUser.uid == user.userId){
          profilePic = user.profileImageUrl;
        }
        else{
            console.log(currentUser.uid);
          let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
          let user = doc.data();
          console.log(user);
          profilePic = user.profileImageUrl;
        }
        let newCommentList = [...commentList , {
          profilePic: profilePic,
          comment: comment,
        }]
    
        // add comments in firebase
        let postObject = props.postObj;
        postObject.comments.push({ uid:currentUser.uid , comment: comment });
        // it will set a new post object with updated comments in firebase DB
        await firebaseDB.collection("posts").doc(postObject.pid).set(postObject);
        setCommentList(newCommentList);
        setComment("");
      }

      const toggleLikeIcon = async () =>{
        if(isLiked){
          // post liked hai to unlike the post
          // make isLiked = false;
          // in postDoc remove your uid in likes array !
          // setLikesCount(1 ? null : -1);
          let postDoc = props.postObj;
          let filteredLikes = postDoc.likes.filter( uid =>{
            if(uid == currentUser.uid){
              return false;
            }
            else{
              return true;
            }
          });
          postDoc.likes = filteredLikes;
          await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
          setIsLiked(false);
          likesCount == 1 ? setLikesCount(null) : setLikesCount(likesCount-1);
        }
        else{
          // post liked nhi hai to like the post
          // make isLiked = true;
          // in postDOc add your uid in likes array !
          // setLikesCount( null ? 1 : +1);
          let postDoc = props.postObj;
          postDoc.likes.push(currentUser.uid);
          await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
          setIsLiked(true);
          likesCount == null ? setLikesCount(1) : setLikesCount(likesCount+1);
        }
      }
    useEffect(async ()=>{
        console.log(props);
        let uid=props.postObj.uid;
        let doc=await firebaseDB.collection("users").doc(uid).get();
        let user=doc.data();
        let commentList=props.postObj.comments;
        let likes=props.postObj.likes;
         console.log(commentList);
        let updatedCommentList=[];

        for(let i=0;i<commentList.length;i++){
            let commentobj=commentList[i];
            //console.log(commentobj);
            let doc=await firebaseDB.collection("users").doc(commentobj.uid).get();
            let commentUserPic=doc.data().profileImageUrl;
            updatedCommentList.push({profilePic:commentUserPic, comment:commentobj.comment});
        }

        if(likes.includes(currentUser.uid)){
          setIsLiked(true)
          setLikesCount(likes.length);
        }else{
          if(likes.length){
            setLikesCount(likes.length);
          }

        }
        console.log(updatedCommentList);
        setUser(user);
        setCommentList(updatedCommentList);
    },[]);

{/*<div className="video-container">
            <Video src={props.postObj.videoLink} ></Video>
    </div>*/}

    return ( 
          <Container>
              <Card style={{
          // height: "80vh",
          width: "300px",
          margin: "auto",
          padding: "10px",
          marginBottom: "20px",
        }}>
                 <Avatar src={user? user.profileImageUrl:""} ></Avatar>
                 <Typography variant="span">{user?user.username:""}</Typography>
                <div className="video-container">
            <Video className={classes.videoContainerSize} src={props.postObj.videoLink} ></Video>
    </div>
         <div>
         {isLiked? <Favorite style={{color:"red"} } onClick={()=>toggleLikeIcon()}></Favorite>: <FavoriteBorder onClick={()=>toggleLikeIcon()}></FavoriteBorder>}
         </div>
         {likesCount && (<div><Typography variant="span">Liked by {likesCount} others</Typography></div>)}
               <Typography variant="p">comments</Typography>
               <TextField variant="outlined" label="Add a comment" size="small"  value={comment} onChange={(e)=>{setComment(e.target.value)}} ></TextField>
               <Button variant="contained" color="secondary" onClick={addCommentToCommentList}>Post</Button>

               {commentList.map((commentObj)=>{
                   return (
                       <>
                       <Avatar src={commentObj.profilePic}></Avatar>
                       <Typography variant="p">{commentObj.comment}</Typography>
                       </>
                   );
               })}
              </Card>
          </Container>


        
     );
}

function Video(props) {
    const handleAutoScroll = (e) => {
         /*console.log(e);
          let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.parentNode
            .nextSibling;
          console.log(next);
          if (next) {
            next.scrollIntoView({ behaviour: "smooth" });
            e.target.muted = "true";
          }*/
        };
    return (
        <video
        style={{
            height: "100%",
            width: "100%",
        }}
        muted={true}
        onEnded={handleAutoScroll}
        
        onClick={(e)=>{console.log(timeStamp());}}
      >
        <source src={props.src} type="video/mp4"></source>
      </video>
    );
  }
export default VideoPost;