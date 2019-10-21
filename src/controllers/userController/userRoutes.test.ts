import * as faker from "faker";
import * as rp from "request-promise";

import { User } from "../../entity/User_account";
import { createTypeormConn } from "../../utils/createTypeormConn";

const host = process.env.API_BASE || "http://localhost:4000";

const email = faker.internet.email();
const password = faker.internet.password();
const name = faker.internet.userName();

beforeAll(async () => {
  await createTypeormConn();
});

describe("Register user", () => {
  it("register new user", async () => {
    const response = await rp.post(`${host}/user`, {
      withCredentials: true,
      json: true,
      body: { email, password, name, surname: name }
    });
    expect(response).toEqual(true);
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it("check for duplicate email", async () => {
    try {
      await rp.post(`${host}/user`, {
        withCredentials: true,
        json: true,
        body: { email, password, name, surname: name }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(403);
    }
  });

  it("check bad email", async () => {
    try {
      await rp.post(`${host}/user`, {
        withCredentials: true,
        json: true,
        body: { email: "bla", password, name, surname: name }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });

  it("check bad password", async () => {
    try {
      await rp.post(`${host}/user`, {
        withCredentials: true,
        json: true,
        body: { email, password: "", name, surname: name }
      });
    } catch (error) {
      expect(error.statusCode).toEqual(400);
    }
  });
});

describe("Login user", () => {
  it("login existed user", async () => {
    const response = await rp.post(`${host}/user/login`, {
      withCredentials: true,
      json: true,
      body: { email, password }
    });
    expect(response.token).not.toBeNull();
  });
});
