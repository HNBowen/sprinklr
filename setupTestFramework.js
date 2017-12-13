//this file is to allow us to use both the jest "expect" and chai's "expect"

import chai from 'chai'


global.jestExpect = global.expect;
global.expect = chai.expect;