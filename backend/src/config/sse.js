const eventSenders = new Map();

const sseMiddleware = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).end('Unauthorized');

  // jwt.verify(token, secret, (err, decoded) => {
  //   if (err) return res.status(401).end('Invalid token');
  //   req.user = decoded;
  //   next();
  // });

  // per test: salta verifica
  req.user = { _id: req.query.userId || 'test-user' };
  next();
};

const handleSSE = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

  const userId = req.user._id.toString();

  const heartbeat = setInterval(() => res.write(': ping\n\n'), 15000);

  const send = data => res.write(`data: ${JSON.stringify(data)}\n\n`);

  eventSenders.set(userId, send);

  req.on('close', () => {
    clearInterval(heartbeat);
    eventSenders.delete(userId);
  });
};

const sendToUser = (userId, data) => {
  const sender = eventSenders.get(userId.toString());
  if (sender) sender(data);
};

export { sseMiddleware, handleSSE, sendToUser, eventSenders };