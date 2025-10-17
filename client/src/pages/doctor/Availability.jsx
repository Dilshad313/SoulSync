import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { Select } from '../../components/UI/Input';
import Badge from '../../components/UI/Badge';

const Availability = () => {
  const [availability, setAvailability] = useState({});
  const [selectedDay, setSelectedDay] = useState('monday');
  const [loading, setLoading] = useState(false);

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      // API call would go here
      // Mock data
      setAvailability({
        monday: { enabled: true, slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        tuesday: { enabled: true, slots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'] },
        wednesday: { enabled: true, slots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'] },
        thursday: { enabled: true, slots: ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'] },
        friday: { enabled: true, slots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'] },
        saturday: { enabled: false, slots: [] },
        sunday: { enabled: false, slots: [] }
      });
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  const toggleDay = (day) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        enabled: !availability[day]?.enabled
      }
    });
  };

  const toggleSlot = (day, slot) => {
    const dayData = availability[day] || { enabled: true, slots: [] };
    const slots = dayData.slots || [];
    
    const newSlots = slots.includes(slot)
      ? slots.filter(s => s !== slot)
      : [...slots, slot].sort();

    setAvailability({
      ...availability,
      [day]: {
        ...dayData,
        slots: newSlots
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Use mock API service
      await api.updateAvailability(availability);
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to update availability');
    }
    setLoading(false);
  };

  const selectAllSlots = (day) => {
    setAvailability({
      ...availability,
      [day]: {
        enabled: true,
        slots: [...timeSlots]
      }
    });
  };

  const clearAllSlots = (day) => {
    setAvailability({
      ...availability,
      [day]: {
        enabled: true,
        slots: []
      }
    });
  };

  const currentDayData = availability[selectedDay] || { enabled: false, slots: [] };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Manage Availability
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Set your available time slots for patient appointments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Days Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Days of Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {daysOfWeek.map((day) => {
                  const dayData = availability[day.value] || { enabled: false, slots: [] };
                  return (
                    <button
                      key={day.value}
                      onClick={() => setSelectedDay(day.value)}
                      className={`
                        w-full p-3 rounded-lg text-left transition-all
                        ${selectedDay === day.value
                          ? 'bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500'
                          : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {day.label}
                        </span>
                        {dayData.enabled ? (
                          <Badge variant="success" size="sm">
                            {dayData.slots.length} slots
                          </Badge>
                        ) : (
                          <Badge variant="default" size="sm">
                            Off
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="capitalize">{selectedDay}</CardTitle>
                  <CardDescription>
                    {currentDayData.enabled ? 'Select available time slots' : 'Day is currently disabled'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentDayData.enabled}
                      onChange={() => toggleDay(selectedDay)}
                      className="rounded border-slate-300 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Available
                    </span>
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentDayData.enabled ? (
                <>
                  {/* Quick Actions */}
                  <div className="flex gap-2 mb-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectAllSlots(selectedDay)}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearAllSlots(selectedDay)}
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Time Slots Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = currentDayData.slots.includes(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => toggleSlot(selectedDay, slot)}
                          className={`
                            p-3 rounded-lg text-sm font-medium transition-all
                            ${isSelected
                              ? 'bg-teal-500 text-white hover:bg-teal-600'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }
                          `}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    This day is currently disabled
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => toggleDay(selectedDay)}
                  >
                    Enable {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>Overview of your availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {daysOfWeek.map((day) => {
                const dayData = availability[day.value] || { enabled: false, slots: [] };
                return (
                  <div
                    key={day.value}
                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-center"
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                      {day.label.slice(0, 3)}
                    </p>
                    {dayData.enabled ? (
                      <>
                        <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {dayData.slots.length}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">slots</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-400 dark:text-slate-500">Off</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            loading={loading}
            disabled={loading}
          >
            Save Availability
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Availability;
