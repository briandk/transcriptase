import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import electronIsDev from "electron-is-dev"

export const installDevTools = (): void => {
  const devTools = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, "devtron"]
  if (electronIsDev) {
    devTools.forEach(
      async (tool): Promise<string> => {
        const toolName = await installExtension(tool)
        console.log(`Added Extension:  ${toolName}`)
        return toolName
      },
    )
  }
}
