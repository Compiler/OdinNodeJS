
import { Tab } from "./tabs.js";


let parent = document.querySelector('div')
let first_tab = new Tab(parent, 'tab1', 'hello!')
first_tab.build_content()
