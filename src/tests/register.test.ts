import request from "supertest";

describe("Register", () => {
  it("fails with existed user", () => {
    request("http://localhost:4000")
      .post("/user")
      .send({
        email: "test@test.com",
        password: "123qwe",
        name: "testName",
        surname: "testSurname"
      })
      .then(res => {
        expect(res.body).toEqual([
          { path: "email", message: "This email is already taken" }
        ]);
      });
  }),
    it("fails with invalid credentials", () => {
      request("http://localhost:4000")
        .post("/user")
        .send({
          email: "test@test.com12",
          password: "12",
          name: "1",
          surname: "1"
        })
        .then(res => {
          expect(res.status).toEqual(400);
        });
    });
});
