import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

// ===========================|| DASHBOARD DEFAULT - BANNER COMPONENT ||=========================== //

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_IMAGE_URL = 'https://executivetracking.cloudjiffy.net/Mahaasabha/file/downloadFile/?filePath=';

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        // Retrieve the user token from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user?.accessToken || '';

        const response = await axios.get(
          'https://executivetracking.cloudjiffy.net/Mahaasabha/advertisement/v1/getAllAdvertisementByPagination/{pageNumber}/{pageSize}?pageNumber=0&pageSize=10',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Validate and set banners data
        setBanners(Array.isArray(response.data?.content) ? response.data.content : []);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBanners([]); // Fallback to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <MainCard border={false} content={false}>
      <Box>
        <Grid container direction="column">
          <Grid item xs={12}>
            {loading ? (
              <Box>Loading banners...</Box>
            ) : (
              <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                interval={3000}
                transitionTime={500}
              >
                {banners.map((banner, index) => (
                  <div key={index} style={{ height: '400px' }}> {/* Fixed height */}
                    <img
                      src={`${BASE_IMAGE_URL}${banner.filePath}`}
                      alt={banner.altText || `Banner ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Ensures the image covers the container without distortion
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

Banner.propTypes = {
  isLoading: PropTypes.bool,
};

export default Banner;