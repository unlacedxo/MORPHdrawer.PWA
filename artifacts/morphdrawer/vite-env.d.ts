declare module 'vite' {
  type UserConfig = Record<string, any>
  export function defineConfig<T extends UserConfig>(config: T): T
}

declare module '@vitejs/plugin-react' {
  const reactPlugin: any
  export default reactPlugin
}

interface ImportMetaEnv {
  readonly [key: string]: string | boolean | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const process: {
  env: {
    PORT?: string
    [key: string]: string | undefined
  }
}
