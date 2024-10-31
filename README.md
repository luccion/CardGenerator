# ✨Card Generator

## 简介

这个工具允许用户通过上传 CSV 文件来生成卡牌。每张卡牌可以包含名称、图片、说明、费用和评论等信息。生成的卡牌可以以 PDF 格式导出，适合打印。

## 特性

- 支持 CSV 文件上传。
- 自定义卡牌模板，适合不同设计需求。
- 自动适配 PDF 页面朝向（横向或竖向）。
- 支持一次生成多页 PDF，便于打印。
- 卡牌布局紧密排列，符合 A4 纸张尺寸。

## 使用说明

### 安装

1. 下载或克隆该项目。
2. 在浏览器中打开 `index.html` 文件。

### 使用步骤

1. 点击“选择文件”按钮上传包含卡牌信息的 CSV 文件。
2. 根据需要查看生成的卡牌预览。
3. 点击“导出到 PDF”按钮生成 PDF 文件。
4. 下载并打印 PDF 文件。

### CSV 文件格式

请确保上传的 CSV 文件格式正确，每行代表一张卡牌，字段应包含：

- 名称
- 图片
- 费用
- 关键词
- 类型
- 说明
- 评论

示例：

| name   | image                          | cost | keyword | description    | type   | comment     |
| ------ | ------------------------------ | ---- | ------- | -------------- | ------ | ----------- |
| Card 1 | https://example.com/image1.png | 0    |         | This is card 1 | Common | No comments |

### 样式定制

您可以在 CSS 文件中自定义卡牌的样式和布局，修改 `style.css` 中的相关属性以适应您的设计需求。

## 技术栈

- HTML
- CSS
- JavaScript
- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [PapaParse](https://www.papaparse.com/) - 用于解析 CSV 文件。

## 贡献

欢迎对该项目提出建议和贡献代码！请创建一个 Pull Request。

## License

该项目采用 MIT 许可证，详细信息请查看 `LICENSE` 文件。
