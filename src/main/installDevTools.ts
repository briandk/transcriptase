import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import electronIsDev from "electron-is-dev"

export const installDevTools = () => {
  if (electronIsDev) {
    const tools: any[] = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]
    require("devtron").install()

    tools.map(devTool =>
      installExtension(devTool)
        .then(name => console.log(`Added Extension:  ${name}`))
        .catch(err => console.log("An error occurred: ", err)),
    )
  }
}
