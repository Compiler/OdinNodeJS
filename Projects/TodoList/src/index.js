
import { Tab } from "./tabs.js";
import { Sidebar } from "./sidebar";

let parent = document.querySelector('div')
let sidebar = new Sidebar(parent);
sidebar.add_item(new Tab(parent, 'tab_1', 'hello!'))
sidebar.add_item(new Tab(parent, 'tab_2', 'hello2!'))//yes
sidebar.build_DOM();
