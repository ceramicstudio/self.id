import path from 'path'
import esbuild from 'rollup-plugin-esbuild'

const cwd = path.parse(process.cwd())

function external(id) {
  return !id.startsWith('.') && !id.startsWith(cwd.root)
}

const input = 'src/index.ts'

export default [
  {
    external,
    input,
    output: { file: 'dist/cjs.js', format: 'cjs', sourcemap: true, },
    plugins: [
      esbuild({
        minify: true,
        target: 'es2020',
        tsconfig: path.resolve('./tsconfig.json'),
      }),
    ],
  },
  {
    external,
    input,
    output: { file: 'dist/esm.js', format: 'esm', sourcemap: true, },
    plugins: [
      esbuild({
        minify: true,
        target: 'es2020',
        tsconfig: path.resolve('./tsconfig.json'),
      }),
    ],
  },
]
