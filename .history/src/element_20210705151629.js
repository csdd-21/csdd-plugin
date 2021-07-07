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
  Upload,
  CheckboxButton,
  Collapase,
  CollapseItem 
} from 'element-plus'

const app = createApp(App)
app.use(Button)
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
  .use(CheckboxButton)
  .use(Collapase)
  .use(CollapseItem)

// Vue.prototype.$message = Message
// Vue.prototype.$confirm = MessageBox.confirm