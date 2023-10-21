import { Container, Typography, Button } from '@mui/material';
import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate ,useLocation} from 'react-router-dom';
import './styles.css';
import ResultPage from './ResultPage';
import axios from 'axios';
import './index.css'



function Home() {
  const red = '#E23744';
  const [videoLink,setVideoLink] = useState("");
  const [videoData,setVideoData] = useState(null);
 const [loading,setLoading] = useState(false);
 const navigate = useNavigate();
 const location = useLocation();

 const apiKey = import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY;

 const getVideoId = (link)=>{
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  return match ? match[1] : null;
};
 const handleGetAnalytics = async  ()=>{
    setLoading(true);
    try {
      const videoId = getVideoId(videoLink);
        
        if (!videoId) {
          console.log("Error: invalid id!");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,statistics',
              id: videoId,
              key: "AIzaSyCwWw-zrVAzNfc-wqbk96UiwYLw32PonJM" // apiKey
            }
          }
        );
        const data = response.data.items[0];
          console.log(data);
          setVideoData(data);

          const earnings = calculateEarnings(data);
         
          navigate('/result', { state: { videoData: data, earnings } });
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
};
  

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);
  

 
  const calculateEarnings = (videoData) => {
    if (videoData) {
      const subscriberCount = videoData.statistics.subscriberCount || 0;
      const views = videoData.statistics.viewCount || 0;
      const comments = videoData.statistics.commentCount || 0;
      const likes = videoData.statistics.likeCount || 0;
      let vidEarnings =  Math.min(subscriberCount, views) + 10 * comments + 5 * likes;
      return vidEarnings;
    }

    return 0;
  };

  return (
    <div style={{ background: '#101010', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
        style={{
            position:'absolute',
          display: 'flex',
          top: '20px',
          left: '20px',
          zIndex: '9999',
          width: '100%',
          height: '35px',
         
        }}
      >
        <img src='/assets/anchorlogo.png'  />
      </div>
      <Container
      
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px', 
          borderRadius: '10px', 
          opacity: '0.9',
        
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h2" fontWeight={100} color="white">
            Discover Your earning potential
          </Typography>
          <Typography variant='subtitle1' style={{ fontWeight: 300 }} color="white">
            Turn your Youtube expertise into a lucrative income <br /> through resource sharing
          </Typography>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            style={{
              width: 500,
              maxWidth: '100%',
             borderRadius: '30px',
             background: 'transparent',
            border: '1px solid white', 
            color: 'white'
            }}
          >
            <TextField
              fullWidth
              placeholder='enter youtube video link'
              id="fullWidth"
              style={{
                color:'white',
                background: 'transparent',
                borderRadius: '30px',
              }}
              inputProps={{ style: { color: 'white' } }}
              onChange={(e)=>setVideoLink(e.target.value)}
            />
          </Box>
          
          <Button
            variant="contained"
            style={{
              background: red,
              color: 'white',
              borderRadius: 10,
              marginLeft: '10px'
            }}
            onClick={handleGetAnalytics}
          >
            
            <Typography variant='caption'>Click here</Typography>
          </Button>
          
          
        </div>
      </Container>
      {location.state && (
        <ResultPage />
      )}

  <div style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            margin: '10px',
            display: 'flex',
            zIndex: 9999 
          }}> 
           <img src='./assets/playimg.png'/>
          </div>
    </div>
  );
    
 }
  


export default Home;
