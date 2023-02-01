import { database } from "../../../src/application/services/database/Database/index.js";
import { faker } from "@faker-js/faker";

class HotelsFactory {
  async createHotel() {
    return database.db.hotel.create({
      data: {
        name: faker.name.findName(),
        image: faker.image.imageUrl()
      }
    });
  }

  async createRoomWithHotelId(hotelId) {
    return database.db.room.create({
      data: {
        name: "1020",
        capacity: 3,
        hotelId: hotelId
      }
    });
  }
}

export { HotelsFactory };
