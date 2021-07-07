import Vue from 'vue'

import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Pagination,
  Dialog,
  Select,
  Option,
  Alert,
  Tabs,
  TabPane,
  CheckboxGroup,
  Upload
} from 'element-ui'

Vue.use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Container)
  .use(Header)
  .use(Pagination)
  .use(Dialog)
  .use(Select)
  .use(Option)
  .use(Alert)
  .use(Tabs)
  .use(TabPane)
  .use(CheckboxGroup)
  .use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
