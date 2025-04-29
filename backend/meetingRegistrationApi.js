const express = require('express');

module.exports = function(executeQuery) {
  const router = express.Router();

  // Reserve a meeting room
  router.post('/register', async (req, res) => {
    // Log incoming payload for debugging
    console.log('Meeting register request body:', req.body);

    // Destructure payload
    const { userId, date, slotId, purpose, attendeesCount, attendeeIds = [], additionalNotes = '' } = req.body;
    if (!userId || !date || !slotId || !purpose || !attendeesCount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // 1) Find an available room for date and slot
      const findSql = `
        SELECT ROOM_ID FROM MEETING_ROOMS
        MINUS
        SELECT ROOM_ID FROM ROOM_BOOKINGS
        WHERE TRUNC(BOOKING_DATE) = TO_DATE(:1,'YYYY-MM-DD')
          AND SLOT_ID = :2
      `;
      const findRes = await executeQuery(findSql, [ date, slotId ]);
      if (!findRes.rows || findRes.rows.length === 0) {
        return res.status(400).json({ message: 'No rooms available for this date and time' });
      }
      const roomId = findRes.rows[0][0];

      // 2) Insert booking record
      const insertSql = `
        INSERT INTO ROOM_BOOKINGS
          (USER_ID, ROOM_ID, BOOKING_DATE, SLOT_ID, PURPOSE, ATTENDEES_COUNT, ADDITIONAL_NOTES)
        VALUES
          (:1, :2, TO_DATE(:3,'YYYY-MM-DD'), :4, :5, :6, :7)
      `;
      await executeQuery(
        insertSql,
        [ userId, roomId, date, slotId, purpose, attendeesCount, additionalNotes ],
        { autoCommit: true }
      );

      // 3) Retrieve new booking ID from sequence
      const seqRes = await executeQuery(`SELECT BOOKING_SEQ.CURRVAL FROM DUAL`);
      const bookingId = seqRes.rows[0][0];

      // 4) Insert attendee mappings
      const attendSql = `
        INSERT INTO ROOM_BOOKING_ATTENDEES (BOOKING_ID, STUDENT_ID)
        VALUES (:1, :2)
      `;
      for (const sid of attendeeIds) {
        await executeQuery(attendSql, [ bookingId, sid ], { autoCommit: true });
      }

      // 5) Respond success
      res.status(201).json({ message: 'Meeting room reserved successfully', roomId, bookingId });
    } catch (err) {
      console.error('Error reserving meeting room:', err);
      res.status(500).json({ message: err.message });
    }
  });

  return router;
}; 