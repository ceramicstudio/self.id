import path from 'path'
import typescript from '@rollup/plugin-typescript'
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
    output: { file: 'dist/index.min.js', format: 'esm' },
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
    output: {
      dir: 'dist',
      sourcemap: true,
    },
    plugins: [typescript({ declaration: true, outDir: 'dist' })],
  },
]
