import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, CloudRain, Cloud, Snowflake, MapPin } from "lucide-react";
import axios from "axios";

const API_KEY = "2968de8a2e2edaff0ddad5d0bdc8d302";

const getWeatherIcon = (weather) => {
  const main = weather.toLowerCase();
  if (main.includes("rain")) return <CloudRain className="w-8 h-8 text-blue-500" />;
  if (main.includes("cloud")) return <Cloud className="w-8 h-8 text-gray-500" />;
  if (main.includes("snow")) return <Snowflake className="w-8 h-8 text-cyan-400" />;
  return <Sun className="w-8 h-8 text-yellow-400" />;
};

const getBackground = (weather) => {
  const main = weather.toLowerCase();
  if (main.includes("rain")) return "from-blue-200 to-gray-500";
  if (main.includes("cloud")) return "from-gray-300 to-gray-600";
  if (main.includes("snow")) return "from-cyan-100 to-blue-300";
  return "from-yellow-100 to-orange-300";
};

export default function WeatherApp() {
  const [city, setCity] = useState("Rotterdam");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(res.data);
    } catch (err) {
      setWeatherData(null);
      console.error("Error fetching weather:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const background = weatherData ? getBackground(weatherData.weather[0].main) : "from-sky-100 to-indigo-200";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${background} flex flex-col items-center justify-center p-4 transition-all duration-500 ease-in-out`}>
      <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md mb-8">Weather Watch</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="max-w-sm border border-gray-300 shadow-sm rounded-xl"
        />
        <Button className="rounded-xl px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => fetchWeather(city)}>Search</Button>
      </div>
      {loading ? (
        <p className="text-lg text-gray-700">Loading...</p>
      ) : weatherData ? (
        <Card className="w-full max-w-md rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md">
          <CardContent className="flex flex-col items-center p-6 gap-5">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-3xl font-semibold text-gray-800">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
            </div>
            {getWeatherIcon(weatherData.weather[0].main)}
            <p className="text-6xl font-bold text-gray-900">
              {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="text-lg text-gray-700 capitalize tracking-wide">
              {weatherData.weather[0].description}
            </p>
          </CardContent>
        </Card>
      ) : (
        <p className="text-lg text-red-500">City not found.</p>
      )}
    </div>
  );
}
