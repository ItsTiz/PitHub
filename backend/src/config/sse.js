const eventSenders = new Map();

const sseMiddleware = (req, res, next) => {
  req.user = { _id: req.query.userId || 'test-user' };
  next();
};

const handleSSE = (req, res) => {
  const userId = req.user._id.toString();  

  console.log('SSE connected for user:', userId);  

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.flushHeaders();

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