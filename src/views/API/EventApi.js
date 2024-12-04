import axios from 'axios';

const BASE_URL = 'https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1';

export const addEvent = async (data, headers) => {
  try {
    const res = await axios.post(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/createEvent`,
      data,
      { headers }
    );
    if (res.data.responseCode === 201) {
      return { success: true, message: 'Advertisement added successfully' };
    }
    return { success: false, message: res.data.errorMessage };
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const fetchEvent = async (headers, pageNumber = 0, pageSize = 10) => {
  try {
    // Properly format the URL with pageNumber and pageSize
    const res = await axios.get(
      `https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/getAllEventByPagination/{pageNumber}/{pageSize}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
    return res;  // Adjusted to return response data directly
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id, headers) => {
  try {
    const res = await axios.get(`https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/getEventByEventId/{eventId}?eventId=${id}`, { headers });
    return res.data;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};

export const updatedEvent = async (updatedData, headers) => {
  try {
    const res = await axios.put(`https://executivetracking.cloudjiffy.net/Mahaasabha/event/v1/update`, updatedData, { headers });
    if (res.data.responseCode === 201) {
      return { success: true, message: res.data.message };
    }
    return { success: false, message: res.data.errorMessage };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id, headers) => {
  try {
    const res = await axios.delete(`${BASE_URL}/deleteEventById/${id}`, { headers });
    if (res.data.responseCode === 200) {
      return { success: true, message: res.data.message };
    }
    return { success: false, message: res.data.errorMessage };
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
