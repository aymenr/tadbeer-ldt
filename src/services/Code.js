import { compile } from '@sweet-js/core/dist/browser-sweet'
import Eval from './Eval'
import Urdu from './Urdu.sjs'

export default class Code {
  static compileCode(code) {
    return compile(Urdu + " " + code)
  }

  static runCode(code, cb) {
    Eval(code, cb)
  }
}
