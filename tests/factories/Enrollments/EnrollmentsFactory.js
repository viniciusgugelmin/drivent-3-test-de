import { faker } from "@faker-js/faker";
import { database } from "../../../src/application/services/database/Database/index.js";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { usersFactory } from "../Users/index.js";

class EnrollmentsFactory {
  async createEnrollmentWithAddress(user) {
    const incomingUser = user || (await usersFactory.createUser());

    return database.db.enrollment.create({
      data: {
        name: faker.name.findName(),
        cpf: generateCPF(),
        birthday: faker.date.past(),
        phone: faker.phone.phoneNumber("(##) 9####-####"),
        userId: incomingUser.id,
        Address: {
          create: {
            street: faker.address.streetName(),
            cep: faker.address.zipCode(),
            city: faker.address.city(),
            neighborhood: faker.address.city(),
            number: faker.datatype.number().toString(),
            state: faker.helpers.arrayElement(getStates()).name
          }
        }
      },
      include: {
        Address: true
      }
    });
  }

  createhAddressWithCEP() {
    return {
      logradouro: "Avenida Brigadeiro Faria Lima",
      complemento: "de 3252 ao fim - lado par",
      bairro: "Itaim Bibi",
      cidade: "São Paulo",
      uf: "SP"
    };
  }
}

export { EnrollmentsFactory };
