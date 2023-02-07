import { Server } from "../../src/application/services/api/Server/index.js";
import { databaseHelper } from "../helpers/Database/index.js";
import { server as drivent } from "../../src/application/services/drivent/Server/index.js";
import httpStatus from "http-status";
import { driventHelper } from "../helpers/Drivent/index.js";
import { faker } from "@faker-js/faker";
import { usersFactory } from "../factories/Users/index.js";
import jwt from "jsonwebtoken";
import { enrollmentsFactory } from "../factories/Enrollments/index.js";
import { ticketsFactory } from "../factories/Tickets/index.js";
import { TicketStatus } from "@prisma/client";
import { paymentsFactory } from "../factories/Payments/index.js";
import { hotelsFactory } from "../factories/Hotels/index.js";

beforeEach(async () => {
  await databaseHelper.clean();
});

const server = new Server();
const app = server.app;

describe("1 - GET /hotels", () => {
  it("1.1 - should respond with status 401 if no token is given", async () => {
    try {
      const { status } = await drivent.get("/hotels");

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  it("1.2 - should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    try {
      const { status } = await drivent.get("/hotels", {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  it("1.3 - should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await usersFactory.createUser();
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    try {
      const { status } = await drivent.get("/hotels", {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  describe("when token is valid", () => {
    it("1.4 - should respond with status 402 when user ticket is remote ", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);
      const enrollment = await enrollmentsFactory.createEnrollmentWithAddress(
        user
      );
      const ticketType = await ticketsFactory.createTicketTypeRemote();
      const ticket = await ticketsFactory.createTicket(
        enrollment.id,
        ticketType.id,
        TicketStatus.PAID
      );
      const payment = await paymentsFactory.createPayment(
        ticket.id,
        ticketType.price
      );

      try {
        const { status } = await drivent.get("/hotels", {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
      } catch (error) {
        const { status } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
      }
    });

    it("1.5 - should respond with status 404 when user has no enrollment ", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);

      const ticketType = await ticketsFactory.createTicketTypeRemote();

      try {
        const { status } = await drivent.get("/hotels", {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.NOT_FOUND);
      } catch (error) {
        const { status } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.NOT_FOUND);
      }
    });

    it("1.6 - should respond with status 200 and a list of hotels", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);
      const enrollment = await enrollmentsFactory.createEnrollmentWithAddress(
        user
      );
      const ticketType = await ticketsFactory.createTicketTypeWithHotel();
      const ticket = await ticketsFactory.createTicket(
        enrollment.id,
        ticketType.id,
        TicketStatus.PAID
      );
      const payment = await paymentsFactory.createPayment(
        ticket.id,
        ticketType.price
      );

      const createdHotel = await hotelsFactory.createHotel();

      try {
        const { status, data } = await drivent.get("/hotels", {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.OK);
        expect(data).toEqual([
          {
            id: createdHotel.id,
            name: createdHotel.name,
            image: createdHotel.image,
            createdAt: createdHotel.createdAt.toISOString(),
            updatedAt: createdHotel.updatedAt.toISOString()
          }
        ]);
      } catch (error) {
        const { status, data } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.OK);
        expect(data).toEqual([
          {
            id: createdHotel.id,
            name: createdHotel.name,
            image: createdHotel.image,
            createdAt: createdHotel.createdAt.toISOString(),
            updatedAt: createdHotel.updatedAt.toISOString()
          }
        ]);
      }
    });
  });
});

describe("2 - GET /hotels/:hotelId", () => {
  it("2.1 - should respond with status 401 if no token is given", async () => {
    try {
      const { status } = await drivent.get("/hotels/1");

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  it("2.2 - should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    try {
      const { status } = await drivent.get("/hotels/1", {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  it("2.3 - should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await usersFactory.createUser();
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    try {
      const { status } = await drivent.get("/hotels/1", {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    } catch (error) {
      const { status } = driventHelper.getResponse(error);

      expect(status).toBe(httpStatus.UNAUTHORIZED);
    }
  });

  describe("when token is valid", () => {
    it("2.4 - should respond with status 402 when user ticket is remote ", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);
      const enrollment = await enrollmentsFactory.createEnrollmentWithAddress(
        user
      );
      const ticketType = await ticketsFactory.createTicketTypeRemote();
      const ticket = await ticketsFactory.createTicket(
        enrollment.id,
        ticketType.id,
        TicketStatus.PAID
      );
      const payment = await paymentsFactory.createPayment(
        ticket.id,
        ticketType.price
      );

      try {
        const { status } = await drivent.get("/hotels/1", {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
      } catch (error) {
        const { status } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.PAYMENT_REQUIRED);
      }
    });

    it("2.5 - should respond with status 404 when user has no enrollment ", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);

      const ticketType = await ticketsFactory.createTicketTypeRemote();

      try {
        const { status } = await drivent.get("/hotels/1", {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.NOT_FOUND);
      } catch (error) {
        const { status } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.NOT_FOUND);
      }
    });

    it("2.6 - should respond with status 404 for invalid hotel id", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);
      const enrollment = await enrollmentsFactory.createEnrollmentWithAddress(
        user
      );
      const ticketType = await ticketsFactory.createTicketTypeWithHotel();
      const ticket = await ticketsFactory.createTicket(
        enrollment.id,
        ticketType.id,
        TicketStatus.PAID
      );
      const payment = await paymentsFactory.createPayment(
        ticket.id,
        ticketType.price
      );

      const createdHotel = await hotelsFactory.createHotel();

      try {
        const { status } = await drivent.get(`/hotels/${createdHotel.id + 1}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        expect(status).toBe(httpStatus.NOT_FOUND);
      } catch (error) {
        const { status } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.NOT_FOUND);
      }
    });

    it("2.7 - should respond with status 200 and hotel with rooms", async () => {
      const user = await usersFactory.createUser();
      const token = await usersFactory.generateValidToken(user);
      const enrollment = await enrollmentsFactory.createEnrollmentWithAddress(
        user
      );
      const ticketType = await ticketsFactory.createTicketTypeWithHotel();
      const ticket = await ticketsFactory.createTicket(
        enrollment.id,
        ticketType.id,
        TicketStatus.PAID
      );
      const payment = await paymentsFactory.createPayment(
        ticket.id,
        ticketType.price
      );

      const createdHotel = await hotelsFactory.createHotel();

      const createdRoom = await hotelsFactory.createRoomWithHotelId(
        createdHotel.id
      );

      try {
        const { status, data } = await drivent.get(
          `/hotels/${createdHotel.id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        expect(status).toBe(httpStatus.OK);
        expect(data).toEqual({
          id: createdHotel.id,
          name: createdHotel.name,
          image: createdHotel.image,
          createdAt: createdHotel.createdAt.toISOString(),
          updatedAt: createdHotel.updatedAt.toISOString(),
          Rooms: [
            {
              id: createdRoom.id,
              name: createdRoom.name,
              capacity: createdRoom.capacity,
              hotelId: createdHotel.id,
              createdAt: createdRoom.createdAt.toISOString(),
              updatedAt: createdRoom.updatedAt.toISOString()
            }
          ]
        });
      } catch (error) {
        const { status, data } = driventHelper.getResponse(error);

        expect(status).toBe(httpStatus.OK);
        expect(data).toEqual({
          id: createdHotel.id,
          name: createdHotel.name,
          image: createdHotel.image,
          createdAt: createdHotel.createdAt.toISOString(),
          updatedAt: createdHotel.updatedAt.toISOString(),
          Rooms: [
            {
              id: createdRoom.id,
              name: createdRoom.name,
              capacity: createdRoom.capacity,
              hotelId: createdHotel.id,
              createdAt: createdRoom.createdAt.toISOString(),
              updatedAt: createdRoom.updatedAt.toISOString()
            }
          ]
        });
      }
    });
  });
});
