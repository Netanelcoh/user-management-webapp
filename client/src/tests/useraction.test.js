describe("handleEditUser", () => {
  const usersRef = {
    current: [
      { userId: 1, name: "John" },
      { userId: 2, name: "Jane" },
    ],
  };
  const setUsers = jest.fn();

  beforeEach(() => {
    setUsers.mockClear();
  });

  it("should update the user with the given id", () => {
    const newUser = { userId: 1, name: "Johnny" };

    handleEditUser(newUser, usersRef, setUsers);

    expect(usersRef.current).toEqual([
      { userId: 1, name: "Johnny" },
      { userId: 2, name: "Jane" },
    ]);
    expect(setUsers).toHaveBeenCalledWith([
      { userId: 1, name: "Johnny" },
      { userId: 2, name: "Jane" },
    ]);
  });

  it("should not update any users if the user with the given id is not found", () => {
    const newUser = { userId: 3, name: "Bob" };

    handleEditUser(newUser, usersRef, setUsers);

    expect(usersRef.current).toEqual([
      { userId: 1, name: "John" },
      { userId: 2, name: "Jane" },
    ]);
    expect(setUsers).not.toHaveBeenCalled();
  });
});
