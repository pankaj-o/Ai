'use client';

import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaThermometerHalf, FaCloud, FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  weatherCode: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Bremen, Germany coordinates as fallback
  const BREMEN_COORDS = { lat: 53.0793, lon: 8.8017 };

  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode >= 0 && weatherCode <= 3) return <FaSun className="text-yellow-400" />;
    if (weatherCode >= 45 && weatherCode <= 48) return <FaCloud className="text-gray-400" />;
    if (weatherCode >= 51 && weatherCode <= 67) return <FaCloudRain className="text-blue-400" />;
    if (weatherCode >= 71 && weatherCode <= 77) return <FaSnowflake className="text-blue-200" />;
    if (weatherCode >= 80 && weatherCode <= 82) return <FaCloudRain className="text-blue-400" />;
    if (weatherCode >= 95 && weatherCode <= 99) return <FaCloudRain className="text-blue-400" />;
    return <FaCloud className="text-gray-400" />;
  };

  const getWeatherDescription = (weatherCode: number) => {
    if (weatherCode >= 0 && weatherCode <= 3) return 'Clear sky';
    if (weatherCode >= 45 && weatherCode <= 48) return 'Foggy';
    if (weatherCode >= 51 && weatherCode <= 67) return 'Rainy';
    if (weatherCode >= 71 && weatherCode <= 77) return 'Snowy';
    if (weatherCode >= 80 && weatherCode <= 82) return 'Light rain';
    if (weatherCode >= 95 && weatherCode <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  const getWeather = async (lat: number, lon: number, isDefaultLocation = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Weather data unavailable');
      }

      const data = await response.json();
      
      let locationName = 'Bremen, Germany';
      if (!isDefaultLocation) {
        // Get location name using reverse geocoding only for user's location
        const locationResponse = await fetch(
          `https://api.open-meteo.com/v1/geocoding/reverse?latitude=${lat}&longitude=${lon}&count=1`
        );
        
        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          if (locationData.results && locationData.results[0]) {
            locationName = locationData.results[0].name || locationData.results[0].city || 'Unknown location';
          }
        }
      }

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        description: getWeatherDescription(data.current.weather_code),
        location: locationName,
        weatherCode: data.current.weather_code
      });
    } catch (err) {
      setError('Unable to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleLocationSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      getWeather(latitude, longitude, false);
    };

    const handleLocationError = () => {
      // Show Bremen weather by default when location access is denied
      getWeather(BREMEN_COORDS.lat, BREMEN_COORDS.lon, true);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      // Show Bremen weather when geolocation is not supported
      getWeather(BREMEN_COORDS.lat, BREMEN_COORDS.lon, true);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg z-50">
        <div className="flex items-center space-x-2 text-white">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span className="text-sm">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Don't show error widget
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-lg z-50 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">
          {getWeatherIcon(weather.weatherCode)}
        </div>
        <div className="text-white">
          <div className="flex items-center space-x-1 text-xs text-gray-300">
            <FaMapMarkerAlt className="text-emerald-400" />
            <span>{weather.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaThermometerHalf className="text-red-400" />
            <span className="font-semibold">{weather.temperature}°C</span>
          </div>
          <div className="text-xs text-gray-300">{weather.description}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget; 