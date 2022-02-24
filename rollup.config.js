import path from 'path'
import esbuild from 'rollup-plugin-esbuild'

const cwd = process.cwd()
const { root } = path.parse(cwd)

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root)
}

export default {
  external,
  input: 'src/index.ts',
  output: { file: 'dist/lib.cjs', format: 'cjs', sourcemap: true },
  plugins: [
    esbuild({
      minify: true,
      target: 'es2020',
      tsconfig: path.join(cwd, 'tsconfig.json'),
    }),
  ],
}
