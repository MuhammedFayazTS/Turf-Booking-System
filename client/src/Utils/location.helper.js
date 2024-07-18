export const getUserLocation = (dispatch,setLocation) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          // Construct the API URL
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
  
          try {
            // Fetch city name from the API
            const response = await fetch(apiUrl);
            const data = await response.json();
  
            if (response.ok) {
              // Extract the city name from the address
              const cityName = data.address?.town || data.address?.city || data.address?.village || 'Unknown Location';
              const location = {
                latitude,
                longitude,
                name: cityName,
              };
  
              dispatch(setLocation(location))
            } else {
              console.error('Error fetching location name:', data.message);
            }
          } catch (error) {
            console.error('Error fetching location name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  
  //   withgoogle
  export const getUserLocationWithGoogle = (dispatch,setLocation) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          // Construct the API URL
          const apiKey = process.env.GOOGLE_MAP_API_KEY;
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${apiKey}`;
  
          try {
            // Fetch city name from the API
            const response = await fetch(apiUrl);
            const data = await response.json();
  
            if (data.status === 'OK') {
              const cityName =
                data.results[0]?.address_components.find((component) => component.types.includes('locality'))
                  ?.long_name || 'Unknown Location';
  
              const location = {
                latitude,
                longitude,
                name: cityName,
              };
  
              dispatch(setLocation(location))
            } else {
              console.error('Error fetching location name:', data.status);
            }
          } catch (error) {
            console.error('Error fetching location name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  