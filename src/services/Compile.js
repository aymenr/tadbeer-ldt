import compile from 'sweet.js'
import SweetLoader from 'sweet.js'

export default class Compile {
  constructor() {
    this.loader = new SweetLoader('./')
  }

  compile_code(code) {
    return compile(code, this.loader)
  }
}

