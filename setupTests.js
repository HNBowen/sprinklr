//this file enables the enzyme adapter for react

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';





Enzyme.configure({ adapter: new Adapter() });
