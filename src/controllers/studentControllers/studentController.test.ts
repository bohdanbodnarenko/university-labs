import * as faker from "faker";
import * as rp from "request-promise";

import { User } from "../../entity/User";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Student } from "../../entity/Student";

const host = process.env.API_BASE || "http://localhost:4000";

const email = faker.internet.email(),
  password = faker.internet.password(),
  name = faker.internet.userName(),
  specialization = "testSpecialization",
  group = "testGroup",
  faculty = "testFaculty";

beforeAll(async () => {
  await createTypeormConn();
});

describe("Register student", () => {
  it("register a new student", async () => {
    const response = await rp.post(`${host}/student`, {
      withCredentials: true,
      json: true,
      body: {
        user: { email, password, name, surname: name },
        specialization,
        group,
        faculty
      }
    });
    expect(response).toEqual(true);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.password).not.toEqual(password);

    const students = await Student.find({ where: { userId: user.id } });
    expect(students).toHaveLength(1);
  });

  it("check for duplicate email", async () => {
    try {
      await rp.post(`${host}/student`, {
        withCredentials: true,
        json: true,
        body: {
          user: { email, password, name, surname: name },
          specialization,
          group,
          faculty
        }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(403);
    }
  });

  it("check bad email", async () => {
    try {
      await rp.post(`${host}/student`, {
        withCredentials: true,
        json: true,
        body: {
          user: { email: "bla", password, name, surname: name },
          specialization,
          group,
          faculty
        }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });

  it("check bad password", async () => {
    try {
      await rp.post(`${host}/student`, {
        withCredentials: true,
        json: true,
        body: {
          user: {
            email: faker.internet.email(),
            password: "bla",
            name,
            surname: name
          },
          specialization,
          group,
          faculty
        }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });
});
