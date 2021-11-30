---
category: components
type: 数据录入
title: DatePicker
subtitle: 日期选择器
order: 0
---

日期点选择可用于选择一个指定日期或指定日期的具体时间点。

### 什么情况下使用？

- 适用于明确的单时间点设置，例如系统时间设置、开始同步时间点等。用于用户只需要选择一个指定日期的值。

## API

### DatePickerCommonProps

以下 `Props` 为 `IxDatePicker`、`IxDateRangePicker` 共享的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `v-model:open` | 日期面板是否展开 | `boolean` | - | - | - |
| `autofocus` | 默认获取焦点 | `boolean` | `false` | - | - |
| `borderless` | 是否无边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 清除按钮图标 |`string` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | - |
| `disabledDate` | 不可选择的日期 | `(date: any) => boolean` | - | - | `date` 的类型为 `outputFormat` 的返回值类型 |
| `format` | 展示的格式 | `string` | `HH:mm:ss` | ✅ | 参考[dayjs](https://dayjs.gitee.io/docs/zh-CN/display/format) |
| `outputFormat` | 输出的格式 | `(date: number) => any` | - | ✅ | 默认输出格式为时间戳 |
| `overlayClassName` | 日期面板的 `class`  | `string` | - | - | - |
| `overlayRender` | 自定义日期面板内容的渲染  | `(children:VNode[]) => VNodeTypes` | - | - | - |
| `readonly` | 只读模式 | `boolean` | - | - | - |
| `size` | 设置选择器大小 | `'sm' \| 'md' \| 'lg'` | `md` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | `'calendar'` | ✅ | - |
| `type` | 设置选择器类型 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'` | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |
| `onFocus` | 获取焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |
| `onBlur` | 失去焦点后的回调 | `(evt: FocusEvent) => void` | - | - | - |

### DatePickerCommonSlots

以下 `Slots` 为 `IxDatePicker`、`IxDateRangePicker` 共享的插槽。

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `footer` | 自定义日期面板中的页脚 | - | - |
| `option` | 自定义日期面板中的单元格 | `{date: any}` | `date` 的类型为 `outputFormat` 的返回值类型 |

### DatePickerCommonMethods

以下 `Methods` 为 `IxDatePicker`、`IxDateRangePicker` 共享的方法。

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `blur` | 移除焦点 | `(options?: FocusOptions) => void` | - |
| `focus` | 获取焦点 | `() => void` | - |

### IxDatePicker

#### DatePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `number \| string \| Date \| Dayjs` | - | - | 当传入一个 `string` 类型时，请指定时区信息 |
| `defaultOpenValue` | 打开面板时默认选中的值 | `number \| string \| Date \| Dayjs` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string \| #placeholder` | - | - | 默认使用 `i18n` 配置 |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps` | `false` | - | 仅在 `type='date'` 时生效 |

### IxDateRangePicker

#### DateRangePickerProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 当前选中的日期 | `Array<number \| string \| Date \| Dayjs>` | - | - | 当传入 `string` 类型时，请指定时区信息 |
| `defaultOpenValue` | 打开面板时默认选中的值 | `Array<number \| string \| Date \| Dayjs>` | - | - | `value` 为空时，高亮的值 |
| `placeholder` | 选择框默认文本 | `string[] \| #placeholder=placement:'start'\|'end'` | - | - | 默认使用 `i18n` 配置 |
| `separator` | 自定义分隔符图标 | `string \| VNode \| #separator` | `'swap-right'` | ✅ | - |
| `timePicker` | 是否显示时间选择器 | `boolean \| TimePickerProps \| TimePickerProps[]` | `false` | - | 如果需要对前后的时间选择器配置不同的禁用条件，可以传入一个数组 |
