const request = require("supertest");
const { userModel } = require("../../models/user");

describe("/api/users/", () => {
  let server;

  beforeAll(async () => {
    console.log("run before test....");
    server = require("../../app");
    await userModel.deleteMany({});
  });
  afterAll(async () => {
    console.log("run after test....");
    await server.close();
    await userModel.db.close();
  });

  describe("GET /", () => {
    describe("when API call is successfull", () => {
      it("should fetch all users from db when query is empty", async () => {
        const users = [
          {
            name: "Chandler",
            email: "chandler@gmail.com",
          },
          {
            name: "Monica",
            email: "monica@gmail.com",
          },
        ];

        await userModel.collection.insertMany(users);

        const response = await request(server).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
      });

      it("should fetch user by query", async () => {
        const response = await request(server).get("/api/users?name=Monica");

        expect(response.status).toBe(200);
        expect(response.body).not.toHaveLength(0);
        const user = response.body[0];
        expect(user).toHaveProperty("name", "Monica");
      });
    });

    describe("when API call fails", () => {
      it("should return 404 if user is not found", async () => {
        const response = await request(server).get("/api/users?name=rachel");

        expect(response.status).toBe(404);
      });
    });
  });

  describe("POST /", () => {
    describe("Add user", () => {
      describe("when API call is successfull", () => {
        it("should add new user", async () => {
          const response = await request(server).post("/api/users/add").send({
            name: "Rachel",
            email: "rachel@gmail.com",
          });

          expect(response.status).toBe(200);
        });

        it("fetch new user", async () => {
          const response = await request(server).get("/api/users?name=Rachel");
          expect(response.status).toBe(200);
        });
      });

      describe("when API call fails", () => {
        it("should return 400 if user does not contain email and name", async () => {
          const response = await request(server)
            .post("/api/users/add")
            .send({ name: "Rachel" });

          expect(response.status).toBe(400);
        });
      });
    });

    describe("Edit user", () => {
      describe("when API call is successful", () => {
        let response;

        it("should edit name and/or email of exsiting user", async () => {
          response = await request(server).get("/api/users?name=Chandler");

          const userId = response.body[0]._id;

          reponse = await request(server).post("/api/users/edit").send({
            _id: userId,
            name: "Joe",
            email: "joe@gmail.com",
          });

          expect(response.status).toBe(200);
        });

        it("fetch user after edit", async () => {
          const response = await request(server).get("/api/users?name=Joe");

          expect(response.status).toBe(200);
        });
      });

      describe("when API call fails", () => {
        it("should return 404 if the given user id is not found", async () => {
          const response = await request(server).post("/api/users/edit").send({
            _id: "111111111111111111111111",
            name: "Joe",
            email: "joe@gmail.com",
          });

          expect(response.status).toBe(404);
        });

        it("should return 400 if query does not contain _id", async () => {
          const response = await request(server).post("/api/users/edit").send({
            name: "Joe",
            email: "joe@gmail.com",
          });

          expect(response.status).toBe(400);
        });
      });
    });
  });

  describe("DELETE /:id", () => {
    describe("Delete user", () => {
      describe("When API call is successfull", () => {
        it("should delete user by given  user id", async () => {
          let response;

          response = await request(server).get("/api/users");
          const userId = response.body[0]._id;

          response = await request(server).delete(
            "/api/users/delete/" + userId
          );

          expect(response.status).toBe(200);
        });

        describe("When API call fails", () => {
          it("should return 400 if id is invalid", async () => {
            let id = "1111";

            const response = await request(server).delete(
              "/api/users/delete/" + id
            );

            expect(response.status).toBe(400);
          });

          it("should return 404 if no user with the given id was found", async () => {
            let id = "111111111111111111111111";

            const response = await request(server).delete(
              "/api/users/delete/" + id
            );

            expect(response.status).toBe(404);
          });
        });
      });
    });
  });
});
