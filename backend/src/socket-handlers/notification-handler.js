const registerNotificationHandlers = (io, socket) => {
  // Al connection: join room basata su ruolo (usa auth middleware socket se hai JWT)
  // Esempio manuale per test:
  // socket.on('join', (role) => socket.join(role));

  socket.on(NotificationEvent.SEND, (payload, callback) => {
    if (!payload?.type || !payload?.message) {
      callback?.({ error: 'Invalid payload' });
      return;
    }

    const notification = {
      type: payload.type,
      message: payload.message,
      timestamp: new Date(),
      roles: payload.roles || ['user'],
      carId: payload.carId || null,
      teamId: payload.teamId || null
    };

    // Invia solo alle room rilevanti
    if (notification.roles.includes('admin')) {
      io.to('admin').emit(NotificationEvent.NEW, notification);
    }

    if (notification.roles.includes('user')) {
      io.to('users').emit(NotificationEvent.NEW, notification);
    }

    if (notification.roles.includes('team') && notification.teamId) {
      io.to(`team-${notification.teamId}`).emit(NotificationEvent.NEW, notification);
    }

    callback?.({ success: true });
  });
};

export { registerNotificationHandlers };