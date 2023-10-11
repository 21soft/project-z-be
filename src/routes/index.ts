import { Router } from 'express';
import AuthRoute from "./auth_route";
import swaggerUi from "swagger-ui-express";
import { specs } from "../config/swagger";

const router = Router();
const v1 = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'This is an api for project Z',
  });
});

// Assign route
v1.use(AuthRoute)
router.use('/api/v1', v1);
router.get('/v3/api-docs.json', (req, res) => {
  res.json(specs)
})
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, {swaggerOptions: {url: '/v3/api-docs.json'}}));

export default router;
