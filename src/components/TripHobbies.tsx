import { TripHobbies } from "@/lib/types";
import { MultiSelect } from "react-multi-select-component";

const TripHobbiesPage: React.FC<{
  preferences?: TripHobbies;
  onUpdate?: (updatedPreferences: TripHobbies) => void;
}> = ({ preferences, onUpdate }) => {
  if (!preferences) {
    return null;
  }

  const handleChange = (field: keyof TripHobbies, value: string | string[]) => {
    if (onUpdate) {
      onUpdate({
        ...preferences,
        [field]: value,
      });
    }
  };

  const options = [
    { value: "Bơi lội", label: "Bơi lội" },
    { value: "Leo núi", label: "Leo núi" },
    { value: "Đạp xe", label: "Đạp xe" },
    { value: "Chụp ảnh", label: "Chụp ảnh" },
    { value: "Mua sắm", label: "Mua sắm" },
    { value: "Nấu ăn", label: "Nấu ăn" },
    { value: "Câu cá", label: "Câu cá" },
    { value: "Cắm trại", label: "Cắm trại" },
    { value: "Tham quan", label: "Tham quan" },
    { value: "Tắm biển", label: "Tắm biển" },
    { value: "Ẩm thực địa phương", label: "Ẩm thực địa phương" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Sở thích và mong muốn của gia đình
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          value={preferences.trip_style_preference}
          onChange={(e) =>
            handleChange("trip_style_preference", e.target.value)
          }
          className="w-full border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white hover:border-blue-400 cursor-pointer"
        >
          <option value="" disabled className="text-gray-500">
            Loại hình du lịch mong muốn
          </option>
          <option value="relaxation">Nghỉ dưỡng</option>
          <option value="exploration">Khám phá</option>
          <option value="adventure">Phiêu lưu/mạo hiểm</option>
          <option value="ecotourism">Du lịch sinh thái</option>
          <option value="combined">Kết hợp nhiều loại hình</option>
        </select>
        <MultiSelect
          options={options}
          value={preferences.specific_interests?.map((activity) => ({
            value: activity,
            label: activity,
          }))}
          onChange={(selectedOptions: { value: string; label: string }[]) =>
            handleChange(
              "specific_interests",
              selectedOptions.map((option: { value: string }) => option.value)
            )
          }
          labelledBy="Chọn hoạt động yêu thích (có thể chọn nhiều)"
          className="w-full border-2 h-[50px] border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          overrideStrings={{
            selectSomeItems: "Chọn hoạt động yêu thích (có thể chọn nhiều)",
            allItemsAreSelected: "Đã chọn tất cả",
            selectAll: "Chọn tất cả",
            search: "Tìm kiếm",
          }}
        />
        <input
          type="text"
          placeholder="Sở thích đặc biệt về thực phẩm"
          value={preferences.food_preferences}
          onChange={(e) => handleChange("food_preferences", e.target.value)}
          className="border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 !placeholder-gray-700 bg-white hover:border-blue-400"
        />
        <select
          value={preferences.activity_pace}
          onChange={(e) => handleChange("activity_pace", e.target.value)}
          className="w-full border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white hover:border-blue-400 cursor-pointer"
        >
          <option value="" disabled className="text-gray-500">
            Mức độ hoạt động mong muốn
          </option>
          <option value="relaxed">Thư thả</option>
          <option value="active">Năng động</option>
        </select>
        <textarea
          placeholder="Phương tiện đi lại"
          value={preferences.transportation_preference_at_destination}
          onChange={(e) =>
            handleChange(
              "transportation_preference_at_destination",
              e.target.value
            )
          }
          rows={4}
          className="bg-white border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 h-[52px] resize-none"
        />
        <textarea
          placeholder="Cân nhắc đặc biệt"
          value={preferences.special_considerations}
          onChange={(e) =>
            handleChange("special_considerations", e.target.value)
          }
          rows={4}
          className="bg-white border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 h-[52px] resize-none"
        />
      </div>
    </div>
  );
};

export default TripHobbiesPage;
