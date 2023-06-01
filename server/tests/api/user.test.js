const axios = require("axios");
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
    it("should fetch all users from db when query is empty", async () => {
      const users = [
        {
          name: "Chandler",
          email: "Monica@gmail.com",
        },
        {
          name: "Monica",
          email: "monica@gmail.com",
        },
      ];

      await userModel.collection.insertMany(users);

      const response = await axios.get("http://localhost:3000/api/users");
      const result = response.data;
      expect(response.status).toBe(200);
      expect(result).toHaveLength(2);
    });

    it("should fetch user by query", async () => {
      const response = await axios.get("http://localhost:3000/api/users", {
        params: { name: "Monica" },
      });

      const result = response.data;
      expect(result).not.toHaveLength(0);
      const user = result[0];
      expect(response.status).toBe(200);
      expect(user).toHaveProperty("name", "Monica");
    });

    it("should return 404 if.......");
  });

  describe("POST /", () => {
    it("should add new user", async () => {
      const response = await axios.post("http://localhost:3000/api/users/add", {
        name: "Rachel",
        email: "rachel@gmail.com",
      });

      expect(response.status).toBe(200);
    });

    it("check if user is added", async () => {
      const response = await axios.get("http://localhost:3000/api/users", {
        params: { name: "Rachel" },
      });

      const result = response.data;
      expect(result).not.toHaveLength(0);
      const user = result[0];
      expect(response.status).toBe(200);
      expect(user).toHaveProperty("name", "Rachel");
    });

    it("edit user", async () => {
      let response;
      response = await axios.get("http://localhost:3000/api/users", {
        params: { name: "Rachel" },
      });

      expect(response.status).toBe(200);
      const result = response.data;
      const currentUser = result[0];
      const userId = currentUser._id;

      response = await axios.post("http://localhost:3000/api/users/edit", {
        _id: userId,
        name: "Ross",
        email: "rachel@gmail.com",
      });

      expect(response.status).toBe(200);

      response = await axios.get("http://localhost:3000/api/users", {
        params: { name: "Ross" },
      });

      let updatedUser = response.data[0];
      expect(response.status).toBe(200);
      expect(updatedUser._id).toBe(userId);
    });
  });

  describe("DELETE /:id", () => {
    it("delete user", async () => {});
  });
});
