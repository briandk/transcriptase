import { loadURL } from "../src/main/load-url"

test("loads from storybook", () => {
  const loadStub = jest.fn()
  loadURL({ loadURL: loadStub }, "a", true)
  expect(loadStub).toBeCalledWith("http://localhost:6006")
})

test("loads from electron", () => {
  const loadStub = jest.fn()
  loadURL({ loadURL: loadStub }, "a", false)
  if (process.platform === "win32") {
    expect(loadStub).toBeCalledWith("file:///a\\out\\index.html")
  } else {
    expect(loadStub).toBeCalledWith("file:///a/out/index.html")
  }
})
