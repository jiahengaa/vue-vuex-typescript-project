# 建议预装

- vscode 建议预装 ‘Vue VS Code Extension Pack’插件

- 安装淘宝 cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### Add New Page

- 在 scripts/vues.conf.json 配置文件中新增要添加的页面，然后执行以下命令

```
cnpm run tep
```

### Add New Component

```
cnpm run com your-component-name
```

- 例如：cnpm run com SampleSome

1 cnpm install
2 npm run serve
default listen at localhost:8080

后台 API 指定服务地址为：
localhost:3000/api
