import { TravelerAges, TripInform } from "@/lib/types";

const TripInformPage: React.FC<{
  trip?: TripInform;
  onUpdate?: (updatedTrip: TripInform) => void;
}> = ({ trip, onUpdate }) => {
  if (!trip) {
    return null;
  }

  const handleChange = (
    field: keyof TripInform,
    value: string | TravelerAges
  ) => {
    // Special validation for start_date
    if (field === "start_date" && typeof value === "string") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for accurate date comparison

      if (selectedDate < today) {
        alert("Không thể chọn ngày trong quá khứ. Vui lòng chọn ngày hiện tại hoặc tương lai.");
        return;
      }
    }

    if (onUpdate) {
      onUpdate({
        ...trip,
        [field]: value,
      });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Nhập thông tin chuyến đi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <select
          value={trip.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
          className="w-full border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white hover:border-blue-400 cursor-pointer"
        >
          <option value="" disabled className="text-gray-500">
            Chọn điểm đến
          </option>
          <option value="Hà Nội" className="text-gray-700">
            Hà Nội
          </option>
          <option value="Hồ Chí Minh" className="text-gray-700">
            Hồ Chí Minh
          </option>
          <option value="Đà Nẵng" className="text-gray-700">
            Đà Nẵng
          </option>
          <option value="Nha Trang" className="text-gray-700">
            Nha Trang
          </option>
          <option value="Hội An" className="text-gray-700">
            Hội An
          </option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              min={1}
              type="number"
              placeholder="Số người lớn"
              value={trip.traveler_ages?.adults || ""}
              onChange={(e) =>
                handleChange("traveler_ages", {
                  ...trip.traveler_ages,
                  adults: e.target.value,
                })
              }
              className={`${trip.traveler_ages?.adults !== "" ? "pl-12 text-center" : ""
                } bg-white border-2 border-gray-400 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full`}
            />
            {trip.traveler_ages.adults !== "" && (
              <>
                <button
                  onClick={() =>
                    handleChange("traveler_ages", {
                      ...trip.traveler_ages,
                      adults: String(
                        Math.max(1, parseInt(trip.traveler_ages.adults) - 1)
                      ),
                    })
                  }
                  className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-red-300 hover:bg-red-400 text-white font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105`}
                >
                  -
                </button>
                <button
                  onClick={() =>
                    handleChange("traveler_ages", {
                      ...trip.traveler_ages,
                      adults: String(parseInt(trip.traveler_ages.adults) + 1),
                    })
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-green-300 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  +
                </button>
              </>
            )}
          </div>

          <div className="relative">
            <input
              min={0}
              type="number"
              placeholder="Số trẻ em"
              value={trip.traveler_ages.children}
              onChange={(e) =>
                handleChange("traveler_ages", {
                  ...trip.traveler_ages,
                  children: e.target.value,
                })
              }
              className={`${trip.traveler_ages.children ? "pl-12 text-center" : ""
                } bg-white border-2 border-gray-400 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full`}
            />
            {trip.traveler_ages.children !== "" && (
              <>
                <button
                  onClick={() =>
                    handleChange("traveler_ages", {
                      ...trip.traveler_ages,
                      children: String(
                        Math.max(0, parseInt(trip.traveler_ages.children) - 1)
                      ),
                    })
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-red-300 hover:bg-red-400 text-white font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  -
                </button>
                <button
                  onClick={() =>
                    handleChange("traveler_ages", {
                      ...trip.traveler_ages,
                      children: String(
                        parseInt(trip.traveler_ages.children) + 1
                      ),
                    })
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-green-300 hover:bg-green-400 text-white font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type="date"
            value={trip.start_date || ""}
            onChange={(e) => handleChange("start_date", e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Set minimum date to today
            className={`${trip.start_date !== "" ? "!z-10" : "z-0"
              } border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white w-full`}
            placeholder=""
          />
          {trip.start_date === "" && (
            <label
              className={`${trip.start_date !== "" ? "z-0" : "z-10 bg-white"
                } absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none `}
            >
              Ngày xuất phát
            </label>
          )}
        </div>
        <select
          value={trip.duration_days}
          onChange={(e) => handleChange("duration_days", e.target.value)}
          className="border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white w-full"
        >
          <option value="" disabled>
            Chọn thời gian
          </option>
          <option value="1">1 ngày</option>
          <option value="2">2 ngày</option>
          <option value="3">3 ngày</option>
          <option value="4">4 ngày</option>
          <option value="5">5 ngày</option>
          <option value="6">6 ngày</option>
          <option value="7">7 ngày</option>
          <option value="8">8 ngày</option>
          <option value="9">9 ngày</option>
        </select>

        <div className="relative">
          <input
            type="text"
            placeholder="Ngân sách"
            value={trip.total_budget_vnd.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            onChange={(e) => {
              const value = e.target.value.replace(/\./g, "");
              handleChange("total_budget_vnd", value);
            }}
            className="border-2 border-gray-400 rounded-xl p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            VND
          </span>
        </div>
        <div className="space-y-2">
          <select
            value={trip.accommodation_preference}
            onChange={(e) =>
              handleChange("accommodation_preference", e.target.value)
            }
            className="border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white w-full"
          >
            <option value="">Chọn loại chỗ ở</option>
            <option value="hotel">Khách sạn</option>
            <option value="resort">Resort</option>
            <option value="homestay">Homestay/Căn hộ</option>
            <option value="villa">Biệt thự</option>
            <option value="hostel">Nhà trọ</option>
            <option value="guesthouse">Nhà khách</option>
            <option value="camping">Cắm trại</option>
            <option value="other">Khác</option>
          </select>

          {trip.accommodation_preference === "other" && (
            <input
              type="text"
              placeholder="Nhập loại chỗ ở khác"
              value={trip.otherPlace || ""}
              onChange={(e) => handleChange("otherPlace", e.target.value)}
              className="border-2 border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-700 bg-white w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripInformPage;
