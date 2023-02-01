import { faker } from "@faker-js/faker";
import { database } from "../../../src/application/services/database/Database/index.js";

class PaymentsFactory {
  async createPayment(ticketId, value) {
    return database.db.payment.create({
      data: {
        ticketId,
        value,
        cardIssuer: faker.name.findName(),
        cardLastDigits: faker.datatype
          .number({ min: 1000, max: 9999 })
          .toString()
      }
    });
  }

  generateCreditCardData() {
    const futureDate = faker.date.future();

    return {
      issuer: faker.name.findName(),
      number: faker.datatype
        .number({ min: 100000000000000, max: 999999999999999 })
        .toString(),
      name: faker.name.findName(),
      expirationDate: `${
        futureDate.getMonth() + 1
      }/${futureDate.getFullYear()}`,
      cvv: faker.datatype.number({ min: 100, max: 999 }).toString()
    };
  }
}

export { PaymentsFactory };
