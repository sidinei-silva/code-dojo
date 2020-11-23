// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import authenticated from '../../middlewares/auth';

export default authenticated((req, res) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
});
