import * as faker from "faker";
import * as rp from "request-promise";

const host = process.env.API_BASE || "http://localhost:4000";

const email = faker.internet.email(),
  password = faker.internet.password(),
  name = faker.internet.userName(),
  specialization = "testSpecialization",
  group = "testGroup",
  faculty = "testFaculty";

describe("Login student", () => {
  it("login existed user", async () => {
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
    const response = await rp.post(`${host}/login`, {
      withCredentials: true,
      json: true,
      body: { email, password }
    });

    expect(response.token).not.toBeNull();
    expect(response.testSpecialization).not.toBeNull();
    expect(response.faculty).not.toBeNull();
    expect(response.group).not.toBeNull();
  });
});
