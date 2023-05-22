const axios = require("axios");

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    console.log("run before test....");
    //connection = await mongoose.connect("mongodb://localhost:27017/user");
  });

  afterAll(async () => {
    console.log("run after test....");
    //await connection.close();
  });

  it("should fetch all users from db when query is empty", async () => {
    const response = await axios.get("http://localhost:3000/api/users");
    const users = response.data;

    expect(response.status).toBe(200);
    expect(users).not.toHaveLength(0);
  });

  it("should fetch user from db by query", async () => {
    const response = await axios.get("http://localhost:3000/api/users", {
      params: {
        _id: "6463583f3727e2c48c3155bc",
      },
    });
    const data = response.data;
    const user = data[0];

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(user).toEqual({
      __v: 0,
      _id: "6463583f3727e2c48c3155bc",
      email: "john@gmail.com",
      name: "John",
    });
  });
});
