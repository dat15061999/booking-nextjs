import {DailyItinerary, WeatherForecast} from "@/lib/types";
import {useState} from "react";

// Function to get the appropriate weather icon
const getWeatherIcon = (weather: WeatherForecast) => {
    if (!weather || !weather.condition) return null;

    const condition = weather.condition.toLowerCase();

    if (condition.includes("rain") || condition.includes("shower")) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16.2A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                <line x1="8" y1="19" x2="8" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
                <line x1="16" y1="19" x2="16" y2="21"></line>
            </svg>
        );
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
        );
    } else if (condition.includes("sun") || condition.includes("clear")) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        );
    } else if (condition.includes("thunder") || condition.includes("storm")) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
                <polyline points="13 11 9 17 15 17 11 23"></polyline>
            </svg>
        );
    } else {
        // Default icon for other weather conditions
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
        );
    }
};

const TripCard: React.FC<{
    tripData: DailyItinerary;
    onUpdate?: (day: number, updatedData: DailyItinerary) => void;
    onDelete?: (day: number) => void;
    isCollapsible?: boolean;
}> = ({tripData, onUpdate, onDelete, isCollapsible = false}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(tripData);

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(tripData.day, editedData);
        }
        setIsEditing(false);
    };

    return (
        <div className={`px-4 ${isCollapsible ? 'py-4' : 'py-8'}`}>
            <div className="grid grid-cols-1 gap-6">
                <article
                    key={tripData.day}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="p-6">
                        {tripData.weather_forecast_for_day && (
                            <div
                                className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-indigo-100 flex items-center">
                                {getWeatherIcon(tripData.weather_forecast_for_day)}
                                <div className="ml-3 flex-1">
                                    {tripData.weather_forecast_for_day.condition && (
                                        <p className="text-indigo-800 font-medium">Dự báo thời
                                            tiết: {tripData.weather_forecast_for_day.condition}</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-1">
                                        {tripData.weather_forecast_for_day.max_temp_celsius !== undefined && (
                                            <span
                                                className="text-red-500 text-sm">🌡️ {tripData.weather_forecast_for_day.max_temp_celsius}°C</span>
                                        )}
                                        {tripData.weather_forecast_for_day.min_temp_celsius !== undefined && tripData.weather_forecast_for_day.max_temp_celsius !== undefined && (
                                            <span className="text-xs text-gray-400">|</span>
                                        )}
                                        {tripData.weather_forecast_for_day.min_temp_celsius !== undefined && (
                                            <span
                                                className="text-blue-500 text-sm">🌡️ {tripData.weather_forecast_for_day.min_temp_celsius}°C</span>
                                        )}
                                    </div>
                                    {tripData.weather_forecast_for_day.description && (
                                        <p className="text-indigo-600 text-sm mt-1">{tripData.weather_forecast_for_day.description}</p>
                                    )}
                                    {tripData.weather_forecast_for_day.impact_on_activities && (
                                        <p className="text-orange-600 text-sm mt-1">💡 {tripData.weather_forecast_for_day.impact_on_activities}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={`${isCollapsible ? 'text-lg' : 'text-xl'} font-semibold text-indigo-900`}>
                                Ngày {tripData.day}{tripData.date ? ` : ${tripData.date}` : ''}
                            </h2>
                            {!isCollapsible && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        {isEditing ? "Hủy" : "Chỉnh sửa"}
                                    </button>
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(tripData.day)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-4">
                                {editedData.weather_forecast_for_day && (
                                    <div className="p-3 border border-indigo-200 rounded-lg">
                                        <h3 className="font-medium text-indigo-700 mb-2">Thông tin thời tiết:</h3>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Điều kiện thời
                                                    tiết</label>
                                                <input
                                                    type="text"
                                                    value={editedData.weather_forecast_for_day.condition || ''}
                                                    onChange={(e) => {
                                                        setEditedData({
                                                            ...editedData,
                                                            weather_forecast_for_day: {
                                                                ...editedData.weather_forecast_for_day,
                                                                condition: String(e.target.value || ''),
                                                            } as WeatherForecast,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">Nhiệt độ thấp
                                                        nhất (°C)</label>
                                                    <input
                                                        type="number"
                                                        value={editedData.weather_forecast_for_day.min_temp_celsius ?? ''}
                                                        onChange={(e) => {
                                                            setEditedData({
                                                                ...editedData,
                                                                weather_forecast_for_day: {
                                                                    ...editedData.weather_forecast_for_day,
                                                                    min_temp_celsius: e.target.value ? Number(e.target.value) : 0
                                                                } as WeatherForecast,
                                                            });
                                                        }}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-1">Nhiệt độ cao
                                                        nhất (°C)</label>
                                                    <input
                                                        type="number"
                                                        value={editedData.weather_forecast_for_day.max_temp_celsius ?? ''}
                                                        onChange={(e) => {
                                                            setEditedData({
                                                                ...editedData,
                                                                weather_forecast_for_day: {
                                                                    ...editedData.weather_forecast_for_day,
                                                                    max_temp_celsius: e.target.value ? Number(e.target.value) : 0
                                                                } as WeatherForecast,
                                                            });
                                                        }}
                                                        className="w-full px-2 py-1 border rounded"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Mô tả</label>
                                                <input
                                                    type="text"
                                                    value={editedData.weather_forecast_for_day.description || ''}
                                                    onChange={(e) => {
                                                        setEditedData({
                                                            ...editedData,
                                                            weather_forecast_for_day: {
                                                                ...editedData.weather_forecast_for_day,
                                                                description: String(e.target.value || ''),
                                                            } as WeatherForecast,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Tác động đến hoạt
                                                    động</label>
                                                <input
                                                    type="text"
                                                    value={editedData.weather_forecast_for_day.impact_on_activities || ''}
                                                    onChange={(e) => {
                                                        setEditedData({
                                                            ...editedData,
                                                            weather_forecast_for_day: {
                                                                ...editedData.weather_forecast_for_day,
                                                                impact_on_activities: String(e.target.value || ''),
                                                            } as WeatherForecast,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {editedData.activities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 shadow-sm border border-indigo-100"
                                        >
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={activity.start_time}
                                                    onChange={(e) => {
                                                        const newActivities = [...editedData.activities];
                                                        newActivities[index] = {
                                                            ...activity,
                                                            start_time: e.target.value,
                                                        };
                                                        setEditedData({
                                                            ...editedData,
                                                            activities: newActivities,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                                <input
                                                    type="text"
                                                    value={activity.end_time || ''}
                                                    onChange={(e) => {
                                                        const newActivities = [...editedData.activities];
                                                        newActivities[index] = {
                                                            ...activity,
                                                            end_time: e.target.value || null,
                                                        };
                                                        setEditedData({
                                                            ...editedData,
                                                            activities: newActivities,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                    placeholder="Thời gian kết thúc (không bắt buộc)"
                                                />
                                                <input
                                                    type="text"
                                                    value={activity.activity_name}
                                                    onChange={(e) => {
                                                        const newActivities = [...editedData.activities];
                                                        newActivities[index] = {
                                                            ...activity,
                                                            activity_name: e.target.value,
                                                        };
                                                        setEditedData({
                                                            ...editedData,
                                                            activities: newActivities,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded font-semibold"
                                                />
                                                <textarea
                                                    value={activity.description}
                                                    onChange={(e) => {
                                                        const newActivities = [...editedData.activities];
                                                        newActivities[index] = {
                                                            ...activity,
                                                            description: e.target.value,
                                                        };
                                                        setEditedData({
                                                            ...editedData,
                                                            activities: newActivities,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                    rows={3}
                                                />
                                                <input
                                                    type="text"
                                                    value={activity.estimated_cost || ""}
                                                    onChange={(e) => {
                                                        const newActivities = [...editedData.activities];
                                                        newActivities[index] = {
                                                            ...activity,
                                                            estimated_cost: e.target.value,
                                                        };
                                                        setEditedData({
                                                            ...editedData,
                                                            activities: newActivities,
                                                        });
                                                    }}
                                                    className="w-full px-2 py-1 border rounded"
                                                    placeholder="Chi phí dự kiến"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tripData.activities.map((activity, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-indigo-100"
                                        >
                                            <div
                                                className="flex justify-between text-sm text-indigo-600 mb-2 font-medium">
                        <span className="bg-indigo-100 px-2 py-1 rounded-full">
                          {activity.start_time}
                        </span>
                                                {activity.end_time && (
                                                    <span className="bg-indigo-100 px-2 py-1 rounded-full">
                            {activity.end_time}
                          </span>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-indigo-900 text-lg mb-2">
                                                {activity.activity_name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {activity.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {activity.estimated_cost && (
                                                    <p className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                                                        💰 Chi phí: {activity.estimated_cost}
                                                    </p>
                                                )}
                                                {activity.map_link && (
                                                    <a
                                                        href={activity.map_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-flex items-center hover:bg-indigo-100 transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                        Xem bản đồ
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        {tripData.daily_summary}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default TripCard;
