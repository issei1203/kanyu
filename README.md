## 文章校正ツール 'Kanyu'
入力された文章に対して校正を行う。

###コンテナのイメージ作成方法
```
docker build -t kanyu:1 .
docker run -p 127.0.0.1:80:8080 --name kanyu -it kanyu:1
```

###使用方法
extensionディレクトリを「パッケージ化されていない拡張機能を読み込む」でインポートする
