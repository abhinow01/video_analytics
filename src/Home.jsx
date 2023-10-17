import { Container, Typography, Button } from '@mui/material';
import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import ResultPage from './ResultPage';
import axios from 'axios';



function Home() {
  const red = '#E23744';
  const [videoLink,setVideoLink] = useState("");
  const [videoData,setVideoData] = useState(null);
 const [loading,setLoading] = useState(false);
 const navigate = useNavigate();
 const apiKey = import.meta.env.VITE_REACT_APP_YOUTUBE_API_KEY;


 const handleGetAnalytics = async  ()=>{
    setLoading(true);
    try {
        await fetchVideoData(); // Call fetchVideoData here
    
        setTimeout(() => {
          setLoading(false);
          navigate('/result');
        }, 2000);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setLoading(false);
      }
};
  const getVideoId = (link)=>{
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoData = async ()=>{
    try{
        const videoId = getVideoId(videoLink);
        if(!videoId){
            console.log("Error: invalid id!");
            return;
        }
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
        {
        params : {
            part: 'snippet,statistics',
            id: videoId,
            key: "AIzaSyCwWw-zrVAzNfc-wqbk96UiwYLw32PonJM"        // apiKey
        }
    });
    const data = response.data.items[0];
    console.log(data);
      setVideoData(data);
    }catch (error) {
        console.error('Error fetching video data:', error);
      }
  };

  const calculateEarnings = (videoData) => {
    if (videoData) {
      const subscriberCount = videoData.statistics.subscriberCount || 0;
      const views = videoData.statistics.viewCount || 0;
      const comments = videoData.statistics.commentCount || 0;
      const likes = videoData.statistics.likeCount || 0;

      return Math.min(subscriberCount, views) + 10 * comments + 5 * likes;
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
          height: '35px', // Adjusted height
         // Added margin at the bottom
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
          padding: '40px', // Added padding for more space
          background: "#101010", // Set a white background for the container
          borderRadius: '10px', // Added rounded corners
          opacity: '0.9',
          color: 'white' // Added a slight opacity for better visibility
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
            sx={{
              width: 500,
              maxWidth: '100%',
             borderRadius: '30px',
             backgroundColor: 'transparent',
                border: '1px solid white', // Added border style
                color: 'white'
            }}
          >
            <TextField
              fullWidth
              placeholder='enter youtube video link'
              id="fullWidth"
              sx={{
                borderRadius: '30px',
                color:"white"
              }}
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
      {videoData && (
  <ResultPage
    videoData={videoData}
    earnings={calculateEarnings(videoData)}
  />
)}
    </div>
  );
    
 }
  


export default Home;
