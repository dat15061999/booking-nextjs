import { useEffect, useState } from 'react';
import { TripPlan } from '@/lib/types';
import { apiService } from '@/lib/apiService';
import TripCard from './TripCard';
import Image from "next/image";

const TripList: React.FC = () => {
    const [trips, setTrips] = useState<TripPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedTripId, setExpandedTripId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            // Hardcoded user ID for simplicity - in real app, get from auth context
            const response = await apiService.listTrips();

            if (response.meta.status) {
                // Reverse the trips array so newest trips appear first
                setTrips(response.data.trip_plans.reverse());
            } else {
                setError(response.meta.message || 'Failed to fetch trips');
            }
        } catch (err) {
            setError('Error fetching trips. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const toggleTripExpansion = (tripId: number) => {
        setExpandedTripId(expandedTripId === tripId ? null : tripId);
    };

    const handleDeleteTrip = async (tripId: number) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            try {
                setDeleting(true);
                const response = await apiService.deleteTrip(tripId);

                if (response.success) {
                    // Remove the trip from the local state
                    setTrips(trips.filter(trip => trip.id !== tripId));

                    if (expandedTripId === tripId) {
                        setExpandedTripId(null);
                    }

                    alert('Trip deleted successfully');
                } else {
                    alert(`Failed to delete trip: ${response.message}`);
                }
            } catch (error) {
                console.error('Error deleting trip:', error);
                alert('An error occurred while deleting the trip. Please try again.');
            } finally {
                setDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">Chuyến đi của bạn</h1>
                    <a
                        href="/booking"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center group shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Trip
                    </a>
                </div>

                <div className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-indigo-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                    <p className="text-indigo-800 font-medium">Loading Chuyến đi của bạn...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">Chuyến đi của bạn</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchTrips}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center group shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Retry
                        </button>
                        <a
                            href="/booking"
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center group shadow-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create New Trip
                        </a>
                    </div>
                </div>

                <div className="bg-red-50/80 backdrop-blur-sm text-red-800 p-6 rounded-xl shadow-lg border border-red-100">
                    <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="font-semibold text-lg">Error Loading Trips</h3>
                    </div>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (trips.length === 0) {
        return (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">Chuyến đi của bạn</h1>
                    <a
                        href="/booking"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center group shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Trip
                    </a>
                </div>

                <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-50">
                    <Image src="/globe.svg" alt="No trips" className="w-24 h-24 mx-auto mb-6 opacity-50" />
                    <h3 className="text-xl font-semibold text-indigo-900 mb-2">No trips found</h3>
                    <p className="text-gray-600 mb-8">You haven&apos;t created any trips yet. Start planning your next adventure!</p>
                    <a
                        href="/booking"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 inline-flex items-center text-lg group shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Your First Trip
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">Chuyến đi của bạn</h1>
                <div className="flex gap-2">
                    <button
                        onClick={fetchTrips}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center group shadow-md"
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {loading ? 'Refreshing...' : 'Làm mới'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {trips.map((trip) => (
                    <div key={trip.id} className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all border border-indigo-50 hover:shadow-xl ${expandedTripId === trip.id ? 'ring-2 ring-indigo-500' : ''}`}>
                        {/* Trip Summary Header - Always visible */}
                        <button
                            className="p-6 cursor-pointer hover:bg-indigo-50/50 transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                if ((e.target as HTMLElement).closest('button') === null) {
                                    toggleTripExpansion(trip.id);
                                }
                            }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text">{trip.name}</h2>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100/80 text-indigo-800 backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {trip.destination}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100/80 text-blue-800 backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {trip.duration_days} days
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100/80 text-green-800 backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTripExpansion(trip.id);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-800 hover:bg-indigo-200/80 transition-colors backdrop-blur-sm font-medium flex items-center group"
                                    >
                                        {expandedTripId === trip.id ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                Hide Details
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:translate-y-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                Xem chi tiết
                                            </>
                                        )}
                                    </button>
                                    <button
                                        className="px-3 py-2 rounded-lg bg-blue-100/80 text-blue-800 hover:bg-blue-200/80 transition-colors backdrop-blur-sm font-medium flex items-center group"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTripExpansion(trip.id);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Sửa
                                    </button>
                                    <button
                                        className="px-3 py-2 rounded-lg bg-red-100/80 text-red-800 hover:bg-red-200/80 transition-colors backdrop-blur-sm font-medium flex items-center group"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTrip(trip.id);
                                        }}
                                        disabled={deleting}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {deleting ? 'Deleting...' : 'Xoá'}
                                    </button>
                                </div>
                            </div>
                        </button>

                        {/* Trip Details - Visible only when expanded */}
                        {expandedTripId === trip.id && (
                            <div className="border-t border-indigo-100">
                                {trip.itineraries.map((itinerary) => (
                                    <TripCard
                                        key={itinerary.id}
                                        tripData={itinerary}
                                        isCollapsible={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripList;
