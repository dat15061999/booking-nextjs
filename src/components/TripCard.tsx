import { DailyItinerary } from "@/lib/types";
import { useState } from "react";

const TripCard: React.FC<{
  tripData: DailyItinerary;
  onClick: () => void;
  onUpdate?: (day: number, updatedData: DailyItinerary) => void;
  onDelete?: (day: number) => void;
}> = ({ tripData, onClick, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(tripData);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(tripData.day, editedData);
    }
    setIsEditing(false);
  };

  return (
    <div className="px-4 py-8">
      <div className="grid grid-cols-1 gap-6">
        <article
          key={tripData.day}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-900">
                Ngày {tripData.day} : {tripData.date}
              </h2>
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
            </div>

            {isEditing ? (
              <div className="space-y-4">
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
                          value={activity.end_time}
                          onChange={(e) => {
                            const newActivities = [...editedData.activities];
                            newActivities[index] = {
                              ...activity,
                              end_time: e.target.value,
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
                      <div className="flex justify-between text-sm text-indigo-600 mb-2 font-medium">
                        <span className="bg-indigo-100 px-2 py-1 rounded-full">
                          {activity.start_time}
                        </span>
                        <span className="bg-indigo-100 px-2 py-1 rounded-full">
                          {activity.end_time}
                        </span>
                      </div>
                      <h3 className="font-semibold text-indigo-900 text-lg mb-2">
                        {activity.activity_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {activity.description}
                      </p>
                      {activity.estimated_cost && (
                        <p className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">
                          💰 Chi phí: {activity.estimated_cost}
                        </p>
                      )}
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
