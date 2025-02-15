import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ErrorBoundary } from 'react-error-boundary';
import { 
  ThermometerSun, 
  Droplets, 
  Wind, 
  Cloud,
  RefreshCcw,
  MapPin,
  Gauge,
  AlertTriangle,
  Sun,
  CloudRain,
  Leaf,
  Bug,
  Calendar,
  Clock,
  ChevronDown,
  Filter,
  Download,
  AlertCircle,
  Zap,
  Brain,
  LineChart,
  Sprout
} from 'lucide-react';
import { format } from 'date-fns';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Types
interface Region {
  value: string;
  label: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zones: FarmingZone[];
}

interface FarmingZone {
  id: string;
  name: string;
  area: number; // in hectares
  cropTypes: string[];
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  uvIndex: number;
  condition: string;
  forecast: WeatherForecast[];
}

interface WeatherForecast {
  date: string;
  temperature: {
    high: number;
    low: number;
  };
  humidity: number;
  rainfall: number;
  uvIndex: number;
  condition: string;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  zone: string;
  action: string;
}

interface AIAnalysis {
  cropHealth: number;
  diseaseProbability: number;
  pestRisk: number;
  yieldPrediction: {
    value: number;
    confidence: number;
  };
  recommendations: string[];
}

// Mock Data
const mockRegions: Region[] = [
  {
    value: 'jaipur-rural',
    label: 'Jaipur Rural',
    state: 'Rajasthan',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    zones: [
      {
        id: 'zone-1',
        name: 'North Farm Belt',
        area: 150,
        cropTypes: ['Wheat', 'Mustard']
      },
      {
        id: 'zone-2',
        name: 'South Agricultural Zone',
        area: 200,
        cropTypes: ['Millet', 'Pulses']
      }
    ]
  },
  // Add more regions as needed
];

const mockWeatherData: WeatherData = {
  temperature: 32,
  humidity: 65,
  windSpeed: 12,
  rainfall: 0,
  uvIndex: 8,
  condition: 'Sunny',
  forecast: Array.from({ length: 7 }, (_, i) => ({
    date: format(new Date().setDate(new Date().getDate() + i), 'yyyy-MM-dd'),
    temperature: { high: 33 - Math.random() * 3, low: 22 + Math.random() * 3 },
    humidity: 65 + Math.random() * 10,
    rainfall: Math.random() * 5,
    uvIndex: 7 + Math.random() * 3,
    condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain'][Math.floor(Math.random() * 4)]
  }))
};

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Pest Activity Detected',
    message: 'Significant increase in fall armyworm population detected in Zone 1',
    timestamp: new Date().toISOString(),
    zone: 'North Farm Belt',
    action: 'Immediate pesticide application recommended'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Potential Water Stress',
    message: 'Soil moisture levels dropping below optimal range',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    zone: 'South Agricultural Zone',
    action: 'Increase irrigation frequency'
  },
  {
    id: '3',
    type: 'info',
    title: 'Optimal Planting Conditions',
    message: 'Weather conditions favorable for wheat sowing',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    zone: 'North Farm Belt',
    action: 'Consider beginning sowing operations'
  }
];

const mockAIAnalysis: AIAnalysis = {
  cropHealth: 85,
  diseaseProbability: 15,
  pestRisk: 25,
  yieldPrediction: {
    value: 4.2, // tons per hectare
    confidence: 85
  },
  recommendations: [
    'Schedule irrigation for tomorrow morning',
    'Monitor for early signs of rust disease',
    'Consider preventive fungicide application',
    'Optimal harvesting window in 2 weeks'
  ]
};

// Helper Functions
const getAlertColor = (type: Alert['type']) => {
  switch (type) {
    case 'critical':
      return 'text-red-500 bg-red-50 border-red-200';
    case 'warning':
      return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    case 'info':
      return 'text-blue-500 bg-blue-50 border-blue-200';
  }
};

const getAlertIcon = (type: Alert['type'], size: number = 24) => {
  const props = { size, strokeWidth: 1.5 };
  switch (type) {
    case 'critical':
      return <AlertTriangle {...props} className="text-red-500" />;
    case 'warning':
      return <AlertCircle {...props} className="text-yellow-500" />;
    case 'info':
      return <AlertCircle {...props} className="text-blue-500" />;
  }
};

function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedZone, setSelectedZone] = useState<FarmingZone | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis>(mockAIAnalysis);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      refreshData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 1000)),
        new Promise(resolve => setTimeout(resolve, 1000)),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);
      
      // Update with mock data
      setWeatherData(mockWeatherData);
      setAlerts(mockAlerts);
      setAIAnalysis(mockAIAnalysis);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl font-bold">AgriSense Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(), 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{format(new Date(), 'HH:mm')}</span>
              </div>
              <button
                onClick={refreshData}
                className="p-2 rounded-lg bg-green-600 hover:bg-green-500 transition"
              >
                <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              options={mockRegions}
              value={selectedRegion}
              onChange={(region) => setSelectedRegion(region as Region)}
              placeholder="Select a region..."
              className="text-gray-900"
            />
            {selectedRegion && (
              <Select
                options={selectedRegion.zones}
                value={selectedZone}
                onChange={(zone) => setSelectedZone(zone as FarmingZone)}
                placeholder="Select a farming zone..."
                className="text-gray-900"
                getOptionLabel={(option: FarmingZone) => option.name}
                getOptionValue={(option: FarmingZone) => option.id}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Weather Conditions</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Last updated: {format(new Date(), 'HH:mm')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span className="text-gray-600">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-cyan-500" />
                    <span className="text-gray-600">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-600">Rainfall</span>
                  </div>
                  <p className="text-2xl font-bold">{weatherData.rainfall} mm</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-600">UV Index</span>
                  </div>
                  <p className="text-2xl font-bold">{weatherData.uvIndex}</p>
                </div>
              </div>

              {/* Weather Chart */}
              <div className="mt-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={weatherData.forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => format(new Date(date), 'MMM d')}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      labelFormatter={(date) => format(new Date(date as string), 'MMM d, yyyy')}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature.high"
                      stroke="#f97316"
                      name="Temperature (°C)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="humidity"
                      stroke="#0ea5e9"
                      name="Humidity (%)"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Active Alerts</h2>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                  <Filter className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <span>{alert.zone}</span>
                          <span>•</span>
                          <span>{format(new Date(alert.timestamp), 'HH:mm')}</span>
                        </div>
                        <div className="mt-2 text-sm font-medium">
                          Action: {alert.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">AI Insights</h2>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-500">Powered by Machine Learning</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sprout className="h-5 w-5 text-green-500" />
                  <span className="text-gray-600">Crop Health</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{aiAnalysis.cropHealth}%</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${aiAnalysis.cropHealth}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="h-5 w-5 text-red-500" />
                  <span className="text-gray-600">Pest Risk</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold">{aiAnalysis.pestRisk}%</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${aiAnalysis.pestRisk}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">AI Recommendations</h3>
              <ul className="space-y-2">
                {aiAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Yield Prediction</h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Download className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Predicted Yield</p>
                <p className="text-3xl font-bold">{aiAnalysis.yieldPrediction.value} t/ha</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Confidence</p>
                <p className="text-3xl font-bold text-green-500">
                  {aiAnalysis.yieldPrediction.confidence}%
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weatherData.forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM d')}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature.high"
                    stroke="#22c55e"
                    name="Predicted Yield Trend"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle className="h-8 w-8" />
              <h2 className="text-xl font-bold">Error</h2>
            </div>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;