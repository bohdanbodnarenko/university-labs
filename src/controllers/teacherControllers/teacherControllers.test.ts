import * as faker from "faker";
import * as rp from "request-promise";

import { User } from "../../entity/User";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Teacher } from "../../entity/Teacher";

const host = process.env.API_BASE || "http://localhost:4000";

const email = "teacher@teacher.com",
  password = faker.internet.password(),
  name = faker.internet.userName(),
  position = "testPosition";

beforeAll(async () => {
  await createTypeormConn();
});

describe("Register teacher", () => {
  it("register a new teacher", async () => {
    const response = await rp.post(`${host}/teacher`, {
      withCredentials: true,
      json: true,
      body: {
        user: { email, password, name, surname: name },
        position
      }
    });
    expect(response).toEqual(true);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.password).not.toEqual(password);

    const teachers = await Teacher.find({ where: { userId: user.id } });
    expect(teachers).toHaveLength(1);
  });

  it("check bad email", async () => {
    try {
      await rp.post(`${host}/teacher`, {
        withCredentials: true,
        json: true,
        body: {
          user: { email: "bla", password, name, surname: name },
          position
        }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });

  it("check bad password", async () => {
    try {
      await rp.post(`${host}/teacher`, {
        withCredentials: true,
        json: true,
        body: {
          user: {
            email: "teacher1@teacher.com",
            password: "bla",
            name,
            surname: name
          },
          position
        }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });
});
