import { FastifyInstance } from "fastify";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  getCurrentUser,
} from "../controllers/authController";
import { authenticateJwt, authorizeRole } from "../middlewares/authMiddleware";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
  fastify.delete("/delete", { preHandler: authenticateJwt }, deleteUser);
  fastify.put("/update", { preHandler: authenticateJwt }, updateUser);
  fastify.get("/me", { preHandler: authenticateJwt }, getCurrentUser);
  fastify.get(
    "/client",
    { preHandler: [authenticateJwt, authorizeRole(["client"])] },
    async (request, reply) => {
      return { message: "Welcome, Client!" };
    },
  );

  fastify.get(
    "/hair",
    { preHandler: [authenticateJwt, authorizeRole(["worker"])] },
    async (request, reply) => {
      return { message: "Welcome, Hair!" };
    },
  );
};
