// Meeting Rooms API for Library Management System
const express = require('express');

// Export a function that takes executeQuery and returns a router
module.exports = function(executeQuery) {
  const router = express.Router();

  // Get all meeting rooms
  router.get('/rooms', async (req, res) => {
    try {
      const result = await executeQuery(
        `SELECT ROOM_ID, NAME, CAPACITY FROM MEETING_ROOMS ORDER BY ROOM_ID`
      );
      const rooms = result.rows.map(row => ({
        id: row[0],
        name: row[1],
        capacity: row[2]
      }));
      res.json(rooms);
    } catch (err) {
      console.error('Error fetching meeting rooms:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get all time slots
  router.get('/slots', async (req, res) => {
    try {
      const result = await executeQuery(
        `SELECT SLOT_ID, SLOT_TIME FROM TIME_SLOTS ORDER BY SLOT_ID`
      );
      const slots = result.rows.map(row => ({
        id: row[0],
        time: row[1]
      }));
      res.json(slots);
    } catch (err) {
      console.error('Error fetching time slots:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get all bookings for a given date
  router.get('/bookings', async (req, res) => {
    try {
      const date = req.query.date;
      if (!date) {
        return res.status(400).json({ message: 'Date is required' });
      }
      // Use positional bind :1 to avoid named variable issues
      const sql = `
        SELECT BOOKING_ID, USER_ID, ROOM_ID, SLOT_ID, PURPOSE, ATTENDEES_COUNT, STATUS
        FROM ROOM_BOOKINGS
        WHERE TRUNC(BOOKING_DATE) = TO_DATE(:1,'YYYY-MM-DD')
      `;
      const result = await executeQuery(sql, [date]);
      const bookings = result.rows.map(row => ({
        bookingId: row[0],
        userId: row[1],
        roomId: row[2],
        slotId: row[3],
        purpose: row[4],
        attendeesCount: row[5],
        status: row[6]
      }));
      res.json(bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new booking
  router.post('/bookings', async (req, res) => {
    try {
      const { userId, date, slotId, purpose, attendeesCount } = req.body;
      if (!userId || !date || !slotId || !purpose || !attendeesCount) {
        return res.status(400).json({ message: 'Missing required booking fields' });
      }
      // Find an available room for given date and slot
      const findRoomSql = `
        SELECT ROOM_ID FROM MEETING_ROOMS
        MINUS
        SELECT ROOM_ID FROM ROOM_BOOKINGS
        WHERE TRUNC(BOOKING_DATE) = TO_DATE(:date,'YYYY-MM-DD') AND SLOT_ID = :slotId
      `;
      const roomResult = await executeQuery(findRoomSql, [date, slotId]);
      if (!roomResult.rows.length) {
        return res.status(400).json({ message: 'No rooms available for this date and time' });
      }
      const roomId = roomResult.rows[0][0];
      // Insert booking
      await executeQuery(
        `INSERT INTO ROOM_BOOKINGS (USER_ID, ROOM_ID, BOOKING_DATE, SLOT_ID, PURPOSE, ATTENDEES_COUNT)
         VALUES (:userId, :roomId, TO_DATE(:date,'YYYY-MM-DD'), :slotId, :purpose, :attendeesCount)`,
        [userId, roomId, date, slotId, purpose, attendeesCount],
        { autoCommit: true }
      );
      res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
}; 