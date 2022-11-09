-- Add an event for removing users, invited to calendars
CREATE EVENT invited_users_removal ON SCHEDULE EVERY 7 DAY ENABLE
  DO
  DELETE FROM UserCalendars
  WHERE isConfirmed = 0 AND createdAt < CURRENT_TIMESTAMP - INTERVAL 7 DAY;
