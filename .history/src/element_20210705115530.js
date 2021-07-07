import Vue from 'vue'

import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  TableColumn,
  Table,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Step,
  Steps,
  Checkbox,
  CheckboxGroup,
  Upload
} from 'element-ui'

Vue.use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Menu)
  .use(Submenu)
  .use(Row)
  .use(Col)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Card)
  .use(TableColumn)
  .use(Table)
  .use(Switch)
  .use(Tooltip)
  .use(Pagination)
  .use(Dialog)
  .use(Tag)
  .use(Tree)
  .use(Select)
  .use(Option)
  .use(Cascader)
  .use(Alert)
  .use(Tabs)
  .use(TabPane)
  .use(Step)
  .use(Steps)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Upload)


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm