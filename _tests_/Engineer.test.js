const Engineer = require("../lib/Engineer");
// const Employee = require("../lib/Employee");

test("Can set github via constructor", () => {
  const testValue = "test";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test('getRole() should return "Engineer"', () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "test");
  expect(e.getRole()).toBe(testValue);
});

test("Can get github via getGithub()", () => {
  const testValue = "";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});
